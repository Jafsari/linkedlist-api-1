const express = require("express");

const { usersHandler } = require("../handlers");
const { ensureAuth, ensureCorrectUser } = require("../helpers");
const router = new express.Router();
const { getUsers, createUser, getUser, updateUser, deleteUser } = usersHandler;

router
  .route("")
  .get(ensureAuth, getUsers)
  .post(createUser);

router
  .route("/:username")
  .get(ensureAuth, getUser)
  .patch(ensureAuth, ensureCorrectUser, updateUser)
  .delete(ensureAuth, ensureCorrectUser, deleteUser);

module.exports = router;
