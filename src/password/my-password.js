import {PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `my-password`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MyPassword extends PolymerElement {
  static get template() {
    return `
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'my-password',
      },
    };
  }
}

window.customElements.define('my-password', MyPassword);
