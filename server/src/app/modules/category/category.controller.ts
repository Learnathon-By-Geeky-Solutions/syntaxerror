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
 
 
 
const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload: any = { ...req.body };
    if (req.file?.path) {
        payload.image = req.file.path;
    }
    const result = await CategoryService.updateCategory(id, payload);
    res.send({
        success: true,
        message: "Category updated successfully",
        statusCode: 200,
        data: result,
    });
});
 
const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
    const result = await CategoryService.getAllCategories();
    res.send({
        success: true,
        message: "Categories retrieved successfully",
        statusCode: 200,
        data: result,
    });
});
 
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await CategoryService.deleteCategory(id);
    res.send({
        success: true,
        message: "Category deleted successfully",
        statusCode: 200,
    });
});
 
 
export const CategoryController = {
    addCategory,
    updateCategory,
    getAllCategories,
    deleteCategory
}