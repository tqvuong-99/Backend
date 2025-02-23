import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
     ];
    
const getAll = () => {
    return products;
}

const getById = (id: Number) => {
    const product = products.find(product => product.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Product not found"
        if (!product) {
            // throw new Error('Product not found');
            throw createError(400, 'Product not found');
        }
        return product;
}

const create = (payload: {id: number, name:string}) => {
    products.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const productIndex = products.findIndex(c => c.id == Number(id));
        if (productIndex === -1) {
            throw createError(400, 'Product not found');
        }
        products[productIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const product = products.findIndex(c => c.id == Number(id));
    if (!product) {
        throw createError(400, 'Product not found');
    }
    products.splice(product, 1);
    return product;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}