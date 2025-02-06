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

const findAllProducts = async () => {
    return await ProductModel.find();
}

export const ProductService = {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    findAllProducts,
};
