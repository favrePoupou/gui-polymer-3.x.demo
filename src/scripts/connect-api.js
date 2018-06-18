
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class CreateConnexion {
	constructor(url){
		this.url = url;
	}

	get connexion() {
		return this.makeConnexion();
	}

	makeConnexion(){	 	
		let methods = {};
		window.soap.createClient(this.url, function(err, Soap){	
			methods = Soap;	
			console.log('API methods', methods);
			
		})
		return this.methods;
	}
}