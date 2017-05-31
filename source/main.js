var style = require('./css/globalStyle.scss');


var msg = require('./messages');
import img1_tag from './image';

import {multiply} from './mathStuff';

var first_message = ()=> (`<p>${msg.hi} bla bla123 ${msg.event}</p>`);

var new_message = ()=> (`
		${multiply(3,3)} ${first_message()}
	`);

function hello(){
	console.log('hello world');
	var app = document.getElementById('app');
	app.innerHTML = new_message();
}

/* first entry function */
hello();


if(module.hot){
	module.hot.accept();
}
