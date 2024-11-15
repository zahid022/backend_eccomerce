const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

const imgRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const uploadToCloudinary = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: filename, 
        folder: 'uploads', 
      },
      (error, result) => {
        if (error) {
          reject(error); 
        } else {
          resolve(result); 
        }
      }
    );

    stream.end(buffer);
  });
};

imgRouter.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, `${Date.now()}-${req.file.originalname}`);

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
