"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
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
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    res.status(200).json(category);
});
// Create Category
// POST/api/v1/catrgories
router.post('/categories', (req, res) => {
    const category = req.body;
    categories.push(category);
    res.status(201).json(category);
});
// Update Category
// PUT  /api/v1/catrgories/:id
router.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const categoryIndex = categories.findIndex(c => c.id == Number(id));
    if (categoryIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    const updatedCategory = Object.assign(Object.assign({}, req.body), { id: Number(id) });
    categories[categoryIndex] = updatedCategory;
    res.status(200).json(updatedCategory);
});
// Delete Category
//DELECT /api/v1/categoies/:id
router.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const category = categories.findIndex(c => c.id == Number(id));
    if (!category) {
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    categories.splice(category, 1);
    res.status(200).json({ message: 'Category deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=categories.route.js.map