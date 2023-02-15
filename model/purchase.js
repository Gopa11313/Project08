const mongoose = require("mongoose");
const purchase = mongoose.model("purchases", {
  userEmail: {
    type: String,
  },
  classId: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
});
module.exports = purchase;
