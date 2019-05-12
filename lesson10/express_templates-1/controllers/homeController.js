"use strict";

// Vegetable route controller.
exports.veggieController = (req, res) => {
    res.send(`This is the page for ${req.params.vegetable}.`);
};

// Logging middleware.
exports.loggingMiddleware = (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    console.log(req.query);
    next();
};

// POST controller.
exports.postLogger = (req, res) => {
    console.log(req.body);
    // This will be empty.
    // console.log(req.query);
    res.send("POST successful.");
};

// Main page.
exports.mainPage = (req, res) => {
    res.send("<h1>Main page!</h1>");
};

// Sign-up processor.
exports.userSignUpProcessor = (req, res) => {
    console.log(req.body);
    res.send("Sign-up successful!");
};

// /name handler.
exports.respondWithName = (req, res) => {
    res.render("name");
};