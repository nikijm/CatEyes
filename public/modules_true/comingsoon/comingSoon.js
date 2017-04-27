define(function(require,exports,module){
	var editFlag;//编辑标记

	exports.comingData=function(){

		$("#MyTabs").tabs('add',{
			title:'即将上映管理',
			content:"<div id='hotplayr'></div>",
			closable:true
			
		});

		$("#hotplayr").load("modules/comingsoon/comingSoon.htm",function(){
			
			initcomingEvn();

		})
	}


//初始化事件
function initcomingEvn(){
	createcomingTable();//初始化创建表格
	buttonAll();
	// initcomingTableTool();//初始化工具条
	initcomingPanel();//初始化对话框(添加,修改)
	initcomingsearch();//初始化搜索框

}



//创建表格
function createcomingTable(){
	// 大的数据表
	$("#fathertableC").datagrid({
		url:"/movie3/find",
		method:"POST",
		rownumbers:true,
		singleSelect:false,	
		height:400,
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
			{field:'type',title:'类型',width:100,align:'center',editor:{type:'text',options:{}}},    
			{field:'country',title:'区域',width:100,editor:{type:'text',options:{}}},  
			{field:'age',title:'年代',width:100,editor:{type:'text',options:{}}},
			{field:'duration',title:'时长',width:100,editor:{type:'text',options:{}}},
			{field:'releaseTime',title:'上映时间',width:100,editor:{type:'text',options:{}}},
			{field:'releaseArea',title:'上映区域',width:100,editor:{type:'text',options:{}}},
			{field:'money',title:'票房',width:100,editor:{type:'text',options:{}}},
			{field:'synopsis',title:'剧情简介',width:700,resizable:true,editor:{type:'text',options:{}}},
			{field:"file",title:"图片",width:100,editor:{type:'text',option:{}} }
			// {field:'anc',title:'操作',width:200}

			]],
			toolbar: "#CSsearch"
		})
// 添加面板中的数据表
$("#sonTableC").datagrid({
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
				{field:'type',title:'类型',width:100,align:'center',editor:{type:'text',options:{}}},    
				{field:'country',title:'区域',width:100,editor:{type:'text',options:{}}},  
				{field:'age',title:'年代',width:100,editor:{type:'text',options:{}}},
				{field:'duration',title:'时长',width:100,editor:{type:'text',options:{}}},
				{field:'releaseTime',title:'上映时间',width:100,editor:{type:'text',options:{}}},
				{field:'releaseArea',title:'上映区域',width:100,editor:{type:'text',options:{}}},
				{field:'money',title:'票房',width:100,editor:{type:'text',options:{}}},
				{field:'synopsis',title:'剧情简介',width:700,resizable:true,editor:{type:'text',options:{}}},
				{field:"file",title:"图片",width:100,editor:{type:'text',option:{}} }
				
				]]
				
			})


}


// 表格工具条
function buttonAll(){
	$('#clickAdd').linkbutton({  
		plain:true,  
		iconCls: 'icon-add',
		onClick:function(){
			comingtable_add();
		}
	});
	$('#checkDel').linkbutton({  
		plain:true,  
		iconCls: 'icon-remove',
		onClick:function(){
			comingtable_detele();
		} 
	}); 
	$('#checkEdit').linkbutton({  
		plain:true,  
		iconCls: 'icon-edit',
		onClick:function(){
			comingtable_edit();
		} 
	}); 
	$('#checkSave').linkbutton({  
		plain:true,  
		iconCls: 'icon-save',
		onClick:function(){
			comingtable_save();
		} 
	}); 
	$('#clearSearchCS').linkbutton({  
		plain:true,
		iconCls: 'icon-clear',
		onClick:function(){
			$('#fathertableC').datagrid("load",{});
			$("input").val("");
		} 
	});
}

//查询
function initcomingsearch(){
	$('#searchC').searchbox({ 
		searcher:function(value,name){ 
			searchMoviesC(name,value);
			console.log(value)
		}, 
		menu:'#mmc', 
		width:250,
		prompt:'请输入值' 
	}); 

}
    //获取搜索结果
    function searchMoviesC(name,value){
    	if(name=="cName"){
    		$.ajax({
    			type:"POST",
    			url:"/movie3/find",
    			data:{cName:value},
    			success:function(data){
    				$("#fathertableC").datagrid("loadData",data);
    			}
    		})
    	}else if(name=="eName"){
    		$.ajax({
    			type:"POST",
    			url:"/movie3/find",
    			data:{eName:value},
    			success:function(data){
    				$("#fathertableC").datagrid("loadData",data);
    			}
    		})
    	}else if(name=="type"){
    		$.ajax({
    			type:"POST",
    			url:"/movie3/find",
    			data:{type:value},
    			success:function(data){
    				$("#fathertableC").datagrid("loadData",data);
    			}
    		})
    	}
    }


//初始化对话框
function initcomingPanel(){
	//添加的面板
	$("#changePanelC").dialog({
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
			handler:comingsave
		},
		{width:50,
			text:'Close',
			handler:function(){
    		//关闭面板,
    		$("#changePanelC").dialog('close');
    	}
    }]
})

	//确认修改保存的对话框
	$("#tablePanelC").dialog({
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
				$("#tablePanelC").dialog('close');
			}
		}]
	})

}



//添加按钮
function comingtable_add(){

	$("#changePanelC").dialog('open');

}


//添加按钮中的save
function comingsave(){

	var checkOption=$("#sonTableC").datagrid('getChecked');
	console.log(checkOption)

	//确认添加的话之前表格的内容将被新添加的内容覆盖
	$.messager.confirm('确认','确认后之前信息将被覆盖,是否确认？',function(r){
		if(r){
			$.ajax({
				type:"POST",
				url:"/movie3/del",
				// data:[]
			})
			$.ajax({
				type:"POST",
				url:"/movie3/add",
				data:{submitType:"addMore",
				data:JSON.stringify(checkOption)
			},

			success:function(){
				$("#fathertableC").datagrid("load",{});
				$.messager.alert('提示','数据添加成功');   
			}
		})

		}

	})
	$("#fathertableC").datagrid('clearChecked');

}


function comingtable_detele(){

	$("#deletePanelC").dialog('open');
	var checkFOption=$("#fathertableC").datagrid('getChecked');
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
	//确认删除，取消北荣不会被删除
	$.messager.confirm('确认','您确认想要删除'+names+'这'+names.length+'条记录吗？',function(r){    
		if (r){ 
			$.ajax({
				type:"POST",
				url:"/movie3/del",
				data:{ids:JSON.stringify(ids)},
				success:function(data){
					$("#fathertableC").datagrid('reload');
				}
			})
		}    
	});
} 
	//每次操作完后将被选中行进行一个清楚
	$("#fathertableC").datagrid('clearChecked');

}


//修改数据
function comingtable_edit(){
	var rows=$("#fathertableC").datagrid('getChecked');
	console.log(rows)
	if(rows.length==0){
		$.messager.confirm('警告','没有需要修改的数据');
	}
	if(rows.length==1){//选中一行的话触发事件
		if(editFlag!=undefined){//关闭编辑状态(不为空 说明被选中在编辑状态)
			$("#fathertableC").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行

		}
		else if(editFlag==undefined){//选中当前行，开启编辑状态
			var index=$("#fathertableC").datagrid('getRowIndex',rows[0]);//获取选定航的索引
			$("#fathertableC").datagrid('beginEdit',index);//开启编辑并传入要编辑的行
			editFlag=index;
		}

	}

}
//保存与修改相关
function comingtable_save(){

	$("#fathertableC").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行
	editFlag=undefined;
	var selectRow=$("#fathertableC").datagrid('getChecked')[0];//取出当前修改的行
	console.log(selectRow);

	$.ajax({
		type:"POST",
		url:"/movie3/update",
		data:selectRow,
		success:function(){
			$("#tablePanelC").dialog('open');
		}
	})

	$("#fathertableC").datagrid('clearChecked');//clearChecked清除所有勾选的行

}

});

















































