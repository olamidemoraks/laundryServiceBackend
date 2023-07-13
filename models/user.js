const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userScheme = new mongoose.Schema(
  {
    externalId: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      maxlength: 30,
      required: [true, "please provide your name"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "please provide your email address"],
      validate: {
        validator: validator.isEmail,
        message: "please provide a valid email address",
      },
    },
    phonenumber: {
      type: String,
      maxLength: 15,
      // required: [true, "please provide your phone number"],
    },
    address: {
      type: String,
      maxlength: 200,
      // required: [true, "please provide your address"],
    },
    password: {
      type: String,
      minlength: 6,
    },
    role: {
      type: String,
      required: [true, "Please provide role"],
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userScheme.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userScheme.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userScheme);
