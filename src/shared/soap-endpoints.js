
/*
@licence
Copyright GardaWorld Inc
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapEndpoints extends PolymerElement {  

       static get properties() {
          list: { type: Object, value: function () { return {}; } },

          keepInstance: { type: Boolean, value: true },
        },

        behaviors: [
          gsked.SoapClientBehavior,
        ],

        setServicesUrl() {
          for (var name in gsked.app.services) {
            var e = this.findEndpoint(name);
            if (e) {
              gsked.app.services[name].url = e.url;
            }
          }
        },

        ready() {
          var doormanUrl = gsked.globals.currentEnvironment().doorman;
          var guiUrl = gsked.globals.currentEnvironment().gui;
          if (doormanUrl && guiUrl) {
            this.list = {
              doorman: {
                name:  'doorman',
                label: 'Doorman',
                url:   URI(this.url).resource(doormanUrl).toString(),
              },
              gui: {
                name:  'gui',
                label: 'gui',
                url:   URI(this.url).resource(guiUrl).toString(),
              },
            };
            this.async(this.setServicesUrl);
          }
          else {
            // Technically, we should never enter here, unless we force it manually in code (for dev purposes)
            var that = this;
            this.retrieveUrls(function (err) {
              if (!err) {
                that.setServicesUrl();
              }
            });
          }
        },

        /**
         * Retrieves the wsdl locations by parsing api endpoint's index page.
         *
         * Note: Such an index page will be available only in development environments.
         * This is not useful at this point, as all wsdl urls currently have the same
         * structure.
         */
        retrieveUrls(cb) {
          var that = this;
          if (!this.url) {
            return cb(new gsked.WebError(404));
          }
          else {
            // superagent.get(url).set('Accept', 'application/json').end(function(err, res) {
            window.superagent.get(this.url, function (err, res) {
              if (err) {
                return cb(new gsked.WebError(err));
              }
              else if (!res.ok) {
                return cb(new gsked.WebError(res.status));
              }
              else {
                that.list = {};
                var wrapper = document.createElement('div');
                wrapper.innerHTML = res.text;
                Polymer.dom(wrapper).querySelectorAll('UL a').forEach(function (el) {
                  var href = el.getAttribute('href');
                  var app = /[?\/]appname=([^;]*)/i.exec(href)[1];
                  that.list[app] = {
                    name:    app,
                    label:   el.textContent,
                    version: /^\/wsdl\/v([0-9]+)/i.exec(href)[1],
                    url:     URI(that.url).resource(href).toString(),
                  };
                });
                cb(null);
              }
            });
          }
        },

        findEndpoint(name, apiVersion) {
          var v = this.list[name.toLowerCase()];
          if (v && (!apiVersion || v.version === apiVersion)) {
            return v;
          }
          return null;
        }
}

window.customElements.define('soap-endpoints', SoapEndpoints);