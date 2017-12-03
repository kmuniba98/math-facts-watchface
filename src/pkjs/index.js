// PebbleKit JS (pkjs)

Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;
  
  // Request math facts
  if (message.fetch) {
      var url = "http://numbersapi.com/" + message.number + "/math";
    
        request(url, 'GET', function(respText) {
          var factReply = respText;
  
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