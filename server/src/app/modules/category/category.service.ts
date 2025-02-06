import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";
 
const addCategory = async (payload: ICategory)=>{
    const checkCategory = await CategoryModel.findOne({name: payload.name});
    if(checkCategory){
        throw new Error("Category already exists");
    }
    const result = await CategoryModel.create(payload);
    return result;
}
 
const updateCategory = async (id: string, payload: Partial<ICategory>) => {
    const result = await CategoryModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new Error("Category not found");
    }
    return result;
};
 
const getAllCategories = async () => {
    return await CategoryModel.find();
};
 
const deleteCategory = async (id: string) => {
    const result = await CategoryModel.findByIdAndDelete(id);
    if (!result) {
        throw new Error("Category not found");
    }
};
 
export const CategoryService = {
    addCategory,
    updateCategory,
    getAllCategories,
    deleteCategory
};