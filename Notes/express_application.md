# Express Application Function

## app.locals 

The `app.locals` object has properties that are local variables within the application. These variables are local to the application and are very useful.

**Syntax**
```js
app.locals
```

**Parameter:** No parameters.
**Return value:** Object

## How to use app.locals

```js
const express = require('express');
const app = express()

app.locals.email = 'linuxdex@linux.com';

console.log(app.locals.email);
```

```js
const express = require('express');
const app = express();

// Setting multiple locals variable
app.locals.domain = 'www.sample.com' 
app.locals.age = '24' 
app.locals.company = 'ABC Ltd' 

console.log(app.locals);
```

## app.mountpath

The `app.mountpath` property contains one or more path patterns on which a sub-app was mounted. 

**Syntax**

```js
app.mountpath
```

**Parameter:** No parameter.
**Return value:** String.

## How to use app.mounthpath

```js
const express = require('express');
const app = express(); // the main app
const user = express(); // the sub app
const PORT = 3000;

user.get('/', function (req, res) {
	console.log(user.mountpath); // /user
	res.send('User Homepage');
});

app.use('/user', user); // Mounting the sub app

app.listen(PORT, function(err){
	if (err) console.log(err);
	console.log("Server listening on PORT", PORT);
});
```

## Mount Event

The `mount` event is fired on a sub-app when it is mounted on a parent app and the parent app is basically passed to the callback function.

**Syntax**

```js
app.on('mount', callback(parent))
```

**Parameter:** It is event named 'mount', and the callback function is called when this event is called.
**Return value:** Since it's an event so it doesn't have any return value.

### How to use Mount Event

```js
const express = require('express');
const app = express(); // the main app
const admin = express();
const PORT = 3000;

admin.on('mount', (parent) => {
    console.log('Admin Mounted');
});

admin.get('/', (req, res) => {
    res.send('Admin Homepage');
});

app.use('/admin', admin);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
```

## app.all()

The `app.all()` function is used to route all types of HTTP requests. Like if we have POST, GET, PUT, DELETE, etc. requests made to any specific route, let's say /user, so intead of defining different APIs like app.post('/user'), app.get('/user'), etc, we can define single API `app.all('/user')` which will accept all type of HTTP request.

**Syntax**

```js
app.all( path, callback );
```

**Parameters:**
- Path: It is the path for which the middleware function is called.
- Callback: It can be a middleware function or a series/array of functions.

### How to use app.all()

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.all('/user', function (req, res, next) {
    console.log('USER API CALLED');
    next();
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT ", PORT);
});
```

## app.delete()

The `app.delete()` function is utilized to handle HTTP DELETE requests for a specified path. It takes the path as a parameter and also accepts callback functions as parameters to handle the request.

**Syntax**

```js
app.delete(path, callback);
```

**Parameters:**
- **path:** It is the path for which the middleware function is being called.
- **callback:** It is a middleware function or a series/array of middleware functions. 

### How to use app.delete() 

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.delete('/',
    (req, res) => {
        res.send("DELETE Request Called")
    })

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
```

## app.disable()

The `app.disable()` function is used to set the boolean setting name to false. It is basically the shorthand for the app.set(name, false). So instead we can use app.disable(name) function to set the false boolean value to some system Express.js settings. 

**Syntax**

```js
app.disable(name);
```

### How to use app.disable()

```js
const express = require('express');
const app = express();

app.disable('trust proxy');

console.log(app.get('trust proxy')); // false
```

## app.enable()

The `app.enable()` function is used to set the boolean value i.e. name to true. It is basically the shorthand for the app.set(name, true) or app.set(name, false). So instead we can use `app.enable(name)` function to set boolean values to some system Express.js settings.

**Syntax**

```js
app.enable(name);
```

### How to use app.enable()

```js
const express = require('express');
const app = express();

app.enable('trust proxy');

console.log(app.get('trust proxy')); // true
```
