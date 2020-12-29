// Somewhere within Node.js lives a module called "http", and we make use of it in our code by requiring it and assigning the result to a local variable

var http = require('http');

// url provides methods that allows us extract diferent paths of the url (requested path and query string)
// query string is used to parse the url's query for request parameters
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received');
        route(pathname, handle, response, request);
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start;

// Making a code a module means we export the functionality of that code that we want to provide to scripts that require our code