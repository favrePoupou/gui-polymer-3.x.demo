import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import { CreateConnexion } from '../scripts/connect-api.js';
import { Counter } from '../scripts/counter.js';
import { Language } from '../scripts/get-language.js';

export class ModalSession extends PolymerElement{
  static get template() {
  	 return html` 
  	 <style>
  	 body {
    font-family: 'Lato', sans-serif;
}

.overlay {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0);
    background-color: #d7d7d7;
    overflow-x: hidden;
    transition: 0.5s;
}

.overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
}

.overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.overlay a:hover, .overlay a:focus {
    color: #f1f1f1;
}

.overlay .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
}

@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
  </style>
  	 
	<div id="myNav" class="overlay">
	  <!-- <a href="javascript:void(0)" class="closebtn" on-click="closeNav">&times;</a> -->
	  <div class="overlay-content">
	    <input type="password" value=""  placeholder="Insérer PIN pour debloquer" name="password" class="required password" id="pin"> 
	  </div>
	</div>
	<span style="font-size:20px;cursor:pointer" on-click="openNav">cache</span>

  	 `;
  	}

  	static get properties(){

  	}  

  // Call this function on 

   openNav() {
		    this.$.myNav.style.width = "100%";
		}

   closeNav() {
		    this.$.myNav.style.width = "0%";
		}


  }


  window.customElements.define('my-modalsession' , ModalSession);