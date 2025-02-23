import express from 'express';
import ordersController from '../../controllers/orders.controller';
const router = express.Router();

// Get All Orders
router.get('/orders', ordersController.getAll);
// Get Order by Id
router.get('/orders/:id', ordersController.getById);
// Create Order
router.post('/orders', ordersController.create);
// Update Order
router.put('/orders/:id', ordersController.updateById);
// Delete Order 
router.delete('/orders/:id', ordersController.deleteById);
export default router;