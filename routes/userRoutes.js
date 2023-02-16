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
  if (
    name != undefined ||
    email != undefined ||
    password != undefined ||
    address != undefined
  ) {
    const classesDatas = await classes.find().lean();
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
    await userData
      .save()
      .then(() => {
        req.session.username = name;
        req.session.email = email;
        req.session.isMember = memberCondition;
        res.render("class", {
          layout: "container",
          isLogin: true,
          isAdmin: false,
          classesData: classesDatas,
        });
      })
      .catch(function (e) {
        console.log(e);
        res.render("error", { layout: "container" });
      });
  } else {
    res.render("error", {
      layout: "container",
      message: "Please fill out all the requried field",
    });
  }
});

router.post("/userLogin", async (req, res) => {
  const userData = await user.find().lean();
  let userPrice = 0.0;
  for (item in userData) {
    userPrice = userPrice + parseFloat(userData[item].purchase);
  }
  const classesDatas = await classes.find().lean();
  await user
    .find({ email: req.body.email })
    .then(function (data) {
      const retrieveData = data[0];
      if (retrieveData.password == req.body.password) {
        if (retrieveData.role == "User") {
          req.session.username = retrieveData.name;
          req.session.email = retrieveData.email;
          req.session.isLogin = true;
          req.session.isMember = retrieveData.isMember;
          req.session.isAdmin = false;
          res.render("class", {
            layout: "container",
            isLogin: true,
            isAdmin: false,
            classesData: classesDatas,
          });
        } else {
          req.session.isAdmin = true;
          req.session.isLogin = true;
          res.render("class", {
            layout: "container",
            isLogin: true,
            isAdmin: true,
            classesData: classesDatas,
          });
          // res.render("admin", {
          //   layout: "container",
          //   isLogin: true,
          //   userData: userData,
          //   userPrice: userPrice,
          //   classDatas: classDatas,
          // });
        }
      } else {
        res.render("error", { layout: "container", message: "No User Found" });
      }
    })
    .catch(function (e) {
      res.render("error", { layout: "container" });
    });
});

router.get("/adminPage", async (req, res) => {
  console.log(req.session);
  if (req.session.isAdmin === true) {
    const userData = await user.find().sort({ email: 1 }).lean();
    let userPrice = 0.0;
    // console.log(userData);
    for (item in userData) {
      console.log(userData[item]);
      userPrice = userPrice + parseFloat(userData[item].purchase);
    }
    const classDatas = await classes.find().lean();
    console.log(classDatas);
    res.render("admin", {
      layout: "container",
      isLogin: true,
      isAdmin: true,
      userData: userData,
      userPrice: userPrice,
      classesData: classDatas,
    });
  } else {
    res.render("error", {
      layout: "container",
      message: "Please Login As Admin!!",
    });
  }
});
module.exports = router;
