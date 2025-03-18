import express from 'express';
import categoriesController from '../../controllers/categories.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import categoryValidation from '../../validations/categoies.validation';

const router = express.Router();

// GET All categories: GET/api/v1/categories
router.get('/categories',validateSchemaYup(categoryValidation.getAllSchema), categoriesController.getAll);
// GET Category by ID
router.get('/categories/:id',validateSchemaYup(categoryValidation.getByIdSchema), categoriesController.getById);
// Create Category: POST /api/v1/catrgories
router.post('/categories', validateSchemaYup(categoryValidation.createSchema), categoriesController.create);
// Update Category: PUT /api/v1/catrgories/:id
router.put('/categories/:id', validateSchemaYup(categoryValidation.updateByIdSchema), categoriesController.updateById);
// Delete Category: DELECT /api/v1/categoies/:id
router.delete('/categories/:id',validateSchemaYup(categoryValidation.deleteByIdSchema),categoriesController.deleteById);

export default router;

