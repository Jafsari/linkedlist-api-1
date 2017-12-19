const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: String,
    handle: { type: String, required: true },
    logo: String,
    employees: [], // [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }] // [{type: mongoose.Schema.Types.ObjectId, ref: 'Job'}]
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
