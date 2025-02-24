"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staffs_controller_1 = __importDefault(require("../../controllers/staffs.controller"));
const router = express_1.default.Router();
// GET all staffs
router.get('/staffs', staffs_controller_1.default.getAll);
// GET a staff by ID
router.get('/staffs/:id', staffs_controller_1.default.getById);
// Create a new staff
router.post('/staffs', staffs_controller_1.default.create);
// Update a staff by ID
router.put('/staffs/:id', staffs_controller_1.default.updateById);
// Delete a staff by ID
router.delete('/staffs/:id', staffs_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=staffs.route.js.map