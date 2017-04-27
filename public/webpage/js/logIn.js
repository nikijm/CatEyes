
$(function(){

	init();

})

function init(){

	$("#myBtn").on("click",clickLoginE)
	
}

function clickLoginE(){
	$.ajax({
		url:"/users/find",
		type:"POST",
		data:{acc:$("#acc").val(),pwd:$("#pwd").val(),addSession:1},
		success:function(data){
			console.log(data)			
			if(data.length>0){
				console.log("登录成功")
				location.href="homepage.html"
			}else{				
				alert("用户名或密码错误，请重新输入！")
			}
			
		}
	})







}