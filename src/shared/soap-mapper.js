
/*@licence
Copyright GardaWorld Inc
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class SoapMapper extends PolymerElement {         

       static get properties() {
          mappings: { type: Object, value: function () { return {}; } },

          keepInstance: { type: Boolean, value: true },
        },

        fullpath(context, type, name) {
          return (context + (type ? '.' + type : '') + (name ? '.' + name : '')).toLowerCase();
        },

        get(context, type, name) {
          return _.get(this.mappings, this.fullpath(context, type, name));
        },

        set(context, type, name, value) {
          return _.set(this.mappings, this.fullpath(context, type, name), value);
        },

        has(context, type, name) {
          return _.has(this.mappings, this.fullpath(context, type, name));
        },

        map(m) {
          _.deepExtend(this.mappings, m);
        },

        remove(context, type, name) {
          return _.unset(this.mappings, this.fullpath(context, type, name));
        },

      });
  }

window.customElements.define('soap-mapper', SoapMapper);
