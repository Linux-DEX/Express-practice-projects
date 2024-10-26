const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("user list");
});

router.get("/new", (req, res) => {
  res.send("User new form");
});

router.post("/", (req, res) => {
  res.send("created user");
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req?.user);
    res.send(`Get user with Id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Get user with Id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Get user with Id ${req.params.id}`);
  });

// router.get("/:id", (req, res) => {
//   res.send(`Get user with id ${req.params.id}`);
// });

// router.put("/:id", (req, res) => {
//   res.send(`Get user with id ${req.params.id}`);
// });

// router.delete("/:id", (req, res) => {
//   res.send(`Get user with id ${req.params.id}`);
// });

const users = [{ name: "linux" }, { name: "dex" }];

router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

module.exports = router;
