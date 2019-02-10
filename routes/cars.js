const express = require('express');

const carsController = require('../controllers/cars');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/cars
router.get('/', carsController.getCars);

// GET /api/cars/:id
router.get('/:id', carsController.getCar);

// POST /api/cars
router.post('/', auth, carsController.postCar);

// PUT /api/cars/:id
router.put('/:id', auth, carsController.putCar);

// DELETE /api/cars/:id
router.delete('/:id', auth, carsController.deleteCar);

module.exports = router;
