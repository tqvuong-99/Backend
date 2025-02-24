import express from 'express';
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();

// GET All categories: GET/api/v1/categories
router.get('/categories', categoriesController.getAll);
// GET Category by ID
router.get('/categories/:id', categoriesController.getById);
// Create Category: POST /api/v1/catrgories
router.post('/categories', categoriesController.create);
// Update Category: PUT /api/v1/catrgories/:id
router.put('/categories/:id', categoriesController.updateById);
// Delete Category: DELECT /api/v1/categoies/:id
router.delete('/categories/:id',categoriesController.deleteById);

export default router;

