const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

// Protected Routes
router.post('/place', authenticate, roleCheck(['waiter', 'manager']), orderController.placeOrder);
router.get('/', authenticate, roleCheck(['chef', 'waiter', 'manager']), orderController.getOrders);
router.put('/status', authenticate, roleCheck(['chef', 'manager']), orderController.updateStatus);

module.exports = router;
