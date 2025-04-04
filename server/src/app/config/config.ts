import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join((process.cwd(), '.env'))})

export default {
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    bcrypt_salt: parseInt(process.env.BYCRYPT_SALT || "10", 10),
    jwt_secret: process.env.JWT_SECRET as string,
    email_id: process.env.EMAIL_ID,
    email_password: process.env.EMAIL_PASSWORD,
    email_host: process.env.EMAIL_HOST,
    email_port: parseInt(process.env.EMAIL_PORT || "587", 10),
    email_secure: process.env.EMAIL_SECURE === "true",
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    backend_url: process.env.BACKEND_URL,
}
