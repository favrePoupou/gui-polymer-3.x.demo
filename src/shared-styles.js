
import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
<template>
<style>
.card {
  margin: 24px;
  padding: 16px;
  color: #757575;
  border-radius: 5px;
  background-color: #fff;
  //box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

.circle {
  display: inline-block;
  width: 64px;
  height: 64px;
  text-align: center;
  color: #555;
  border-radius: 50%;
  background: #ddd;
  font-size: 30px;
  line-height: 64px;
}

h1 {
  margin: 16px 0;
  color: #212121;
  font-size: 22px;
}

.btn {
  border: none; /* Remove borders */
  color: white; /* Add a text color */
  padding: 14px 28px; /* Add some padding */
  cursor: pointer; /* Add a pointer cursor on mouse-over */
}

.success {background-color: #4CAF50;} /* Green */
.success:hover {background-color: #46a049;}

.info {background-color: #2196F3;} /* Blue */
.info:hover {background: #0b7dda;}

.warning {background-color: #ff9800;} /* Orange */
.warning:hover {background: #e68a00;}

.danger {background-color: #f44336;} /* Red */ 
.danger:hover {background: #da190b;}

.default {background-color: #e7e7e7; color: black;} /* Gray */ 
.default:hover {background: #ddd;}

.primary {background-color: #190ec7;} /* Grey */ 
.primary:hover {background: #75729e;}




</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
