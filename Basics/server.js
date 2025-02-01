const express = require("express");
const path = require("path");
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

app.get("/path", (req, res) => {
  // current directory path
  console.log("directory path -> ", path.dirname(__filename));
  // current file name
  console.log("File name -> ", path.basename(__filename));
  // current file extension
  console.log("File extension -> ", path.extname(__filename));

  // join path
  const joinPath = path.join("/user", "documents", "node", "projects");
  console.log("joinPath -> ", joinPath);

  // resolve path
  const resolvePath = path.resolve("user", "documents", "node", "projects");
  console.log("resolvePath -> ", resolvePath);

  // normalize path
  const normalizePath = path.normalize("/user/.documents/../node/projects");
  console.log("normalizePath -> ", normalizePath);

  res.status(200).json({ message: "path funcitons" });
});

const userRouter = require("./routes/users");
const fileSystem = require("./routes/file-system");

app.use("/users", userRouter);
app.use("/file-system", fileSystem);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000);
