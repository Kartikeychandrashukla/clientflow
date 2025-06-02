const express = require('express');
const router = express.Router(); // ✅ define router
const userController = require('../controller/userController');

router.get('/', userController.getAllUsers);

// Define routes
router.post('/', userController.createUser);

module.exports = router;

