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

export const CategoryService = {
    addCategory
}