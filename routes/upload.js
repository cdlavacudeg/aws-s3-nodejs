var express = require('express');
var router = express.Router();

const AwsS3 = require('../helpers/aws-s3');

// AWS.config.update();

router.post('/', AwsS3.uploadFromForm('image', Date.now().toString() + 'prueba-2'), function (req, res, next) {
  res.send('File uploaded successfully');
});

module.exports = router;
