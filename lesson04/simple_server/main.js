"use strict";

const port = 3333;
var http = require("http");
var httpStatus = require("http-status-codes");

var app = http.createServer((req, resp) => {
    console.log("Received a request");
    resp.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    var responseMessage = "<h1>Hello, Universe!</h1>";
    resp.write(responseMessage);
    resp.end();
    console.log(`Sent a response: ${responseMessage}`);
});

app.listen(port);
console.log(`Server started on port ${port}.`);