const express = require("express");
const router = express.Router();
const user = require("../model/user");
const purchase = require("../model/purchase");

router.post("/createUser", (req, res) => {
  const data = req.body;
  console.log(data);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const ismember = req.body.member;

  let memberCondition = true;
  if (ismember === "undefined") {
    memberCondition = false;
  }
  let userData = user({
    name: name,
    email: email,
    password: password,
    address: address,
    isMember: memberCondition,
    role: "User",
  });

  userData
    .save()
    .then(() => {
      //   user
      //     .findOne({ email: email })
      //     .then(function (data) {
      //       const purchase = purchase({
      //         userId: data._id,
      //         price: "75",
      //       });
      //     })
      //     .catch(function (e) {
      //       res.send(e);
      //     });
      res.render("class", { layout: "container" });
    })
    .catch(function (e) {
      res.send(e);
    });
});

router.post("/userLogin", (req, res) => {
  console.log(req.body);
  user
    .find({ email: req.body.email })
    .then(function (data) {
      console.log(data[0].password);
      const retrieveData = data[0];
      if (retrieveData.password == req.body.password) {
        if (retrieveData.role == "User") {
          console.log("We r here");
          res.render("class", { layout: "container" });
        } else {
          res.send("Hi Admin");
        }
      } else {
        res.send("False");
      }
    })
    .catch(function (e) {
      res.send(e);
    });
});

module.exports = router;
