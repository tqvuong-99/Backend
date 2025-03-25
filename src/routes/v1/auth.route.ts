import express from 'express';
import authController from '../../controllers/auth.controller';
import validateSchemaYup from '../../middlewares/validate.middleware';
import authValidation from '../../validations/auth.validation';
const router = express.Router();

router.post('/login', validateSchemaYup(authValidation.loginSchema), authController.login);
export default router;