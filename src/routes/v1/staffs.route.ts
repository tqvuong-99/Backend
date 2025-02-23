import express from 'express';
import staffsController from '../../controllers/staffs.controller';
const router = express.Router();

// GET all staffs
router.get('/staffs', staffsController.getAll);
// GET a staff by ID
router.get('/staffs/:id', staffsController.getById);
// Create a new staff
router.post('/staffs', staffsController.create);
// Update a staff by ID
router.put('/staffs/:id', staffsController.updateById);
// Delete a staff by ID
router.delete('/staffs/:id', staffsController.deleteById);
export default router;