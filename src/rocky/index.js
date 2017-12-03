// Rocky.js
var rocky = require('rocky');

// Global object to store fact string
var factString;

/*
function drawFibb(ctx, screenHeight, screenWidth){
	var newFib = 1 * 15;
	
	ctx.strokeStyle = 'blue';
	
	// rect 1
	ctx.strokeRect(screenWidth/2, screenHeight/2, newFib, newFib);
	val oldFib = 1;
	
	// rect 2
	ctx.strokeRect(screenWidth/2 - newFib, screenHeight/2, newFib, newFib);
	
	// rect 3
	fibbVal = 2 * 15;
	ctx.strokeRect(screenWidth/2 - fibbVal)
	
	return;
}
*/

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
	ctx.fillStyle = 'blue';
	var width = ctx.canvas.clientWidth;
	var height =  ctx.canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

	// Draw fibb spiral
	//drawFibb(ctx, height, width);
	
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
