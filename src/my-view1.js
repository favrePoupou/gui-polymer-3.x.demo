import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MyView1 extends PolymerElement {

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">View 1</div>
        <h1>Contrats</h1>
        <p>Modus commodo minimum eum te, vero utinam assueverit per eu.</p>
        <p>Ea duis bonorum nec, falli paulo aliquid ei eum.Has at minim mucius aliquam, est id tempor laoreet.Pro saepe pertinax ei, ad pri animal labores suscipiantur.</p>
      </div>
    `;
  } 
}  

window.customElements.define('my-view1', MyView1);



// Pass data between multiple pages in polymer : https://medium.com/@fyzaparviz/communication-in-polymer-1dc945a4d2ab