import { unlinkSync } from "fs";
import { v2 as cloudinary } from "cloudinary";
import logger from "../utils/logger.js";

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error: any) {
    logger.error(error.message);
    throw new Error("failed to upload file");
  } finally {
    unlinkSync(filePath);
  }
};
