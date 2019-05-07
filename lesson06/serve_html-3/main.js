"use strict";

/**
 * Creates the URL path to view. Is this vulnerable to path traversal?
 * Seems fs is not?
 * 
 * @param {string} url: Request URL including the initial /.
 * 
 * @returns concats "views" + url.
 */
const getViewUrl = (url) => {
    return `views${url}.html`;
};

/**
 * Create and send a 404 response.
 * @param {http.ServerResponse} res: Response object passed from server.
 */
const sendErrorResponse = (res) => {
    res.writeHead(404, {
      "Content-Type": "text/html"
    });
    res.end("<h1>File Not Found!</h1>");
};

/**
 * Sets the content-type header for res to contentType.
 * @param {http.ServerResponse} res: Response object passed from server.
 * @param {string} contentType: "Content-Type" value.
 * 
 * @returns the response object with the content-type header and 200 code.
 */
const setContentType = (res, contentType) => {
    res.writeHead(200, {
        "Content-Type": String(contentType)
    });
    // return res
};

/**
 * Reads a file and sends it in the response. Returns error if file is not found.
 * @param {string} path: path to the file.
 * @param {http.ServerResponse} res: Response object passed from server.
 */
const customReadFile = (res, path) => {
    if (fs.existsSync(path)) {
      fs.readFile(path, (error, data) => {
        if (error) {
          console.log(error);
          sendErrorResponse(res);
          // No need to return, we are calling res.end() in sendErrorResponse.
        }
        res.end(data);
      });
    } else {
      sendErrorResponse(res);
    }
};

/**
 * Returns the extension URL. Source: https://stackoverflow.com/a/35256860.
 * @param {string} url: Request URL.
 */
const getUrlExtension = (url) => url.split(/\#|\?/)[0].split('.').pop().trim();


const port = 3000,
    http = require("http"),
    fs = require("fs");

http.createServer((req, res) => {
    let url = req.url;
    // This checks if the URL has ".html" in it. What prevents me from sending
    // "example.net/whatever.html/something" and messing up?
    // if (url.indexOf(".html") !== -1) {

    // Get URL extension.
    let ext = getUrlExtension(req.url);
    console.log("ext");
    console.log(ext);

    switch (ext) {
        case "html":
            setContentType(res, "text/html");
            customReadFile(res, `./views${url}`);
            break;
        case "js":
            setContentType(res, "text/js");
            customReadFile(res, `./public/js${url}`);
            break;
        case "css":
            setContentType(res, "text/css");
            customReadFile(res, `./public/css${url}`);
            break;
        case "png":
            setContentType(res, "image/png");
            customReadFile(res, `./public/images${url}`);
            break;
        default:
            sendErrorResponse(res);
            break;
    }
})
  .listen(port);
console.log(`Server started on port ${port}`);
