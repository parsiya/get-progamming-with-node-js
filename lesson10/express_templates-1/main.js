"use strict";

const homeController = require("./controllers/homeController");

const express = require("express"),
    ejs = require("ejs"),
    app = express();

// Tell express we are using ejs.
app.set("view engine", "ejs");

app.use(
    express.urlencoded({
        extended: false
    })
)
    .use(express.json())
    // The vegetable route.
    .get("/items/:vegetable", homeController.veggieController)
    // The logging middleware.
    .use(homeController.loggingMiddleware)
    // POST logger.
    .post("/", homeController.postLogger)
    // GET logger.
    .get("/", homeController.mainPage)
    // sign_up processor.
    .post("/sign_up", homeController.userSignUpProcessor)
    // /name handler.
    .get("/name", homeController.respondWithName);


// Set the port.
app.set("port", process.env.PORT || 3000);

// Start listening.
app.listen(app.get("port"), () => {
    console.log(`The Express.js server started on: ${app.get("port")}`);
});
