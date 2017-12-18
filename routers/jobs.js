const express = require("express")

const { jobsHandler } = require("../handlers")

const router = new express.Router();
const { getJobs, createJob, getJob, updateJob, deleteJob } = jobsHandler;

router  
  .route("")
  .get(getJobs)
  .post(createJob)


router
  .route("/:id")
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);


module.exports = router;