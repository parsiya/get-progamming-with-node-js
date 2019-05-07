/**
 * Request utils.
 */

"use strict";

const fs = require("fs");

/**
 * Returns the extension URL. Source: https://stackoverflow.com/a/35256860.
 * @param {string} url: Request URL.
 */
const getUrlExtension = (url) => url.split(/\#|\?/)[0].split('.').pop().trim();

/**
 * Reads a file and sends it in the response. Returns error if file is not found.
 * @param {string} path: path to the file.
 * @param {http.ServerResponse} res: Response object passed from server.
 */
const customReadFile = (res, path) => {
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

// Content-Types.
const contentTypes = {
    "html": "text/html",
    "js": "text/js",
    "css": "text/css",
    "png": "image/png",
    "jpg": "images/jpg",
    "plain": "text/plain"
};

// Status codes.
const statusCodes = {
    "OK": 200,
    "NOT_FOUND": 404
};

/**
 * Sets the content-type header for res to contentType.
 * @param {http.ServerResponse} res Response object passed from server.
 * @param {string} contentType "Content-Type" value.
 * 
 * @returns the response object with the content-type header and 200 code.
 */
const setContentType = (res, contentType) => {
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
exports.sendErrorResponse = (res) => {
    // If it does not, return the 404.
    setContentType(res, "html");
    customReadFile(res, "views/error.html");
};

/**
 * serveFile returns a file in the response and autodetects content-type
 * based on extension.
 * @param {http.ServerResponse} res Response object passed from server.
 * @param {string} path path passed from router.
 */
exports.serveFile = (res, path) => {

    // Detect file type based on extension.
    console.log("path: " + path);
    let ext = getUrlExtension(path);

    if (contentTypes[ext]) {
        // If contentType exists, return the file.
        setContentType(res, ext);
        customReadFile(res, path);
    } else {
        // If it does not, return the 404.
        sendErrorResponse(res);
    }
};