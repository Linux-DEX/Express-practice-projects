const express = require("express");
const route = express.Router();

route.get("/user", (req, res) => {
  res.status(200).json({ message: "i am user route" });
});

module.exports = route;
