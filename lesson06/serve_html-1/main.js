"use strict";

const port = 3000,
    http = require("http"),
    fs = require("fs");

const routeMap = {
    "/": "views/index.html"
};

http
    .createServer((req, res) => {
        if(routeMap[req.url]) {
            fs.readFile(routeMap[req.url], (error,data) => {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });
                res.write(data);
                // Why not use res.end(data); ?
                res.end();
            });
        } else {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });    
            res.end("<h1>Sorry, not found<h1>");
        }
    })
    .listen(port);

console.log(`Server started on port ${port}`);