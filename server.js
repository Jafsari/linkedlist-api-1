const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// imports
const { usersRouter } = require("./routers");
const { companiesRouter } = require("./routers");
const { jobsRouter } = require("./routers");
const { PORT } = require("./config");
const { authUserHandler, errorHandler } = require("./handlers");

// globals
const app = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler;

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParserHandler);

app.use("/users", usersRouter);
app.use("/companies", companiesRouter);
app.use("/jobs", jobsRouter);

app.post("/user-auth", authUserHandler);

app.get("*", fourOhFourHandler); // catch-all for 404 "Not Found" errors
app.all("*", fourOhFiveHandler); // catch-all for 405 "Method Not Allowed" errors
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`LinkedList running on port ${PORT}`);
});
