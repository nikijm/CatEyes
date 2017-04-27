define(function(require,exports,module) {

    exports.dianguanli = function() {

        //点击显示选项卡页面
        $("#MyTabs").tabs('add',{
            title:'电影管理',
            closable:true,
            id:'dianyingTab'
        });
        var editFlag;//编辑标记
        $("#dianyingTab").load('modules/movieManage/dianyin.htm',function(){
            //  添加图集的按钮
            $("#tujiyuese").linkbutton({
                iconCls:'icon-add'
            });
            //  添加图集按钮绑定函数
            $("#tujiyuese").on("click",adddianyingImgs);

            $("#mainwode").datagrid({
                url:'/dianying/find',
                type:'POST',
                striped: true,
                pagination: true,
                fitColumns:true,
                selectAll:true,
                pagination:true,
                rownumbers:true,
                idField:'_id',//指明标识字段
                fitColumns:false,
                singleSelect:false,//true的话就不能全选
                pageSize:10,
                pageList:[5,10,15],
                columns:[[
                {field:'id',title:"选项",checkbox:true},
                {field:"cName",title:"电影中文名",width:100,editor:{type:'text',option:{}} },
                {field:"eName",title:"电影英文名",width:100,editor:{type:'text',option:{}} },
                {field:"type",title:"类型",width:100,editor:{type:'text',option:{}} },
                {field:"country",title:"区域",width:100,editor:{type:'text',option:{}} },
                {field:"age",title:"年代(年份)",width:100,editor:{type:'text',option:{}} },
                {field:"duration",title:"时长(分钟)",width:100,editor:{type:'text',option:{}} },
                {field:"releaseTime",title:"上映时间",width:100,editor:{type:'text',option:{}} },
                {field:"releaseArea",title:"上映地区",width:100,editor:{type:'text',option:{}} },
                {field:"money",title:"票房(万)",width:100,editor:{type:'text',option:{}} },
                {field:"synopsis",title:"剧情介绍",width:100,editor:{type:'text',option:{}} },
                {field:"file",title:"图片",width:100,editor:{type:'text',option:{}} }
                ]]
            });
            initTools();
            addSearchBox();
        })
        //添加表单按钮
        function initTools(){
            $("#mainwode").datagrid({
                toolbar: [{
                    iconCls: 'icon-add',
                    text:'添加',
                    handler:table_add
                },'-',{
                    iconCls: 'icon-remove',
                    text:'删除',
                    handler:table_remove
                },'-',{
                    iconCls:'icon-edit',
                    text:'修改',
                    handler:table_edit
                },'-',{ 
                    iconCls:'icon-save',
                    text:'保存',
                    handler:table_save
                }]
            });
        }

        //增加搜索框
        function addSearchBox(){
            var searchboxHtml=['<input id="ss2" style="width:200px"></input>',
            '<div id="mm2" style="width:120px">',
            '<div data-options="name :\'cName\'">中文名</div>',
            '<div data-options="name :\'eName\'">英文名</div>',
            '<div data-options="name :\'country\'">区域</div>',
            '<div data-options="name :\'type\'">类型</div>',
            '</div>'].join("");
            $(searchboxHtml).appendTo("#dianyingTab .datagrid-toolbar table tbody tr");
            
            $('#ss2').searchbox({ 
                searcher:function(value,name){ 
                    $.ajax({
                        type:"POST",
                        url:"/dianying/find",
                        data:{ [name]:value},
                        success:function(data){
                            $("#mainwode").datagrid('loadData',data);
                        }
                    });
                }, 
                menu:'#mm2', 
                prompt:'请输入电影名或者类型' 
            }); 
        }
        
        //表格添加数据
        function table_add(){
            // forReg1();//正则表达式
            // creatValidatebox();//添加验证框
            $("input").val("");
            $("#addwode").dialog({
                title:"增加",
                closable:true,
                cache: false,
                modal: false,
                buttons:[{
                    text:"添加",
                    handler: adddianyingInfo
                },{
                    text:'关闭',
                    handler:function(){
                        $("#addwode").dialog("close");
                        $('#addfuwode .fileClass').parent().remove();
                    }
                }]
            });
            initForm();
        }

        // 点击“添加”增加资讯信息
        function adddianyingInfo() {
            //提交表单
            $.messager.confirm('确认','确认要添加吗？',function(r){    
                if (r){  
                    
                    preventFormTest();
                    $('#indexImage').submit();
                    $('.formClass').submit();
                    // $('#addfuwode').submit(); 
                }    
            });
        }
        var ajaxIndex;
        var indexImg;
        function preventFormTest() {

            
            
            ajaxIndex = 0;

            var adddianyingArr = [];
            var forms = $('.formClass');

            var adddianyingObj;

            for (let i = 0; i < forms.length; i++) {
                forms.eq(i).form({
                    async: false,
                    type: 'POST',
                    url: '/upload',
                    novalidate: false,
                    success: function(data) {
                        ajaxIndex++;
                        adddianyingArr.push(data);

                        adddianyingObj = {
                            cName: $('#movieNmae').val(),
                            eName: $('#movieeName').val(),
                            type: $('#movieType').val(),
                            country:$('#areaId').val(),
                            age:$('#ageId').val(),
                            duration:$('#movieTime').val(),
                            releaseTime:$('#timeId').val(),
                            releaseArea:$('#upAreaId').val(),
                            money:$('#movieMoney').val(),
                            synopsis:$('#descId').val(),
                            indexFile: indexImg,
                            file: JSON.stringify(adddianyingArr)
                        }

                        console.log(adddianyingObj)

                        // if (i == (forms.length - 1)) {
                            if (ajaxIndex == forms.length) {
                                $.ajax({
                                    type: 'POST',
                                    async:false,
                                    url: '/dianying/add',
                                    data: adddianyingObj,
                                    success: function(data) {
                                    console.log(data); //suc
                                    $('#addwode').dialog('close');
                                    $('#mainwode').datagrid('reload');
                                    $('#addfuwode .fileClass').parent().remove();
                                }
                            });
                            }
                        }
                    });

            }
        }

        //创建验证框
        function creatValidatebox(){
            $('#movieNmae').validatebox({    
                required: true,    
                validType: 'cName'   
            });  
            $('#movieeName').validatebox({    
                required: true,    
                validType: 'eName'   
            });  
            $('#movieType').validatebox({    
                required: true,    
                validType: 'type'   
            });  
            $('#movieTime').validatebox({    
                required: true,    
                validType: 'duration'   
            });
            $('#movieMoney').validatebox({    
                required: true,    
                validType: 'money'   
            });

        }

        //正则表达式
        function forReg1(){
            $.extend($.fn.validatebox.defaults.rules, {    
                cName: {    
                    validator: function(value){  
                        var reg=/[\u4e00-\u9fa5]/gm;
                        return reg.test(value);   
                    }, 
                    message: '请正确输入电影中文名'   
                },
                eName:{
                    validator:function(value){
                        var reg=/^[A-Za-z]/;
                        return reg.test(value);
                    },
                    message: '请正确输入电影英文名' 
                },  
                type:{
                    validator:function(value){
                        var reg=/[\u4e00-\u9fa5]/gm;
                        return reg.test(value);
                    },
                    message: '请正确输入电影类型' 
                },
                duration:{
                    validator:function(value){
                        var reg=/^[0-9]{3}[:][0-9]{2}$/;
                        return reg.test(value);
                    },
                    message: '请正确输入时长' 
                },
                money:{
                    validator:function(value){
                        var reg=/^[0-9]+$/;
                        return reg.test(value);
                    },
                    message: '请正确输入票房' 
                },
            }); 
        }

        //表单不做跳转操作
        function initForm() {
            $("#addwode").dialog("open");
            $('#addfuwode').form({
                url:"/dianying/add",
                novalidate:false,
                success:function(data){
                    $("#mainwode").datagrid('reload');
                    $("#addwode").dialog("close");
                }
            });

            // 首页图片表单
            $('#indexImage').form({
                type: 'POST',
                async: false,
                url: '/upload',
                novalidate: false,
                success: function(data) {
                    console.log('index');
                    indexImg = data;
                }
            });
            
        }

        var index = 0;

        //添加图集
        function adddianyingImgs(){  

            // var nwesimgs_div=$("<div>").css({"overflow":"hidden","lineHeight":"45px"});
            // var nwesimgs_btn=$("<input>").attr({type:"file",multiple:"multiple",name:"IMG"}).css("border","1px solid black");
            var _id = "formTest" + index++;

            var nwesimgs_div = '<form class="formClass" id="' + _id + '" action="/upload" method="POST" enctype="multipart/form-data">'+'<input class="fileClass" type="file" name="file" multiple="multiple">'+
            '</form>';
            $("#addfuwode").append(nwesimgs_div);

            // var newInput = $('#formTest input').clone(true);

            // $('#addfuwode').append(newInput);


            // nwesimgs_div.append(nwesimgs_btn);
            


        }

        //表格删除数据
        function table_remove(){
            console.log("删除");
            //取出当前所以选中的项的ID
            var forRemove = $("#mainwode").datagrid("getChecked");
            var ids=[];
            for (var i = 0; i < forRemove.length; i++) {
                ids.push(forRemove[i]._id);
            }
            $.ajax({
                url:"/dianying/del",
                method:'POST',
                data:{ids:JSON.stringify(ids)},
                success: function(data){
                    $.messager.confirm('确认','确认要删除吗？',function(r){    
                        if (r){
                             //刷新表格数据
                             $("#mainwode").datagrid('reload');  
                         }    
                     });
                }
            });
            $('#mainwode').datagrid('clearChecked');
        }
        
        //修改表单数据
        function table_edit(){
            //选中一行进行编辑
            var rows=$("#mainwode").datagrid("getChecked");
            if (rows.length==1) {  //选中一行的话触发事件
                if (editFlag!=undefined) { //关掉状态
                    $("#mainwode").datagrid('endEdit',editFlag); //结束编辑，传入之前的编辑的行
                }else if(editFlag==undefined){ //选中当前的行，开启编辑状态
                    var index=$("#mainwode").datagrid('getRowIndex',rows[0]); //获取选定行的索引
                    $("#mainwode").datagrid('beginEdit',index); //开启并传入要编辑的行
                    editFlag=index;
                }
            }
        }
        
        //保存数据
        function table_save(){
            //退出编辑状态
            $('#mainwode').datagrid('endEdit',editFlag);
            editFlag=undefined;
            //取出当前修改行
            var selectRow=$('#mainwode').datagrid('getChecked')[0];
            console.log(selectRow);
            $.ajax({
                type:'post',
                url:'/dianying/update',
                data:selectRow,
                success: function(data){
                    $.messager.confirm('确认','确认要修改嘛吗？',function(r){    
                        if (r){
                             //刷新表格数据
                             $("#mainwode").datagrid('reload');  
                         }    
                     });
                }
            })
            $('#mainwode').datagrid('clearChecked');
        }
    }
});