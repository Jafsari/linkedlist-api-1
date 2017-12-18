const mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost/linkedlist", {
    useMongoClient: true
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => {
    console.error(err);
  });

exports.User = require("./User");
exports.Company = require("./Company");
exports.Job = require("./Job");