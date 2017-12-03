// Rocky.js
var rocky = require('rocky');

// Global object to store fact string
var factString;

/*
function fibonacci(n) {
  if (n < 2){
     return 1;
   }else{
     return fibonacci(n-2) + fibonacci(n-1);
   }
}
*/


function drawSpiral(ctx, xVal, yVal){
  
  var x = xVal; 
  var y = yVal;
  ctx.strokeStyle = 'red';
  
  ctx.strokeRect(x, y, (1*20), (1*20));
  ctx.strokeRect(x, y + (1*20), (1*20), (1*20));
  ctx.strokeRect(x + (1*20), y, (2*20), (2*20));
  //ctx.strokeRect(x, y + (1*20), (3*20), (3*20));
  //ctx.strokeRect(x - fibonacci(5), y + fibonacci(4), fibonacci(5), fibonacci(5));
  
	
	return;
}


rocky.on('minutechange', function(event) {
  // get string parameter
  var d = new Date();
  var hour = d.getHours().toString();
  var minute = d.getMinutes().toString();
	if(minute.length == 1){
		minute = "0" + minute;
	}
  var number = hour + minute;
  // Send a message to obtain math fact
  rocky.postMessage({'fetch': true, 'number': number});
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.factString) { // receiving end
    // Save the weather data
    factString = message.factString;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;
  // Clear the screen
	var width = ctx.canvas.clientWidth;
	var height =  ctx.canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

	// Draw fibb spiral
	drawSpiral(ctx, width/2, height/2);
	
	// Draw time
	var d = new Date();
  var hour = d.getHours().toString();
  var minute = d.getMinutes().toString();
	if(minute.length == 1){
		minute = "0" + minute;
	}
	
	var dateString = hour + ":" + minute;
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';
	ctx.font = '32px bold numbers Leco-numbers';
  ctx.fillText(dateString, width/2, 0, width);

  // Draw fact
  if (factString) {
      // Draw the text, top center
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.font = '18px Gothic';
		
      ctx.fillText(factString, width/2, height*(1/3), width); // text is centered around the x-coordinate
  }
});
