define(function(require,exports,module){
	var editFlag;//编辑标记

	exports.hotReData=function(){
		$("#MyTabs").tabs('add',{
			title:'热映电影管理',
			content:"<div id='hotplayH'></div>",
			closable:true

		});
		


		$("#hotplayH").load("modules/hotRelease/hotRelease.htm",function(){

			inithotReEvn();

		})
	}


//初始化事件
function inithotReEvn(){
	createTable();//初始化创建表格
	buttonAllH();//初始化工具条
	initPanel();//初始化对话框(添加,修改)
	initsearch();//初始化搜索框
}


//创建表格
function createTable(){
	// 大的数据表
	$("#fathertable").datagrid({
		url:"/movie2/find",
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

			// {field:'anc',title:'操作',width:200}

			]],
			toolbar: "#HRsearch"
		})
// 添加面板中的数据表
$("#sonTable").datagrid({
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

// 表格工具条
function buttonAllH(){
	$('#clickAddH').linkbutton({  
		plain:true,  
		iconCls: 'icon-add',
		onClick:function(){
			table_add();
		}
	});
	$('#checkDelH').linkbutton({  
		plain:true,  
		iconCls: 'icon-remove',
		onClick:function(){
			table_detele();
		} 
	}); 
	$('#checkEditH').linkbutton({  
		plain:true,  
		iconCls: 'icon-edit',
		onClick:function(){
			table_edit();
		} 
	}); 
	$('#checkSaveH').linkbutton({  
		plain:true,  
		iconCls: 'icon-save',
		onClick:function(){
			table_save();
		} 
	}); 
	$('#clearSearchHR').linkbutton({  
		plain:true,
		iconCls: 'icon-clear',
		onClick:function(){
			$('#fathertable').datagrid("load",{});
			$("input").val("");
		} 
	});

}
    //查询
    function initsearch(){
    	$('#searchCH').searchbox({ 
    		searcher:function(value,name){ 
    			searchMoviesR(name,value);
    		}, 
    		menu:'#mmcH', 
    		width:250,
    		prompt:'请输入值' 
    	}); 
    }
    function searchMoviesR(name,value){
    	if(name=='cName'){
    		$.ajax({
    			type:"POST",
    			url:"/movie2/find",
    			data:{cName:value},
    			submitType:"findJoin",
    			ref:"movie2",
    			success:function(data){
    				$("#fathertable").datagrid("loadData",data);

    			}
    		})
    	}else if(name='eName'){
    		$.ajax({
    			type:"POST",
    			url:"/movie2/find",
    			data:{eName:value},
    			success:function(data){
    				$("#fathertable").datagrid("loadData",data);

    			}
    		})
    	}else if(name='type'){
    		$.ajax({
    			type:"POST",
    			url:"/movie2/find",
    			data:{type:value},
    			success:function(data){
    				$("#fathertable").datagrid("loadData",data);

    			}
    		})
    	}

    }


//初始化对话框
function initPanel(){
	//添加的面板
	$("#changePanel").dialog({
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
			handler:save
		},
		{width:50,
			text:'Close',
			handler:function(){
    		// console.log(1)
    		//关闭面板,
    		$("#changePanel").dialog('close');
    	}
    }]
})


	//确认修改保存的对话框
	$("#tablePanel").dialog({
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
				$("#tablePanel").dialog('close');
			}
		}]
	})

}



//添加按钮
function table_add(){

	$("#changePanel").dialog('open');

}


//添加按钮中的save
function save(){
	var checkOption=$("#sonTable").datagrid('getChecked');
	console.log(checkOption)
	$.messager.confirm('确认','确认后之前信息将被覆盖,是否确认？',function(r){
		if(r){
			$.ajax({
				url:"/movie2/del",
				type:"POST"
			})
			$.ajax({
				type:"POST",
				url:"/movie2/add",
				data:{submitType:"addMore",
				data:JSON.stringify(checkOption)
			},
			success:function(){
				$("#fathertable").datagrid("load",{});
			// $("#fathertable").datagrid("reload");
			$.messager.alert('提示','数据添加成功');   
		}
	})

		}

	})
	$("#fathertable").datagrid('clearChecked');
	
}



//删除
function table_detele(){

	$("#deletePanel").dialog('open');
	var checkFOption=$("#fathertable").datagrid('getChecked');
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
				url:"/movie2/del",
				data:{ids:JSON.stringify(ids)},		
				success:function(data){
					$("#fathertable").datagrid('reload');
				}
			})

		}    
	}); 
} 

	$("#fathertable").datagrid('clearChecked');

}
//修改数据
function table_edit(){
	var rows=$("#fathertable").datagrid('getChecked');
	console.log(rows)
	if(rows.length==0){
		$.messager.confirm('警告','没有需要修改的数据');
	}
	if(rows.length==1){//选中一行的话触发事件
		if(editFlag!=undefined){//关闭编辑状态(不为空 说明被选中在编辑状态)
			$("#fathertable").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行

		}
		else if(editFlag==undefined){//选中当前行，开启编辑状态
			var index=$("#fathertable").datagrid('getRowIndex',rows[0]);//获取选定航的索引
			$("#fathertable").datagrid('beginEdit',index);//开启编辑并传入要编辑的行
			editFlag=index;
		}

	}

}
//保存与修改相关
function table_save(){

	$("#fathertable").datagrid('endEdit',editFlag);//结束编辑，传入之前编辑的行
	editFlag=undefined;
	var selectRow=$("#fathertable").datagrid('getChecked')[0];//取出当前修改的行
	console.log(selectRow);

	$.ajax({
		type:"POST",
		url:"/movie2/update",
		data:selectRow,
		success:function(){
			$("#tablePanel").dialog('open');
		}
	})

	$("#fathertable").datagrid('clearChecked');//clearChecked清除所有勾选的行

}

});
