var md = require('../models/sanpham.model');

exports.list = async(req, res, next)=>{
    try {
        let listUser = await md.spModel.find();

        if (listUser) {
            res.status(200).json(listUser
              
            );
        } else {
            res.status(204).json({
                msg: 'Deo co du lieu',

            });
        }
    } catch (err) {
        return res.status(err.status).json({
            msg: err.massage
        });
    }

    // res.status(200).json( { msg: 'Danh sách tài khoản'}  );
 }

 exports.tb_user = async(req, res, next)=>{
    try {
        let tbUser = await md.userModel.find();

        if (tbUser) {
            res.status(200).json(tbUser
              
            );
        } else {
            res.status(204).json({
                msg: 'Deo co du lieu',

            });
        }
    } catch (err) {
        return res.status(err.status).json({
            msg: err.massage
        });
    }

    // res.status(200).json( { msg: 'Danh sách tài khoản'}  );
 }