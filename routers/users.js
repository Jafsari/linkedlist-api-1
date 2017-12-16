const express = require("express")

const { usersHandler } = require("../handlers")

const router = new express.Router();
const { getUsers, createUser, getUser, updateUser, deleteUser } = usersHandler;


router  
  .route("")
  .get(usersHandler.getUsers)
  .post(usersHandler.createUser)


router
  .route("/:username")
  .get(usersHandler.getUser)
  .patch(usersHandler.updateUser)
  .delete(usersHandler.deleteUser);


module.exports = router;