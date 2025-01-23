import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { TUserRole } from "../interfaces/userRole";
import { UserModel } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new Error("Unauthorized: Missing or invalid token"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
      const { email, role } = decoded;

      if (!email || !role) {
        throw new Error(`Invalid token`);
      }

      const checkUser = await UserModel.findOne({ email });
      if (!checkUser) {
        throw new Error(`User not found`);
      }

      if (checkUser.isBlocked) {
        throw new Error(`User is blocked`);
      }

      if (!checkUser.isVerified) {
        throw new Error(`User is not verified`);
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new Error(`Unauthorized: User does not have the required role`);
      }
  

      req.user = decoded;

      next();
    } catch (error) {
      return next(new Error("Unauthorized: Invalid or expired token"));
    }
  });
};