"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
const staffs = [
    { id: 1, name: 'staff 1' },
    { id: 2, name: 'staff 2' },
];
// GET all staffs
router.get('/staffs', (req, res, next) => {
    res.status(200).json(staffs);
});
// GET a staff by ID
router.get('/staffs/:id', (req, res, next) => {
    const staff = staffs.find(staff => staff.id === parseInt(req.params.id));
    if (!staff) {
        next((0, http_errors_1.default)(404, 'Staff not found'));
    }
    res.status(200).json(staff);
});
// Create a new staff
router.post('/staffs', (req, res, next) => {
    const newStaff = req.body;
    newStaff.id = staffs.length + 1;
    staffs.push(newStaff);
    res.status(201).json(newStaff);
});
// Update a staff by ID
router.put('/staffs/:id', (req, res, next) => {
    const staffIndex = staffs.findIndex(staff => staff.id === parseInt(req.params.id));
    if (staffIndex === -1) {
        next((0, http_errors_1.default)(404, 'Staff not found'));
    }
    const updatedStaff = req.body;
    staffs[staffIndex] = Object.assign(Object.assign({}, staffs[staffIndex]), updatedStaff);
    res.status(200).json(staffs[staffIndex]);
});
// Delete a staff by ID
router.delete('/staffs/:id', (req, res, next) => {
    const staffIndex = staffs.findIndex(staff => staff.id === parseInt(req.params.id));
    if (staffIndex === -1) {
        next((0, http_errors_1.default)(404, 'Staff not found'));
    }
    staffs.splice(staffIndex, 1);
    res.status(200).send({ message: "Staff deleted successfully" });
});
exports.default = router;
//# sourceMappingURL=staffs.route.js.map