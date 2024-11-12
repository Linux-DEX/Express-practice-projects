const express = require("express");
const router = express.Router();

// Login route
router.post("/", (req, res) => {
  res
    .writeHead(200, {
      "Set-Cookie": "token=encryptedstring; HttpOnly",
      "Access-Control-Allow-Credentials": "true",
    })
    .send();
});

module.exports = router;
