/**
 * Contains the routing functionality.
 */

"use strict";

const utils = require("./utils");

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
            utils.sendErrorResponse(res);
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

// Routes.
const routes = {
    "GET": {},
    "POST": {}
};