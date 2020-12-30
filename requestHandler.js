const { join, resolve } = require('path');
var queryString = require('querystring'),
    fs = require('fs'),
    formidable = require('formidable');

    /**
    function start(response) {
        console.log("Request handler 'start' was called.");
        //
            Even if the exec statement takes a long time, it doesn't affect the upload request handler because the start request handler is in a non-blocking format
                exec("ls -lah", function(error, stdout, stderr) {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    response.write(stdout);
                    response.end();
                });
        //
    var body = `
                <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
                    </head>
                    <body>
                        <form action="/upload" method="post">
                            <textarea name="text" rows="20" cols="60"></textarea>
                            <input type="submit" value="Submit text" />
                        </form>
                    </body>
                </html>
            `;
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
    }

    function upload(response, postData) {
        console.log("Request handler 'upload' was called.");    
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('You sent: ' + queryString.parse(postData).text);
        response.end();
    }

    function show(response) {
        console.log("Request handler 'show' was called.");
        response.writeHead(200, {'Content-Type': 'image/png'});
        fs.createReadStream('/tmp/test.png').pipe(response);
    }
 */

function start(response) {
    console.log("Request handler 'start' was called.");
    var body = `
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            </head>
            <body>
                <form action="/upload" enctype="multipart/form-data" method="post">
                    <input type='file' name='upload' multiple='multiple' />
                    <input type="submit" value="Upload file" />
                </form>
            </body>
        </html>
    `;
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}
/**
    function upload(response, request) {
        console.log("Request handler 'upload' was called.");   
        //uses the 'formidable' module
        var form = new formidable.IncomingForm();
        console.log('about to parse');
        form.parse(request, function(error, fields, files) {
            console.log(files.upload.path)
            console.log('parsing done');
            // possible error on windows system when trying to rename an already existing file
            fs.rename(files.upload.path, '/tmp/test.png', (error) => {
                if(error) {
                    // fs.unlink('/tmp/test.png');
                    // fs.rename(files.upload.path, '/tmp/test.png');
                    throw error;
                }
                console.log('rename complete');
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('received image: <br/>');
            response.write("<img src='/show' />");
            response.end(); 
        });
    }
 */

function upload(response, request) {
    console.log("Request handler 'upload' was called");

    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log('parsing done');

        fs.rename(files.upload.path, "test.png", function(error) {
            if(error) {
                fs.unlink("test.png");
                fs.rename(files.upload.path, "test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image: <br />");
        response.write("<img src='/show' />");
        response.end();
    })
    
}
function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {'Content-Type': 'image/png'});
    fs.createReadStream('test.png').pipe(response);
}
exports.start = start;
exports.upload = upload;
exports.show = show;