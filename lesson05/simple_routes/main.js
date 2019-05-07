"use strict";

// Routes.
const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us here</h1>",
  "/error": "<h1>Sorry the page you are looking for is not here.</h1>",
  "generic": "<h1>Welcome!</h1>",
};

const port = 3000,
  http = require("http"),
  app = http.createServer();

app.on("request", (req, res) => {

    // Get info about the request.
    console.log(req.method);
    console.log(req.url);
    console.log(JSON.stringify(req.headers, null, 2));

    res.writeHead(200, {
    "Content-Type": "text/html"
    });

    if (routeResponseMap[req.url]) {
    res.end(routeResponseMap[req.url]);
    }

    // There's no need to do else here. res.end closes the response.
    res.end(routeResponseMap["generic"]);
});

app.listen(port);
console.log(`Server started on port number: ${port}`);