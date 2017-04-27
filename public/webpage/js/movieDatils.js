$(function(){
	$.ajax({
		url:'/getSession',
		type:"POST",
		data:{},
		success:function(data){
			getInfo(data)

		}
	})
})
function getInfo(data){
	var money;
	$('#mainPic').attr("src","../"+data.indexFile);
	$('#cName').html(data.cName);
	$('#eName').html(data.eName);
	$('#country').html(data.country);
	$('#duration').html(data.duration);
	$('#releaseTime').html(data.releaseTime);
	$('#sorce').html(data.sorce);
	$('#juqing').html(data.synopsis);
	// $('.userGrade2').html(data.money);
	if((data.money+"").length>=9){
			money=(data.money/100000000).toFixed(2)+"亿";
			$('#money').html(money);
		}else if((data.money+"").length>=5){
			money=(data.money/10000).toFixed(2)+"万";
			$('#money').html(money);
		}


}