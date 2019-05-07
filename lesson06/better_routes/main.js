"use strict";

const port = 3000,
    http = require("http"),
    router = require("./router"),
    processor = require("./processor");

// Setup routes.
router.get("/", (req, res) => {
    router.setContentType(res, "html");
    processor.customReadFile(res, "views/index.html");
});

router.get("/index.html", (req, res) => {
    router.setContentType(res, "html");
    processor.customReadFile(res, "views/index.html");
});

router.post("/", (req, res) => {
    router.setContentType(res, "plain");
    res.end("POSTED");
});

http
    .createServer(router.handle)
    .listen(port);
console.log(`Server started on port ${port}`);