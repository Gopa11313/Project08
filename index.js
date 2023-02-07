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
  res.render("home", { layout: false });
});

app.use(userRoutes);
app.listen(port, onstart);
