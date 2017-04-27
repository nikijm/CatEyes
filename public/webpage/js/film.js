var hotMovieData;
var newData;
$("#hotF").on("click",clickHotF);//按热门排
$("#timeF").on("click",clicktimeF);//按票房排
$("#scoreF").on("click",clickscoreF);//按评分排序


// var nowPage = 1;
// var maxPage = 1;
// const PAGECELL = 6;


$(function(){
	initEvnF();
})


function initEvnF(){

hotMovie();

$("#second").on('click',clickSecondPage);
$("#lastPage").on('click'.clickLastPage);

}

$('li>a').on("click",function(){
	var searceData=$(this).html();
	// console.log(searceData);
	$.ajax({
		type:"POST",
		url:"/dianying/find",
		data:{type:searceData},
		success:function(data){
			hotMovieData=data;
			console.log(hotMovieData)
			// searchDatil();
			// $(".filmList").datagrid("loadData",data);
			fildDatil()

		}
	})

})


function hotMovie(){
	$.ajax({
		url:"/dianying/find",
		type:"POST",
		data:{page:1,rows:12},
		success:function(data){
			hotMovieData=data.rows;
			// console.log(hotMovieData)
			clickHotF();
			
		}

	})
}

//翻页 第二页
function clickSecondPage(){
		$.ajax({
		url:"/dianying/find",
		type:"POST",
		data:{page:2,rows:12},
		success:function(data){
			hotMovieData=data.rows;
			// console.log(data.rows)
			fildDatil();
			
		}

	})
}

function clickLastPage(){


}

function clickHotF(){

	for(var j=0;j<hotMovieData.length;j++){
		for(var n=j+1;n<hotMovieData.length;n++){
			if(parseInt(hotMovieData[j].xk)<parseInt(hotMovieData[n].xk)){
				var temp=hotMovieData[j];
				hotMovieData[j]=hotMovieData[n];
				hotMovieData[n]=temp;
			}

		}
	}

	fildDatil();

}

function clicktimeF(){

for(var j=0;j<hotMovieData.length;j++){

		for(var n=j+1;n<hotMovieData.length;n++){
			if(parseInt(hotMovieData[j].money)<parseInt(hotMovieData[n].money)){
				var temp=hotMovieData[j];
				hotMovieData[j]=hotMovieData[n];
				hotMovieData[n]=temp;
			}

		}
	}
	fildDatil();
}

function clickscoreF(){

for(var j=0;j<hotMovieData.length;j++){

		for(var n=j+1;n<hotMovieData.length;n++){
			if(parseFloat(hotMovieData[j].sorce)<parseFloat(hotMovieData[n].sorce)){
				var temp=hotMovieData[j];
				hotMovieData[j]=hotMovieData[n];
				hotMovieData[n]=temp;
			}

		}
	}

fildDatil();
	
}


function fildDatil(){
	
	$('hotMpic').attr('src','');
	$('.movieName').html('');
	$(".sorceF").html('');
	$(".sorceC").html('');

	for(let i=0;i<hotMovieData.length;i++){
		var aa=parseFloat(hotMovieData[i].sorce)
		var bb=aa.toString().replace(/\d+\.(\d*)/,"$1");//取得评分小数点后面的数
		var imgSrc="../"+hotMovieData[i].indexFile;
		$(".hotMpic").eq(i).attr("src",imgSrc).css({"width":160,"height":220});
		$('.movieName').eq(i).text(hotMovieData[i].cName);		
		$(".sorceF").eq(i).text(parseInt(hotMovieData[i].sorce)+".") 
	    $(".sorceC").eq(i).text(bb) 

	}
}

// function searchDatil(){
	
// 	$('hotMpic').attr('src','');
// 	$('.movieName').html('');
// 	$(".sorceF").html('');
// 	$(".sorceC").html('');

// 	for(let i=0;i<hotMovieData.length;i++){
// 		var aa=parseFloat(hotMovieData[i].sorce)
// 		var bb=aa.toString().replace(/\d+\.(\d*)/,"$1");//取得评分小数点后面的数
// 		var imgSrc="../"+hotMovieData[i].indexFile;
// 		$(".hotMpic").eq(i).attr("src",imgSrc).css({"width":160,"height":220});
// 		$('.movieName').eq(i).text(hotMovieData[i].cName);		
// 		$(".sorceF").eq(i).text(parseInt(hotMovieData[i].sorce)+".") 
// 	    $(".sorceC").eq(i).text(bb) 

// 	}
// }

