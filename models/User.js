const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    password: String,
    username: { type: "String", unique: true },
    photo: String,
    experience: [],
    education: [],
    skills: []
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
