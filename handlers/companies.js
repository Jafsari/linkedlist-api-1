const { Company } = require("../models");
const { formatResponse } = require("../helpers");

function createCompany(request, response, next) {
  return Company.create(request.body)
    .then(company => response.status(201).json(formatResponse(company)))
    .catch(err => console.error(err));
}

function getCompany(request, response, next) {
  const handle = request.params.handle;
  return Company.findOne({ handle })
    .then(company => response.status(200).json(formatResponse(company)))
    .catch(err => console.error(err));
}

function getCompanies(request, response, next) {
  return Company.find()
    .then(companies => response.status(200).json(formatResponse(companies)))
    .catch(err => console.error(err));
}

function updateCompany(request, response, next) {
  const handle = request.params.handle;
  return Company.findOneAndUpdate({ handle }, request.body, { new: true })
    .then(company => response.status(200).json(formatResponse(company)))
    .catch(err => console.error(err));
}

function deleteCompany(request, response, next) {
  const handle = request.params.handle;
  return Company.findOneAndRemove(handle)
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
  createCompany,
  getCompany,
  getCompanies,
  updateCompany,
  deleteCompany
};
