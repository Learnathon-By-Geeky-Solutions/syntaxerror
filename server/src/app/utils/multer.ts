import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "uploads",
      allowed_formats: ["jpg", "jpeg", "png"], 
      transformation: [{ width: 500, height: 500, crop: "limit" }], 
    };
  },
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 8 * 1024 * 1024, // Limit file size to 2MB
    }, 
});

export default upload;