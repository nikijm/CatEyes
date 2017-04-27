$.ajax({
	type:"POST",
	async:false,
	url:"/getSession",
	data:{},
	success:function(data){
		var strdata=JSON.stringify(data);
		if(strdata=="{}"){
			location.href='loginM.html';
		}
		else{
			$(function(){
				$("#userName").html(data.acc)
			})
		}

	}
})