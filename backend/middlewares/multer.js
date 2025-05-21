import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configurazione Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Filtro per tipi di file accettati
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato immagine non consentito"), false);
  }
};

// Storage per immagini "cover"
const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "covers",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix + "-" + file.originalname;
    },
  },
});

// Storage per immagini "avatar"
const authorStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniqueSuffix + "-" + file.originalname;
    },
  },
});

// Export dei middleware multer per upload singolo
export const uploadAvatar = multer({ storage: authorStorage, fileFilter: fileFilter }).single("avatar");
export const uploadCover = multer({ storage: postStorage, fileFilter: fileFilter }).single("cover");
