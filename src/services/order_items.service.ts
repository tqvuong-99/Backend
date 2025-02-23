import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const orders = [
    { id: 1, name: 'Order_items 1' },
    { id: 2, name: 'Order_items 2' },
     ];
    
const getAll = () => {
    return orders;
}

const getById = (id: Number) => {
    const order_items = orders.find(order_items => order_items.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Order_items not found"
        if (!order_items) {
            // throw new Error('Order_items not found');
            throw createError(400, 'Order_items not found');
        }
        return order_items;
}

const create = (payload: {id: number, name:string}) => {
    orders.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const order_itemsIndex = orders.findIndex(c => c.id == Number(id));
        if (order_itemsIndex === -1) {
            throw createError(400, 'Order_items not found');
        }
        orders[order_itemsIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const order_items = orders.findIndex(c => c.id == Number(id));
    if (!order_items) {
        throw createError(400, 'Order_items not found');
    }
    orders.splice(order_items, 1);
    return order_items;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}