
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Counter extends PolymerElement{
	static get template() {
		return html`  
		<style include="shared-styles">
		#countup {
			margin-left: auto;
			margin-right: auto;
			text-align: center;
			font-family: "Lato",Helvetica,Arial,sans-serif;
		}
		#countup p {
			display: inline-block;
			padding: 0px;
			margin: 0;
			font-size:100px;
			line-height: 100px;
			text-align: center;
			
		}
		#countup #seconds, #countup .timeRefSeconds {
			color:red;
		}
		#countup #minutes, #countup .timeRefMinutes {
			color:green;
		}
		#countup #hours, #countup .timeRefHours {
			color:yellow;
		}

		#countup .part {
			display: inline-block;
			text-align: center;
			width: 10%;
		}
		#countup .label p{
			font-size: 30px;
		}

		@media only screen and (max-width: 960px) {

			#countup p {
				font-size: 60px;
				line-height: 60px;
			}
			#countup .label p{
				font-size: 20px;
			}

		}

		@media only screen and (max-width: 500px) {

			#countup p {
				font-size: 45px;
				line-height: 45px;
			}
			#countup .label p{
				font-size: 16px;
			}
		}
		</style> 
		<div id="countup">
			<div class="part">
			  <p id="hours">00</p>
			  <div class="label"><p class="timeRefHours">hours</p></div>
			</div>
			<div class="part">
			  <p id="minutes">00</p>
			  <div class="label"><p class="timeRefMinutes">minutes</p></div>
			</div>
			<div class="part">
			  <p id="seconds">00</p>
			 <div class="label"><p class="timeRefSeconds">seconds</p></div>
			</div>
		</div>

		`;
	} 

	static get properties(){
		return {
			start: { type: String },
			end: { type: String },
			timeSpent: { type: String },
			upTime: { type: Function },
		}
	}


	constructor(){		
		super();		
	}

	
	resetTimer(){
		console.log('Before reset', this.start, this.end);
		this.start ='';
		this.end ='';
		this.timeSpent ='';
		console.log('RESET done', this.start, this.end, this.timeSpent );
	}

	startTimer(){
		let start = Date.now();				
		this.start = start;	
		return new Promise( resolve =>{			
			let start = this.start;
			setTimeout(function(){
				let timeDiff =  Date.now() - start;
				console.log('DIFF', timeDiff);
			},1000);
		})			
	}

	endTimer(){
		return new Promise( resolve =>{	
			let end = Date.now();
			this.end = end;
			console.log('END', this.end);
		})
	}

	diffTime(){
		return new Promise(resolve => {
			let timeSpent = this.end - this.start;
			resolve(timeSpent);
		})	
	}
 
}  

window.customElements.define('my-counter', Counter);
