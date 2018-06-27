import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import { CreateConnexion } from '../scripts/connect-api.js';
import { Counter } from '../scripts/counter.js';
import { Language } from '../scripts/get-language.js';

export class Session extends PolymerElement{
  static get template() {
    return html`
    <!-- <button id="myButton">Click Me</button>  -->
    `;
  }

  static get properties(){
    return {
      startTime: { type: String },
      timeSpent: { type: String },
      event: {type: String },

    }
  } 

  constructor(){    
    super();
  }

  ready() {
    super.ready();
    // this.$.myButton.addEventListener('click', e => { this._handleClick(e)});     
  }

  // Handle the event from browser or device activities

  _handleClick(e) {    
    this.event = e.type;
    console.info(this.event + ' is the event.');    
    /*if(this.event){
      console.log('Event');
      // call the reset Timer
    }else{
      console.log('No Event');
      // call the Timer
    }*/
    
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

  startEventsMonitoring() {                        
    window.addEventListener('mousedown', e => { this._handleClick(e) });
    window.addEventListener('mousemove', e => { this._handleClick(e) });
    window.addEventListener('mouseup', e => { this._handleClick(e) });
    window.addEventListener('mousewheel', e => { this._handleClick(e) });
    window.addEventListener('pointerdown', e => { this._handleClick(e) });
    window.addEventListener('pointermove', e => { this._handleClick(e) });
    window.addEventListener('pointerup', e => { this._handleClick(e) });
    window.addEventListener('touchstart', e => { this._handleClick(e) });
    window.addEventListener('touchmove', e => { this._handleClick(e) });
    window.addEventListener('touchend', e => { this._handleClick(e) });
    window.addEventListener('touchcancel', e => { this._handleClick(e) });
    window.addEventListener('keydown', e => { this._handleClick(e) });
    window.addEventListener('keyup', e => { this._handleClick(e) });  
    window.addEventListener('input', e => { this._handleClick(e) });
    window.addEventListener('scroll', e => { this._handleClick(e) });  
  }

  // Stop listening for events

  stopEventsMonitoring () {
    window.removeEventListener('mousedown', e => { this._handleClick(e) });
    window.removeEventListener('mousemove', e => { this._handleClick(e) });
    window.removeEventListener('mouseup', e => { this._handleClick(e) });
    window.removeEventListener('mousewheel', e => { this._handleClick(e) });
    window.removeEventListener('pointerdown', e => { this._handleClick(e) });
    window.removeEventListener('pointermove', e => { this._handleClick(e) });
    window.removeEventListener('pointerup', e => { this._handleClick(e) });
    window.removeEventListener('touchstart', e => { this._handleClick(e) });
    window.removeEventListener('touchmove', e => { this._handleClick(e) });
    window.removeEventListener('touchend', e => { this._handleClick(e) });
    window.removeEventListener('touchcancel', e => { this._handleClick(e) });
    window.removeEventListener('keydown', e => { this._handleClick(e) });
    window.removeEventListener('keyup', e => { this._handleClick(e) });
    window.removeEventListener('input', e => { this._handleClick(e) });
    window.removeEventListener('scroll', e => { this._handleClick(e) }); 
  }


}
window.customElements.define('my-session', Session);