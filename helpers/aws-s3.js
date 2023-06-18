const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../config');

const s3Client = new S3Client({
  region: config.s3.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

class AwsS3 {
  static uploadFromForm(fileNameForm, filePath) {
    // Upload file from form with enctype="multipart/form-data"
    const upload = multer({
      storage: multerS3({
        s3: s3Client,
        bucket: config.s3.bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        // acl: 'public-read',
        metadata: function (req, file, cb) {
          console.log(file);
          cb(null, { fieldName: file.originalname });
        },
        key: function (req, file, cb) {
          cb(null, filePath);
        },
      }),
    });
    return upload.single(fileNameForm);
  }

  static async getObject(key) {
    const params = {
      Bucket: config.s3.bucket,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    return response;
  }

  static async uploadFromBase64(dataString, filePath) {
    const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches?.length !== 3) {
      throw new Error('Invalid base64');
    }
    const type = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');

    const command = new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: filePath,
      Body: buffer,
      ContentType: type,
    });

    const response = await s3Client.send(command);
    return response;
  }
}

module.exports = AwsS3;
