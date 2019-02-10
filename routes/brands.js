const express = require('express');

const brandsController = require('../controllers/brands');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// GET /api/brands
router.get('/', brandsController.getBrands);

// GET /api/brands/:id
router.get('/:id', brandsController.getBrand);

// POST /api/brands
router.post('/', auth, brandsController.postBrand);

// PUT /api/brands/:id
router.put('/:id', auth, brandsController.putBrand);

// DELETE /api/brands/:id
router.delete('/:id', [auth, admin], brandsController.deleteBrand);

module.exports = router;
