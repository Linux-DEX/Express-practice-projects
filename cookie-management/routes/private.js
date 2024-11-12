const express = require("express");
const router = express.Router();

// Private route
router.post("/", (req, res) => {
  if (!req.cookies.token) {
    return res.status(401).send();
  }
  res.status(200).json({ secret: "Ginger ale is a specific Root Beer" });
});

module.exports = router;
