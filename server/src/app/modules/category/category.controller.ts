import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";

const addCategory = catchAsync(async (req:Request, res:Response) => {
    const payload: any = { ...req.body };
    if (req.file?.path) {
        payload.image = req.file.path;
    }
    const result = await CategoryService.addCategory(payload);
    res.send({
        success: true,
        message: "Category added successfully",
        statusCode: 201,
        data: result,
    });
})

export const CategoryController = {
    addCategory
}