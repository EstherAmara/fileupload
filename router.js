function route(pathname, handle, response, request) {
    console.log('About to route a request for ' + pathname);
    if(typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        console.log('404. No request handler found for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404!!! No request handler found.');
        response.end();
    }
}

exports.route = route;