const express = require("express");
const session = require("express-session");

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
      expires: 60000,
    },
  }),
);

// Get function in which send session as routes.
app.get("/session", function (req, res, next) {
  if (req.session.views) {
    // Increment the number of views.
    req.session.views++;

    // Session will expires after 1 min of in activity
    res.write(
      "<p>Session expires after 1 min of inactivity: " +
        req.session.cookie.expires +
        "</p>",
    );
    res.end();
  } else {
    req.session.views = 1;
    res.end(" New session is started");
  }
});

// The server object listens on port 8000.
app.listen(8000, function () {
  console.log("Express Started on Port 8000");
});
