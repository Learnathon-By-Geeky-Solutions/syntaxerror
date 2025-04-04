import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const getAllUser = async (page:number, limit:number, role:string, email: string )=>{
    const skip = (page - 1) * limit;
    const query: any = {};
    if (role) {
        query.role = role;
    }
    if (email) {
        query.email = email;
    }
    const users = await UserModel.find(query).skip(skip).limit(limit);
    const total = await UserModel.countDocuments();
    return {users, total};    
}

const deleteUser = async (id:string)=>{
    const res = await UserModel.findByIdAndDelete(id);
    return res;
}

const userAdd = async(data:IUser)=>{
    const user = new UserModel(data);
    await user.save();
    return user;
}

const editUserProfile = async(email: string, name: string, image:string)=>{
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error("User not found");
    }
    const res = await UserModel.findByIdAndUpdate(user._id, {name: name, image: image}, {new: true});
    return res;
}


export const UserService = {
    getAllUser,
    deleteUser,
    userAdd,
    editUserProfile
}