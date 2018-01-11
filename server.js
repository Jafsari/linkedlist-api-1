const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// imports
const { usersRouter } = require("./routers");
const { companiesRouter } = require("./routers");
const { jobsRouter } = require("./routers");

// globals
const app = express();
const PORT = process.env.PORT || 3010;

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "POST,GET,PATCH,DELETE,OPTIONS"
  );
  response.header("Content-Type", "application/json");
  next();
});

app.use(bodyParser.json({ type: "*/*" }));

app.use("/users", usersRouter);
app.use("/companies", companiesRouter);
app.use("/jobs", jobsRouter);

app.listen(PORT, () => {
  console.log(`You are connected on port ${PORT}`);
});
