const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const imgRouter = express.Router();

// Cloudinary ayarları
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 'uploads' klasörünün src içinde doğru şekilde oluşturulması için yol
const uploadDir = path.resolve(__dirname, '../uploads'); // `src/uploads`
console.log('Uploads Directory:', uploadDir); // Klasör yolunu kontrol et

// 'uploads' klasörünün varlığını kontrol et ve yoksa oluştur
if (!fs.existsSync(uploadDir)) {
  console.log('Uploads folder does not exist. Creating it...');
  fs.mkdirSync(uploadDir);
}

// Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Dosyalar burada saklanacak
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Dosya adı oluşturuluyor
  },
});

const upload = multer({ storage });

// Cloudinary'ye yükleme fonksiyonu
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
    });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Cloudinary upload failed');
  }
};

// Image upload route
imgRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Geçici dosyanın varlığını kontrol et
    console.log('Uploaded File Path:', req.file.path);
    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({ error: 'File not found after upload' });
    }

    // Cloudinary'e yükle
    const result = await uploadToCloudinary(req.file.path);

    // Geçici dosyayı sil
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = imgRouter;
