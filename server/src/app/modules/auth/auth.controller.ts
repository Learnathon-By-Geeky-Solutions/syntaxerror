import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await AuthService.initiateRegistration({ name, email, password});
  res.send({
    success: true,
    statusCode: 201,
    message: result.message,
  });
});

const verifyCode = catchAsync(async (req: Request, res: Response) => {
  const { email, code } = req.body;
  const user = await AuthService.verifyCodeAndRegister(email, code);
  res.send({
    success: true,
    message: "User registered successfully.",
    statusCode: 201,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
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
    verifyCode,
    login,
    logout
}