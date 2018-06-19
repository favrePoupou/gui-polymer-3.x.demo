
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { CreateConnexion } from './scripts/connect-api.js';
import { Test } from './scripts/test.js';
import { Language } from './scripts/get-language.js';
import '@polymer/app-route/app-location.js';
import './shared-styles.js';
import './home.js';

export class Login extends PolymerElement {
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

    .error-message {
      display: none;
      color: red;
      text-align: center;
      font-size: .8em;
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
<!-- <iron-image src="/images/logo_en.png"></iron-image>-->
<!-- Solve problem of data binding without using <iron-input> : https://www.webcomponents.org/element/PolymerElements/iron-input/demo/demo/index.html -->
<div class="subscribe-container">
<div class="mc_embed_signup">
<h3>Authentification</h3>
<form>
<div id="mc_embed_signup_scroll">
<div class="mc-field-group">
<input type="text" value="{{ username::input }}" placeholder="Nom utilisateur" name="username" class="required" id="uname">
<!-- <iron-input type="text" value="{{ username::input }}" placeholder="Nom utilisateur" name="username" class="required" id="uname"> -->
</div>
<div class="mc-field-group">
<input type="password" value="{{ password::input }}" placeholder="Mot de passe" name="password" class="required password" id="pwd">
<!-- <iron-input type="password" value="{{ password::input }}" placeholder="Mot de passe" name="password" class="required password" id="pwd""> -->
</div>
<!-- <paper-checkbox>Accepte les conditions</paper-checkbox> -->
<button class="btn success" type="button" on-click="submit">Ok</button>                    
</div>
</form>    
</div>



`;
}


static get properties() {
  return {     
    username : { type: String, value: 'external@example.com'},
    password : { type: String , value: 'testing'}, 
    

// Later on using I18N
_locales: {
  type:  Object,
  value: {
    en: {
      title:    'Authentification …',
      username: 'Username',
      password: 'Password',
      confirm:  'OK',
    },
    fr: {
      title:    'Authentification …',
      username: 'Nom d\'utilisateur',
      password: 'Mot de passe',
      confirm:  'OK',
    },
  }
}
 } // return
} // get properties



constructor() {
  super();    
  this.urlDoorman = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1";  
}


submit(){  
 let username = this.username;
 let password = this.password;  
 let url = this.urlDoorman;

 /* Call the object creating the connection to Soap */
/*  Account available on db for testing the authentication :
    * tester@example.com / testing
    * external@example.com / testing
    */ 

    new CreateConnexion(url).connexion().then(function(soap){
     soap.login({'username': username ,'password': password}, function(err, result) {      
      if(err){
        console.log('Err', err);
      }else{
        let res = JSON.parse(result.item.response);
        let name = res.data.profile.fullname; 
        let token = res.data.token;   
        console.log('Token :', token);
        setTimeout(function(){ 
               window.location.href = './home/'  + 'token_id=' + token + '&' + 'name=' + name; // we pass the token and name as parameter and retrieve it in the 2nd page from the url
             }, 1000); 
      }
    }); 
   })           
  } 
} 

window.customElements.define('my-login', Login);
