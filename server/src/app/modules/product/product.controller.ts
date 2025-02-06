import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";


const addProduct = catchAsync(async (req:Request, res:Response) => {
    const payload = req.body;
    const result = await ProductService.addProduct(payload);
    res.send({
        success: true,
        message: "Product added successfully",
        statusCode: 201,
        data: result,
    });
})

const getProductById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getProductById(id);
    res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: result,
    });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await ProductService.updateProduct(id, updateData);
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: result,
    });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

const findAllProducts = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.findAllProducts();
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
});


export const ProductController = {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    findAllProducts
    
}