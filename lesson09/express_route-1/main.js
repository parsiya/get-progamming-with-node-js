"use strict";

const port = 3000,
    express = require("express"),
    app = express();

app.get("/items/:vegetable", (req, res) => {
    res.send(`This is the page for ${req.params.vegetable}.`);
})
    .get("/", (req, res) => {
        res.send("<h1>Main page!</h1>");
    })
    .listen(port, () => {
        console.log(`The Express.js server started on: ${port}`);
    });