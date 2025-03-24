import express from 'express';
import staffsController from '../../controllers/staffs.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import staffValidation from '../../validations/staffs.validation';

const router = express.Router();

// GET All staffs: GET/api/v1/staffs
router.get('/staffs',validateSchemaYup(staffValidation.getAllSchema), staffsController.getAll);
// GET Staff by ID
router.get('/staffs/:id',validateSchemaYup(staffValidation.getByIdSchema), staffsController.getById);
// Create Staff: POST /api/v1/catrgories
router.post('/staffs', validateSchemaYup(staffValidation.createSchema), staffsController.create);
// Update Staff: PUT /api/v1/catrgories/:id
router.put('/staffs/:id', validateSchemaYup(staffValidation.updateByIdSchema), staffsController.updateById);
// Delete Staff: DELECT /api/v1/categoies/:id
router.delete('/staffs/:id',validateSchemaYup(staffValidation.deleteByIdSchema),staffsController.deleteById);

export default router;