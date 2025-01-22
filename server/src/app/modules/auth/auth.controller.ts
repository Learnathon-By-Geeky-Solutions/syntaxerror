import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res:Response) => {
    const result = await AuthService.register(req.body);
    res.send({
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email,
        }
    })
});

const login = catchAsync(async (req:Request, res:Response) => {
    const result = await AuthService.login(req.body);
    const { accessToken, refreshToken } = result;
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });
  
    res.send({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        token: accessToken,
      },
    });
  });

const logout = catchAsync(async (req: Request, res: Response) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
    });
    res.send({
        success: true,
        message: "Logout successful",
        statusCode: 200,
    });
});

export const AuthController = {
    register,
    login,
    logout
}