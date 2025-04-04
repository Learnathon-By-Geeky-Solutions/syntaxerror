import bcrypt from "bcrypt";
import validator from "validator";
import config from "../../config/config";
import { generateVerificationCode } from "../../utils/randomCodeGenerate";
import { sendEmail } from "../../utils/sendEmail";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const tempRegistrations = new Map<
  string,
  { userData: IUser; verificationCode: string }
>();
const tempResetPasswords = new Map<
  string,
  { verificationCode: string; email: string }
>();

const initiateRegistration = async ({ name, email, password }: IUser) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const verificationCode = generateVerificationCode();
  tempRegistrations.set(email, {
    userData: { name, email, password },
    verificationCode,
  });

  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    text: `Your verification code is: ${verificationCode}`,
  });

  return { message: "Verification code sent to email.", data: { email } };
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
  const checkUser = await UserModel.findOne({ email: payload.email });
  if (!checkUser) {
    throw new Error("Email not found");
  }
  if (checkUser.isBlocked) {
    throw new Error("User is blocked");
  }
  const isPasswordMatch = bcrypt.compareSync(
    payload.password,
    checkUser.password
  );
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const jwtPayload = {
    email: checkUser.email,
    role: checkUser.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_secret, "1h");
  return { accessToken };
};

const initiatePasswordReset = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new Error("Email not found");
  }
  if (user.isBlocked) {
    throw new Error("User is blocked");
  }
  if (!user.isVerified) {
    throw new Error("Email not verified");
  }
  const verificationCode = generateVerificationCode();
  tempResetPasswords.set(email, { verificationCode, email });

  await sendEmail({
    to: email,
    subject: "Password Reset",
    text: `Your password reset code is: ${verificationCode}`,
  });

  return { message: "Password reset code sent to email." };
};

const resetPassword = async (
  email: string,
  code: string,
  newPassword: string,
  confirmPassword: string
) => {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  const resetData = tempResetPasswords.get(email);
  if (!resetData) {
    throw new Error("No password reset request found for this email.");
  }

  if (resetData.verificationCode !== code) {
    throw new Error("Invalid verification code.");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, config.bcrypt_salt);

  await UserModel.findOneAndUpdate(
    { email: validator.escape(email) },
    { password: hashedPassword },
    { new: true }
  );

  tempResetPasswords.delete(email);

  return { message: "Password successfully reset." };
};

const googleAuthLogin = async (payload: IUser) => {
  const sanitizedEmail = validator.normalizeEmail(payload.email) as string;
  let user = await UserModel.findOne({ email: sanitizedEmail });
  if (!user) {
    return await UserModel.create({ ...payload, email: sanitizedEmail });
  }
  return user;
};

const changePassword = async (email: string, currentPass: string, newPassword:string, confirmPassword: string) => {
  const user = await UserModel.findOne({ email, provider: "local" });
  if (!user) {
    throw new Error("Email not found");
  }
  const isPasswordMatch = bcrypt.compareSync(currentPass, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  const hashedPassword = bcrypt.hashSync(newPassword, config.bcrypt_salt);
  return await UserModel.findByIdAndUpdate({ _id: user._id}, {password:hashedPassword}, { new: true });

};

export const AuthService = {
  initiateRegistration,
  verifyCodeAndRegister,
  login,
  initiatePasswordReset,
  resetPassword,
  googleAuthLogin,
  changePassword
};
