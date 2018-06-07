
/*@licence
Copyright GardaWorld Inc
*/

      
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapCall extends PolymerElement {


      static get properties() {
          method:        { type: String },
          parameters:    { type: Array },
          cb:            { type: Object, value: null },
          hostElements:  { type: Array, value: function () { return []; } },
          _done:         { type: Boolean, value: false },
          _cancel:       { type: Boolean, value: false },
          noIdUpdate:    { type: Boolean, value: false },
          noNotifyPaths: { type: Boolean, value: false },
          noEndEdit:     { type: Boolean, value: false },
          noValidation:  { type: Boolean, value: false },

          /** Controls the triggering of edit-*-done events */
          noEditDone: { type: Boolean, value: false },
        },

        listeners: {
          'validation-cancelled': '_onEditCancelled',
          'validation-confirmed': '_onEditConfirmed',
        },

        /**
         * Validation events fired to gsked.app top level.
         * If validation is set, invoke method will send validation notifications
         * to control validation dialog.
         *
         * @event validation-started
         * @event validation-received
         * @event validation-ended
         */

        /**
         * Fired to gsked.app top level once a standard create/update/delete method has been
         * completed. Will not be triggered if noEditDone is set.
         *
         * @event edit-create-done
         * @event edit-update-done
         * @event edit-delete-done
         */

         /**
         * Fired to gsked.app top level when a standard create/update/delete method is
         * cancelled.
         *
         * @event edit-create-cancel
         * @event edit-update-cancel
         * @event edit-delete-cancel
         */

        has(uniqueId) {
          for (var el of this.hostElements) {
            if (el.uniqueId && el.uniqueId() === uniqueId) {
              return el;
            }
          }
          return null;
        },

        invoke() {
          var that = this;
          for (var el of this.hostElements) {
            if (!_.isFunction(el.isLoading)) {
              el.isLoading = true;
            }
          }
          if (!this.noValidation) {
            gsked.app.fire('validation-started');
          }
          var trimmedParameters = _.mapValues(this.parameters, function (o) {
            return _.isString(o) ? _.trim(o) : o;
          });
          gsked.app.user.invoke(this.method, trimmedParameters, function (err, res) {
            for (var el of that.hostElements) {
              if (!_.isFunction(el.isLoading)) {
                el.isLoading = false;
              }
            }
            if (res._validation) {
              gsked.app.fire('validation-received', { soapCall: that, err: err, res: res, validation: res._validation, method: that.method });
            }
            else {
              if (!that.noValidation) {
                gsked.app.fire('validation-ended');
              }
              that.done(err, res);
            }
          });
        },

        _onEditCancelled: function (event, eventData) {
          this.cancel();
        },

        _onEditConfirmed: function (event, eventData) {
          this.done(eventData.err, eventData.res);
        },

        isCreate: function () {
          return _.startsWith(this.method, 'create_');
        },

        isUpdate: function () {
          return _.startsWith(this.method, 'update_');
        },

        isDelete: function () {
          return _.startsWith(this.method, 'delete_') || _.startsWith(this.method, 'remove_');
        },

        actionName: function () {
          if (this.isCreate()) {
            return 'create';
          }
          else if (this.isUpdate()) {
            return 'update';
          }
          else if (this.isDelete()) {
            return 'delete';
          }
          else {
            return '';
          }
        },

        eventName(done) {
          var n = this.actionName();
          return 'edit-' + n + '-' + (done ? 'done' : 'cancel');
        },

        notifyPaths(obj, field, res, creation) {
          if (creation && !_.isBlank(res.id) && !this.noIdUpdate) {
            obj[field].id = res.id;
          }

          var prop;

          var oldProps = _.keys(obj[field]);
          for (prop of oldProps) {
            if (res[prop] === undefined) {
              obj.notifyPath(field + '.' + prop, obj[field][prop]);
            }
            else {
              obj.set(field + '.' + prop, res[prop]);
            }
          }

          var newProps = _.difference(_.keys(res), _.keys(obj[field]));
          for (prop of newProps) {
            obj.set(field + '.' + prop, res[prop]);
          }

          obj.notifyPath(field, obj[field]);

          return obj[field];
        },

        done(err, res) {
          var creation = this.isCreate();
          var data = this.parameters;

          if (creation && !_.isBlank(res.id)) {
            this.parameters.id = res.id;
          }

          for (var el of this.hostElements) {
            if (err) {
              if (el.enable) {
                el.enable();
              }
              if (el.applyErrors) {
                el.applyErrors(this.actionName());
              }
            }

            else {
              if (this.parseResponse) {
                res = this.parseResponse(res);
              }
              if (creation && !_.isBlank(res.id) && !this.noIdUpdate) {
                el.created = false;
                var idfield = el.querySelector('*[field][unique-id]');
                if (idfield) {
                  idfield.setFieldValue(res.id);
                }
              }

              if (!this.noNotifyPaths) {
                if (el.dataHost) {
                  if (el.dataHost.item) {
                    data = this.notifyPaths(el.dataHost, 'item', res, creation);
                  }
                  else if (el.dataHost.data) {
                    data = this.notifyPaths(el.dataHost, 'data', res, creation);
                  }
                }
                else if (el.item) {
                  data = this.notifyPaths(el, 'item', res, creation);
                }
                else if (el.data) {
                  data = this.notifyPaths(el, 'data', res, creation);
                }
              }

              var d = el.$$('#popupDialog');
              if (!d || !d.opened) {
                if (el.editEnd && !this.noEndEdit) {
                  el.editEnd();
                }
              }
            }
          }

          if (!this.noEditDone) {
            gsked.app.fire(this.eventName(true), { err: err, res: res, method: this.method, data: data });
          }

          this._done = true;

          this.hostElements = [];

          gsked.runCallback(this.cb, res)(err);
        },

        cancel() {
          for (var el of this.hostElements) {
            if (el.enable) {
              el.enable();
            }
          }

          this.hostElements = [];

          gsked.app.fire(this.eventName(false), { err: null, res: null, method: this.method, data: this.parameters });

          this._cancel = true;

          gsked.runCallback(this.cb)({ canceled: true });
        }

        }

window.customElements.define('soap-call', SoapCall);

