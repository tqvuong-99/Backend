import express, {Request, Response, NextFunction}  from 'express';
import categoriesRouter from './routes/v1/categories.route';
import createError from 'http-errors';


const app = express();


// -------------||BEGIN REGISTER ROUTES ||----------------


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});
// Đăng kí route từ file bên ngoài
app.use('/api/v1',categoriesRouter);
// -------------||END REGISTER ROUTES ||----------------
// -------------||BEGIN HANDLE ERRORS ||----------------
  // catch 404 and forward to error handler
  app.use(function(req: Request, res: Response,next: NextFunction){
    next(createError(404));
  });
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  const statusCode = err.status || 500;
  res.status(statusCode).json({ 
    statusCode: statusCode,
    message: err.message 
  });
});
// -------------||END HANDLE ERRORS ||----------------

export default app;
