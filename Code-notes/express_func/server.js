const express = require("express");
const app = express();
const PORT = 3000;

// parse the incoming request with JSON
app.use(express.json());

// parses incoming request payloads into a Buffer and is based on body-parser
app.use(express.raw());

// parses the incoming request payloads into a string and is based on body-parser
app.use(express.text());

// parse the incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// defining route in different file and importining here
const userRouter = require("./user");

app.use("/", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Express function project" });
});

app.post("/req-json", (req, res) => {
  console.log(req.body.name); // output: linux-dex
  res.end();
});

app.post("/req-raw", (req, res) => {
  console.log(req.body); // output: <Buffer 7b 22 6e 61 6d 65 22 3a 20 22 4c 69 6e 75 78 2d 44 45 58 22 7d>
  res.end();
});

app.post("/req-test", (req, res) => {
  console.log(req.body); // output: {"name": "Linux-DEX"}
  res.end();
});

app.post('/req-urlencoded', (req, res) => {
    console.log(req.body); // output: [Object: null prototype] { '{"name": "Linux-DEX"}': '' }
    res.end();
})

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is Listening PORT", PORT);
});
