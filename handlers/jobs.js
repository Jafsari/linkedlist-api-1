const { Job, Company } = require("../models");
const { formatResponse } = require("../helpers");

function createJob(request, response, next) {
  const newJob = new Job(request.body);
  const _id = request.body.company;
  //newJob.company = _id;

  return newJob
    .save()
    .then(job => {
      return Company.findByIdAndUpdate(
        { _id },
        {
          $addToSet: { jobs: job._id }
        }
      );
    })
    .then(company => response.status(201).json(formatResponse(company)))
    .catch(err => console.error(err));
}

function getJob(request, response, next) {
  return Job.findById(request.params.id)
    .then(job => response.status(200).json(formatResponse(job)))
    .catch(err => console.error(err));
}

function getJobs(request, response, next) {
  return Job.find()
    .then(jobs => response.status(200).json(formatResponse(jobs)))
    .catch(err => console.error(err));
}

function updateJob(request, response, next) {
  return Job.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(job => response.status(200).json(formatResponse(job)))
    .catch(err => console.error(err));
}

function deleteJob(request, response, next) {
  const company_id = request.body.company;
  const job_id = request.params.id;
  return Company.findByIdAndUpdate(company_id, { $pull: { jobs: job_id } })
    .then(() => {
      return Job.findByIdAndRemove(request.params.id);
    })
    .then(() =>
      response.json({
        status: 200,
        title: "Success",
        message: `The operation was successful.`
      })
    )
    .catch(err => console.error(err));
}

module.exports = {
  createJob,
  getJob,
  getJobs,
  updateJob,
  deleteJob
};
