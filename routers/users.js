const express = require("express")

const { usersHandler } = require("../handlers")

const router = new express.Router();
const { getUsers, createUser, getUser, updateUser, deleteUser } = usersHandler;

router  
  .route("")
  .get(getUsers)
  .post(createUser)


router
  .route("/:username")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);


module.exports = router;