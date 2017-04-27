define(function(require,exports,module){

	exports.loadWeb=function(){

        var editFlag;

        //增添选项卡
        $('#MyTabs').tabs('add',{    
            title:'电影院线匹配管理',
            content:'<div id="myPanel"></div>',
            closable:true
        });

        //加载HTML页面
        $("#myPanel").load("modules/movieMatch/match.html",function(){

            addDatagrid();
            buttonmod();
            addSearch();
            addCinemaDialog()
            addHallDialog()
            addToolbar();
            
        });

        //增加数据列表
        function addDatagrid(){
            $('#myTable').datagrid({
                url:"/dianying/find",
                method:"POST",
                total:"",
                height:500,
                rownumbers:true,
                singleSelect:true,
                nowrap:true,
                fitColumns: false,
                idField:'_id',
                pagination:true,
                pagePosition:"bottom",
                pageSize:5,
                pageList:[5,10,15,20],
                columns:[[
                    {field:'cName',title:'中文名',width:150},    
                    {field:'eName',title:'英文名',width:150},    
                    {field:'type',title:'类型',width:150}
                ]],
                toolbar: "#seacher"
            })
        }

        //按钮样式
        function buttonmod(){
            $('#addCiname').linkbutton({  
                plain:true,  
                iconCls: 'icon-add',
                onClick:function(){
                    $("#cinema").load("modules/movieMatch/dialog.html",function(){
                        $("#cinema").dialog("open");
                        addCinemabox();
                        textmod();
                    });
                }
            });
            $('#checkCiname').linkbutton({  
                plain:true,
                iconCls: 'icon-search',
                onClick:function(){
                    $("#check").dialog("open");
                    checkHall();
                } 
            });
            $('#clearSearch').linkbutton({  
                plain:true,
                iconCls: 'icon-clear',
                onClick:function(){
                    $('#myTable').datagrid("load",{});
                    $("input").val("");
                } 
            });
        }

        //文本框样式
        function textmod(){
            $('#times').textbox({})
            $('#money').textbox({})
        }

        //增加搜索框
        function addSearch(){
            $('#lzy').searchbox({ 
                searcher:function(value,name){
                    searchMovies(name,value);
                }, 
                menu:'#lzyy',
                prompt:'请输入内容'
            })
        };

        //获取搜索结果
        function searchMovies(name,value){
            if(name=="cName"){
                $.ajax({
                    type:"POST",
                    url:"/dianying/find",
                    data:{cName:value},
                    success:function(data){
                        $("#myTable").datagrid("loadData",data);
                    }
                })
            }else if(name=="eName"){
                $.ajax({
                    type:"POST",
                    url:"/dianying/find",
                    data:{eName:value},
                    success:function(data){
                        $("#myTable").datagrid("loadData",data);
                    }
                })
            }else if(name=="type"){
                $.ajax({
                    type:"POST",
                    url:"/dianying/find",
                    data:{type:value},
                    success:function(data){
                        $("#myTable").datagrid("loadData",data);
                    }
                })
            }
        }
        
        //增加院线对话框
        function addCinemaDialog(){
            $('#cinema').dialog({    
                title: '请选择院线',
                width: 300,    
                height: 400,
                closed: true,
                cache: false,
                modal: true,
                buttons:[{
                    text:'保存',
                    handler:function(){
                        saveCinema();
                    }
                },{
                    text:'关闭',
                    handler:function(){
                        $("#cinema").dialog("close");
                    }
                }]
            })
        };

        //查看排片量对话框
        function addHallDialog(){
            $('#check').dialog({    
                title: '排片量',
                width: 600,    
                height: 400,
                closed: true,
                cache: false,
                modal: true,
                buttons:[{
                    text:'关闭',
                    handler:function(){
                        $("#check").dialog("close");
                    }
                }]
            })
        };

        //增加院线选项下拉菜单
        function addCinemabox(){
            $('#cc').combobox({
                url:"/cinemas/find",
                method:"POST",
                valueField:"_id",
                textField:"cinemaName"
            });


            $("#addHall").on("click",function(){
                var select = $("#cc").combobox("getText");

                if(select!=""){
                    $("#hall").css("display","inherit");
                    addHallbox();
                }else{
                    $.messager.alert('错误','请选择一个影院！');
                }
            })
        }


        //增加放映厅选项下拉菜单
        function addHallbox(){
            var select = $("#cc").combobox("getText");

            $('#zz').combobox({
                url:"/hallSeat/find",
                queryParams: {cinemaName:select},
                method:"POST",
                valueField:"_id",
                textField:"hallName"
            }); 
        }

        //保存选择的院线
        function saveCinema(){

            var select1 = $("#cc").combobox("getText");
            var select2 = $("#zz").combobox("getText");
            var name=$("#myTable").datagrid("getSelected");
            var times=$("#times").val();
            var money=$("#money").val();

            if(select2!="" && times!="" && money!=""){
                $.ajax({
                    url:"/newcinema/add",
                    method:"POST",
                    data:{cName:name.cName,
                        eName:name.eName,
                        type:name.type,
                        cinema:select1,
                        hall:select2,
                        times:times,
                        money:money
                    },
                    success:function(data){
                        $("#cinema").dialog("close");
                        $.messager.alert('成功','添加放映厅成功！');   
                    }
                })
            }else{
                $.messager.alert('错误','请补全添加数据的内容');
            }
        }

        //排片量查询
        function checkHall(){

            var name=$("#myTable").datagrid("getSelected");

            $('#myTable2').datagrid({
                url:"/newcinema/find",
                method:"POST",
                queryParams:{cName:name.cName},
                fit:true,
                total:"",
                height:400,
                rownumbers:true,
                singleSelect:false,
                nowrap:true,
                fitColumns: false,
                idField:'_id',
                pagination:true,
                pagePosition:"bottom",
                pageSize:5,
                pageList:[5,10,15,20],
                columns:[[
                    {field:'cb',checkbox:true},  
                    {field:'cName',title:'中文名',width:150},    
                    {field:'eName',title:'英文名',width:150},    
                    {field:'type',title:'类型',width:150},
                    {field:'cinema',title:'影院',width:150,editor:{type:'text',options:{}}},
                    {field:'hall',title:'放映厅',width:150,editor:{type:'text',options:{}}},
                    {field:'times',title:'时间',width:150,editor:{type:'text',options:{}}},
                    {field:'money',title:'票价',width:150,editor:{type:'text',options:{}}}
                    
                ]]
            })
        }

        //工具条
        function addToolbar(){
            $("#myTable2").datagrid({
                toolbar:[{
                    iconCls:"icon-remove",
                    text:"删除",
                    handler:detele
                },'-',{
                    iconCls:"icon-edit",
                    text:"修改",
                    handler:edit
                },'-',{
                    iconCls:"icon-save",
                    text:"保存",
                    handler:save
                }]
            })
        }

        //删除
        function detele(){
            var name=$("#myTable2").datagrid("getChecked");
            var ids=[];
            for (var i = 0; i < name.length; i++) {
                ids.push(name[i]._id);
            }
            $.ajax({
                url:"/newcinema/del",
                method:"POST",
                data:{ids:JSON.stringify(ids)},
                success:function(data){
                    $("#myTable2").datagrid("reload");
                    $.messager.alert('成功','删除成功！');  
                }
            })

            $("#myTable2").datagrid("clearSelections");
        }


        //修改
        function edit(){
            var rows=$("#myTable2").datagrid('getChecked');
            if(rows.length==1){
                if(editFlag!=undefined){
                    $("#myTable2").datagrid('endEdit',editFlag);

                }
                else if(editFlag==undefined){
                    var index=$("#myTable2").datagrid('getRowIndex',rows[0]);
                    $("#myTable2").datagrid('beginEdit',index);
                    editFlag=index;
                }
            }
        }

        //保存
        function save(){
            $("#myTable2").datagrid('endEdit',editFlag);
            editFlag=undefined;
            var selectRow=$("#myTable2").datagrid('getChecked')[0];
            $.ajax({
                type:"POST",
                url:"/newcinema/update",
                data:selectRow,
                success:function(){
                    $.messager.alert('成功','修改成功！');  
                }
            })
            $("#myTable2").datagrid('clearChecked');
        }

    }
})