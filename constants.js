const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  openaiApiKey: process.env.openaiApiKey,
  accessKeyId: process.env.accesskey,
  secretAccessKey: process.env.secret,
  region: process.env.region,
  Bucket: "HNGX",
  DEEP_GRAM: process.env.DEEP_GRAM,
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  },
};
