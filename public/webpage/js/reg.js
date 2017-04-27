var phonrNub=$('#phone');
var phoneSpan=$('#dd');

var messagr=$('#messageCheck');
var megLabel=$('#megCheckLabel');

var pwd=$('#pwd');
var pwdSpanR=$('#pwdR');
var pwdSpanM=$('#pwdM');
var pwdSpanS=$('#pwdS');

var checkpwd=$('#checkPwd');
var checkPwdL=$('#checkPwdLabel');

var megBtn=$("#megBtn");

var checkArr=[false,false];
var checkPWD=false;

var btnLogin=$('#btnLogin');

$(function(){

phonrNub.on("change",changePhone);
pwd.on("change",changepwd);
checkpwd.on("change",changecheckpwd);
megBtn.on("click",clickBtn);
btnLogin.on("click",clickLogin)

})

function clickBtn(){
	$.ajax({
		url:"/messageCheck/find",
		type:"POST",
		data:{},
		success:function(data){
			// console.log(data)
			for(var i=0;i<data.length;i++){
				messagr.val(data[i].meg);
			}
			
		}
	})
}

function changePhone(){
	var reg=/^[1]\d{10}$/;
	if(reg.test($(this).val())){
		phoneSpan.text("√ 输入正确").css("color","green");
		checkArr[0] = true;
	}else{
		phoneSpan.text("手机号错误,请重新输入").css("color","red")
		checkArr[0] = false;
	}


}

function changepwd(){
	// var reg=;
// console.log(1)
	if(/^[0-9a-z]+$/.test($(this).val())){

		pwdSpanR.css("backgroundColor","yellow");
		pwdSpanM.css("backgroundColor","#eeeeee ");
		pwdSpanS.css("backgroundColor","#eeeeee ");
		checkArr[1] = true;	
	}else if(/^[0-9a-zA-Z]+$/.test($(this).val())){
		pwdSpanM.css("backgroundColor","green");
		pwdSpanR.css("backgroundColor","#eeeeee ");
		pwdSpanS.css("backgroundColor","#eeeeee ");
		checkArr[1] = true;	

	}else if(/[0-9a-zA-Z]*[!~@$%#]+[0-9a-zA-Z]*/.test($(this).val())){
		pwdSpanS.css("backgroundColor","red");
		pwdSpanM.css("backgroundColor","#eeeeee ");
		pwdSpanR.css("backgroundColor","#eeeeee ");
		checkArr[1] = true;	

	}else{
		checkArr[1] = false;

	}


}
function changecheckpwd(){
	if(checkpwd.val()==pwd.val()){
		checkPwdL.text("√ 输入正确").css("color","green");
		checkPWD=true;
	}else{
		checkPwdL.text("密码不匹配").css("color","red");
		checkpwd.val("");
		checkPWD=false;
	}

}

function clickLogin(){
	// console.log(10)
	console.log(checkArr)
	console.log(checkPWD)
	console.log(messagr.val())


	if(checkArr[0]==true&&checkArr[1]==true&&checkPWD==true
		&&messagr.val()!=""){
		// return true;
		console.log(10)
		$.ajax({
			url:"/users/add",
			type:"POST",
			data:{acc:phonrNub.val(),pwd:pwd.val()},
			// data:{submitType:"addMore",phone:phonrNub.val(),messageCheck:messagr.val(),pwd:pwd.val(),checkpwd:checkpwd.val()},
			success:function(data){
				console.log(data)

				window.location.href="logIn.html";
			}
		})
	}
}