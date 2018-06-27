import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Language } from './scripts/get-language.js';
import { CreateConnexion } from './scripts/connect-api.js';
import './login.js';
import './shared-styles.js';
import { Counter } from './scripts/counter.js';
import { Session } from './shared/session-manager.js';
import { ModalSession } from './shared/modal-session-lock.js';

export class Home extends PolymerElement {
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
   <button class="btn danger" type="button" on-click="logoutUser">Logout</button>
   <button class="btn info" type="button" on-click="setContext">Set Context</button>  
   <button class="btn success" type="button" on-click="listAllMethods">See Api</button>
   <button class="btn default" type="button" on-click="callApi">Call Api fct</button>   
   <!-- <button class="btn danger" type="button" on-click="lockPage">Lock</button> -->
   </div>  
   <button class="btn default" id="myButton" type="button" on-click="startTime">Start Time</button>   
   <button class="btn default" type="button" on-click="endTime">End Time</button>
   <button class="btn default" type="button" on-click="diffTime">Diff Time</button> 
   <button class="btn default" type="button" on-click="resetTimer">Reset timer</button> 
   <my-counter></my-counter> <!-- Call some component (test) -->
   <my-session></my-session> <!-- Call some component (test) -->
   <my-modalsession></my-modalsession>
   `;
 }


 static get properties() {

  return {
   tk: { type: String },
   lang: { type: String },
   username: { type: String },

 };   
} 


constructor() {
  super();   
  this.token = this.getToken();
  this.lang = new Language().returnLanguage;
  this.username = this.getVars()["name"];
  this.urlGadmin = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=gadmin;version=1.0";
  this.urlDoorman = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=doorman;version=1";
  this.urlGui = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=gui;version=1.0";
  this.urlHelloworld = "http://api.stable.gsked.dev.garda.com/wsdl/v1/?appname=helloworld;version=1.0";
  this.session = new Session();
}   


getVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = decodeURIComponent(value);
  });
  return vars;
}

ready(){
  super.ready();
  this.session.startEventsMonitoring();  // Start listenning activities on the current page  
}

getToken(){
  let tk = {};
    let url = window.location.href;     // retrieve url including token
    let carac = '\=(.*)&';              // define the regex
    let match = url.match(carac); 
                                        // Avoid the calling of empty object at the login.js
    if(match){
      tk = match[1];      
      return tk ;  
    }else{
      tk = {};
    }          
  }

 // Lock the page after 30' without activities 

  lockPage(){
    console.log('Lock is called');
  }

 // List all the method from gadmin after the authentication

  listAllMethods(){ 
    let url = this.urlGadmin; 
    new CreateConnexion(url).connexion().then(function(soap){
     console.log('All Api methods', soap);
   })
  }

 // Test one method from gadmin using the token of the user as parameter 

  callApi(){
     
     let url = this.urlGadmin;
     //let url = this.urlGui;
     //let url = this.urlHelloworld;
     let token = this.token;
     
     new CreateConnexion(url).connexion().then(function(soap){
        //from gadmin
        soap.get_branches({'token': token} , function(err, result){
          if(err){
            console.log('Error', err);
          }else{
            console.log('create_holiday function :',result);
          } 
        })        

         // from gui
        /*soap.get_parent_companies({'token': token} , function(err, result){
          if(err){
            console.log('ERR',err);
          }else{
            console.log('AAAA', result);
          }          
        })*/

        // from helloworld
        /*soap.raise_server_error({'token': token} , function(err, result){
          if(err){
            console.log('ERR',err);
          }else{
            console.log('From HelloWorld', result);
          }          
        })*/


      }) 
   }

  // setContext enable the token to be used for api calling

   setContext(){

     let token = this.token;
     let url = this.urlDoorman;      

     new CreateConnexion(url).connexion().then(function(soap){
        // from doorman
        soap.set_context({'token': token} , function(err, result){
          if(err){
            console.log('Error', err);
          }else{
            console.log('Set_Context function :', JSON.stringify(result));
          } 
        })
      }) 
   }

 // Logout the user on calling the token and redirect to login page

   logoutUser(){ 

    let token = this.token;
    let url = this.urlDoorman; 

    new CreateConnexion(url).connexion().then(function(soap){    
      soap.logout({'token': token} , function(err, result){
        console.log('Kill the token',result);
        if(err){
          console.log('Err', err);
        }else{                 
          setTimeout(function(){ 
           window.location.href = './user'
         }, 1000);  
        } 
      })
    })
  } 


  // Should be activate after 5 sec of no-activity

  startTime(){  

    this.session.startTimer();  
    /*this.session.startEventsMonitoring();
    if(this.session._handleClick() != ''){
      console.log('Some activity');
    }
    else{
      console.log('No activity');
    }*/
    /*this.session.startTimer().then(function(result){
    console.log('startTime', result);
  }) */
}

// Kill the timer

endTime(){  
    this.session.endTimer(); 
   /*this.session.endTimer().then(function(result){
    console.log('End Timer', result);
  })  */   
 }

// Calculate the difference between the starting time of timer and the ending time

 diffTime(){        
  this.session.diffTime();
    /*this.session.diffTime().then(function(result){
    console.log('diffTime', result);
  })*/
}

// Reset the value of the timer

resetTimer(){
  this.session.resetTimer();
  } 


}  

window.customElements.define('my-home', Home);