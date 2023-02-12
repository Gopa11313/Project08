const express = require("express");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const mongoose = require("./Database/db");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const express_session = require("express-session");
const app = express();
app.use(express.urlencoded({ extended: true }));
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
  console.log("Hello there!!");
};
app.get("/", (req, res) => {
  //   res.render("login", { layout: "container", isLogin: true });
  res.render("home", { layout: "container" });
});
app.get("/class", (req, res) => {
  if (req.session.username != undefined) {
    console.log(req.session);
    res.render("class", { layout: "container" });
  } else {
    res.send("Please Login ");
  }
});
app.get("/createAccountDom", (req, res) => {
  res.render("login", { layout: "container", isLogin: false });
});
app.get("/loginDom", (req, res) => {
  res.render("login", { layout: "container", isLogin: true });
});
app.get("/cartDom", (req, res) => {
  if (req.session.username != undefined) {
    res.render("cart", { layout: "container" });
  } else {
    res.send("Please Login ");
  }
});

app.get("/logoutDom", (req, res) => {
  req.session.destroy();
  res.render("home", { layout: "container" });
});
app.get("/createClassDom", (req, res) => {
  if (req.session.isAdmin == true) {
    res.render("createClass", { layout: "container" });
  } else {
    res.send("You have to be Admin");
  }
});
app.use(express.static(__dirname + "/public"));

app.use(userRoutes);
app.use(classRoutes);

app.listen(port, onstart);
