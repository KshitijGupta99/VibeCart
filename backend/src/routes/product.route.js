const express = require('express');
const router = express.Router();
const { UserController } = require("../controllers")

const userController = new UserController();


router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/getinfo', userController.getUser)

module.exports = router