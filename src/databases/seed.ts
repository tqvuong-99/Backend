import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { env } from "../helpers/env.helper";
import brandModel from "../models/brand.model";
import Product from "../models/product.model";
import categoryModel from "../models/category.model";

// Step1: connect database with mongoose

//Step 1: Ket noi Database su dung mongoose
const mongooseDbOptions = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};
mongoose
  .connect(env.MONGODB_URI as string, mongooseDbOptions)
  .then(() => {
    console.log("Connected to MongoDB");
    //should listen app here
  })
  .catch((err) => {
    console.error("Failed to Connect to MongoDB", err);
  });

//     // Step2: Use models to connect to collection
// const fakeData = async () => {
      //new fake brand with loop
  //     for (let index =1; index <=5; index++)  {
  //     const brand = new brandModel({
  //         brand_name: faker.company.buzzNoun() + index, // create unique brand name
  //         description: faker.company.catchPhrase(),
  //     });
  //     await brand.save();
  //     console.log('Fake data created successfully');
  // }}

  // Tạo brand từ mảng có sẵn:
  // await Brand.insertMany(brands);

  //     // Step2: Use models to connect to collection
  const fakeData = async () => {
  //     //new fake brand with loop
  //     for (let index =1; index <=5; index++)  {
  //     const categoryName = faker.commerce.department() + index;
  //     const category = new categoryModel({
  //         category_name: categoryName, // create unique brand name
  //         description: faker.lorem.words(10),
  //         slug: faker.helpers.slugify(categoryName),
  //     });
  //     await category.save();
  //     console.log(`Fake data created successfully ${index}`);
  // }}

  const currentBrands = await brandModel.find();
  const currentCategories = await categoryModel.find();

  for (let i = 1; i <= 15; i++) {
    let productName = faker.commerce.productName() + i;

    const brand =
      currentBrands[Math.floor(Math.random() * currentBrands.length)];
    const category =
      currentCategories[Math.floor(Math.random() * currentCategories.length)];

    const fakeProduct = {
      product_name: productName,
      price: faker.commerce.price({ min: 100, max: 1200 }),
      discount: faker.number.int({ min: 1, max: 50 }),
      category: category._id,
      brand_id: brand._id,
      description: faker.commerce.productDescription(),
      model_year: faker.helpers.fromRegExp("2[0-9]{3}"),
      stock: faker.number.int({ min: 1, max: 200 }), // Thêm trường stock
      thumbnail: "https://picsum.photos/400/400", // Thêm trường thumbnail
      slug: faker.helpers.slugify(productName), // Tạo slug từ productName
    };

    const product = new Product(fakeProduct);
    await product.save();
    console.log(`Create Product ${i} successfully !`);
  }
};
try {
  fakeData();
} catch (err) {
  console.log(err);
}
