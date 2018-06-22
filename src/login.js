
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import '@polymer/app-route/app-location.js';

import { CreateConnexion } from './scripts/connect-api.js';
import { Counter } from './scripts/counter.js';
import { Language } from './scripts/get-language.js';
import { Test } from './scripts/test.js';

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
<h3>Mot de passe</h3>
<div id="mc_embed_signup_scroll">
<div class="mc-field-group">
<!-- <input type="password" value="{{ password::input }}" on-keypress="onpressEnter" placeholder="Insérer votre mot de passe" name="password" class="required password" id="pwd"> -->
<input type="password" value="{{ password::input }}"  placeholder="Insérer votre mot de passe" name="password" class="required password" id="pwd">              
</div>          
<button class="btn primary" type="button" on-click="submit">Se connecter</button>  
<button class="btn default" type="button" on-click="callCounter">Time</button>                   
</div>              
   
</div>
</div>    
`;
}

static get properties() {
  return {     
   username : { type: String }, 
   password : { type: String }
  } 
} 

constructor() {
  super();     
   this.urlDoorman = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1"; 
   this.username = this.getUsername() ;
}

getUsername() {  
  let vars = {};  
  let url = window.location.href;
  let carac = '(?<=name=).*' ;
  let match = url.match(carac);

   if(match){
      vars = match[0];      
      return vars ;  
    }else{
      vars = {};
    } 
}

onpressEnter(e){
  if(e.key === "Enter"){  
  // manage the enter press here
 }          
}

submit(){  

  let url = this.urlDoorman;
  let username = this.username;  
  let password = this.password; 
  
  username = username.replace("-",".");   
  
  new CreateConnexion(url).connexion().then(function(soap){
     soap.login({'username': username ,'password': password}, function(err, result) {      
      if(err){
        console.log('Err', err);
      }else{
        let res = JSON.parse(result.item.response);
        let name = res.data.profile.fullname; 
        let token = res.data.token;   
        console.log('Token :', token);
        soap.set_context({'token': token} , function(err, result){
        if(err){
          console.log('Error', err);
        }else{
          console.log('Set_Context :',result);
        } 
      })        
        setTimeout(function(){ 
               window.location.href = './home/'  + 'token_id=' + token + '&' + 'name=' + name; // we pass the token and name as parameter and retrieve it in the 2nd page from the url
             }, 1000); 
      }
    }); 
   })
}

callCounter(){
 new Counter().countLock().then(function(result){
  console.log('DATE NOW', result);
 })
}

}

window.customElements.define('my-login', Login);
