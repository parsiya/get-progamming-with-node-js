# Get Programming with Node.js

* https://www.manning.com/books/get-programming-with-node-js
* https://github.com/JonathanWexler/get-programming-with-nodejs/

## "use strict";
Put it at the start of every file, this enables extra checks.

## Format strings
You have seen them before, they are not different.

```js
let x = "whatever";
console.log("Hello %s", x);
```

## Interpolated strings
Same as `Format` in Python.

```js
let x = "whatever";
console.log(`Hello ${x}`);
```

## forEach

```js
messages = ["Hello", "yolo", "polo"];
messages.forEach(msg => console.log(msg));
```

## npm install flags

Where to install:

* `--save` and `-S` install the package as dependency for current package.
* `--global` and `-g` install the package globally to be used everywhere.

How they are included in releases:

* `--save-prod` ends up in prod when package is released.
* `--save-dev` ends up in dev.

## Function parameters or lol WTF
From [w3schools](https://www.w3schools.com/js/js_function_parameters.asp).

Parameter Rules

* Do not specify data types for parameters.
* Do not perform type checking on the passed arguments.
* Do not check the number of arguments received.
  * Missing arguments are `undefined`.
* We have to manually check arguments for `undefined` at the start of the function.

## var vs. let

* `let`: block scoped.
  * Calling a variable delcared with `let` before definition returns an error.
* `var`: function scoped.
  * Calling a variable delcared with `var` returns `undefined`.

## JSON.stringify
Converts to JSON. E.g., `json.Marshal` in Go.

Uses the object's `toJSON()` method if it has any.

Most usage:

* `JSON.stringify(object, null, 2);`
* `2`: Indent with 2 spaces.
  * Also supports strings like `"\t"`.

## ES6 Arrow Functions

* https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/

Create a simple function:

```js
// If this gets confusing, wrap the param in parentheses.
var inc = a => a++;
console.log(inc(10));
// 10
```

Multiple params, wrap them in parentheses. Not needed for single param:

```js
var addFunc = (a, b) => a + b;
console.log(addFunc(10,20));
// 30
```

Use an array for multiple return values just like normal JavaScript:

```js
var addMulFunc = (a, b) => [a+b, a*b];
console.log(addMulFunc(10,20));
// [ 30, 200 ]
```

Multiple lines (aka block body). In this case we have to manually `return`:

```js
var doWhateverFunc = (obj) => {
    ret1 = func1(obj);
    ret2 = func2(obj);
    return ret2
};
```

No parameters:

```js
var noParam = () => {
  // Do something.
  return "whatever";
};
```

## http.createServer()
Make a server:

```js
http = require("http");
app = http.createServer();
app.listen(12340);
```

To process requests:

```js
app.on("request", (req, resp) => {
  // Response header.
  resp.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  // Get info about the request.
  console.log(req.method);
  console.log(req.url);
  console.log(JSON.stringify(req.headers, null, 2));

  // Create response body.
  let responseMessage = "<h1>Main page.</h1>";
  // Finish response body
  resp.end(responseMessage);
});
```

Read POST bodies. To return the body, do it in `req.on("end")`, it will not
work outside.

```js
app.on("request", (req, res) => {
  // Start body.
  var body = [];
  var completeBody = "";
  
  // Event that triggers when POST body has data.
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });

  // Event that triggers when POST body data finishes.
  req.on("end", () => {
    completeBody = Buffer.concat(body).toString();
    console.log(`Request Body Contents: ${completeBody}`);
    // Echo the body.
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
    let responseMessage = "<h1>This will show on the screen.</h1>";
    console.log()
    responseMessage += "</br>" + completeBody + "</br>";
    res.end(responseMessage);
  });

  // Get info about the request.
  console.log(req.method);
  console.log(req.url);
  console.log(JSON.stringify(req.headers, null, 2));
});
```

To delay the response, use `setTimeout`:

```js
setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
```

