import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    callback(null, `${uuid()}.${file.mimetype.split("/")[1]}`);
  },
});

export const multerFileUpload = multer({ storage });
