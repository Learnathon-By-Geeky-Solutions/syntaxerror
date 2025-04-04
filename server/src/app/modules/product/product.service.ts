import { CategoryModel } from "../category/category.model";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";


const addProduct = async (payload: IProduct)=>{
    const checkTitle = await ProductModel.findOne({title: payload.title});
    if(checkTitle){
        throw new Error("Product already exists");
    }
    const result = (await ProductModel.create(payload));
    return result;
}

const getProductById = async (id: string) => {
    const product = await ProductModel.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

const updateProduct = async (id: string, updateData: Partial<IProduct>) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) {
        throw new Error("Product not found");
    }
    return updatedProduct;
};

const deleteProduct = async (id: string) => {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
        throw new Error("Product not found");
    }
    return deletedProduct;
};

const findAllProducts = async (categoryName: string | undefined, sortBy: string, page: number, limit: number, search: string | undefined) => {
    const skip = (page - 1) * limit;

    let sortOption: any = {};

    if (sortBy === "price_low_to_high") {
        sortOption.price = 1;
    } else if (sortBy === "price_high_to_low") {
        sortOption.price = -1;
    } else {
        sortOption.createdAt = -1;
    }

    let filter: any = {};

    if (categoryName) {
        const category = await CategoryModel.findOne({ name: categoryName });
        if (category) {
            filter.category = category._id;
        } else {
            return { products: [], total: 0 };
        }
    }

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } }, 
            { description: { $regex: search, $options: 'i' } } 
        ];
    }

    const products = await ProductModel.find(filter)
        .populate("category", "name image")
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const total = await ProductModel.countDocuments(filter);

    return { products, total };
};

const getLatestProducts = async (limit: number) => {
    return await ProductModel.find().sort({ createdAt: -1 }).limit(limit);
}

export const ProductService = {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
    getLatestProducts
};
