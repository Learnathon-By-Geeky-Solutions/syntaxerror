import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.service";

const getAllUser = catchAsync(async (req:Request, res:Response) => {
  const { page = 1, limit = 10, role, email } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  const { users, total } = await UserService.getAllUser(
    pageNumber,
    limitNumber,
    role as string,
    email as string
  );
  res.status(200).json({
    success: true,
    message: "Successfully fetched users",
    data: users,
    pagination: {
      total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      pageSize: limitNumber,
    },
  });
});

const deleteUser = catchAsync(async (req:Request, res:Response) => {
  const { id } = req.params;
  await UserService.deleteUser(id);
  res.status(200).json({
    success: true,
    message: "Successfully deleted user",
  });
})

const userAdd = catchAsync(async (req:Request, res:Response) => {
  const newUser = await UserService.userAdd(req.body);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
})

const editUserProfile = catchAsync(async (req:Request, res:Response) => {
  const { name, image } = req.body;
  const email = req.user?.email;
  const updatedUser = await UserService.editUserProfile(email, name, image);
  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    data: updatedUser,
  });
})


export const UserController = {
    getAllUser,
    deleteUser,
    userAdd,
    editUserProfile
};
