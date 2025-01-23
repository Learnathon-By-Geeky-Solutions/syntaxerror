import bcrypt from "bcrypt";
import config from "../../config/config";
import { generateVerificationCode } from "../../utils/randomCodeGenerate";
import { sendEmail } from "../../utils/sendEmail";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const tempRegistrations = new Map<string, { userData: IUser; verificationCode: string }>();

const initiateRegistration = async ({ name, email, password }: IUser) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
  
    const verificationCode = generateVerificationCode();
    tempRegistrations.set(email, { userData: { name, email, password }, verificationCode });
  
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      text: `Your verification code is: ${verificationCode}`,
    });
  
    return { message: "Verification code sent to email." };
  };


  const verifyCodeAndRegister = async (email: string, code: string) => {
    const registrationData = tempRegistrations.get(email);
  
    if (!registrationData) {
      throw new Error("No registration data found for this email.");
    }
  
    const { userData, verificationCode } = registrationData;
  
    if (verificationCode !== code) {
      throw new Error("Invalid verification code.");
    }
  
    tempRegistrations.delete(email);
  
    const hashedPassword = bcrypt.hashSync(userData.password, config.bcrypt_salt);
    const user = await UserModel.create({
      ...userData,
      password: hashedPassword,
      isVerified: true,
    });
  
    return user;
  };

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
    initiateRegistration,
    verifyCodeAndRegister,
    login,
};