const express = require('express');

const rentalsController = require('../controllers/rentals');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/rentals
router.get('/', rentalsController.getRentals);

// GET /api/rentals/:id
router.get('/:id', rentalsController.getRental);

// POST /api/rentals
router.post('/', auth, rentalsController.postRental);

module.exports = router;
