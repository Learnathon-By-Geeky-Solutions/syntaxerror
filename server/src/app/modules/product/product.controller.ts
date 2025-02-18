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
    const { page = 1, limit = 10, categoryName, sortBy } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const { products, total } = await ProductService.findAllProducts(categoryName as string, sortBy as string, pageNumber, limitNumber);
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
        pagination: {
            total,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            pageSize: limitNumber,
        },
    });
});

const getLatestProducts = catchAsync(async (req: Request, res: Response) => {
    const limit  = 10;
    const result = await ProductService.getLatestProducts(limit);
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
    findAllProducts,
    getLatestProducts
    
}