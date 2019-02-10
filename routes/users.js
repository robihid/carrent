const express = require('express');

const usersController = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/users
router.post('/', auth, usersController.postUser);

// GET /api/users/me
router.get('/me', auth, usersController.myProfile);

module.exports = router;
