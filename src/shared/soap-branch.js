/*
@licence
Copyright GardaWorld Inc
*/

      
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapBbranch extends PolymerElement {

        static get properties() {
          app:        { type: Object, value: null },
          name:       { type: String, value: '' },
          label:      { type: String, value: '' },
          apiVersion: { type: Number, value: '1.0.0' },

          keepInstance: { type: Boolean, value: true },
        },

        behaviors: [
          gsked.SoapClientBehavior,
        ],

        invoke (method, parameters, cb, options, extraHeaders, forceRequest) {
          if (_.isFunction(parameters)) {
            cb = parameters;
            parameters = {};
          }
          if (!parameters.token) {
            parameters.token = gsked.app.user.token;
          }
          // if (!parameters.branch) {
            // parameters.branch = gsked.app.user.branch.name;
          // }
          gsked.SoapClientBehavior.invoke.apply(this, [method, parameters, cb, options, extraHeaders, forceRequest]);
        },

        load (app, s) {
          this.app = app;
          this.name = s.name;
          this.label = s.label;
          this.apiVersion = s.apiVersion;
          this.url = s.url;
        },

        save () {
          var l = {
            name:       this.name,
            label:      this.label,
            url:        this.url,
            apiVersion: this.apiVersion,
          };
          return l;
        }
}

window.customElements.define('soap-branch', SoapBbranch);