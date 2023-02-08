const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("./Database/db");
const port = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
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
app.set("view engine", ".hbs");
const onstart = () => {
  console.log("Hello there!!");
};
app.get("/", (req, res) => {
  //   res.render("login", { layout: "container", isLogin: true });
  res.render("home", { layout: "container" });
});
app.get("/class", (req, res) => {
  res.render("class", { layout: "container" });
});
app.get("/createAccountDom", (req, res) => {
  res.render("login", { layout: "container", isLogin: false });
});
app.get("/loginDom", (req, res) => {
  res.render("login", { layout: "container", isLogin: true });
});
app.get("/cartDom", (req, res) => {
  res.render("cart", { layout: "container" });
});
app.use(express.static(__dirname + "/public"));
app.use(userRoutes);
app.listen(port, onstart);
