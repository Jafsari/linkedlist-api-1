const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

mongoose.Promise = Promise;
mongoose.set("debug", true);

mongoose
  .connect(MONGODB_URI, {
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
