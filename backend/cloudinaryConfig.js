const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {

    const cleanFileName = file.originalname.split('.')[0].replace(/\s+/g, '_');

    return {
      folder: 'syncedu-assignments',
      resource_type: 'raw', 
      public_id: `${cleanFileName}.pdf`, 
      use_filename: true,
      unique_filename: false, 
      overwrite: true,
    };
  },
});

module.exports = { storage };