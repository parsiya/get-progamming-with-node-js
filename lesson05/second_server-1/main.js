"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

app.on("request", (req, resp) => {
    resp.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    console.log(req.method);
    console.log(req.url);
    console.log(JSON.stringify(req.headers, null, 2));

    let responseMessage = "<h1>Main page.</h1>";
    resp.end(responseMessage);
});

app.listen(port);
console.log(`Server started on port number: ${port}`);