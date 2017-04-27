var imgIndex=0;//轮播图集
var hotPlayData;//正在热映
var soonFilmData;//即将上映
var hotFData;//正在热播
var filmTop;//今日票房

$(function(){

	initEvn();

})


function initEvn(){

	setInterval(show,2000);//轮播定时器
	hotPlayAjax();//正在热映的ajax请求
	soonFilmAjax();//即将上映的ajax请求
	hotFAjax();//正在热播
	filmTopAjax();//今日票房的ajax请求

	$.ajax({
			url:'/getSession',
			type:"POST",
			data:{},
			success:function(data){
				console.log(data);
				console.log(data.acc);
				$("#login").html(data.acc+"已");
				var uesrPic="../images/touxiang.jpg"
				$('#userP').attr('src',uesrPic);

			}
		})


}


//轮播
var bannnerImgs=["homePage/lunbo_2.jpg","homePage/lunbo_3.jpg","homePage/lunbo_4.jpg"];

function show(){
	$("#Hpic").attr("src","img/"+bannnerImgs[imgIndex]);
	imgIndex++;
	if(imgIndex==3){
		imgIndex=0;
	}

}

//正在热映的ajax请求
function hotPlayAjax(){
	$.ajax({
		type:"POST",
		url:"/movie2/find",
		data:{page:1,rows:8},
		success:function(data){
			// console.log(data.rows);//对象
			hotPlayData=data.rows;
			// console.log(hotPlayData[0].cName);
			// console.log(hotPlayData[0].file);
			filedHotMovie();
			
		}
	})


}

$(".infoPic").on("click",function(){
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


function filedHotMovie(){
var nameD=$(".newP");//电影名
// console.log(nameD)
var imgD=$(".full img");//图集
var sorceD=$(".Fen .first");//评分
// console.log(imgD);
for(var i=0;i<hotPlayData.length;i++){
	nameD[i].innerHTML=hotPlayData[i].cName;
	imgD[i].src='../'+hotPlayData[i].indexFile;
	sorceD[i].innerHTML=hotPlayData[i].sorce;

}

}
//即将上映的ajax请求
function soonFilmAjax(){
	$.ajax({
		type:"POST",
		url:"/movie3/find",
		data:{page:1,rows:8},
		success:function(data){
			// console.log(data.rows);//对象
			soonFilmData=data.rows;
			soonFilmMovie();
			
		}
	})
}

function soonFilmMovie(){
	var nameSD=$(".SMP");//电影名
	var filmImg=$('.part4-1 img');//图集
	var wangToSee=$('.hot span');//想看
	var releaseTime=$('.yaya p')


	for(var i =0;i<soonFilmData.length;i++){
		nameSD[i].innerHTML=soonFilmData[i].cName;
		filmImg[i].src='../'+soonFilmData[i].indexFile;
		wangToSee[i].innerHTML=soonFilmData[i].xk;
		releaseTime[i].innerHTML=soonFilmData[i].releaseTime;
	}
}

//正在热播ajax请求
function hotFAjax(){
		$.ajax({
		type:"POST",
		url:"/movie4/find",
		data:{page:1,rows:10},
		success:function(datas){
			console.log(datas.rows);//对象
			hotFData=datas.rows;
			hotFMovie();
			
		}
	})
}

function hotFMovie(){	
for(var i=0;i<hotFData.length;i++){
	var imgHD='../'+hotFData[i].indexFile;//图集
	 $(".HopP").eq(i).text(hotFData[i].cName);
	$(".imgP").eq(i).attr('src',imgHD);

}

}
//今日票房
function filmTopAjax(){
$.ajax({
		type:"POST",
		url:"/movie4/find",
		data:{},
		success:function(datas){
			// console.log(datas.rows);//对象
			filmTop=datas;
			filmTopMovie();
			
		}
	})

}

function filmTopMovie(){

	for(var j=0;j<filmTop.length;j++){
		for(var n=j+1;n<filmTop.length;n++){
			if(parseInt(filmTop[j].money)<parseInt(filmTop[n].money)){
				var temp=filmTop[j];
				filmTop[j]=filmTop[n];
				filmTop[n]=temp;
			}

		}
	}
	console.log(filmTop)
	//top1的图片
	var Imgs='../'+filmTop[0].indexFile;
	$(".topImg").attr("src",Imgs).css("height",80);

	//排序
	for(var i=0;i<filmTop.length;i++){
		if(filmTop[i].money.length>=9){
			var money=(filmTop[i].money/100000000).toFixed(2)+"亿";
		}else if(filmTop[i].money.length>=5){
			var money=(filmTop[i].money/10000).toFixed(2)+"万";
		}

		 $(".topF").eq(i).text(filmTop[i].cName );
		 $(".nini").eq(i).text(money)

	}

}


