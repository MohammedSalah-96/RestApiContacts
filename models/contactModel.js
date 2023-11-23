const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Contact Field is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Field is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Field is Required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
