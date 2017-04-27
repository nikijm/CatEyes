define(function(require,exports,module){
	

	exports.hotPlayData=function(){
		$("#MyTabs").tabs('add',{
			title:'热播电影管理',
			content:"<div id='hotplayM'></div>",
			closable:true,

		});

		$("#hotplayM").load("modules/hotPlay/hotPlay.htm",function(){

			inithotPlayEvn();

		})
	}
});
var editFlag;//编辑标记

//初始化事件
function inithotPlayEvn(){
	createhotPlayTable();//初始化创建表格
	buttonAllP();//初始化工具条
	inithotPlayPanel();//初始化对话框(添加,修改)
	inithotPlaysearch();//初始化搜索框

}


//创建表格
function createhotPlayTable(){
	// 大的数据表
	$("#fathertableH").datagrid({
		url:"/movie4/find",
		method:"POST",
		rownumbers:true,
		singleSelect:false,	
		height:400,
		nowrap:true,
		fixed:false,
		idField:"_id",
		fitColumns:false,
		pagination:true,
		pageSize:20,
		pageList:[20,30,40,50],
		columns:[[
			// {field:"_id",title:""},//  editor 设置其为可编辑，设置样式，自带
			{field:"checked" ,checkbox:true},
			{field:'cName',title:'中文名',width:100,editor:{type:'text',options:{}}},  
			{field:'eName',title:'英文名',width:200,editor:{type:'text',options:{}}},    
            {field:"astor",title:"主演",width:100,editor:{type:'text',option:{}} },
			{field:'type',title:'类型',width:100,align:'center',editor:{type:'text',options:{}}},    
			{field:'country',title:'区域',width:100,editor:{type:'text',options:{}}},  
			{field:'age',title:'年代',width:100,editor:{type:'text',options:{}}},
			{field:'duration',title:'时长',width:100,editor:{type:'text',options:{}}},
			{field:"xk",title:"想看",width:100,editor:{type:'text',option:{}} },
			{field:'releaseTime',title:'上映时间',width:100,editor:{type:'text',options:{}}},
			{field:'releaseArea',title:'上映区域',width:100,editor:{type:'text',options:{}}},
			{field:"sorce",title:"评分",width:100,editor:{type:'text',option:{}} },
			{field:'money',title:'票房',width:100,editor:{type:'text',options:{}}},
			{field:'synopsis',title:'剧情简介',width:700,resizable:true,editor:{type:'text',options:{}}},
			{field:"file",title:"图片",width:100,editor:{type:'text',option:{}} }

			]],
			toolbar: "#HPsearch"


		})
// 添加面板中的数据表
$("#sonTableH").datagrid({
	url:"/dianying/find",
	method:"POST",
	rownumbers:true,
	singleSelect:false,
	idField:"_id",
	fitColumns:false,
	pagination:true,
	pageSize:20,
	pageList:[20,30,40,50],
	columns:[[
				// {field:"id",title:""},//  editor 设置其为可编辑，设置样式，自带
				{field:"checked" ,checkbox:true},
				{field:'cName',title:'中文名',width:100,editor:{type:'text',options:{}}},  
				{field:'eName',title:'英文名',width:200,editor:{type:'text',options:{}}},    
				{field:"astor",title:"主演",width:100,editor:{type:'text',option:{}} },
				{field:'type',title:'类型',width:100,align:'center',editor:{type:'text',options:{}}},    
				{field:'country',title:'区域',width:100,editor:{type:'text',options:{}}},  
				{field:'age',title:'年代',width:100,editor:{type:'text',options:{}}},
				{field:'duration',title:'时长',width:100,editor:{type:'text',options:{}}},
				{field:"xk",title:"想看",width:100,editor:{type:'text',option:{}} },
				{field:'releaseTime',title:'上映时间',width:100,editor:{type:'text',options:{}}},
				{field:'releaseArea',title:'上映区域',width:100,editor:{type:'text',options:{}}},
				{field:"sorce",title:"评分",width:100,editor:{type:'text',option:{}} },
				{field:'money',title:'票房',width:100,editor:{type:'text',options:{}}},
				{field:'synopsis',title:'剧情简介',width:700,resizable:true,editor:{type:'text',options:{}}},
				{field:"file",title:"图片",width:100,editor:{type:'text',option:{}} }

				]]

			})


}


// // 表格工具条
function buttonAllP(){
	$('#clickAddP').linkbutton({  
		plain:true,  
		iconCls: 'icon-add',
		onClick:function(){
			hotPlaytable_add();
		}
	});
	$('#checkDelP').linkbutton({  
		plain:true,  
		iconCls: 'icon-remove',
		onClick:function(){
			hotPlaytable_detele();
		} 
	}); 
	$('#checkEditP').linkbutton({  
		plain:true,  
		iconCls: 'icon-edit',
		onClick:function(){
			hotPlaytable_edit();
		} 
	}); 
	$('#checkSaveP').linkbutton({  
		plain:true,  
		iconCls: 'icon-save',
		onClick:function(){
			hotPlaytable_save();
		} 
	}); 
	$('#clearSearchHp').linkbutton({  
		plain:true,
		iconCls: 'icon-clear',
		onClick:function(){
			$('#fathertableH').datagrid("load",{});
			$("input").val("");
		} 
	});

}
    //查询
    function inithotPlaysearch(){
    	$('#searchCP').searchbox({ 
    		searcher:function(value,name){ 
    			searchMoviesH(name,value);
    		}, 
    		menu:'#mmcP', 
    		width:250,
    		prompt:'请输入值' 
    	}); 

    }

    function searchMoviesH(name,value){
    	if(name=='cName'){
    		$.ajax({
    			type:"POST",
    			url:"/movie4/find",
    			data:{cName:value},
    			submitType:"findJoin",
    			ref:"movie4",
    			success:function(data){
    				$("#fathertableH").datagrid("loadData",data);
    			}
    		})
    	}else if(name='eName'){
    		$.ajax({
    			type:"POST",
    			url:"/movie4/find",
    			data:{eName:value},
    			success:function(data){
    				$("#fathertableH").datagrid("loadData",data);
    			}
    		})
    	}else if(name='type'){
    		$.ajax({
    			type:"POST",
    			url:"/movie4/find",
    			data:{type:value},
    			success:function(data){
    				$("#fathertableH").datagrid("loadData",data);
    			}
    		})
    	}

    }

//初始化对话框
function inithotPlayPanel(){
	//添加的面板
	$("#changePanelH").dialog({
		title:"增加",
		width:700,
		height:400,
		closeable:true,
		closed:true,
		cache:false,
		modal:true,
		buttons:[{
			width:50,
			text:'Save',
			handler:hotPlaysave
		},
		{width:50,
			text:'Close',
			handler:function(){
    		// console.log(1)
    		//关闭面板,
    		$("#changePanelH").dialog('close');
    	}
    }]
})

//确认修改保存的对话框
$("#tablePanelH").dialog({
	title: '操作', 
	width:300,
	height:200, 
	closeable:true,    
	closed: true,    
	cache: false, 
	modal: true ,
	buttons:[{
		width:50,
		text:'确定',
		handler:function(){
			$("#tablePanelH").dialog('close');
		}
	}]
})

}

//添加按钮
function hotPlaytable_add(){

	$("#changePanelH").dialog('open');

}

//添加按钮中的save
function hotPlaysave(){

	var checkOption=$("#sonTableH").datagrid('getChecked');
	console.log(checkOption)
	$.messager.confirm('确认','确认后之前信息将被覆盖,是否确认？',function(r){
		if(r){
			$.ajax({
				url:"/movie4/del",
				type:"POST"
			})
			$.ajax({
				type:"POST",
				url:"/movie4/add",
				data:{submitType:"addMore",
				data:JSON.stringify(checkOption)
			},

			success:function(){
				$("#fathertableH").datagrid("load",{});
				$.messager.alert('提示','数据添加成功');   
			}
		})
		}
	});
	$("#fathertableH").datagrid('clearChecked');
}

//删除
function hotPlaytable_detele(){

	// $("#deletePanelH").dialog('open');
	var checkFOption=$("#fathertableH").datagrid('getChecked');

	var ids=[];//由对象组成的数组,也就是每点击一行存起来的数组
	var names=[];
	for(var obj of checkFOption){
		ids.push(obj._id);//把选中项的_id取出来存入数组
		names.push(obj.cName);
	}
	console.log(ids)
	if(checkFOption.length==0){
		$.messager.confirm('警告','没有需要删除的数据');
	}else{

	$.messager.confirm('确认','您确认想要删除'+names+'这'+names.length+'条记录吗？',function(r){    
		if (r){    
			$.ajax({
				type:"POST",
				url:"/movie4/del",
				data:{ids:JSON.stringify(ids)},

				success:function(data){
					$("#fathertableH").datagrid('reload');

				}
			})
		}    
	}); 
 }
	$("#fathertableH").datagrid('clearChecked');
}

//修改数据
function hotPlaytable_edit(){
	var rows=$("#fathertableH").datagrid('getChecked');
	if(rows.length==0){
		$.messager.confirm('警告','没有需要修改的数据');
	}
	if(rows.length==1){//选中一行的话触发事件
		if(editFlag!=undefined){//关闭编辑状态(不为空 说明被选中在编辑状态)
			$("#fathertableH").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行
		}
		else if(editFlag==undefined){//选中当前行，开启编辑状态
			var index=$("#fathertableH").datagrid('getRowIndex',rows[0]);//获取选定航的索引
			$("#fathertableH").datagrid('beginEdit',index);//开启编辑并传入要编辑的行
			editFlag=index;
		}
	}
}

//保存与修改相关
function hotPlaytable_save(){

	$("#fathertableH").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行
	editFlag=undefined;
	var selectRow=$("#fathertableH").datagrid('getChecked')[0];//取出当前修改的行
	console.log(selectRow);
	$.ajax({
		type:"POST",
		url:"/movie4/update",
		data:selectRow,
		success:function(){
			$("#tablePanelH").dialog('open');
		}
	})

	$("#fathertableH").datagrid('clearChecked');//clearChecked清除所有勾选的行

}





