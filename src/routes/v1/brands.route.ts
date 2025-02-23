import express from 'express';
import brandsController from '../../controllers/brands.controller';
const router = express.Router();

// GET All brands: GET/api/v1/brands
router.get('/brands', brandsController.getAll);
//GET brands by ID
router.get('/brands/:id', brandsController.getById);
// Create a new brand: POST api/v1/brands
router.post('/brands', brandsController.create);
//update brand: PUT api/v1/brands/id
router.put('/brands/:id', brandsController.updateById);
// Delete a brand: DELETE api/v1/brands/id
router.delete('/brands/:id', brandsController.deleteById);

export default router;