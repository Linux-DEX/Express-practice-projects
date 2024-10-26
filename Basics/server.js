const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(logger);

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

// app.get("/text", logger, (req, res) => {
//   res.json({ message: "use middleware to only this api " });
// });

// app.get("/users", (req, res) => {
//   res.send("user list");
// });

// app.get("/users/new", (req, res) => {
//   res.send("User new form");
// });

const userRouter = require("./routes/users");

app.use("/users", userRouter);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000);
