/*
@licence
Copyright GardaWorld Inc
*/

  gsked.SoapClientBehavior = {

   static get properties() {
      url:           { type: String, value: null },
      pingDelay:     { type: Number, value: -1 },
      soap:          { type: Object, value: null },
      pingTimeout:   { type: Object, value: null },
      token:         { type: String, value: null },
      requests:      { type: Array, value: function () { return []; } },
      loadingWSDL:   { type: Boolean, value: false },
      WSDLCallbacks: { type: Array, value: function () { return []; } },
      methods:       { type: Object, value: function () { return {}; } },
      // retryCount: { type: Number, value: 3 },
      // tries:      { type: Object, value: function () { return {}; } },
    },

    hasRequest(method, parameters, cb) {
      return this.requestIndex(method, parameters, cb) !== -1;
    },

    requestIndex(method, parameters, cb) {
      var i = 0;
      for (var r of this.requests) {
        if (r.method === method && (!parameters || _.isEqual(parameters, r.parameters)) && (!cb || _.includes(r.callbacks, cb))) {
          return i;
        }
        i++;
      }
      return -1;
    },

    addRequest(method, parameters, cb) {
      var i = this.requestIndex(method, parameters);
      if (i === -1) {
        this.requests.push({
          method:     method,
          parameters: parameters,
          time:       Date.now(),
          callbacks:  [cb],
        });
      }
      else {
        this.requests[i].callbacks.push(cb);
      }
    },

    removeRequest(method, parameters, cb) {
      var i = this.requestIndex(method, parameters, cb);
      if (i !== -1) {
        this.requests.splice(i, 1);
      }
    },

    callCallbacks(method, parameters, cb, err, res) {
      var callbacks = [];
      var i = this.requestIndex(method, parameters);
      if (i !== -1) {
        callbacks = _.clone(this.requests[i].callbacks);
        this.removeRequest(method, parameters);
      }
      if (!_.includes(callbacks, cb)) {
        callbacks.push(cb);
      }
      for (var c of callbacks) {
        c(err, res);
      }
    },

    getWSDL(url, cb) {
      var that = this;
      var e = null;
      if (this.app && this.app.name) {
        e = gsked.app.endpoints.findEndpoint(this.app.name);
        if (e) {
          url = e.url;
        }
      }
      else if (this.name) {
        e = gsked.app.endpoints.findEndpoint(this.name);
        if (e) {
          url = e.url;
        }
      }
      if (!this.loadingWSDL) {
        console.log('SOAP:', 'retrieving WSDL for', url, '...');

        this.WSDLCallbacks.push(cb);
        this.loadingWSDL = true;

        window.soap.createClient(url, function (err, soap) {
          // console.log(err, soap);
          if (err) {
            err = new gsked.WebError(err);
          }
          else {
            var services = soap.wsdl.definitions.bindings;
            var complexTypes = _.get(soap.wsdl.definitions.schemas, [soap.wsdl.definitions.$targetNamespace, 'complexTypes'], {});
            for (var name in complexTypes) {
              if (name.endsWith('_req')) {
                var args = {};
                for (var a of _.get(complexTypes, [name, 'children', 0, 'children'], [])) {
                  args[a.$name] = {
                    type:     a.$type,
                    required: a.$nillable !== 'true',
                  };
                }
                that.methods[name.substr(0, name.length - 4)] = args;
              }
            }

            var u = null;
            services = soap.wsdl.definitions.services;
            for (var serviceName in services) {
              for (var portName in services[serviceName].ports) {
                u = URI(services[serviceName].ports[portName].location);
                break;
              }
              if (u) {
                break;
              }
            }
            if (u) {
              var ur = URI(gsked.app.endpoints.url).resource(u.resource()).toString();
              soap.setEndpoint(ur);
              that.url = ur;
              console.log('SOAP:', 'Using endpoint ', ur);
            }
            else {
              that.url = url;
            }
          }

          that.loadingWSDL = false;
          that.soap = soap;

          for (var c of that.WSDLCallbacks) {
            c(err, soap);
          }

          that.WSDLCallbacks = [];
        });
      }
      else {
        this.WSDLCallbacks.push(cb);
      }
    },

    isClientReady() {
      return this.soap !== null && !_.isUndefined(this.soap) && !this.loadingWSDL;
    },

    ping(cb) {
      var that = this;
      this.invoke('ping', {}, function (err, res) {
        if (!err && res.ok) {
          gsked.globals.offline = res.offline;
          gsked.globals.elapsed = res.elapsed;
          clearTimeout(that.pingTimeout);
          that.pingTimeout = null;
          if (that.pingDelay !== -1) {
            that.pingTimeout = setTimeout(function () {
              that.ping();
            }, that.pingDelay);
          }
          cb(null);
        }
        else if (!res.ok) {
          cb(new gsked.WebError(res.status));
        }
        else if (err) {
          cb(new gsked.WebError(err));
        }
      });
    },

    urlChanged(oldVal, newVal) {
      if (oldVal && oldVal !== '' && newVal && newVal !== '') {
        this.getWSDL(newVal, function (err, soap) {
        });
      }
    },

    pingDelayChanged(oldVal, newVal) {
      clearTimeout(this.pingTimeout);
      this.pingTimeout = null;
      if (newVal !== -1) {
        var that = this;
        this.pingTimeout = setTimeout(function () {
          that.ping();
        }, newVal);
      }
    },

    error(err, retry, errorless) {
      var e = null;
      if (_.isNumber(err)) {
        e = new gsked.WebError(err);
        gsked.error(e, err === 409 || retry === true, errorless);
      }
      else if (_.isString(err)) {
        if (Polymer.globalsManager.globals.messages[err]) {
          err = Polymer.globalsManager.globals.messages[err];
        }
        e = new Error(err);
        gsked.error(e, retry === true, errorless);
      }
      else if (err instanceof gsked.WebError) {
        e = err;
        gsked.error(e, false, errorless);
      }
      else if (err instanceof Error) {
        e = err;
      }
      else if (!err || _.isUndefined(err)) {
        e = new Error('Unknown error');
        gsked.error(e, false, errorless);
      }
      return e;
    },

    invoke(method, parameters, cb, options, extraHeaders, forceRequest) {
      var errorless = gsked.globals.isSecure && method === 'login';

      if (_.isFunction(parameters)) {
        cb = parameters;
        parameters = {};
      }

      var that = this;
      if (!this.isClientReady()) {
        if (this.url) {
          this.getWSDL(this.url, function (err, soap) {
            if (!err) {
              that.invoke(method, parameters, cb);
            }
            else {
              return cb(that.error(err, false, errorless), {});
            }
          });
        }
        else {
          return cb(that.error(404, false, errorless), {});
        }
      }
      else {
        var ok = false;
        if (this.hasRequest(method, parameters)) {
          // return cb(that.error(409, false, errorless), {});
          ok = true;
        }

        this.addRequest(method, parameters, cb);

        // with file upload system we need now to be able to send the same request several times
        if (ok && !forceRequest) {
          return true;
        }

        if (!this.soap[method]) {
          return that.callCallbacks(method, parameters, cb, that.error('method ' + method + ' not found in "' + (this.app ? this.app.name : this.name) + '"', false, errorless), {});
        }

        gsked.log(['SOAP', 'EXEC'], method, parameters);

        this.soap[method](parameters, function (err, response) {
          if (err) {
            return that.callCallbacks(method, parameters, cb, that.error(err, false, errorless), {});
          }
          else {
            if (response && response.item && response.item.response) {
              gsked.app.offline = false;
              gsked.app.elapsed = 0;

              // check error here
              // if server error, handle here else pass it back

              var s = response.item.response;
              gsked.log(['SOAP', 'RESPONSE'], method, s);

              var r = {};
              try {
                r = CircularJSON.parse(s);
                if (!r.success) {
                  if (r.error) {
                    return that.callCallbacks(method, parameters, cb, that.error(new gsked.WebError(r.error.code, r.error.message, r.error.label), false, errorless), {});
                  }
                  return that.callCallbacks(method, parameters, cb, that.error(500, false, errorless), {});
                }
                if (!r.data) {
                  r.data = {};
                }
                // if (r.data.token) {
                  // if (!that._isTokenValid(r.data.token)) {
                    // return cb(that.error("Response token does not match request", false, errorless), {});
                  // }
                // }
                return that.callCallbacks(method, parameters, cb, null, _.extend(r.data, r.validation ? { _validation: r.validation } : {}));
              }
              catch (err) {
                return that.callCallbacks(method, parameters, cb, that.error(err, true, errorless), {});
              }
            }

            return that.callCallbacks(method, parameters, cb, that.error(404, false, errorless), {});
          }
        }, options, extraHeaders);
      }
    },

  };

