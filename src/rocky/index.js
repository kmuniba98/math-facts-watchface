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
  
  ctx.strokeRect(x, y + (1*20), (1*20), (1*20)); // 2
    
  ctx.strokeRect(x, y, (1*20), (1*20)); // 1
  ctx.beginPath();
  ctx.arc(x + (1*20), y - (1*20), (1*20), 0, (0.5*Math.PI), true);
  ctx.stroke();
  
  ctx.strokeRect(x + (1*20), y, (2*20), (2*20)); // 3
  ctx.strokeRect(x, y + (2*20), (3*20), (3*20)); // 4
  ctx.strokeRect(x - (5*20), y, (5*20), (5*20)); // 5
  ctx.strokeRect(x - (5*20), y - (3*20), (8*20), (8*20)); // 6
  ctx.strokeRect(x + (3*20), y - (8*20), (13*20), (13*20));
  //ctx.strokeRect();
  
	
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
	drawSpiral(ctx, width/2, height/2 - 30);
	
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
