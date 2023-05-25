var myMD = require ('../models/sanpham.model');
var fs = require('fs');

exports.Loginn= async(req,res,next)=>{
    let msg = '';
    if(req.method == 'POST'){

        try {
            let objU =await myMD.userModel.findOne({ username: req.body.username });
            console.log(objU);
            if(objU != null){  // có tồn tại user
                // kiểm tra pass
                if(objU.passwd == req.body.passwd){
                    // đăng nhập thành công
                    // ghi dữ liệu vào session
                    req.session.userLogin = objU;
                    // chuyển trang
                   return res.redirect('/');
                }else{
                    msg = 'Sai password';
                    console.log(msg);
                } 

            }else{
                msg = 'Không tồn tại user';
                console.log(msg);
            }

        } catch (error) {
            msg = error.message; 
            console.log(msg);
        } 

    }
    res.render('acccount/login',{msg:msg});
}
exports.Regg= async(req,res,next)=>{
    let msg="";
    if(req.method =='POST'){
        console.log(req.body);
        // kiểm tra hợp lệ dữ liệu
        if(req.body.passwd != req.body.passwd2){
            msg = 'Xác nhận password không đúng!!!';
            return  res.render('acccount/Reg',{msg:msg});
        }
        

        //tự viết thêm kiểm tra hợp lệ dữ liệu ở các trường khác
        
        try {
            let objU = new myMD.userModel();
            objU.username = req.body.username;
            objU.passwd = req.body.passwd;
            objU.email = req.body.email;
            let new_sp = await objU.save();
            console.log(new_sp);
            msg = 'Đăng ký thành công';
            res.redirect('/acccount');
        } catch (error) {

            msg = error.message;
        } 
    }
    res.render('acccount/reg');
}
