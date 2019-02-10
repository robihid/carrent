const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// POST /api/auth
router.post('/', authController.authUser);

module.exports = router;
