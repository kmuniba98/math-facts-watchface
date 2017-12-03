// Rocky.js
var rocky = require('rocky');

// Global object to store fact string
var factString;

rocky.on('minutechange', function(event) {
  // get string parameter
  var d = new Date();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var number = hour.toString() + minute.toString();
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
  var d = new Date();

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
  ctx.fillText(d.getHours() + ":" + d.getMinutes(), ctx.canvas.unobstructedWidth / 2, 2);

  // Draw the conditions (before clock hands, so it's drawn underneath them)
  if (factString) {
      // Draw the text, top center
      ctx.fillStyle = 'lightgray';
      ctx.textAlign = 'center';
      ctx.font = '14px Gothic';
    
      
     var formattedString = factString.substring(0,factString.length/2) + '\n'
                                                + factString.substring(factString.length/2 + 1, factString.length);
      ctx.fillText(factString, 80, 0, 144);
      //ctx.fillText(formattedString, ctx.canvas.unobstructedWidth / 2, 4);
  }
});
