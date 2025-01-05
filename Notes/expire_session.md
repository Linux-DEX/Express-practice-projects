# How to Expire Session after 1 Min of inactivity in express-session of Express.js

Configure the session settings with the cookie.maxAge and implement session touch logic to track activity.

## Approach

To expire the session after 1 min of inactivity in the express-session of Express.js we use expires: **60000** in the middleware function.

**Syntax**

```js
const session = require("express-session");
```

## Steps to implement Auto-Expire Session in Express

1. Create an 'app.js' file and initialize you project with npm

```js
npm init
```

2. Now install two npm package: 'express' and 'express-session'.

```js
npm install express express-session
```

3. **Project Structure**:

```app.js
// Filename - app.js
// Call Express Api.
const express = require('express'),

// Call express Session Api.
const session = require('express-session'),

const app = express();

// Session Setup
app.use(
    session({

        // It holds the secret key for session
        secret: "I am hacker",

        // Forces the session to be saved
        // back to the session store
        resave: true,

        // Forces a session that is "uninitialized"
        // to be saved to the store
        saveUninitialized: false,
        cookie: {

            // Session expires after 1 min of inactivity.
            expires: 60000
        }
    })
);

// Get function in which send session as routes.
app.get('/session', function (req, res, next) {

    if (req.session.views) {

        // Increment the number of views.
        req.session.views++

        // Session will expires after 1 min
        // of in activity
        res.write('<p> Session expires after 1 min of in activity: ' + (req.session.cookie.expires) + '</p>'
        )
        res.end()
    } else {
        req.session.views = 1
        res.end(' New session is started')
    }
})

// The server object listens on port 3000.
app.listen(3000, function () {
    console.log("Express Started on Port 3000");
});
```

4. **Run the program**:

```js
node app.js
```
