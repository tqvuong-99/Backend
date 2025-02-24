"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = __importDefault(require("../../controllers/categories.controller"));
const router = express_1.default.Router();
// GET All categories: GET/api/v1/categories
router.get('/categories', categories_controller_1.default.getAll);
// GET Category by ID
router.get('/categories/:id', categories_controller_1.default.getById);
// Create Category: POST /api/v1/catrgories
router.post('/categories', categories_controller_1.default.create);
// Update Category: PUT /api/v1/catrgories/:id
router.put('/categories/:id', categories_controller_1.default.updateById);
// Delete Category: DELECT /api/v1/categoies/:id
router.delete('/categories/:id', categories_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=categories.route.js.map