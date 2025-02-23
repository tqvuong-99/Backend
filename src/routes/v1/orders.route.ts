import express from 'express';
import CreateErrors from 'http-errors';
const router = express.Router();
const order_items = [
    { id: 1, name: 'order-items 1'},
    { id: 2, name: 'order-items 2'},
]

// Get All Orders

router.get('/orders', (req, res, next) => {
    res.status(200).json(order_items);
});

// Get Order by Id

router.get('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const order_item = order_items.find(item => item.id === parseInt(id));
    if (!order_item) {
        next(CreateErrors(404, 'Order not found'));
    }
    res.status(200).json(order_item);
});

// Create Order

router.post('/orders', (req, res, next) => {
    const order_item = req.body;
    order_items.push(order_item);
    res.status(201).json(order_item);
});

// Update Order

router.put('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const index = order_items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        next(CreateErrors(404, 'Order not found'));
    }
    const updated_order_item = {...req.body, id: parseInt(id)};
    order_items[index] = updated_order_item;
    res.status(200).json(updated_order_item);
});

// Delete Order 

router.delete('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const index = order_items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        next(CreateErrors(404, 'Order not found'));
    }
    order_items.splice(index, 1);
    res.status(200).send({message: "Order_item deleted successfully"});
});
export default router;