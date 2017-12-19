const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    username: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55,
      match: /[A-z0-9]/,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    currentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    photo: String, // valid URL
    experience: [
      {
        jobTitle: String,
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company"
        },
        startDate: Date,
        endDate: Date
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        endDate: Date
      }
    ],
    skills: [String]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
