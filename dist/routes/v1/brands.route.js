"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brands_controller_1 = __importDefault(require("../../controllers/brands.controller"));
const router = express_1.default.Router();
// GET All brands: GET/api/v1/brands
router.get('/brands', brands_controller_1.default.getAll);
//GET brands by ID
router.get('/brands/:id', brands_controller_1.default.getById);
// Create a new brand: POST api/v1/brands
router.post('/brands', brands_controller_1.default.create);
//update brand: PUT api/v1/brands/id
router.put('/brands/:id', brands_controller_1.default.updateById);
// Delete a brand: DELETE api/v1/brands/id
router.delete('/brands/:id', brands_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=brands.route.js.map