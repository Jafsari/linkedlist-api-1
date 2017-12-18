const { Job } = require("../models");
const { formatResponse } = require("../helpers");

function createJob(request, response, next) {
  return Job.create(request.body)
    .then(job => response.status(201).json(formatResponse(job)))
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
  return Job.findByIdAndRemove(request.params.id)
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
