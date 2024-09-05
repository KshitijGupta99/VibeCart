const express = require('express');

// router
const router = express.Router();

// routes
const userRoutes = require('./user.routes');

router.use('/user', userRoutes);

module.exports = router;