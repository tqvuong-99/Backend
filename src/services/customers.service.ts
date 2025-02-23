import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const customers = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
     ];
    
const getAll = () => {
    return customers;
}

const getById = (id: Number) => {
    const customer = customers.find(customer => customer.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Customer not found"
        if (!customer) {
            // throw new Error('Customer not found');
            throw createError(400, 'Customer not found');
        }
        return customer;
}

const create = (payload: {id: number, name:string}) => {
    customers.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const customerIndex = customers.findIndex(c => c.id == Number(id));
        if (customerIndex === -1) {
            throw createError(400, 'Customer not found');
        }
        customers[customerIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const customer = customers.findIndex(c => c.id == Number(id));
    if (!customer) {
        throw createError(400, 'Customer not found');
    }
    customers.splice(customer, 1);
    return customer;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}