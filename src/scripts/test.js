
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export class Test {	

async connexion() {
  console.log('calling');
  	var result = await this.makeConnexion();
  console.log('call 2nd function',result);
  // expected output: "resolved"
  return result;
}

makeConnexion() {
  console.log('call makeConnexion');
	  return new Promise(resolve => {

	    setTimeout(() => {
	      resolve('resolved');
	    }, 2000);

	  });
}

}


/*
// Place it on the front end to make the Test => testing of async await
	   const connect = new Test().connexion();
	   connect.then(function(d){
	   console.log('QQQ', d) ;
  })
  */