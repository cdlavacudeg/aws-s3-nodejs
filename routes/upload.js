var express = require('express');
var router = express.Router();

const AwsS3 = require('../helpers/aws-s3');

// AWS.config.update();

router.post('/', AwsS3.uploadFromForm('image', Date.now().toString() + 'prueba-2'), function (req, res, next) {
  res.send('File uploaded successfully');
});

router.post('/base64', async (req, res) => {
  const { base64, filePath } = req.body;

  await AwsS3.uploadFromBase64(base64, filePath);

  res.send('File uploaded successfully');
});

module.exports = router;
