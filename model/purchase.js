const mongoose = require("mongoose");
const purchase = mongoose.model("purchases", {
  userId: {
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
