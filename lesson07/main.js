"use strict";

const port = 3000,
    http = require("http"),
    router = require("./router"),
    utils = require("./utils");

// Create routes.

// Static pages
router.get("/", (req,res) => {
    utils.serveFile(res, "views/index.html");
});

router.get("/index.html", (req,res) => {
    utils.serveFile(res, "views/index.html");
});

router.get("/courses", (req,res) => {
    utils.serveFile(res, "views/courses.html");
});

router.get("/courses.html", (req,res) => {
    utils.serveFile(res, "views/courses.html");
});

router.get("/courses", (req,res) => {
    utils.serveFile(res, "views/contact.html");
});

router.get("/contact.html", (req,res) => {
    utils.serveFile(res, "views/contact.html");
});

// Response to post from contact.
router.post("/", (req,res) => {
    utils.serveFile(res, "views/thanks.html");
});

// Pictures
router.get("/graph.png", (req,res) => {
    utils.serveFile(res, "public/images/graph.png");
});

router.get("/people.jpg", (req,res) => {
    utils.serveFile(res, "public/images/people.jpg");
});

router.get("/product.jpg", (req,res) => {
    utils.serveFile(res, "public/images/product.jpg");
});

// css and js
router.get("/confetti_cuisine.css", (req,res) => {
    utils.serveFile(res, "public/css/confetti_cuisine.css");
});

router.get("/bootstrap.css", (req,res) => {
    utils.serveFile(res, "public/css/bootstrap.css");
});

router.get("/confetti_cuisine.js", (req,res) => {
    utils.serveFile(res, "public/js/confetti_cuisine.js");
});

http.createServer(router.handle)
    .listen(port);
console.log(`Server started on port ${port}`);