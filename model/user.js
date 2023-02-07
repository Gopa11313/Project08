const mongoose = require("mongoose");
const user = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    defult: "User",
  },
});
module.exports = user;
