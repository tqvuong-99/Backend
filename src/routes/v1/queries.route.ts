import express from 'express';
const router = express.Router();
import Product from '../../models/product.model';
// GET: /api/v1/queries

router.get('/queries',  async (req, res) => {
    // // 1. find() -- Extract all databasess from collection
    //     const products = await Product.find();
    //     res.json(products); 
    
    //2. findbyid() -- Extract 1 with id
    //~ SQL: SELECT * FROM product WHERE _id = 'id'
    // const product = await Product.findById('67c7e0990bcf55126364d517');
    // res.json(product);
    
    //3. Get only 1 record ~ SQL: SELECT TOP 1* FROM product WHERE _id = 'id'
    // const product = await Product.findOne({
    //     model_year:2262
    // });
    // res.json(product);

    //4. Get necessary attributes ~ SQL: SELECT product_name, price, discount FROM product WHERE _id = 'id'
    // const products = await Product
    // .find()
    // .select('product_name price discount');
    // res.json(products);

    //5. Get all fields except createdAt, updatedAt
    // const products = await Product
    // .find()
    // .select('-createdAt -updatedAt');
    // res.json(products);

    //6. Sort in increasing and decreasing order
    // const products = await Product
    // .find()
    // .sort({
    //     product_name:1, // tăng dần
    //     price:-1, // giảm dần
    // });
    // res.json(products);
    
    //7. Find with Equal comparison condition  ~ SELECT * from product WHERE model_year = xxxx
    // const products = await Product.find({
    //     model_year: 2194,
    //     // or  model_year:{$eq:2194},
    // })
    // res.json(products);

    //8. Find with greater comparison condition
    // const products = await Product.find({
    //     model_year:{$gte:2194},
    // })
    // res.json(products);
    //... following: https://github.com/nhannn87dn/Learn-Backend-NodeJs/tree/main/01.Lessions/Day-06-NoSql-with-MongoDB


    // 9. Phân trang
    // const currentPage = 1; //trang hiện tại
    // const pageSize = 10; // Số lượng items trên 1 trang
    // const product = await Product
    // .find()
    // .skip((currentPage - 1) * pageSize)
    // .limit(pageSize)
    // res.json(product);

    // 10. Join collections with populate
    const currentPage = 1; //trang hiện tại
    const pageSize = 10; // Số lượng items trên 1 trang
    const product = await Product
    .find()
    .populate('brand_id')
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize)
    res.json(product)
});


export default router;