var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);

    if(url.parse(request.url).pathname == '/listings')
    {
      response.write(listingData);
      response.end();
    }

    else{
    //response.statusCode = 404;
    //response.end('Bad gateway error');
    response.writeHead(404, {"Content-Type": "text/plain"}); // sends response header to request
    response.write("Bad gateway error");
    response.end(); // signals that all has been sent . Must be called on each response
  }
  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error.

    HINT: explore the request object and its properties
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */
   server = http.createServer(requestHandler); // creater server and listen  this takes a callback
   //function which in this case is a var that holds the requestHandler on top
   listingData = data; // save data into listingData
   server.listen(port); // listen on port
});
