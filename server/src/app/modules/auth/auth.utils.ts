import * as jwt from "jsonwebtoken";
export const createToken = (
  jwtPayload: { email: string; role: "Admin" | "Consumer" | undefined },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
