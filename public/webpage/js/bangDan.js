var bdTop;


$(function(){
	initEvn();
})

function initEvn(){
	bangDanTop();
	
}

function bangDanTop(){
		$.ajax({
		type:"POST",
		url:"/movie2/find",
		data:{},
		success:function(data){
			bdTop=data;
			bdTopMovie();
			// console.log(data)		
		}
	})
}

$(".topImg").on("click",function(){
	var getDetail=$(this).attr("src").slice(10);//分割 得到src
	console.log(getDetail)
	$.ajax({
		url:"/dianying/find",
		type:"POST",
		data:{indexFile:getDetail,addSession:1},
		success:function(data){
			console.log(data)
			location.href='movieDatils.html';
		}
	})
})

function bdTopMovie(){

		for(var j=0;j<bdTop.length;j++){
		for(var n=j+1;n<bdTop.length;n++){			
			if(parseFloat(bdTop[j].sorce)<parseFloat(bdTop[n].sorce)){
				var temp=bdTop[j];
				bdTop[j]=bdTop[n];
				bdTop[n]=temp;
			}

		}
	}
	for(let i=0;i<bdTop.length;i++){
		var imgSrc="../"+bdTop[i].indexFile;
		var aa=parseFloat(bdTop[i].sorce)
		console.log(aa)
		var bb=aa.toString().replace(/\d+\.(\d*)/,"$1");//取得评分小数点后面的数
		console.log(bb)
		// console.log(bdTop[0].sorce)
		// console.log(imgSrc)
		$(".info1").eq(i).text(bdTop[i].cName);
		$(".info2").eq(i).text(bdTop[i].astor);
		$(".info3").eq(i).text("上映时间："+ bdTop[i].releaseTime);
		$(".topImg").eq(i).attr("src",imgSrc).css({"width":160,"height":220});
	    $(".topS").eq(i).text(parseInt(bdTop[i].sorce)+".") 
	    $(".topS2").eq(i).text(bb) 
	}
	var newDate = new Date();
	var newd=$('.update-time').html((newDate.getYear()+1900)+"-"+(newDate.getMonth()+1)+"-"+(newDate.getDate())+' <span>已更新</span>');
console.log(newd)

	

}


