var myMD = require('../models/sanpham.model');
var fs = require('fs');
exports.index=async(req,res,next)=>{
    let list = await myMD.spModel.find().populate('id_thefirm');
    console.log(list);

    res.render('home/index', { listSP: list });
}
exports.addsp=async(req,res,next)=>{
    let listTL= await myMD.theloaiModel.find();
    if(req.method =='POST'){
        fs.renameSync(req.file.path,"./public/uploads/"+ req.file.originalname);
           let url_file = '/uploads/'+ req.file.originalname;

        // viết kiểm tra hợp lệ dữ liệu...
        // tạo đối tượng model để gán dữ liệu post
        let objSP = new myMD.spModel();
        objSP.search_image = url_file;
        objSP.name = req.body.name;
        objSP.id_thefirm = req.body.id_thefirm;
        objSP.content = req.body.content;
        objSP.price = req.body.price;
        objSP.describe = req.body.describe;
        
        // thực hiện ghi vào CSDL
        try {
            let new_sp = await objSP.save();
            console.log(new_sp);
            res.redirect('/');
        } catch (error) {
           

            console.log( error );   
        }
    }
    res.render('home/addsp',{listTL:listTL});
}
exports.editsp=async(req,res,next)=>{
   
    let idsp = req.params.idsp;
    let objSP = await myMD.spModel.findById(idsp);
    let listTL = await myMD.theloaiModel.find();
    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...
        fs.renameSync(req.file.path,"./public/uploads/"+ req.file.originalname);
           let url_file = '/uploads/'+ req.file.originalname;
        // tạo đối tượng model để gán dữ liệu post
        let objSP = new myMD.spModel();
        objSP.search_image = url_file;
        objSP.name = req.body.name;
        objSP.id_thefirm = req.body.id_thefirm;
        objSP.content = req.body.content;
        objSP.price = req.body.price;
        objSP.describe = req.body.describe;
        objSP._id = idsp;

        // thực hiện ghi vào CSDL
        try {
            // let new_sp = await objSP.save();
            // console.log(new_sp);
            
            await myMD.spModel.findByIdAndUpdate(idsp, objSP);
            
            res.redirect('/');
        } catch (error) {
            
            console.log(error);
        }

    }
    res.render('home/editsp', { objSP: objSP, listTL: listTL });
}
exports.deletesp=async(req,res,next)=>{
    let msg = '';
    let idsp = req.params.idsp;

    try {
            const user = await myMD.spModel.findByIdAndDelete({ _id: idsp }, req.body);
            if (!user) {
                    msg = "Lỗi xin thử lại";
            } else {
                    msg = "Xóa thành công";
                    res.redirect('/');
       
                 
            }
    } catch (error) {
            msg = "Err" + error.messagel
            console.log(error);
    }
    res.render('home/deletesp');
}
exports.chitietsp=async(req,res,next)=>{
   
    let idsp = req.params.idsp;
    let objSP = await myMD.spModel.findById(idsp);
    let listTL = await myMD.theloaiModel.find();
    if (req.method == 'POST') {
        // viết kiểm tra hợp lệ dữ liệu...
        fs.renameSync(req.file.path,"./public/uploads/"+ req.file.originalname);
           let url_file = '/uploads/'+ req.file.originalname;
        // tạo đối tượng model để gán dữ liệu post
        let objSP = new myMD.spModel();
        objSP.search_image = url_file;
        objSP.name = req.body.name;
        objSP.id_thefirm = req.body.id_thefirm;
        objSP.content = req.body.content;
        objSP.price = req.body.price;
        objSP.describe = req.body.describe;
        objSP._id = idsp;

        // thực hiện ghi vào CSDL
        try {
            // let new_sp = await objSP.save();
            // console.log(new_sp);
            
            await myMD.spModel.findByIdAndUpdate(idsp, objSP);
            
            res.redirect('/');
        } catch (error) {
            
            console.log(error);
        }

    }
    res.render('home/chitietsp', { objSP: objSP, listTL: listTL });
}
exports.addTL=async(req,res,next)=>{
    let objSP = new myMD.theloaiModel();
    objSP.name=req.body.name;
    try {
        let new_sp = await objSP.save();
        console.log(new_sp);
        res.redirect('/');
    } catch (error) {
       

        console.log( error );   
    }
    res.render('home/addTL');
}
// sắp xếp bé- lớn
exports.belon =async (req, res, next) => {
    // tạo chức năng lọc dữ liệu danh sách
       let dieu_kien_loc = null;
       if(typeof( req.query.price) !='undefined'){
           dieu_kien_loc = {price: req.query.price};
       }
       // hiển thị ds dữ liệu 
       var list = await myMD.spModel.find(dieu_kien_loc).sort({price: 1}).populate('id_thefirm');
       res.render('home/index',{listSP: list});
}
// sắp xếp lớn - bé
exports.lonbe =async (req, res, next) => {
// tạo chức năng lọc dữ liệu danh sách
    let dieu_kien_loc = null;
    if(typeof( req.query.price) !='undefined'){
        dieu_kien_loc = {price: req.query.price};
    }
    // hiển thị ds dữ liệu 
    var list = await myMD.spModel.find(dieu_kien_loc).sort({price: -1}).populate('id_thefirm');
    res.render('home/index',{listSP: list});
}
exports.danhsachTL=async(req,res,next)=>{
    let list = await myMD.theloaiModel.find();
    console.log(list);
    res.render('home/danhsachTL',{listSP:list})
}
