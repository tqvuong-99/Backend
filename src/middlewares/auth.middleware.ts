import jwt, { JwtPayload }  from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { env } from 'process';
import staffModel from '../models/staff.model';

interface decodedJWT extends JwtPayload {
   _id?: string
 }

 export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
    const authHeader = req.headers['authorization'];
   
    const token = authHeader && authHeader.split(' ')[1];

     //If token is not valid, respond with 401 (unauthorized)
    if (!token) {
      return next(createError(401, 'Unauthorized'));
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET as string) as decodedJWT;
      //try verify staff exits in database
      const staff = await staffModel
      .findOne({
        _id: decoded._id
      })
      .select('-password -__v');

      if (!staff) {
        return next(createError(401, 'Unauthorized'));
      }
      //Đăng ký biến staff global trong app
      res.locals.staff = staff;

      next();
    } catch (err) {
      return next(createError(401, 'Forbidden'));
    }
};
export default {
  authenticateToken
}
