const express = require("express");

const { UserController } = require("../controllers");

const userController = new UserController();

const router = express.Router();

router.get("/", userController.registerUser);

module.exports = router;
