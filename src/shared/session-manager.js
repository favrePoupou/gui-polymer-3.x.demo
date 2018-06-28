import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import { CreateConnexion } from '../scripts/connect-api.js';
import { Counter } from '../scripts/counter.js';
import { Language } from '../scripts/get-language.js';

export class Session extends PolymerElement{
  static get template() {
    return html` 
   <style include="shared-styles">
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
      <input type="password" value="{{ password::input }}"  placeholder="Insérer PIN pour debloquer" name="password" class="required password" id="pin"> 
      <button class="btn primary" type="button" on-click="submit">Ok</button>
      </div>
      </div>

      <span style="font-size:20px;cursor:pointer" on-click="openNav">cache</span>
    `;
  }

  static get properties(){
    return {
      startTime: { type: String },
      timeSpent: { type: String },
      event: {type: String },      
      isActive: { type: Boolean },
      noActive: { type: String },
      password : { type: String },
      }
  } 


  constructor(){    
    super();
   
  }

  ready() {
    super.ready();      
  }

  // Handle the event from browser or device activities

  // store the event and clear it after the reset

  
  _handleEvent(e) {  
  // console.log('LLLL',this.isActive);
    this.event = e.type;
     console.info(this.event + ' is the event.');     
        if(this.event){
      console.log('Do Nothing');
      //this.startEventsMonitoring();
     
    } else{
      console.log('Run timer'); 
      this.isActive = true; 
      if(this.isActive) {
        console.log('IIIII', this.openNav()); 
      }
          
        //this.startTimer(); 
    }   

    // if after 10 sec there is no event catch => start the timer 
    // if the timer pass over 5 minutes => call the lock page and clear the timer
    // the lock page disappear only when the pin is entered and validate => close the lock page

    // if during the 5 minutes of the counter an event occurs => clear the timer (reset)

  }

  // Reset the timer

  resetTimer(){
    console.log('Before reset', this.startTime, this.timeSpent);
    this.startTime ='';
    this.end ='';
    this.timeSpent ='';
    console.log('RESET done', this.startTime, this.timeSpent );
  }

 // Start the timer

  startTimer(){
    this.startTime = Date.now();      
    this.timeSpent = Date.now() - this.startTime;
    
      while(this.timeSpent <= 5000){  
        this.timeSpent = this.timeSpent + 1;
        if(this.timeSpent <= 5000){
          console.log('Under 5000',this.timeSpent);

        }
        else{
          console.log('Above 5000');

          
        }
      }     
 }

 // Stop the timer

 endTimer(){   
      let killTimer = this.timeSpent; 
      console.log('Inside endTimer',killTimer);    
  }

 // Calculate the difference between the starting time of timer and the ending time

  diffTime(){
      if(this.end && this.startTime){        
        let timeSpent = this.end - this.startTime;
        while(timeSpent >= 3000){
          this.startTime = this.startTime + 1;
          if(timeSpent >= 3000){
            console.log('> 3000');
            return
          }else{
            console.log('< 3000');
          }
          resolve(timeSpent);
        }   
      }
      else{
        console.log('Not exist');
      }  
  }

  
  // Listening for some activities

  // Use the debounce to avoid the mousemove repetition event

  startEventsMonitoring() {                        
    window.addEventListener('mousedown', e => { this._handleEvent(e) });
    window.addEventListener('mousemove', e => { this._handleEvent(e) });
    window.addEventListener('mouseup', e => { this._handleEvent(e) });
    window.addEventListener('mousewheel', e => { this._handleEvent(e) });
    window.addEventListener('pointerdown', e => { this._handleEvent(e) });
    window.addEventListener('pointermove', e => { this._handleEvent(e) });
    window.addEventListener('pointerup', e => { this._handleEvent(e) });
    window.addEventListener('touchstart', e => { this._handleEvent(e) });
    window.addEventListener('touchmove', e => { this._handleEvent(e) });
    window.addEventListener('touchend', e => { this._handleEvent(e) });
    window.addEventListener('touchcancel', e => { this._handleEvent(e) });
    window.addEventListener('keydown', e => { this._handleEvent(e) });
    window.addEventListener('keyup', e => { this._handleEvent(e) });  
    window.addEventListener('input', e => { this._handleEvent(e) });
    window.addEventListener('scroll', e => { this._handleEvent(e) });    
    return this.isActive = true;
  }

  // Stop listening for events

  stopEventsMonitoring () {
    window.removeEventListener('mousedown', e => { this._handleEvent(e) });
    window.removeEventListener('mousemove', e => { this._handleEvent(e) });
    window.removeEventListener('mouseup', e => { this._handleEvent(e) });
    window.removeEventListener('mousewheel', e => { this._handleEvent(e) });
    window.removeEventListener('pointerdown', e => { this._handleEvent(e) });
    window.removeEventListener('pointermove', e => { this._handleEvent(e) });
    window.removeEventListener('pointerup', e => { this._handleEvent(e) });
    window.removeEventListener('touchstart', e => { this._handleEvent(e) });
    window.removeEventListener('touchmove', e => { this._handleEvent(e) });
    window.removeEventListener('touchend', e => { this._handleEvent(e) });
    window.removeEventListener('touchcancel', e => { this._handleEvent(e) });
    window.removeEventListener('keydown', e => { this._handleEvent(e) });
    window.removeEventListener('keyup', e => { this._handleEvent(e) });
    window.removeEventListener('input', e => { this._handleEvent(e) });
    window.removeEventListener('scroll', e => { this._handleEvent(e) }); 
    return this.isActive = false;
  }

  submit(){
    let password = this.password; 
    let pin = '12345';    // This value should be dynamic and retrieve from server

    if(password == pin){  
      this.closeNav();
      this.clearForm();     
    }
    else{   
      alert('Pin is not good, Try again !!!');
      this.clearForm();
    }
  }

  clearForm(){
    this.password ='';
  }

  openNav() {
    console.log('Inside openNav');
    this.$.myNav.style.width = "100%";
  }

  closeNav() {
    this.$.myNav.style.width = "0%";
  }


}
window.customElements.define('my-session', Session);