import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse = {
    success: false,
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
    error: {},
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  };

  if (err.name === "ValidationError") {
    errorResponse.statusCode = 400;
    errorResponse.message = "Validation error";
    errorResponse.error = {
      details: Object.values(err.errors).map((error: any) => ({
        path: error.path,
        message: error.message,
      })),
    };
  }

  if (err.code === 11000) {
    errorResponse.statusCode = 400;
    errorResponse.message = "Duplicate key error";
    errorResponse.error = {
      details: Object.keys(err.keyValue).map((key) => ({
        path: key,
        message: `${key} already exists`,
      })),
    };
  }

  if (err.name === "CastError") {
    errorResponse.statusCode = 400;
    errorResponse.message = `Invalid ${err.path}`;
    errorResponse.error = {
      details: [{ path: err.path, message: `Invalid ${err.path}` }],
    };
  }

  if (err.name === "UnauthorizedError") {
    errorResponse.statusCode = 401;
    errorResponse.message = "Unauthorized access";
    errorResponse.error = {
      details: [{ path: "authorization", message: "Invalid or missing token" }],
    };
  }

  res.status(errorResponse.statusCode).json(errorResponse);
};