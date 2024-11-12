const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

// adding cookieParser to middleware
app.use(cookieParser());

const loginRoute = require("./routes/login");
const privateRoute = require("./routes/private");

app.get("/", (req, res) => {
  res.send("cookie management");
});

// setting cookie
app.get("/set-cookie", (req, res) => {
  let minute = 60 * 1000;
  res.cookie("superHero", "spiderman", { maxAge: minute });

  // setting expire time
  // res.cookie(cookie_name , 'cookie_value', {expire : 24 * 60 * 60 * 1000 });

  // setting cookie can have only over httpOnly
  // res.cookie(cookie_name , 'cookie_value', { HttpOnly: true});

  // setting cookie to use https encrypted channel
  // res.cookie(cookie_name , 'cookie_value', { secure: true});

  return res.send("cookie has been set");
});

// reading cookie
app.get("/read-cookie", (req, res) => {
  let super_hero = req.cookies.superHero;
  // other way
  // req.cookies
  res.status(200).json({ cookie_super_hero: super_hero });
});

// deleting cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("superHero");
  res.send("Cookie deleted");
});

// // login
// app.post("/login", (req, res) => {
//   res
//     .writeHead(200, {
//       "Set-Cookie": "token=encryptedstring; HttpOnly",
//       "Access-Control-Allow-Credentials": "true",
//     })
//     .send();
// });
//
// // private
// app.post("/private", (req, res) => {
//   if (!req.cookies.token) return res.status(401).send();
//   res.status(200).json({ secret: "Ginger ale is a specific Root Beer" });
// });

app.use("/login", loginRoute);
app.use("/private", privateRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
