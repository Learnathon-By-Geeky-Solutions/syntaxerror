import bcrypt from "bcrypt";
import config from "../../config/config";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const register = async (payload: IUser) => {
    const checkEmailExists = await UserModel.findOne({ email: payload.email });
    if (checkEmailExists) {
        throw new Error("Email already exists");
    }
    const hashedPassword = bcrypt.hashSync(payload.password, config.bcrypt_salt);
    const user = await UserModel.create({...payload, password:hashedPassword});
    return user;
}

const login = async (payload: ILogin) => {
    const checkUser = await UserModel.findOne({email: payload.email});
    if(!checkUser){
        throw new Error("Email not found");
    }
    if(checkUser.isBlocked){
        throw new Error("User is blocked");
    }
    const isPasswordMatch = bcrypt.compareSync(payload.password, checkUser.password);
    if(!isPasswordMatch){
        throw new Error("Invalid password");
    }

    const jwtPayload = {
        email: checkUser.email,
        role: checkUser.role,
    }

    const accessToken = createToken(jwtPayload, config.jwt_secret, '1h');
    const refreshToken = createToken(jwtPayload, config.jwt_secret, '7d');
    return {accessToken, refreshToken};
}


export const AuthService = {
    register,
    login,
};