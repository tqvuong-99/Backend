import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const brands = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
     ];
    
const getAll = () => {
    return brands;
}

const getById = (id: Number) => {
    const brand = brands.find(brand => brand.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Brand not found"
        if (!brand) {
            // throw new Error('Brand not found');
            throw createError(400, 'Brand not found');
        }
        return brand;
}

const create = (payload: {id: number, name:string}) => {
    brands.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const brandIndex = brands.findIndex(c => c.id == Number(id));
        if (brandIndex === -1) {
            throw createError(400, 'Brand not found');
        }
        brands[brandIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const brand = brands.findIndex(c => c.id == Number(id));
    if (!brand) {
        throw createError(400, 'Brand not found');
    }
    brands.splice(brand, 1);
    return brand;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}