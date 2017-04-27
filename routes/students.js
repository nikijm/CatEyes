var express = require('express');
var router = express.Router();
var loginDAO = require("../dao/loginDAO");  //登陆、注册DAO


//默认页面
router.get("/", function(req, res){
    res.redirect("login.html");
});

//
// //登陆路由
router.post('/login', function(req, res){
      console.log("123")
    loginDAO.checkLogin(req.body.stus_acc,req.body.stus_pwd,function(data){
        if(data.length > 0){
            //登陆成功
            res.redirect("manager.html")
        }else{
            //登陆失败
            res.send("登陆失败");
        }
    });

});
module.exports = router;
