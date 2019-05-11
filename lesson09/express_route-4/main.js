"use strict";

const homeController = require("./controllers/homeController");

const port = 3000,
    express = require("express"),
    app = express();

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
    // Start listening.
    .listen(port, () => {
        console.log(`The Express.js server started on: ${port}`);
    });
