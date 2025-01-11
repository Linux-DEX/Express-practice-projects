# Express express() 

## express.json()

- The `express.json()` function is a built-in middleware in express that is used for parsing incoming requests with JSON payload.
- The **express.json middleware** is important for parsing incoming JSON payload and making that data avaiable in the **req.body** or further processing within the routes. 
- Without using express.json, Express will not automatically parse the JSON data in the request body.

**Syntax**
```js
express.json( [options] )
```

**Parameters:** The options parameter has various properties like inflate, limit, type, etc.
**Return Value:** It returns an Object.

### How express.json() works?

The primary function of express.json() is to parse requests with a Content-Type header of application/json. Once parsed, the resulting data is stored in the req.body, allowing easy access to the JSON content sent from the client.

### How to use express.json()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/', function (req, res) {
    console.log(req.body.name);
    req.end();
});

app.listen(PORT, function ( err ) {
    if ( err ) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

### Best Practices with express.json()
- **Validating JSON Data**: While express.json() parses JSON data, it's important to validate that the incoming data matches your expected format.
- **Error Handing**: Wrap you logic in try-catch block when parcessing JSON data to catch any potential errors in the parsing or subsequent operations.
- **Limiting Payload Size**: You can limit the size of JSON payload to protect your server from large and potentially malicious requests.
```js
app.use(express.json({ limit: '10kb' }));
```

## express.raw()

The `express.raw()` function is a built-in middleware function in express. It parses incoming request payload into a Buffer and is based on body-parser.

**Syntax**
```js
express.raw( [options] )
```

**Parameter:** The options parameter contains various properties like inflate, limit, type, etc.
**Return Value:** It returns an Object.

### How to use express.raw()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.raw());

app.post('/', (req, res) => {
    console.log(req.body);
    res.end();
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
})
```

## express.Router()

- The `express.Router()` function is Express.js creates a new router object that can handle requests in a modular and organized way. It serves as a mini-application with middleware and routes but is limited to specific segments of your application.
- By using express.Router(), you can organize your Express app's routing logic, allowing you to define specific routes and middleware for different parts of your application, such as users, products, or orders, in a more maintainable way.

**Syntax**
```js
express.Router( [options] )
```

**Optional Parameter:**
- **case-sensitive:** This enables case sensitivity.
- **mergeParams:** It preserves the req.params values from the parent route.
- **strict:** This enables strict routing.

**Return Value:** This function returns the New Route Object.

### How to use express.Router()

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Single routing
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log("Router Working");
    res.end();
})

app.use(router);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Multiple routing
const router1 = express.Router();
const router2 = express.Router();
const router3 = express.Router();

router1.get('/user', function (req, res, next) {
    console.log("User Router Working");
    res.end();
});

router2.get('/admin', function (req, res, next) {
    console.log("Admin Router Working");
    res.end();
});

router3.get('/student', function (req, res, next) {
    console.log("Student Router Working");
    res.end();
});

app.use(router1);
app.use(router2);
app.use(router3);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## express.static()

The `express.static()` function is a built-in middleware function in Express. It serves static files and is based on serve-static.

**Syntax**

```js
express.static(root, [options])
```

### How to use express.static()

- require
```js
npm install express ejs
```

- code
```js
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res, next) {
    res.render('home.ejs');
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## express.text()

The `express.text()` function is a built-in middleware function in Express. It parses the incoming request payload into a string and is based on body-parser.

**Syntax**
```js
express.text( [options] )
```

**Parameter:** The options parameter contains various properties like defaultCharset, inflate, limit, verify, etc.
**Return value:** It returns an Object.

### How to use express.text()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.text());

app.post('/', function (req, res) {
    console.log(req.body);
    res.end();
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## express.urlencoded()

- The `urlencoded function is used` to parse the incoming requests with URL-encoded payloads. It is a bilt-in middleware in Express based on a body parser module.
- When there is a http post request from the client with content type `application/x-www-urlencoded`, this middleware parses the data and populates the `req.body` object with key-value pairs.

**Syntax**

```js
express.urlencoded( [options] )
```

**Parameter:** The options parameter contains various properties like extended, inflate, limit, verify, etc.
**Return Value:** It returns an Object.

### How to use express.urlencoded()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));

app.post('/', function (req, res) {
    console.log(req.body);
    res.end();
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```