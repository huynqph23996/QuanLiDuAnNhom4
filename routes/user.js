var express = require('express');
var router = express.Router();
var userCtrl=require('../controller/user.controller');

router.get('/',userCtrl.list);

router.get('/deleteu/:idu', userCtrl.deleteu);
router.post('/deleteu/:idu', userCtrl.deleteu);

module.exports = router;