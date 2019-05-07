"use strict";

/**
 * Creates the URL path to view. Is this vulnerable to path traversal?
 * Seems fs is not?
 * 
 * @param {string} url: Request URL including the initial /. 
 * @returns concats "views" + url.
 */
const getViewUrl = (url) => {
    return `views${url}.html`;
};

const port = 3000,
    http = require("http"),
    fs = require("fs");

const routeMap = {
    "/": "views/index.html"
};

http
    .createServer((req, res) => {
        let viewUrl = getViewUrl(req.url);
        console.log(viewUrl);
        fs.readFile(viewUrl, (error, data) => {
            // If file is not found return 404.
            if (error) {
                res.writeHead(404, {
                    "Content-Type": "text/html"
                });
                res.end("<H1>File not found!</H1>");
            }
            // Otherwise return the file.
            // e.g. http://localhost:3000/index
            // index.html will not work.
            // There's no need for else here, res.end closes the response.
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end(data);
        });
    })
    .listen(port);

console.log(`Server started on port ${port}`);