const express = require("express");
const path = require("path");
const app = express();

const PORT = 8000;

app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "Static files")));

app.get("/", (req, res) => {
  res.send("express js tutorial");
});

app.post("/", (req, res) => {
  const { name } = req.body;
  res.send(`Welcome ${name}`);
});

app.get("/hello", (req, res) => {
  res.set("Content-Type", "text/html");
  res.status(200).send("<h1>Hello expressjs tutorial</h1>");
});

app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "Static files/satoru.png"));
});

app.listen(PORT, () => {
  console.log(`server is running on localhost: ${PORT}`);
});
