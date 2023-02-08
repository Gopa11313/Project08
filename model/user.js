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
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  isMember: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  purchase: [
    {
      details: {
        price: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },

      total: {
        type: String,
        required: true,
      },
    },
  ],
});
module.exports = user;
