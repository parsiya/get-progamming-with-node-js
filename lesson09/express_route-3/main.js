"use strict";

const port = 3000,
    express = require("express"),
    app = express();

app.use(
    express.urlencoded({
        extended: false
    })
)
    .use(express.json())
    // The logging middleware.
    .use((req, res, next) => {
        console.log(`request made to: ${req.url}`);
        console.log(req.query);
        next();
    })
    .post("/", (req, res) => {
        console.log(req.body);
        // This will be empty.
        // console.log(req.query);
        res.send("POST successful.");
    })
    .get("/", (req, res) => {
        res.send("<h1>Main page!</h1>");
    })
    .listen(port, () => {
        console.log(`The Express.js server started on: ${port}`);
    });
