import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join((process.cwd(), '.env'))})

export default {
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    bcrypt_salt: parseInt(process.env.BYCRYPT_SALT || "10", 10),
    jwt_secret: process.env.JWT_SECRET as string,
}
