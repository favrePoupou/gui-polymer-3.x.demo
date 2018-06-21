
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/app-route/app-location.js';
import './shared-styles.js';
import './login.js';
import './home.js';

export class User extends PolymerElement {
  static get template() {
    return html` 
    <style include="shared-styles">
    *//* Change placeholder text inside inputs *//*
    ::-webkit-input-placeholder {
      *//* Chrome/Opera/Safari *//*
      color: #d7d7d7;
    }
    ::-moz-placeholder {
      *//* Firefox 19+ *//*
      color: #d7d7d7;
    }
    :-ms-input-placeholder {
      *//* IE 10+ *//*
      color: #d7d7d7;
    }
    :-moz-placeholder {
      *//* Firefox 18- *//*
      color: #d7d7d7;
    }

    body {
      font-family: 'Open Sans', Arial, sans-serif;
      font-size: 16px;
    }

    h3 {
      font-weight: bold;
      font-size: 1.5rem;
      text-align: center;
      color: #303133;
    }

    h4 {
      font-size: 1.2rem;
      color: #3a74cb;
    }

    .subscribe-container {
      text-align: center;
      margin: 2em auto;
      padding: 1em;
      width: 90%;
      max-width: 500px;
      background-color: #fff;
    }

    .mc_embed_signup input.required {
      font-size: 16px;
      border: none;
      border-bottom: 1px solid #d7d7d7;
      margin: 20px 0;
      padding: 5px 20px 5px 10px;
      outline: none;
      width: 100%;
      font-family: 'Open Sans', Arial, sans-serif;
      box-sizing: border-box;
    }

    .mc_embed_signup input#mc-embedded-subscribe {
      background: #3a74cb;
      font-size: .8rem;
      color: #fff;
      border-radius: 40px;
      padding: 12px 35px;
      box-shadow: none;
      outline: none;
      border: none;
      cursor: pointer;
      margin: 4em auto;
      display: block;
      transition: 0.2s ease background;
      font-family: 'Open Sans', Arial, sans-serif;
      font-weight: 700;
    }


    @media screen and (orientation:portrait) {
     img {
      width: 10%;
      height: auto;
    }
    .center {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 40%;
    }
  }
  @media screen and (orientation:landscape) {
   img {
    width: 10%;
    height: auto;
  }
  .center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 20%;
  }
}
</style>  

<img src="/images/logo_en.png" width="1" height="1" class="center"> 
<div class="subscribe-container">
<div class="mc_embed_signup">
<h3>Nom d'utilisateur</h3>
<div id="mc_embed_signup_scroll">
<div class="mc-field-group">
<input type="text" value="{{ username::input }}" on-keypress="onpressEnter" placeholder="Courriel ou telephone" name="username" autocomplete="off" class="required" id="uname">
<!-- <iron-input type="text" value="{{ username::input }}" placeholder="Nom utilisateur" name="username" class="required" id="uname"> -->
</div>          
<button class="btn primary" type="button" on-click="nextStep">Suivant</button>                    
</div>
<paper-checkbox checked="{{liked}}">Se souvenir de moi</paper-checkbox>
<div hidden$="[[!liked]]" class="response">Merci</div> 
</div>
</div>
`;
}

static get properties(){
  return {
   username : { type: String },
 }
}

constructor(){
 super(); 
}



/* replace (.) by (-) Path is not handled correctly when a dot (.) is in path (Polymer issue)
   https://github.com/Polymer/polyserve/issues/147
*/

onpressEnter(e){
  if(e.key === "Enter"){   
   let username = this.username;
   username = username.replace('.','-'); 
   setTimeout(function(){ 
         window.location.href = './login/' + 'name=' + username; 
       }, 0);     
    }
 }


nextStep(){
  let username = this.username;
  username = username.replace('.','-');    
  setTimeout(function(){ 
               window.location.href = './login/' + 'name=' + username; 
             }, 1000);  
  }

} 

window.customElements.define('my-user', User);


//http://localhost:8081/login/name=external@example-com?password=testing

//http://localhost:8081/login/name=external@example-com