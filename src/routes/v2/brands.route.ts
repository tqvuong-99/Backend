import express from 'express';
import createError from 'http-errors';
const router = express.Router();
const brands = [
    { id: 1, name: 'brand 1' },
    { id: 2, name: 'brand 2' },
     ];

// GET All brands: GET/api/v1/brands
router.get('/brands', (req, res) => {
    res.status(200).json(brands);

});

//GET brands by ID
router.get('/brands/:id', (req, res) => {
    const { id } = req.params;
    // Tìm category theo id truyền vào
    const brand = brands.find(brand => brand.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Category not found"
    if (!brand) {
        // throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    res.status(200).json(brand);
});

// Create a new brand: POST api/v1/brands
router.post('/brands',(req, res)=>{
    const brand = req.body;
    brands.push(brand);
    res.status(201).json(brand);
})

//update brand: PUT api/v1/brands/id
router.put('/brands/:id', (req, res) => {
    const { id } = req.params;
    const brand = req.body;
    // Tìm category theo id truyền vào
    const index = brands.findIndex(b => b.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Category not found"
    if (index === -1) {
        throw createError(400, 'Category not found');
    }
    // Cập nhật thông tin category
    brands[index] = brand;
    res.status(200).json(brand);
});

// Delete a brand: DELETE api/v1/brands/id

router.delete('/brands/:id', (req, res) => {
    const { id } = req.params;
    // Tìm category theo id truyền vào
    const index = brands.findIndex(b => b.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Category not found"
    if (index === -1) {
        throw createError(400, 'Category not found');
    }
    // Xóa category khỏi mảng
    brands.splice(index, 1);
    res.status(200).json({ message: 'Brand deleted successfully' });
});

export default router;