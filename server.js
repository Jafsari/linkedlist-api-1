const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

// imports
const { usersRouter } = require("./routers");
const { companiesRouter } = require("./routers");
const { jobsRouter } = require("./routers");
const { userAuthRouter } = require("./routers");
const { PORT } = require("./config");
const { authUserHandler, errorHandler } = require("./handlers");

// globals
const server = express();
const {
  bodyParserHandler,
  globalErrorHandler,
  fourOhFourHandler,
  fourOhFiveHandler
} = errorHandler;

server.use((request, response, next) => {
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

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json({ type: "*/*" }));
server.use(bodyParserHandler);

server.use("/users", usersRouter);
server.use("/companies", companiesRouter);
server.use("/jobs", jobsRouter);

server.use("/user-auth", authUserHandler);
server.post("/user-auth", authUserHandler);

server.get("*", fourOhFourHandler); // catch-all for 404 "Not Found" errors
server.all("*", fourOhFiveHandler); // catch-all for 405 "Method Not Allowed" errors
server.use(globalErrorHandler);

server.listen(PORT, () => {
  console.log(`LinkedList running on port ${PORT}`);
});

module.exports = server;
