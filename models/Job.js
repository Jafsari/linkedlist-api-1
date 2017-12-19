const mongoose = require("mongoose");
const Company = require("./Company");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, //  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
    salary: Number,
    equity: Number
  },
  { timestamps: true }
);

jobSchema.post("remove", job => {
  console.log("i am here", job);
  Company.updateCompany(job.company, { $pull: { jobs: job._id } });
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
