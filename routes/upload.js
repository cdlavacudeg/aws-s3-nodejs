var express = require('express');
var router = express.Router();

const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const config = require('../config');

// AWS.config.update();

const s3 = new S3Client({
  region: config.s3.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log(file);
      cb(null, { fieldName: file.originalname });
    },
    key: function (req, file, cb) {
      const folderName = 'Cristian';
      const fileName = 'prueba-1';
      const filePath = `${folderName}/${fileName}`;
      cb(null, filePath);
    },
  }),
});

router.post('/', upload.single('image'), function (req, res, next) {
  res.send('File uploaded successfully');
});

router.get('/images/:key', async (req, res) => {
  const params = {
    Bucket: config.s3.bucket,
    Key: req.params.key,
  };
  const command = new GetObjectCommand(params);
  const response = await s3.send(command);
  console.log(response);
  res.set('Content-Type', response.ContentType);
  res.set('Content-Length', response.ContentLength);
  response.Body.pipe(res);
});

module.exports = router;
