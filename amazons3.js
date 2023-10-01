const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey, region, Bucket } = require("./constants")

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region
});

// Create an S3 instance
const s3 = new AWS.S3();

// async save2S3(
//     file: Express.Multer.File,
//     options: { path: string; filename?: string },
//   ) {
//     const fileExt = file?.originalname?.split('.')?.splice(-1)[0];

//     const fileName = `${
//       options.path && options.path + '/'
//     }${uuid()}.${fileExt}`;

//     const params = {
//       Bucket: this.FIXBOT_BUCKET,
//       Key: fileName,
//       Body: file?.buffer,
//       ContentType: file?.mimetype,
//     };

//     return this.s3.upload(params).promise();
//   }


async function  uploadToS3(fileBuffer, fileName) {
  const params = {
    Bucket,
    Key: fileName,
    Body: fileBuffer,
    ACL: 'public-read', // Set the appropriate ACL as needed
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  uploadToS3,
};





