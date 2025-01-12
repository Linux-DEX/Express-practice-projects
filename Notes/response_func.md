# Express Response Function

## res.app

The `res.app` property holds a reference to the instance of the Express application that is using the middleware.

**Syntax**

```js
res.app
```

**Parameter:** No parameters.
**Return value:** Object.

### How to use res.app

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
	console.log(res.app.get('views'));
	res.end();
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## res.headersSent 

The `res.headersSent` property is a boolean property that indicates if the app sent HTTP headers for the response.

**Syntax**

```js
res.headersSent
```

**Parameter:** No parameters.
**Return value:** This Property returns a boolean value either True or False.

### How to use res.headersSent

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {

	// Before res.send()
	console.log(res.headersSent);
	res.send('OK');
});

app.listen(PORT, function (err) {
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## res.locals

The `res.locals` property is an object that holds response local variables specific to the current request. It has a scope limited to the request and is accessible only to the view(s) rendered during that particular request/response cycle, if any.

**Syntax**

```js
res.locals
```

**Parameter:** No parameters.
**Return value:** Object.

### How to use res.locals

**require**
```js
npm i express body-parser
```

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',
    function (req, res) {
        res.locals.user = 'GeeksforGeeks';
        console.log(res.locals);
        res.end();
    });

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log(
            "Server listening on PORT",
            PORT
        );
    });
```

## res.append()

The `res.append()` function appends the specified value to the HTTP response header field and if the header is not already set then it creates the header with the specified value. 

**Syntax**

```js
res.append(field [, value])
```

**Parameter:** The field parameter describes the name of the field that need to be appended and the value parameter can be a string or an array.
**Return value:** It returns an Object.

### How to use res.append()

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Without middleware
app.get('/', function (req, res) {
    res.append('Warning', '201 Warning');
    console.log(res.get('Warning')); // 201 Warning
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

```js
const express = require('express');
const app = express();
const PORT = 3000;

// With middleware
app.use('/', function (req, res, next) {
    res.append('Warning', '201 Its a Warning');
    next();
})

app.get('/', function (req, res) {
    console.log(res.get('Warning'));
    res.send();
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## res.attachment()

The `res.attachment()` function is used to set the HTTP response Content-Disposition header field to ‘attachment’. If the name of the file is given as a filename, then it sets the Content-Type based on the extension name through the res.type() function and finally sets the Content-Disposition ‘filename = ‘ parameter.

**Syntax**

```js
res.attachment( [filename] )
```

**Parameter:** The filename parameter describes the name of the file.
**Return value:** It returns an Object.

### How to use res.attachment()

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Without middleware
app.get('/', function (req, res) {
    res.attachment('Hello.txt');
    console.log(res.get('Content-Disposition'));
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## res.cookie()

The `res.cookie()` function is used to set the cookie name to value. The value parameter may be a string or object converted to JSON.

**Syntax**

```js
res.cookie( name, value [, options] )
```

**Parameter:** The name parameter holds the name of the cookie and the value parameter is the value assigned to the cookie name. The options parameter contains various properties like encode, expires, domain, etc.
**Return value:** It returns an Object.

### How to use res.cookie()

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Without middleware
app.get('/', function (req, res) {
    // key-value
    res.cookie('name', 'geeksforgeeks');
    res.send("Cookie Set");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

```js
const express = require('express');
const app = express();
const PORT = 3000;

// With middleware
app.use('/', function (req, res, next) {
    res.cookie('title', 'GeeksforGeeks');
    res.send("Cookie Set");
    next();
})

app.get('/', function (req, res) {
    console.log('Cookie SET');
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## res.clearCookie()

The `res.clearCookie()` function is used to clear the cookie specified by name. This function is called for clearing the cookies which as already been set. For example, if a user cookie is set, then it can be cleared using this function. 

**Syntax**

```js
res.clearCookie( name, [ options ] )
```

**Parameters:**
- Name: It is the name of the cookie which is to be cleared. Like in the following example, we have cleared the title cookie.
- Options: It is an object that can have various properties like domain, encode, path, secure, etc.

### How to use res.clearCookie()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {

    // Setting cookie (key-value)
    res.cookie('title', 'geeksforgeeks');

    // Clearing the cookie
    res.clearCookie('title');

    console.log("Cookie cleared");
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## res.download()

The res.download() function transfers the file at the path as an ‘attachment’. Typically, browsers will prompt the user to download.

**Syntax**

```js
res.download( path, [, filename][, options][, fn])
```

**Parameter:** The filename is the name of the file which is to be downloaded as an attachment and fn is a callback function. 
**Return value:** It does not return anything.

### How to use res.download()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', function (req, res) {
    res.download('Hello.txt');
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## res.end()

The res.end() function concludes the response process and is derived from the HTTP.ServerResponse’s response.end() method in the Node core. It is employed to promptly conclude the response without including any data.

**Syntax**

```js
res.end([data] [, encoding])
```

**Parameter:** The default encoding is 'utf8' and the data parameter is the data with which the user want to end the response.
**Return value:** It returns an Object.

### How to use res.end()

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Without middleware
app.get('/',
    function (req, res) {
        res.end();
    });

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
```

```js
const express = require('express');
const app = express();
const PORT = 3000;

// With middleware
app.use('/user',
    function (req, res, next) {
        console.log("/user called")
        res.end();
    })

app.get('/user',
    function (req, res) {
        console.log("User Page")
        res.end();
    });

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
```