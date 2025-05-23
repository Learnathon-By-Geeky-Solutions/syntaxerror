import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await AuthService.initiateRegistration({
    name,
    email,
    password,
  });
  res.send({
    success: true,
    statusCode: 201,
    message: result.message,
    data: {
      email: result.data.email,
    },
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

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { accessToken } = result;

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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

const AdminLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.AdminLogin(req.body);
  const { accessToken } = result;

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
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
  res.clearCookie("token", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.send({
    success: true,
    message: "Logout successful",
    statusCode: 200,
  });
});

const initiatePasswordReset = catchAsync(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await AuthService.initiatePasswordReset(email);
    res.send({
      success: true,
      message: result.message,
      statusCode: 200,
    });
  }
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email, code, newPassword, confirmPassword } = req.body;
  await AuthService.resetPassword(email, code, newPassword, confirmPassword);
  res.send({
    success: true,
    message: "Password reset successfully",
    statusCode: 200,
  });
});

const getme = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new Error("User not found");
  }

  res.send({
    success: true,
    message: "User details",
    statusCode: 200,
    data: user,
  });
});

const googleAuthLogin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = await AuthService.googleAuthLogin(payload);
  res.send({
    success: true,
    message: "Login successful",
    statusCode: 200,
    data: user
  })
});


const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { currentPass, newPassword, confirmPassword } = req.body;
  const email = req.user?.email;
  const user = await AuthService.changePassword(email, currentPass, newPassword, confirmPassword);
  res.send({
    success: true,
    message: "Password changed successfully",
    statusCode: 200,
    data: user
  })
})



export const AuthController = {
  register,
  verifyCode,
  login,
  logout,
  initiatePasswordReset,
  resetPassword,
  getme,
  googleAuthLogin,
  changePassword,
  AdminLogin
};
