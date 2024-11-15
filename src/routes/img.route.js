const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

const imgRouter = express.Router();

// Cloudinary ayarları
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer ayarları: dosyayı geçici olarak hafızaya alacağız
const storage = multer.memoryStorage(); // Disk yerine hafıza kullanıyoruz
const upload = multer({ storage });

// Cloudinary'ye yükleme fonksiyonu
const uploadToCloudinary = async (buffer, filename) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto', // Görsel ya da video olabilir
        public_id: filename, // İsteğe bağlı: Dosyanın Cloudinary'deki adı
        folder: 'uploads', // Dosya klasörü (Cloudinary'de)
      },
      (error, result) => {
        if (error) {
          console.error(error);
          throw new Error('Cloudinary upload failed');
        }
        return result;
      }
    );

    // Bu `buffer`'ı Cloudinary'ye göndereceğiz
    result.end(buffer);
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

    // Dosya Cloudinary'ye yükleniyor
    const result = await uploadToCloudinary(req.file.buffer, `${Date.now()}-${req.file.originalname}`);

    res.status(200).json({
      message: 'Image uploaded successfully',
      url: result.secure_url, // Cloudinary'deki dosya URL'si
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

module.exports = imgRouter;
