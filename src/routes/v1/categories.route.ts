import express from 'express';
import createError from 'http-errors';
const router = express.Router();
const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
     ];
// GET All categories
// GET/api/v1/categories
router.get('/categories', (req, res) => {
    res.status(200).json(categories);

});
// GET Category by ID
router.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    // Tìm category theo id truyền vào
    const category = categories.find(category => category.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Category not found"
    if (!category) {
        // throw new Error('Category not found');
        throw createError(400, 'Category not found');
    }
    res.status(200).json(category);
});
export default router;