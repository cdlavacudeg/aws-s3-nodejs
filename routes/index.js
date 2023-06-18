var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('upload', { title: 'Upload File', fileName: 'image' });
});

router.get('/base64', function (req, res, next) {
  res.render('uploadBase64', { title: 'Upload Base64' });
});

module.exports = router;
