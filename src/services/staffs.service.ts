import createError from 'http-errors';
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller

const staffs = [
    { id: 1, name: 'Staff 1' },
    { id: 2, name: 'Staff 2' },
     ];
    
const getAll = () => {
    return staffs;
}

const getById = (id: Number) => {
    const staff = staffs.find(staff => staff.id == Number(id));
        // Nếu không tìm thấy thì hiển thị "Staff not found"
        if (!staff) {
            // throw new Error('Staff not found');
            throw createError(400, 'Staff not found');
        }
        return staff;
}

const create = (payload: {id: number, name:string}) => {
    staffs.push(payload);
    return payload;
}

const updateById = (id: number, payload: {id: number, name: string}) => {
    const staffIndex = staffs.findIndex(c => c.id == Number(id));
        if (staffIndex === -1) {
            throw createError(400, 'Staff not found');
        }
        staffs[staffIndex] = payload;
        //return payload;
        return payload;
}

const deleteById = (id: number) => {
    const staff = staffs.findIndex(c => c.id == Number(id));
    if (!staff) {
        throw createError(400, 'Staff not found');
    }
    staffs.splice(staff, 1);
    return staff;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}