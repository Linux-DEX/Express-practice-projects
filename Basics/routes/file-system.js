const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  const dataFolder = path.join(__dirname, "data");

  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    console.log("data folder created");
  }

  const filePath = path.join(dataFolder, "example.txt");
  // synchronous way to create the file
  fs.writeFileSync(filePath, "Hello from node js");
  console.log("file create successfully");

  // read content of file
  const readContentFromFile = fs.readFileSync(filePath, "utf8");
  console.log("file content -> ", readContentFromFile);

  // appending content to file
  fs.appendFileSync(
    filePath,
    "\nThere are many distro which are based on arch linux so just use it."
  );
  console.log("new file content added");

  // async way to create file
  const asyncFilePath = path.join(dataFolder, "async-example.txt");
  fs.writeFile(asyncFilePath, "Hello async node js", (err) => {
    if (err) throw err;
    console.log("Async file created successfully!");

    fs.readFile(asyncFilePath, "utf8", (err, data) => {
      if (err) throw err;
      console.log("Async file content: ", data);

      fs.appendFile(asyncFilePath, "\nThis line is for async file", (err) => {
        if (err) throw err;
        console.log("new line added to async file");
      });
    });
  });

  res.send("file system route");
});

module.exports = router;
