const express = require("express");
const router = express.Router();
const classes = require("../model/class");
const user = require("../model/user");
router.post("/createClass", async (req, res) => {
  const userData = await user.find().lean();
  let userPrice = 0.0;
  for (item in userData) {
    userPrice = userPrice + parseFloat(userData[item].purchase);
  }
  const body = req.body;
  const name = body.className;
  const imageUrl = body.imageUrl;
  const instructorName = body.instructorName;
  const duration = body.duration;
  const price = body.price;
  const classData = classes({
    name: name,
    image: imageUrl,
    instructorName: instructorName,
    duration: duration,
    price: price,
  });
  classData
    .save()
    .then((data) => {
      req.session.isAdmin = true;
    })
    .catch(function (e) {
      res.send(e);
    });
  const classDatas = await classes.find().lean();
  res.render("admin", {
    layout: "container",
    isLogin: true,
    userData: userData,
    userPrice: userPrice,
    classDatas: classDatas,
  });
});

module.exports = router;
