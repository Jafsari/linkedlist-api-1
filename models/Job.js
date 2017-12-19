const mongoose = require("mongoose");
const Company = require("./Company");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    salary: Number,
    equity: Number
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
