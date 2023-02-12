const mongoose = require("mongoose");
const classes = mongoose.model("classes", {
  name: {
    type: String,
  },
  duration: {
    type: String,
  },
  image: {
    type: String,
  },
  instructorName: {
    type: String,
  },
  price: {
    type: String,
  },
});
module.exports = classes;
