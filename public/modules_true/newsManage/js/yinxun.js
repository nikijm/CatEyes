define(function(require,exports,module) {
    exports.wode = function() {

        //点击显示选项卡页面
        $("#MyTabs").tabs('add',{
            title:'资讯管理',
            closable:true,
            id:'dewanabese'
        });

        var lyqwusedqq;//编辑标记
        $("#dewanabese").load('modules/newsManage/yinxun.htm',function(){
            //  添加图集的按钮
            $("#tuji").linkbutton({
                iconCls:'icon-add'
            });
            //  添加图集按钮绑定函数
            $("#tuji").on("click",addyinxunImgs);

            $("#bmain_table").datagrid({
                url:'/yinxun/find',
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
            yuedehanmuse();
            wdwwadadasada();
        })
        //添加表单按钮
        function yuedehanmuse(){
            $("#bmain_table").datagrid({
                toolbar: [{
                    iconCls: 'icon-add',
                    text:'添加',
                    handler:wodeyuese
                },'-',{
                    iconCls: 'icon-remove',
                    text:'删除',
                    handler:beotumansc
                },'-',{
                    iconCls:'icon-edit',
                    text:'修改',
                    handler:yuesexiugai
                },'-',{ 
                    iconCls:'icon-save',
                    text:'保存',
                    handler:gudebaocun
                }]
            });
        }

        //增加搜索框
        function wdwwadadasada(){
            var miseer3=['<input id="ss3" style="width:200px"></input>',
            '<div id="mm3" style="width:120px">',
            '<div data-options="name :\'cName\'">中文名</div>',
            '<div data-options="name :\'eName\'">英文名</div>',
            '<div data-options="name :\'country\'">区域</div>',
            '<div data-options="name :\'type\'">类型</div>',
            '</div>'].join("");
            $(miseer3).appendTo("#dewanabese .datagrid-toolbar table tbody tr");
            
            $('#ss3').searchbox({ 
                searcher:function(value,name){ 
                    $.ajax({
                        type:"POST",
                        url:"/yinxun/find",
                        data:{ [name]:value},
                        success:function(data){
                            $("#bmain_table").datagrid('loadData',data);
                        }
                    });
                }, 
                menu:'#mm3', 
                prompt:'请输入电影名或者类型' 
            }); 
        }
        
        //表格添加数据
        function wodeyuese(){
            // forReg();//正则表达式
            // creatValidatebox();//添加验证框
            $("input").val("");
            $("#badd_board").dialog({
                title:"增加",
                closable:true,
                cache: false,
                modal: false,
                buttons:[{
                    text:"添加",
                    handler: addyinxunInfo
                },{
                    text:'关闭',
                    handler:function(){
                        $("#badd_board").dialog("close");
                        $('#baddForm .fileClass').parent().remove();
                    }
                }]
            });
            initForm();
        }

        // 点击“添加”增加资讯信息
        function addyinxunInfo() {
            //提交表单
            $.messager.confirm('确认','确认要添加吗？',function(r){    
                if (r){  
                    
                    musetewande();
                    $('#indexImage123').submit();
                    $('.formClass').submit();
                    // $('#baddForm').submit(); 
                }    
            });
        }
        var ajaxIndex;
        var indexImg;
        function musetewande() {

            
            
            ajaxIndex = 0;

            var addyinxunArr = [];
            var forms = $('.formClass');

            var addyinxunObj;

            for (let i = 0; i < forms.length; i++) {
                forms.eq(i).form({
                    async: false,
                    type: 'POST',
                    url: '/upload',
                    novalidate: false,
                    success: function(data) {
                        ajaxIndex++;
                        addyinxunArr.push(data);

                        addyinxunObj = {
                            cName: $('#zx1').val(),
                            eName: $('#zx2').val(),
                            type: $('#zx3').val(),
                            country:$('#zx4').val(),
                            age:$('#zx5').val(),
                            duration:$('#zx6').val(),
                            releaseTime:$('#zx7').val(),
                            releaseArea:$('#zx8').val(),
                            money:$('#zx9').val(),
                            synopsis:$('#zx10').val(),
                            indexFile: indexImg,
                            file: JSON.stringify(addyinxunArr)
                        }

                        console.log(addyinxunObj)

                        // if (i == (forms.length - 1)) {
                            if (ajaxIndex == forms.length) {
                                $.ajax({
                                    type: 'POST',
                                    async:false,
                                    url: '/yinxun/add',
                                    data: addyinxunObj,
                                    success: function(data) {
                                    console.log(data); //suc
                                    $('#badd_board').dialog('close');
                                    $('#bmain_table').datagrid('reload');
                                    $('#baddForm .fileClass').parent().remove();
                                }
                            });
                            }
                        }
                    });

            }
        }

        //创建验证框
        function creatValidatebox(){
            $('#zx1').validatebox({    
                required: true,    
                validType: 'cName'   
            });  
            $('#zx2').validatebox({    
                required: true,    
                validType: 'eName'   
            });  
            $('#zx3').validatebox({    
                required: true,    
                validType: 'type'   
            });  
            $('#zx6').validatebox({    
                required: true,    
                validType: 'duration'   
            });
            $('#zx9').validatebox({    
                required: true,    
                validType: 'money'   
            });

        }

        //正则表达式
        function forReg(){
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
            $("#badd_board").dialog("open");
            $('#baddForm').form({
                url:"/yinxun/add",
                novalidate:false,
                success:function(data){
                    $("#bmain_table").datagrid('reload');
                    $("#badd_board").dialog("close");
                }
            });

            // 首页图片表单
            $('#indexImage123').form({
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
        function addyinxunImgs(){  

            // var nwesimgs_div=$("<div>").css({"overflow":"hidden","lineHeight":"45px"});
            // var nwesimgs_btn=$("<input>").attr({type:"file",multiple:"multiple",name:"IMG"}).css("border","1px solid black");
            var _id = "formTest" + index++;

            var nwesimgs_div = '<form class="formClass" id="' + _id + '" action="/upload" method="POST" enctype="multipart/form-data">'+'<input class="fileClass" type="file" name="file" multiple="multiple">'+
            '</form>';
            $("#baddForm").append(nwesimgs_div);

            // var newInput = $('#formTest input').clone(true);

            // $('#baddForm').append(newInput);


            // nwesimgs_div.append(nwesimgs_btn);
            


        }

        //表格删除数据
        function beotumansc(){
            console.log("删除");
            //取出当前所以选中的项的ID
            var forRemove = $("#bmain_table").datagrid("getChecked");
            var ids=[];
            for (var i = 0; i < forRemove.length; i++) {
                ids.push(forRemove[i]._id);
            }
            $.ajax({
                url:"/yinxun/del",
                method:'POST',
                data:{ids:JSON.stringify(ids)},
                success: function(data){
                    $.messager.confirm('确认','确认要删除吗？',function(r){    
                        if (r){
                             //刷新表格数据
                             $("#bmain_table").datagrid('reload');  
                         }    
                     });
                }
            });
            $('#bmain_table').datagrid('clearChecked');
        }
        
        //修改表单数据
        function yuesexiugai(){
            //选中一行进行编辑
            var rows=$("#bmain_table").datagrid("getChecked");
            if (rows.length==1) {  //选中一行的话触发事件
                if (lyqwusedqq!=undefined) { //关掉状态
                    $("#bmain_table").datagrid('endEdit',lyqwusedqq); //结束编辑，传入之前的编辑的行
                }else if(lyqwusedqq==undefined){ //选中当前的行，开启编辑状态
                    var index=$("#bmain_table").datagrid('getRowIndex',rows[0]); //获取选定行的索引
                    $("#bmain_table").datagrid('beginEdit',index); //开启并传入要编辑的行
                    lyqwusedqq=index;
                }
            }
        }
        
        //保存数据
        function gudebaocun(){
            //退出编辑状态
            $('#bmain_table').datagrid('endEdit',lyqwusedqq);
            lyqwusedqq=undefined;
            //取出当前修改行
            var selectRow=$('#bmain_table').datagrid('getChecked')[0];
            console.log(selectRow);
            $.ajax({
                type:'post',
                url:'/yinxun/update',
                data:selectRow,
                success: function(data){
                    $.messager.confirm('确认','确认要修改嘛吗？',function(r){    
                        if (r){
                             //刷新表格数据
                             $("#bmain_table").datagrid('reload');  
                         }    
                     });
                }
            })
            $('#bmain_table').datagrid('clearChecked');
        }
    }
});
