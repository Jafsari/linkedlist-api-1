const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: "String", unique: true, required: true },
    firstName: { type: "String", required: true },
    lastName: { type: "String", required: true },
    password: { type: "String", required: true },
    username: { type: "String", unique: true, required: true },
    photo: String,
    experience: [],
    education: [],
    skills: []
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
