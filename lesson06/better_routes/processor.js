/**
 * Request processing module.
 */

"use strict";

const fs = require("fs");

/**
 * Returns the extension URL. Source: https://stackoverflow.com/a/35256860.
 * @param {string} url: Request URL.
 */
const getUrlExtension = (url) => url.split(/\#|\?/)[0].split('.').pop().trim();

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
 * Reads a file and sends it in the response. Returns error if file is not found.
 * @param {string} path: path to the file.
 * @param {http.ServerResponse} res: Response object passed from server.
 */
exports.customReadFile = (res, path) => {
    // console.log(path);
    if (fs.existsSync(path)) {
        console.log("path exists");
        fs.readFile(path, (error, data) => {
        if (error) {
            console.log(error);
            sendErrorResponse(res);
            // No need to return, we are calling res.end() in sendErrorResponse.
        }
        // console.log(data);
        res.end(data);
        });
    } else {
        console.log("path does not exist");
        sendErrorResponse(res);
    }
};
