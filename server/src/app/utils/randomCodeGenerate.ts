import { randomInt } from "crypto";

export const generateVerificationCode = (): string => {
    return randomInt(100000, 1000000).toString(); 
};