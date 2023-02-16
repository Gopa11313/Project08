const express = require("express");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const PurchaseRoutes = require("./routes/purchaseRoutes");
const mongoose = require("./Database/db");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const express_session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      json: (context) => {
        return JSON.stringify(context);
      },
    },
  })
);
app.use(
  express_session({
    secret: "the quick brown fox jumped over the lazy dog 1234567890", // random string, used for configuring the session
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", ".hbs");
const onstart = () => {
  console.log("Welcome!!");
};
app.get("/", (req, res) => {
  res.render("home", { layout: "container" });
});

app.get("/createAccountDom", (req, res) => {
  res.render("login", { layout: "container", isLoginForm: false });
});
app.get("/loginDom", (req, res) => {
  res.render("login", { layout: "container", isLoginForm: true });
});
app.get("/cartDom", (req, res) => {
  console.log(req.session);
  if (req.session.isLogin == true) {
    res.render("cart", {
      layout: "container",
      email: req.session.email,
      isLogin: true,
    });
  } else {
    res.render("cart", {
      layout: "container",
      email: req.session.email,
      id: "notLogin",
      total: "notLogin",
      isLogin: false,
    });
  }
  // } else {
  //   res.render("error", { layout: "container", message: "Please Login!!" });
  // }
});

app.get("/logoutDom", (req, res) => {
  req.session.destroy();
  res.render("home", { layout: "container" });
});
app.get("/createClassDom", (req, res) => {
  if (req.session.isAdmin == true) {
    res.render("createClass", { layout: "container" });
  } else {
    res.render("error", {
      layout: "container",
      message: "Please Login as Admin!!",
    });
  }
});

app.use(PurchaseRoutes);
app.use(userRoutes);
app.use(classRoutes);

app.listen(port, onstart);
