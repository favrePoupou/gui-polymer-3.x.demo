import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Language {
	constructor(){}

 	 get returnLanguage(){
 	 	return this.findLanguage();
 	 }	 

 	 findLanguage(){
		 let language = navigator.language || navigator.userLanguage;
		 return language;   
	}
}