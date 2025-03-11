import express, {Request, Response, NextFunction}  from 'express';
//Import routes
import categoriesRouter from './routes/v1/categories.route';
import brandsRouter from './routes/v1/brands.route';
import productsRouter from './routes/v1/products.route';
import customersRouter from './routes/v1/customers.route';
import staffsRouter from './routes/v1/staffs.route';
import ordersRouter from './routes/v1/orders.route';
import orderItemRouter from './routes/v1/order_item.route';
import queriesRouter from './routes/v1/queries.route';
import createError from 'http-errors';

// -------------||INITIAL APP||----------------
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// -------------||BEGIN REGISTER ROUTES ||----------------
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
}); 
// Đăng kí route từ file bên ngoài
app.use('/api/v1',categoriesRouter); // router cho categories
app.use('/api/v1',brandsRouter);     // router cho brands
app.use('/api/v1',productsRouter);   // router cho products
app.use('/api/v1',customersRouter);  // router cho customers
app.use('/api/v1',staffsRouter);     // router cho staffs
app.use('/api/v1',ordersRouter);     // router cho orders
app.use('/api/v1',orderItemRouter);     // router cho orders
app.use('/api/v1',queriesRouter);     // router cho orders
// -------------||END REGISTER ROUTES ||----------------


// -------------||BEGIN HANDLE ERRORS ||----------------
// catch 404 and forward to error handler
app.use(function(req: Request, res: Response,next: NextFunction){
  next(createError(404));
});
//error handler, catch 5xx errors

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    statusCode: statusCode,
    message: err.message,
    data: null 
  });
});
// -------------||END HANDLE ERRORS ||----------------

export default app;
