var express = require('express');
var router = express.Router();

var user_api= require('../api/user.api');

router.get('/users',user_api.list);

router.get('/tb_user',user_api.tb_user);
module.exports = router;