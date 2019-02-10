const express = require('express');

const customersController = require('../controllers/customers');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/customers
router.get('/', customersController.getCustomers);

// GET /api/customers/:id
router.get('/:id', customersController.getCustomer);

// POST /api/customers
router.post('/', auth, customersController.postCustomer);

// PUT /api/customers/:id
router.put('/:id', auth, customersController.putCustomer);

// DELETE /api/customers/:id
router.delete('/:id', auth, customersController.deleteCustomer);

module.exports = router;
