
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Counter {
	constructor(){
		
	}

	async countLock() {
		let result = await this.countTime();
		return result;		
	}

	countTime(){	
		return new Promise(resolve => {
			let now = new Date();
			resolve(now);
		})	
	}
}
