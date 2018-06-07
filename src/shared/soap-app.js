/*
@licence
Copyright GardaWorld Inc
*/


import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapApp extends PolymerElement {
  

       static get properties() {
          name:     { type: String, value: '' },
          label:    { type: String, value: '' },
          branches: { type: Array, value: function () { return []; } },

          groupBranches: { type: Array, value: function () { return []; } },

          keepInstance: { type: Boolean, value: true },
        },

        behaviors: [
          gsked.SoapClientBehavior,
        ],

        invoke(method, parameters, cb, options, extraHeaders) {
          if (_.isFunction(parameters)) {
            cb = parameters;
            parameters = {};
          }
          if (!parameters.token && gsked.app.user.token) {
            parameters.token = gsked.app.user.token;
          }
          // if (!parameters.branch && gsked.app.user.branch && gsked.app.user.app === this) {
            // parameters.branch = gsked.app.user.branch.name;
          // }
          gsked.SoapClientBehavior.invoke.apply(this, [method, parameters, cb, options, extraHeaders]);
        },

        load(s) {
          this.name = s.name;
          this.label = s.label;
          this.token = s.token;
          this.branches = {};
          this.groupBranches = s.groupBranches;
          for (var i in s.branches) {
            var b = s.branches[i];
            var branch = document.createElement('soap-branch');
            branch.load(this, b);
            this.branches[branch.name.toLowerCase()] = branch;
          }
          // this.url = window.app.endpoints.findEndpoint(this.name).url;
          this.url = s.url;
        },

        save() {
          var l = {
            name:     this.name,
            label:    this.label,
            url:      this.url,
            token:    this.token,
            branches: {},

            groupBranches: this.groupBranches,
          };
          for (var key in this.branches) {
            var b = this.branches[key];
            l.branches[b.name.toLowerCase()] = b.save();
          }
          return l;
        }
}

window.customElements.define('soap-app', SoapApp);