import express from 'express';
import createError from 'http-errors';
const router = express.Router();
const customer = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
     ];

export default router;