var express = require('express');
var router = express.Router();
var homeCtrl=require('../controller/home.controller');
var multer = require('multer');
var uploader = multer({dest: './tmp'});
var check_login = require('../middlewares/check_login');
router.use( (req, res, next) => {
    
    console.log("---- Dòng này là middleware ---- ");
    next();
});

router.get('/',check_login.yeu_cau_dang_nhap,homeCtrl.index);
router.post('/',check_login.yeu_cau_dang_nhap,homeCtrl.index);
router.get('/addsp',homeCtrl.addsp);
router.post('/addsp', uploader.single("file_anh"),homeCtrl.addsp);
router.get('/editsp/:idsp',homeCtrl.editsp);
router.post('/editsp/:idsp', uploader.single("file_anh"),homeCtrl.editsp);
router.get('/deletesp/:idsp',homeCtrl.deletesp);
router.post('/deletesp/:idsp',homeCtrl.deletesp);
router.get('/chitietsp/:idsp',homeCtrl.chitietsp);
router.post('/chitietsp/:idsp',homeCtrl.chitietsp);
router.get('/addTL',homeCtrl.addTL);
router.post('/addTL',homeCtrl.addTL);
router.get('/belon',homeCtrl.belon);
router.post('/belon',homeCtrl.belon);
router.get('/lonbe',homeCtrl.lonbe);
router.post('/lonbe',homeCtrl.lonbe);
module.exports = router;