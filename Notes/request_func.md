# Express Request Function

## req.app

The `req.app` property holds the reference to the instance of the Express application that is using the middleware.

**Syntax**

```js
req.app
```
**Parameter:** No parameter
**Return value:** Object

### How to use req.app

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    console.log(req.app);
    res.send();
});

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## req.baseUrl

- The `req.baseUrl` property is the URL path on which a router instance was mounted. 
- The req.baseUrl property is similar to the mount path property of the app object, except app.mountpath returns the matched path pattern(s). 

**Syntax**

```js
req.baseUrl
```

**Parameter:** No parameter
**Return value:** String

### How to use req.baseUrl

```js
const express = require('express');
const app = express();
const PORT = 3000;

const user = express.Router();

user.get('/login', function (req, res) {
    console.log(req.baseUrl);
    res.end();
})

app.use('/user', user);

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

```js
const express = require('express');
const e = require('express');
const app = express();
const PORT = 3000;

const student = express.Router();
app.use('/student', student);

student.get('/signup', function (req, res) {
    if (req.baseUrl == '/student') {
        console.log("Show Signup Form");
        res.end();
    } else {
        console.log("Invalid Request")
        res.send("Invalid Route")
    }
})

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## req.body

The `req.body` property contains key-value pairs of data submitted in the request body. By default, it is undefined and is populated when you use a middleware called body-parsing such as express.urlencoded() or express.json()

**Syntax**

```js
req.body
```

**Parameter:** No parameter.
**Return value:** Object.

### How to use req.body

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', function (req, res) {
    const data = req.body;

    console.log("Name: ", data.name);
    console.log("Age: ", data.age);
    console.log("Gender: ", data.gender);

    res.send();
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## req.cookies

- The `req.cookies` property is used when the user is using cookie-parser middleware.
- This property is an object that contains cookies sent by the request.

**Syntax**

```js
req.cookies
```

**Parameter:** No parameter.
**Return value:** Object.

### How to use req.cookies

```js
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get('/user', function (req, res) {
    req.cookies.name = 'Gourav';
    req.cookies.age = 12;

    console.log(req.cookies);
    res.send();
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## req.fresh

The `req.fresh` property returns true if the response is still 'fresh' in the client's cache else it will return false.

**Syntax**

```js
req.fresh
```

**Parameter:** No parameter.
**Return value:** True or False

### How to use req.fresh

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(req.fresh);
	res.send();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## req.accepts()

The req.accepts() function checks if the specified content types are acceptable on the basis of the requests Accept HTTP header field. The method returns the best match, else it returns false if none of the specified content types is acceptable.

**Syntax**

```js
req.accepts( types )
```

**Parameter:** The type value is a single MIME type string.
**Return value:** String

### How to use req.accepts()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(req.get('Accept'));
	console.log(req.accepts('application/json'));
	res.end();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## req.acceptsCharsets()

The req.acceptsCharsets() function returns the first accepted charset of the specified character sets on the basis of the request’s Accept-Charset HTTP header field otherwise it returns false if none of the specified charsets is accepted. 

**Syntax**

```js
req.acceptsCharsets( charset [, ...] )
```

**Parameter:** The charset parameter is the charset code like 'UTF-8', etc.
**Return value:** String ( if true ) or False.

### How to use req.acceptsCharsets()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(req.get('Accept-Charset'));
	console.log(req.acceptsCharsets('UTF-8'));
	res.end();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## req.acceptsEncodings()

The req.acceptsEncodings() function returns the first accepted encoding of the specified encodings on the basis of the request Accept-Encoding HTTP header field and it returns false if none of the specified encodings is accepted.

**Syntax**

```js
req.acceptsEncodings( encoding [, ...])
```

**Parameter:** The encoding parameter is the specified encoding like 'compress', etc.
**Return value:** String ( if true ) or False

### How to use req.acceptsEncodings()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(req.get('Accept-Encoding'));
	console.log(req.acceptsEncodings('gzip'));
	res.end();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## req.acceptsLanguages() 

The req.acceptsLanguages() function returns the first accepted language of the specified language on the basis of the request that Accept-Language HTTP header field and it returns false if none of the specified languages is accepted.

**Syntax**

```js
req.acceptsLanguages( lang [, ...] )
```

**Parameter:** The lang parameter is the language code like 'en-US', etc.
**Return value:** String ( if true ) or False.

### How to use req.acceptsLanguages()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(req.get('Accept-Language'));
	console.log(req.acceptsLanguages('en-US'));
	res.end();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```