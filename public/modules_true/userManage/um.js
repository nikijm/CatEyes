
define(function(require, exports, module) {
	exports.userm = function() {

		// 点击出现选项卡页面

		$('#MyTabs').tabs('add', {
			title: '用户管理',
			closable: true,
			id: 'MyTab'
		});

		$("#MyTab").load("modules/userManage/nm.html", function() {
			initTable();
			initDialog();
			initTableTool();
			initSearchBox();

		});

		var editFlag; // 编辑标记

		// 初始化基本表格
		function initTable(searchObj) {
			$('#mainTable').datagrid({
				url: '/users/find',
				fitColumns: true,
				striped: true,
				rownumbers: true,
				pagination: true,
				singleSelect: false,
				idField: '_id',
				pageSize: 10,
				pageList: [10, 20, 30, 40, 50],
				columns: [
					[{field:'cj',checkbox:true},{
						field: 'acc',
						title: '用户名',
						width: 16,
						editor: {
							type: 'text',
							option: {}
						}
					}, {
						field: 'pwd',
						title: '密码',
						width: 12,
						editor: {
							type: 'text',
							option: {}
						}
					}, {
						field: 'tel',
						title: '电话',
						width: 12,
						editor: {
							type: 'text',
							option: {}
						}
					}, {
						field: 'email',
						title: '邮箱',
						width: 12,
						editor: {
							type: 'text',
							option: {}
						}
					}, {
						field: 'birth',
						title: '出生年月',
						width: 22,
						editor: {
							type: 'text',
							option: {}
						}
					}]
				],

			});
		}

		// 初始化工具条
		function initTableTool() {
			$('#mainTable').datagrid({
				toolbar: [{
					iconCls: 'icon-add',
					text: '增加',
					handler: table_add
				}, '-', {
					iconCls: 'icon-remove',
					text: '删除',
					handler: table_del
				}, '-', {
					iconCls: 'icon-edit',
					text: '修改',
					handler: table_edit
				}, '-', {
					iconCls: 'icon-save',
					text: '保存',
					handler: table_save
				}, '-', {
					iconCls: 'icon-clear',
					text: '清空搜索栏',
					handler: table_clear
				}]
			});
		}

		// 点击“修改”按钮
		function table_edit() {
			var rows = $('#mainTable').datagrid('getChecked');
			// 只选中一行，进入编辑
			if(rows.length == 1) {
				if(editFlag != undefined) {
					// 非undefine状态，关闭编辑状态
					$('#mainTable').datagrid('endEdit', editFlag);
				} else if(editFlag == undefined) {
					var index = $('#mainTable').datagrid('getRowIndex', rows[0]);
					$('#mainTable').datagrid('beginEdit', index);
					editFlag = index;
				}
			}
		}

		// 点击“保存”按钮
		function table_save() {
			// 退出编辑状态
			$('#mainTable').datagrid('endEdit', editFlag);
			editFlag = undefined;
			// var selectRow = $('#mainTable').datagrid('getChecked')[0];
			var selectRow = $('#mainTable').datagrid('getChecked')[0];
			console.log(selectRow)
			$.ajax({
				type: 'POST',
				url: '/users/update',
				data: selectRow,
				success: function(data) {
					$.messager.alert('操作', '修改成功');
				}
			});
			// 退出选中状态
			$('#mainTable').datagrid('clearChecked');
		}

		// 删除
		function table_del() {

			var ids = [];
			var names = [];
			var selectedItems = $('#mainTable').datagrid('getChecked'); // 被选中的object数组
			for(var i = 0; i < selectedItems.length; i++) {
				ids.push(selectedItems[i]._id);
				names.push(selectedItems[i].acc)
			}
			var clearCheckedName = [];
			for(var n = 0; n < names.length; n++) {
				clearCheckedName[n] = names[n];
			}
			if(selectedItems.length != 0) {

				$.messager.confirm('确认', '您确认想要删除 ' + clearCheckedName + "," + '一共 ' + names.length + '条记录吗？', function(r) {

					$('#mainTable').datagrid('reload');

					if(r) {
						$.ajax({
							type: 'POST',
							url: '/users/del',
							data: {
								ids: JSON.stringify(ids)
							},
							success: function(data) {
								//						if(data == 'delSuccess') {
								$('#mainTable').datagrid('reload');
								$("#mainTable").datagrid('clearChecked');
								//						}
							}
						});
					}
				});
			} else {
				$.messager.confirm("提示", "请选中删除的项");
			}

		}

		// 初始化增加事件的弹框
		function table_add() {
			$('#infoBoxForm input').val('');
			// 放置弹框内表单跳转
			$('#infoBoxForm').form({
				url: '/users/add',
				novalidate: false,
				success: function(data) {
					console.log('XXX')
					$('#infoBox').dialog('close');
					$('#mainTable').datagrid('reload');

				}
			});
			$('#infoBox').dialog('open');
		}

		function table_clear() {

			//刷新页面
			$("#mainTable").datagrid("load", {});
			//清空输入框的值
			$("#_easyui_textbox_input1").val(" ");

		}

		//初始搜素框函数
		function initSearchBox() {
			$('#ssInput').searchbox({
				searcher: function(value, name) {
					console.log(name);
					console.log(value);
					if(name == "acc") {
						var findObj = {
							acc: value
						};
					} else if(name = "tel") {
						var findObj = {
							tel: value
						};
					}
					console.log(findObj);
					$.ajax({
						type: 'POST',
						url: '/users/find',
						data: findObj,
						success: function(data) {
							$("#mainTable").datagrid('loadData', data);
						}
					});
				},
				menu: '#ssSelect', //显示左边的下拉列表
				prompt: '请输入搜索内容' //输入框默认的内容
			});
		}

		// 初始化“增加”弹框
		function initDialog() {

			$('#infoBox').dialog({
				title: '添加',
				closable: true,
				closed: true,
				cache: false,
				modal: true,
				buttons: [{
					text: '提交',
					handler: function() {
						//提交表单(判断非空)
						//					var value = $(".x").val();
						//
						//					    alert(value.length);
						//						if(value.length > 0) {
						$('#infoBoxForm').submit();
						//						} else {
						//							alert("请输入要添加的内容");
						//						}
					}
				}, {
					text: '关闭',
					handler: function() {
						$("#infoBox").dialog('close'); //关闭弹窗
					}
				}]
			});
		}

	}
});
