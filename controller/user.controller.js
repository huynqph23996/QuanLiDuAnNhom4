var myMD = require('../models/sanpham.model');
var fs = require('fs');
exports.list=async(req,res,next)=>{
    let list = await myMD.userModel.find();
    res.render('user/listU.ejs', { listU: list });
}
exports.deleteu =async (req,res,next) =>{
    let idu=req.params.idu;
    try {
       await myMD.userModel.findByIdAndDelete({_id:idu}); 
    } catch (error) {
    }
    res.redirect('/user');
}