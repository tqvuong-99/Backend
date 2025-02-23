import express from 'express';
import createError from 'http-errors';
const router = express.Router();
const customers = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
     ];

// GET /api/v1/customers
 router.get('/customers', (req, res) => {
    res.json(customers);
 });
  // GET /api/v1/customers/:id
  router.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerFound = customers.find((c) => c.id === parseInt(id));
    if (!customerFound) {
      throw createError(404, 'Customer not found');
    }
    res.json(customerFound);
  });
  // POST /api/v1/customers
 router.post('/customers', (req, res) => {
    const newCustomer = req.body;
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
 
 });

 // PUT /api/v1/customers/:id
 router.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) {
      throw createError(404, 'Customer not found');
    }
    customers[customerIndex] = {...customers[customerIndex],...req.body };
    res. status(200).json(customers[customerIndex]);
  });

 // DELETE /api/v1/customers/:id   
 router.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) {
      throw createError(404, 'Customer not found');
    }
    customers.splice(customerIndex, 1);
    res.status(200).send({ message: 'Customer deleted successfully' });
  });
 module.exports = router;

export default router;