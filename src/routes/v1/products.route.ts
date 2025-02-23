import express from 'express';
import productsController from '../../controllers/products.controller';
const router = express.Router();

// Get all products: GET api/v1/products
router.get('/products', productsController.getAll);
// Get product by ID: GET api/v1/products/:id
router.get('/products/:id', productsController.getById);
// Create new product: POST api/v1/products
router.post('/products', productsController.create);
// Update product by ID: PUT api/v1/products/:id
router.put('/products/:id', productsController.updateById);
// Delete product by ID: DELETE api/v1/products/:id
router.delete('/products/:id', productsController.deleteById);
export default router;