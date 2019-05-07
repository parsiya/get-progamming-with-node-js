"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

app.on("request", (req, res) => {
    // Start body.
    let postBody = [];
    let completeBody = "";

    // Event that triggers when POST body has data.
    req.on("data", (bodyChunk) => {
        postBody.push(bodyChunk);
    });

    // Event that triggers when POST body data finishes.
    req.on("end", () => {
        completeBody = Buffer.concat(postBody).toString();
        console.log(`Request Body Contents: ${completeBody}`);

        res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
        });

        // Echo the body.
        let responseMessage = "<h1>This will show on the screen.</h1>";
        res.end("<h1>This will show on the screen.</h1></br>" + completeBody);
    });

    // Get info about the request.
    console.log(req.method);
    console.log(req.url);
    console.log(JSON.stringify(req.headers, null, 2));

    // We could try returning the body in the response but it's triggered before
    // both events so we cannot for now.

    // Maybe we can use this to delay the response which means we might have time
    // to gather the data completely before sending it out.
    // responseMessage += "</br>" + completeBody + "</br>";
    // setTimeout(() => res.end(responseMessage), 2000);
    // Timeout also does not work. The solution is to do it inside req.on("end").
});

app.listen(port);
console.log(`Server started on port number: ${port}`);