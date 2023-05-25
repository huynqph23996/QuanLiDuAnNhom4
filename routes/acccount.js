var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploader = multer({dest: './tmp'});
var accCtrl=require('../controller/account.controler');

router.get('/',accCtrl.Loginn);
router.post('/',accCtrl.Loginn);

router.get('/Reg',accCtrl.Regg);
router.post('/Reg',accCtrl.Regg);
module.exports = router;