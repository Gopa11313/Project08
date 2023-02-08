const mongoose = require("mongoose");
mongoose.model("classes", {
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
});
