define(function(require, exports, modules){

	var count = 0;		//id计数
	var g_thname;
	var editFlag;

	exports.cinemaManage = function(){

		$("#MyTabs").tabs("add",{
			title:"院线管理",			
			closable:true,
			id:'cinemaManagePanel'			  
		});

		
		$("#cinemaManagePanel").load("modules/cinemaManage/cinemaManage.html",function(){

			init();
			$('#fangYingBtn').on('click',addxuanzuo)

		});
	

		//初始化
		function init(){
 
			reloadTable();                             //刷新
			manageTable();                            //获取数据
			addTool();                               //添加图标
			// addDivDialog();                         //面板dialog
			addCinema();                           //添加数据
			removeCinema();                       //删除数据
			searchboxCinema();                   //查询
			clearSearch();                      //清除查询
			editCinema();
			saveCinema();
			// addHall();					   	   //增加放映厅
			// searchSeat();                     //座位查看
			$("#see").on("click",see);			//查看座位按钮函数

			// addWindow();		//初始化弹窗
			fangYingBtn();			//调用添加放映厅按钮函数

			// $("#tanchuang").dialog("close");		//隐藏确认添加弹窗
			// $("#allRemove").dialog("close");		//隐藏确认删除弹窗
			// $("#seeDiv").dialog("close");//隐藏查询弹窗

		}

		//获取表格数据
		function manageTable(){

			$("#manageTable").datagrid({
				rownumbers: true,				
				// singleSelect:true,
				method:'post',
				url:'/cinemas/find',
				pageSize:10,
				pageList:[5,10,15,20],
				fit:true,
				idField:'_id',
				striped:true,
				pagination:true,
				columns:[[
					{field:'ck',checkbox:true},
					{field:'cinemaName',title:'院线名',width:100},
					{field:'address',title:'地址',width:100,editor: {type:'text',options:{}} },    
					{field:'phone',title:'电话',width:100,editor: {type:'numberbox',options:{}} }
					// {field:'itemid',title:'操作',width:80,align:'center',
					// 	formatter:function(value,row,index){    //添加操作的按钮(保存和修改)
					// 		return  `<a onclick="javascript:saveCinema()">
					// 		<img style="vertical-align: middle;" src="images/filesave.png"></a>
					// 		<a class="easyui-linkbutton" style="padding:2px;background-color:#f4f4f4;color:black" onclick="javascript:changeCinema()">修改</a>`;
					// 	}
					// }
				]],
				toolbar:"#tool"   //添加表格增删查
			});
		}


		//表头添加增、删、刷图标 
		//添加选座、增加放映厅图标
		function addTool(){

			$("#addCinema").linkbutton({    
			    iconCls: 'icon-add',
			    plain:true
			});

			$("#removeCinema").linkbutton({    
			    iconCls: 'icon-remove',
			    plain:true
			}); 

			$("#editCinema").linkbutton({    
			    iconCls: 'icon-edit',
			    plain:true
			}); 

			$("#saveCinema").linkbutton({    
			    iconCls: 'icon-save',
			    plain:true
			}); 

			$("#reloadTable").linkbutton({    
			    iconCls: 'icon-reload',
			    plain:true
			});  

			$("#see").linkbutton({    
			    iconCls: 'icon-search',
			}); 

			$("#fangYingBtn").linkbutton({    
			    iconCls: 'icon-add',
			    plain:true
			}); 
			$("#seeHall").linkbutton({    
			    iconCls: 'icon-search',
			    plain:true
			});
		}


		//刷新表格数据
		function reloadTable(){
			$("#reloadTable").on("click",function(){
				$("#manageTable").datagrid("reload");
			});
		}


		//给增加面板dialog属性
		// function addDivDialog(){

		// 	$("#addDiv").dialog({
		// 	    title:"增加",
		// 	    closable:true,
		// 	    closed: true,
		// 	    cache: false,
		// 	    modal: true,
		// 	    buttons:[{
		// 	        text:'Save',
		// 	        handler:function(){
		// 	            //提交表单
		// 	            $('#addForm').submit();
			            
		// 	        }
		// 	    },{
		// 	        text:'Close',
		// 	        handler:function(){
		// 	            $("#addDiv").dialog("close");
		// 	        }
		// 	    }]
		// 	});
		// }


		//添加
		// function addCinema(){

		// 	$("#addCinema").on('click',function(){
		// 		$("#addDiv").dialog("open");
		// 		$("#addForm").form({
		// 			url:"/cinemas/add",
		// 			novalidate:true,
		// 			success:function(data){
		// 				$("#addDiv").dialog("close");
		// 				$.messager.alert('恭喜','添加成功');
		// 				$("#manageTable").datagrid("reload");
		// 				$("#addForm").find("input").val("");
		// 			}
		// 		});							
		// 	});
		// }

		//删除
		function removeCinema(){

			$("#removeCinema").on('click',function(){

				var selectOptions = $("#manageTable").datagrid("getChecked");
				var ids = [];
				for (var i = 0; i < selectOptions.length; i++) {
					ids.push(selectOptions[i]._id);
				}

				$.ajax({
					type:'post',
					url:'/cinemas/del',
					data:{ids:JSON.stringify(ids)},
					success:function(data){
						if(data){
							$.messager.alert('恭喜','删除成功');    
							$("#manageTable").datagrid("reload");
						}
					}
				});
			});
		}

		//修改
		function editCinema(){

			$("#editCinema").on('click',function(){

				var rows = $("#manageTable").datagrid("getChecked");    
				if(rows.length == 1){ 
					if(editFlag != undefined) {  
						$("#manageTable").datagrid('endEdit',editFlag);  	
					}else if(editFlag == undefined){     
						var index = $("#manageTable").datagrid('getRowIndex',rows[0]);
						$("#manageTable").datagrid('beginEdit',index);  
						editFlag = index;
					}				
				}
			})
		}

		//保存
		function saveCinema(){

			$("#saveCinema").on('click',function(){

				$("#manageTable").datagrid('endEdit',editFlag);
				editFlag = undefined;
				var selectRow = $('#manageTable').datagrid("getChecked")[0]; 
				$.ajax({
					type:'post',
					url:'/cinemas/update',
					data:selectRow,
					success:function(data){
						$.messager.alert('恭喜','修改成功');    
					}
				});
				$("#manageTable").datagrid('clearChecked');
			})
		}


		//查询
		function searchboxCinema(){

			$('#ss').searchbox({ 
				searcher:function(value,name){ 
					searchCinema(name,value);
				},
				menu:'#mm'
			});
		}


		//联动查询
		function searchCinema(name,value){

			if(name=="phone"){
				$.ajax({
					type:"post",
					url:"/cinemas/find",
					data:{phone:value},
					success:function(data){
						$("#manageTable").datagrid("loadData",data);
					}
				});
			}else if(name=="address"){
				$.ajax({
					type:"post",
					url:"/cinemas/find",
					data:{address:value},
					success:function(data){
						$("#manageTable").datagrid("loadData",data);
					}
				});
			}else if(name=="all"){
				$.ajax({
					type:"post",
					url:"/cinemas/find",
					data:{cinemaName:value},
					success:function(data){
						$("#manageTable").datagrid("loadData",data);
					}
				});
			}
		}


		//清空查询,数据全部显示
		function clearSearch(){

			$("#clearSearch").on("click",function(){
				$("#manageTable").datagrid("load",{});  
				$("#tool").find("input").val("");   
			});
		}
		

		// //放映厅增加
		// function addHall(){			
		// 	$("#addScreens").on("click",function(){
		// 		$("#addHallSeat").dialog({
		// 			title:"增加放映厅",
		// 	        closable: true,
		// 	        closed: true,
		// 	        width: 450,
		// 	        height: 177,
		// 			draggable: false,
		// 			buttons:[{
		// 		        text:'Save',
		// 		        handler:function(){
		// 		            $('#addHallForm').submit();				            
		// 		        }
		// 		    },{
		// 		        text:'Close',
		// 		        handler:function(){
		// 		            $("#addHallSeat").dialog("close");
		// 		        }
		// 		    }]
		// 		});
		// 		$("#addHallSeat").dialog("open");

		// 		$("#addHallForm").form({
		// 			url:"/hallSeat/add",
		// 			novalidate:true,
		// 			success:function(data){
		// 				$("#addHallSeat").dialog("close");
		// 				$.messager.alert('恭喜','影厅添加成功');
		// 			}
		// 		});	
		// 	});
		// }

		// //座位查看
		// function searchSeat(){

		// 	$("#searchSeat").on("click",function(){	
		// 		$("#seat").dialog({
		// 			title:"显示放映厅的座位",
		// 	        closable: true,
		// 	        closed: true,
		// 	        width: 450,
		// 	        height: 110,
		// 			draggable: false 
		// 		});
		// 		$("#seat").dialog("open");
				
		// 		$.ajax({
		// 			type:"post",
		// 			url:"/hallSeat/find",
		// 			data:{cinemaName:$("#cinemaName").val(),hallName:$("#hallName").val(),seat:$("#seats").val()},
		// 			success:function(data){
		// 				if(data){
		// 					$("#seatList").append("<img src='../images/sp-seats_04.png'>");
		// 				}else{
		// 					$("#seatList").append("<img src='../images/sp-seats_02.png'>");
		// 				}
		// 				$("#addHallForm").find("input").val('');
		// 			}
		// 		})
		// 	});
		// }




		// //添加放映厅
		// function addHall(){
		// 	$("#addScreens").on("click",function(){
		// 		g_thname=$("#cinemaNameInput").val();
		// 		// console.log(g_thname)
		// 		$('#addHallSeat').dialog({    
		// 		    title: '增加放映厅',    
		// 		    width: 450,
		// 	        height: 177,  
		// 		    closed: false,    
		// 		    cache: false,    
		// 		    buttons:[{
		// 					text:'添加',
		// 					handler:function(){
		// 						$.ajax({
		// 							type:"post",
		// 							url:"/hallSeat/add",
		// 							data:{
		// 								"cinemaName":g_thname,
		// 								"hallName":$("#hallName").val(),
		// 								"seats":$("#seats").val()
		// 							},
		// 							success:function(data){
		// 					            $("#ManageTable").datagrid('reload');	//重新加载数据
		// 					        }

		// 						})
		// 						$("#addHallSeat").dialog("close");
		// 					}
		// 		},{
		// 			text:'关闭',
		// 					handler:function(){
		// 					$("#addHallSeat").dialog("close");
		// 					}
		// 		}]  
				     
		// 		});    
		// 	});    

		// }
		
		
		//添加
		function addCinema(){
	//		$("#tanchuang").dialog("open");
	
			//添加弹窗
			$("#addCinema").on("click",function(){
				$("#tanchuang").dialog({    
				    title: '院线管理',     
				    closed: false,    
				    cache: false,        
				    modal: true,
				    buttons:[{
						text:'添加',
						handler:addTable_queren
					},{
						text:'关闭',
						handler:function(){
							$("#tanchuang").dialog("close");
							$("input").val('');
						}
					}] 
				
				});  
			});
			
		}

		//增加放映厅按钮
		function fangYingBtn(){
																	
			$("#fangYingBtn").on("click",function(){
				$("<div><p>放映厅:</p><input id="+'addInput5' + count +"  type='text'/></div>").appendTo("#fangYingDiv");
				$("<div><p>座位:</p><input id="+'addInput6' + count +"  type='text'/><button id="+'see' + count +">查看</button></div>").appendTo("#fangYingDiv");
				
				//查看座位按钮函数
				$("#see" + count).on("click",see);
			
				count++;
			});
		}


		//点击添加按钮执行函数
		function addTable_queren(){
			addTable_zhen();
		}

		//添加弹窗选座
		function addxuanzuo(){
			g_thname=$("#addInput1").val();
			console.log(g_thname)
			$('#screen').dialog({    
			    title: '增加放映厅',    
			    width: 400,    
			    height: 180,    
			    closed: false,    
			    cache: false,    
			    buttons:[{
					text:'添加',
					handler:function(){
						$.ajax({
							type:"post",
							url:"/hallSeat/add",
							data:{
								"cinemaName":g_thname,
								"hallName":$("#addInput5").val(),
								"seats":$("#addInput6").val()
							},
							success:function(data){
					            $("#manageTable").datagrid('reload');	//重新加载数据		
					            $("#screen").dialog("close");
					            $("#screen input").val('');					            
					       }
						});
						//						$("#screen").dialog("close");						
					}
				},{
					text:'关闭',
					handler:function(){
						$("#screen").dialog("close");
					}
				}]  	     
			});    
		}

		//增加放映厅按钮
		function fangYingBtn(){
																	
			$("#fangYingBtn").on("click",function(){
				$("<div><p>放映厅:</p><input id="+'addInput5' + count +"  type='text'/></div>").appendTo("#fangYingDiv");
				$("<div><p>座位:</p><input id="+'addInput6' + count +"  type='text'/><button id="+'see' + count +">查看</button></div>").appendTo("#fangYingDiv");
				
				//查看座位按钮函数
				$("#see" + count).on("click",see);
				count++;
			});
		}

		//真正的确认添加按钮
		function addTable_zhen(){
			var obj = {
				cinemaName:$("#addInput1").val(),
				address:$("#addInput2").val(),
				phone:$("#addInput3").val()
			};
			$.ajax({
				type:"post",
				url:"/cinemas/add",
				data:obj,
				success:function(data){
		            $("#manageTable").datagrid('reload');	//重新加载数据
		            $.messager.alert('添加','添加完成'); 
		        }
			});
			$("#tanchuang").dialog("close");
			$("#tanchuang input").val('');
		}


		//座位查看函数
		function see(){
			//查看按钮弹框
			$("#seeDiv").dialog({    
			    title: '显示放映厅的座位',     
			    closed: false,    
			    cache: false,        
			    modal: true,
			    onClose:function(){
					$("#seeDiv").empty();
				}
			});
			var seeArr = JSON.parse($(this).prev().val());		//座位输入框中的数组
			console.log(seeArr.length)
			for(var i = 0; i < seeArr.length; i++){
				for(var j = 0; j < seeArr[i].length; j++){
					if(seeArr[i][j] == 0){
						$("<img src='../images/sp-seats_04.png'>").appendTo("#seeDiv");
					}else if(seeArr[i][j] == 1){
						$("<img src='../images/sp-seats_02.png'>").appendTo("#seeDiv");
					}
				}
				$("<br>").appendTo("#seeDiv");
			}
			
		}	

	}
});
