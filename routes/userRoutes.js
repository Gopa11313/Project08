const express = require("express");
const router = express.Router();
const user = require("../model/user");
// const purchase = require("../model/purchase");

router.post("/createUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const ismember = req.body.member;
  let userData;
  let memberCondition = true;
  if (ismember === undefined) {
    memberCondition = false;
  } else {
    userData = user({
      name: name,
      email: email,
      password: password,
      address: address,
      isMember: memberCondition,
      role: "User",
    });
  }

  await userData
    .save()
    .then(() => {
      res.render("class", { layout: "container" });
    })
    .catch(function (e) {
      res.send(e);
    });
});

router.post("/userLogin", async (req, res) => {
  await user
    .find({ email: req.body.email })
    .then(function (data) {
      console.log(data[0].password);
      const retrieveData = data[0];
      if (retrieveData.password == req.body.password) {
        if (retrieveData.role == "User") {
          req.session.username = retrieveData.name;
          console.log(req.session);
          res.render("class", { layout: "container", isLogin: true });
        } else {
          res.render("admin", {
            layout: "container",
            data: data,
            isLogin: true,
          });
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
