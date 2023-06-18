var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('upload', { title: 'Upload Image', fileName: 'image' });
});

module.exports = router;
