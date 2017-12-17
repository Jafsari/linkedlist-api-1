const express = require("express");

const { companiesHandler } = require("../handlers");

const router = new express.Router();
const {
  getCompanies,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
} = companiesHandler;

router
  .route("")
  .get(getCompanies)
  .post(createCompany);

router
  .route("/:handle")
  .get(getCompany)
  .patch(updateCompany)
  .delete(deleteCompany);

module.exports = router;
