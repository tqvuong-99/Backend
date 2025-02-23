import express from 'express';
import createError from 'http-errors';
const router = express.Router();
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
        next(createError(404, 'Staff not found'));
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
        next(createError(404, 'Staff not found'));
    }
    const updatedStaff = req.body;
    staffs[staffIndex] = {...staffs[staffIndex],...updatedStaff };
    res.status(200).json(staffs[staffIndex]);
});

// Delete a staff by ID

router.delete('/staffs/:id', (req, res, next) => {
    const staffIndex = staffs.findIndex(staff => staff.id === parseInt(req.params.id));
    if (staffIndex === -1) {
        next(createError(404, 'Staff not found'));
    }
    staffs.splice(staffIndex, 1);
    res.status(200).send({message: "Staff deleted successfully"});
});
export default router;