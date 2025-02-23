import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
     ];
    
const getAll = () => {
    return categories;
}

const getById = (id: Number) => {
    const category = categories.find(category => category.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Category not found"
        if (!category) {
            // throw new Error('Category not found');
            throw createError(400, 'Category not found');
        }
        return category;
}

const create = (payload: {id: number, name:string}) => {
    categories.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const categoryIndex = categories.findIndex(c => c.id == Number(id));
        if (categoryIndex === -1) {
            throw createError(400, 'Category not found');
        }
        categories[categoryIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const category = categories.findIndex(c => c.id == Number(id));
    if (!category) {
        throw createError(400, 'Category not found');
    }
    categories.splice(category, 1);
    return category;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}