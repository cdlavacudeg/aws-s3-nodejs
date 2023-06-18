const express = require('express');
const router = express.Router();

const AwsS3 = require('../helpers/aws-s3');

router.get('/object/:key', async (req, res) => {
  const key = req.params.key;
  const response = await AwsS3.getObject(key);
  res.set('Content-Type', response.ContentType);
  res.set('Content-Length', response.ContentLength);
  response.Body.pipe(res);
});

module.exports = router;
