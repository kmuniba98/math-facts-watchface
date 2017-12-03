// PebbleKit JS (pkjs)

// Makes API call for a math fact
function getMathFact(number) {
	var url = "http://numbersapi.com/" + number + "/math?default=not+found";
	var fact = 'I am here!';
	request(url, 'GET', function(respText) {
		//return 'I am here!';
		//return respText;
		fact = respText;
	});
	return fact;
}

// Makes API call for a trivia fact
function getTriviaFact(number) {
	var url = "http://numbersapi.com/" + number + "/trivia?default=not+found";
	request(url, 'GET', function(respText) {
		return respText;
	});
}

Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;
  
  // Request fact based on the time
  if (message.fetch) {
		// if math fact is not found, use trivia fact
		var url = "http://numbersapi.com/" + message.number + "/math?default=not+found";
		request(url, 'GET', function(respText) {
			var factReply = respText;
			if (respText == 'not found') {
				url = "http://numbersapi.com/" + message.number + "/trivia";
				request(url, 'GET', function(respText) {
								var factReply = respText;
								Pebble.postMessage({
								'factString': factReply
								});
			});
		}
					
			Pebble.postMessage({
				'factString': factReply
			});
		});
  }
});

function request(url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function (e) {
    // HTTP 4xx-5xx are errors:
    if (xhr.status >= 400 && xhr.status < 600) {
      console.error('Request failed with HTTP status ' + xhr.status + ', body: ' + this.responseText);
      return;
    }
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
}