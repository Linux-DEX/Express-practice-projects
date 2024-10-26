const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   console.log("here");
  //   res.sendStatus(500)
  //   res.send("hi");
  //   res.json({ message: "Error" });
  //   res.download("server.js");
  res.render("index", { text: "World" });

  //   res.status(500).send("hi");
  //   res.status(500).json({ message: "Error" });
});

app.listen(3000);
