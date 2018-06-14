
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Language } from './scripts/get-language.js';
import './login.js';
import './shared-styles.js';

class Home extends PolymerElement {
  static get template() {
    return html`

    <style include="shared-styles">
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 300px;
      margin: auto;
      text-align: center;
      font-family: arial;
    }
    .name {
     color: #0070ff;
   }

   .user-title{
     text-align:center
   }

   </style>


   <h2 class="user-title">User</h2>

   <div class="card">
   <div class="circle"></div>
   <h1 class="name">Nom : [[username]] </h1>
   <p class="lang">Langue préferée : [[lang]] </p>
   <p class="token">Token : [[token]] </p>
   <button type="button" on-click="logoutUser">Logout</button>  
   <button type="button" on-click="listAllMethods">See api</button> 
   <button type="button" on-click="setContext">setContext</button> 
   <!-- <paper-button on-click="logoutUser">Logout</paper-button> -->   
   </div> 
   `;
 }


 static get properties() {

  return {
   tk: { type: String },
   lang: { type: String },
   username: { type: String }
 };   
} 

constructor() {
  super();   
  this.token = this.getToken();
  this.lang = new Language().returnLanguage;
  this.username = this.getVars()["name"];
}   

getVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = decodeURIComponent(value);
  });
  return vars;
}


getToken(){
  let tk = {};

      let url = window.location.href; // retrieve url including token
      let carac = '\=(.*)&';             // define the regex
      let match = url.match(carac); 
      // Avoid the calling of empty object at the login.js
      if(match){
        tk = match[1];      
        return tk ;  
      }else{
        tk = {};
      }          
    }


listAllMethods(){
 let url = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=gadmin;version=1.0";
 soap.createClient(url, function(_, soap){
  console.log('API methods', soap);
 })
}

/*setContext(){
  let url = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1";
  soap.createClient(url ,function(_, Soap) {          
          console.log('VVV', Soap);
            soap.set_context({'token': 'cbdf30a2-a14e-4251-b1af-06033ba8dcbf&,cbdf30a2-a14e-4251-b1af-06033ba8dcbf' }, function(err, result){
              console.log('HEREEEE', result);
            if(err){
              console.log('Err', err);
             }else{
              console.log('GGGGGG :', result);
             }
           })  // setContext           
        })
}*/


logoutUser(){ 

let url = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1";
let token_id = this.token;

soap.createClient(url, function(_, soap) {      
  soap.logout({'token': token_id} , function(err, result){
    console.log('Kill the token',result);
    if(err){
      console.log('Err', err);
    }else{                 
      /*setTimeout(function(){ 
       window.location.href = './login'
       }, 1000);  */
      } 
    })
   }) 
  } // logout 


 }  


  window.customElements.define('my-home', Home);
