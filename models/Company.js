const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 55
    },
    handle: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 55
    },
    logo: String, // valid URL
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
      }
    ]
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
