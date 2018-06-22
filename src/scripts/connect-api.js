
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class CreateConnexion {
	constructor(url){
		this.url = url;
	}

	async connexion() {
		let result = await this.makeConnexion();
		return result;
	}

	makeConnexion(){
		return new Promise(resolve => {
		window.soap.createClient(this.url, function(err, Soap){
			 resolve(Soap);
			})
		})
	}
}