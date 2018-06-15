
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class CreateConnexion {
	constructor(url){
		this.url = url;
	}

 	 get connection() {
 	 	return this.makeConnexion();
 	 }

	 makeConnexion(){	 	
	 	let methods = {};	 	
	 	
	 	window.soap.createClient(this.url, function(_, Soap){	 		
	 		methods = Soap;	 
	 		console.log('API methods from master branch', methods);	
	 		return methods;			 		
	 	})
	 		 	
	 }
}