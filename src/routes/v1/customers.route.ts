import express from 'express';
import customersController from '../../controllers/customers.controller';
const router = express.Router();

// GET /api/v1/customers
 router.get('/customers', customersController.getAll);
// GET /api/v1/customers/:id
  router.get('/customers/:id', customersController.getById);
// POST /api/v1/customers
 router.post('/customers', customersController.create);
 // PUT /api/v1/customers/:id
 router.put('/customers/:id', customersController.updateById);
 // DELETE /api/v1/customers/:id   
 router.delete('/customers/:id', customersController.deleteById);
 module.exports = router;

export default router;