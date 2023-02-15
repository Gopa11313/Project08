const express = require("express");
const router = express.Router();
const user = require("../model/user");
const classes = require("../model/class");
const purchase = require("../model/purchase");

router.post("/bookClass/:id", async (req, res) => {
  if (req.session.isLogin == true) {
    let price = 0.0;
    let tax = 0.0;
    let total = 0.0;
    const user = req.session.email;
    const classId = req.params.id;
    console.log(req.session);
    const classDetails = await classes.find({ _id: classId }).lean();

    console.log(classDetails);
    if (req.params.isMember == true) {
      price = 0;
    } else {
      price = classDetails[0].price;
    }
    console.log(price);
    tax = (price * 10) / 100 || 0.0;
    total = parseFloat(price) + parseFloat(tax);
    res.render("cart", {
      layout: "container",
      email: req.session.email,
      price: price,
      isLogin: true,
      classDetails: classDetails,
      tax: tax,
      total: total,
      id: classId,
    });
  } else {
    res.render("error", { layout: "container", message: "Please Login!!" });
  }
});
router.post("/makePurchase/:id/:price", async (req, res) => {
  if (req.session.isLogin == true) {
    console.log(req.body);
    const id = req.params.id;
    let price = req.params.price;
    const email = req.body.email;
    if (price != undefined || email != undefined || id != undefined) {
      const data = purchase({ classId: id, userEmail: email, price: price });
      await data
        .save()
        .then((datas) => {
          res.send("You have successfully inrolled in class");
        })
        .catch(function (e) {
          res.render("error", { layout: "container" });
          //dosplay error page
        });
      const userData = await user.findOne({ email: email });
      console.log(userData);
      price = parseFloat(price) + parseFloat(userData.purchase);
      console.log("total price" + price);
      await user.updateOne({ _id: userData._id }, { purchase: price });
    } else {
      res.render("error", { layout: "container", message: "Please Login!!" });
    }
  } else {
    res.render("error", {
      layout: "container",
      message: "Please fill out all the required feild!!",
    });
  }
});
module.exports = router;
