const express = require("express");
const router = express.Router();
const user = require("../model/user");
const classes = require("../model/class");
// const purchase = require("../model/purchase");

router.post("/createUser", async (req, res) => {
  const data = req.body;
  console.log(data);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const ismember = req.body.member;
  const type = req.body.type;
  let role = "User";
  let userData;
  if (type == "Admin") {
    role = "Admin";
  }
  let memberCondition = true;
  if (ismember == undefined || ismember == "") {
    memberCondition = false;
    userData = user({
      name: name,
      email: email,
      password: password,
      address: address,
      isMember: memberCondition,
      role: role,
      purchase: "0.00",
    });
  } else {
    userData = user({
      name: name,
      email: email,
      password: password,
      address: address,
      isMember: memberCondition,
      role: role,
      purchase: "75.00",
    });
  }
  console.log(userData);
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
  const userData = await user.find().lean();
  let userPrice = 0.0;
  for (item in userData) {
    userPrice = userPrice + parseFloat(userData[item].purchase);
  }
  const classDatas = await classes.find().lean();
  await user
    .find({ email: req.body.email })
    .then(function (data) {
      console.log(data[0].password);
      const retrieveData = data[0];
      if (retrieveData.password == req.body.password) {
        if (retrieveData.role == "User") {
          req.session.username = retrieveData.name;
          req.session.isAdmin = false;
          console.log(req.session);
          res.render("class", { layout: "container", isLogin: true });
        } else {
          req.session.isAdmin = true;
          res.render("admin", {
            layout: "container",
            isLogin: true,
            userData: userData,
            userPrice: userPrice,
            classDatas: classDatas,
          });
        }
      } else {
        res.send("No USer Found");
      }
    })
    .catch(function (e) {
      res.send(e);
    });
});

router.get("/allData", async (req, res) => {
  const userData = user.find().lean();
});
module.exports = router;
