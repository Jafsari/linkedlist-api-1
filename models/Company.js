const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    handle: String,
    logo: String,
    employees: [],
    jobs: []
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
