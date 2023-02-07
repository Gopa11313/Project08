const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.post("/registerUSer", (req, res) => {
  const data = req.body;
  let userData = user({
    name: data.name,
    email: data.email,
    password: data.password,
    role: "User",
  });
  console.log(userData);

  userData
    .save()
    .then(() => {
      console.log("here");
      res.send("Success");
    })
    .catch(function (e) {
      res.send(e);
    });
});

module.exports = router;
