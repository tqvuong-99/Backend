import express from 'express';
import ordersController from '../../controllers/order_item.controller';
const router = express.Router();

// Get All Orders
router.get('/order-item', ordersController.getAll);
// Get Order by Id
router.get('/order-item/:id', ordersController.getById);
// Create Order
router.post('/order-item', ordersController.create);
// Update Order
router.put('/order-item/:id', ordersController.updateById);
// Delete Order 
router.delete('/order-item/:id', ordersController.deleteById);
export default router;