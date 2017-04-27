define(function(require,exports,module){

	require("jquery");
	require("easyui")($);
	var yinxun = yinxun;
	var dianyin=dianyin;


//安全退出
$("#rloginOut").on("click",function(){
	$.ajax({
		url:"/logout",
		type:"POST",
		success:function(){
			location.href='loginM.html';
		}

})
})


	var um = require("um");
	var match = require("match");
	var hotRelease=require("hotRelease");
	var ComingSoon=require("ComingSoon");
	var hotplay=require("hotplay");
	var cinemaManager=require("cinemaManage");
	var yinxun=require("yinxun");
	var dianyin=require("dianyin");


	$('#ll').tree({
		onClick: function(node){
			if(node.text=="用户管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createUserM();
				}
			}else if(node.text=="资讯管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createNewsM();
				}
			}else if(node.text=="电影管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createMovieM();
				}
			}else if(node.text=="院线管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createCinemaM();
				}
			}else if(node.text=="电影院线匹配管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createMatchM();
				}
			}else if(node.text=="热映电影管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createReleaseM();
				}
			}else if(node.text=="即将上映管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createComingM();
				}
			}else if(node.text=="热播电影管理"){
				if($('#MyTabs').tabs("exists",node.text)){
					$('#MyTabs').tabs("select",node.text);
				}else{
					createPlayM();
				}
			}
		}
	});

	function createUserM(){
		um.userm();
	}

	function createNewsM(){
		yinxun.wode();
	}

	function createMovieM(){
		dianyin.dianguanli();
	}

	function createCinemaM(){
		cinemaManager.cinemaManage();
	}

	function createMatchM(){
		match.loadWeb();
	}

	function createReleaseM(){
		hotRelease.hotReData();
	}

	function createComingM(){
		ComingSoon.comingData();

	}

	function createPlayM(){
		hotplay.hotPlayData();
	}



})
