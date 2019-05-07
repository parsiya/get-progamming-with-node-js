/**
 * Contains the routing functionality.
 */

"use strict";

// Content-Types.
const contentTypes = {
    "html": "text/html",
    "js": "text/js",
    "css": "text/css",
    "png": "image/png",
    "plain": "text/plain"
};

// Status codes.
const statusCodes = {
    "OK": 200,
    "NOT_FOUND": 404
};

// Routes.
const routes = {
    "GET": {
        "/info": (req, rep) => {
            setContentType(res, "plain");
            res.end("Welcome fo the Info page.");
        }
    },
    "POST": {}
};

/**
 * Sets the content-type header for res to contentType.
 * @param {http.ServerResponse} res Response object passed from server.
 * @param {string} contentType "Content-Type" value.
 * 
 * @returns the response object with the content-type header and 200 code.
 */
exports.setContentType = (res, contentType) => {
    let cType = "";
    if (contentTypes[contentType]) {
        cType = contentTypes[contentTypes];
    } else {
        // Fallback if content-type is not defined.
        cType = "text/html";
    }
    
    res.writeHead(200, {
        "Content-Type": String(cType)
    });
};

/**
 * Create and send a 404 response.
 * @param {http.ServerResponse} res Response object passed from server.
 */
const sendErrorResponse = (res) => {
    res.writeHead(404, {
      "Content-Type": "text/html"
    });
    res.end("<h1>File Not Found!</h1>");
};

/**
 * Handles incoming requests.
 * @param {http.ClientRequest} req Incoming request.
 * @param {http.ServerResponse} res Outoing response.
 */
exports.handle = (req, res) => {
    // Get the route index.
    let idx = routes[req.method][req.url];
    console.log("idx");
    console.log(String(idx));
    try {
        // If route exists, handle it.
        if (idx) {
            idx(req, res);
        } else {
            // Else is needed here eventhough we do res.end in idx.
            // If route does not exist, send 404.
            sendErrorResponse(res);
        }
    } catch (ex) {
        // If error, log and move on.
        console.log("error" + ex);
    }
};

// Register new GET/POST routes.
exports.get = (url, action) => {
    routes["GET"][url] = action;
}

exports.post = (url, action) => {
    routes["POST"][url] = action;
}
