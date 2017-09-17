/**** 
*** author：李思远
*** date：2017-04-24
***/

$(function(){
    var uid=getCookie('cookie_brsy_pc_uid');
    var account = getCookie('cookie_brsy_pc_account');
    //进入页面判断当前审核状态
    ajaxWebPostAsyncData(selectIdCardState, {
            "account": account
        }, false, function(data) {
            if(data.code == "40000") {
                var resdata = data.resobj;
                //0未上传
                //1审核中
                //2审核未通过
                //3审核通过
                if(resdata == '1'){
                    $('.second').show();
                    $('.first').hide();
                    $('.three').hide();
                }else if(resdata == '2'){
                    $('.second').hide();
                    $('.first').hide();
                    $('.three').show();
                    $('#reupload').click(function(){
                        $('.second').hide();
                        $('.first').show();
                        $('.three').hide();
                    });
                }else if(resdata == '3'){

                }else if(resdata == '0'){
                    $('.second').hide();
                    $('.first').show();
                    $('.three').hide();
                }
            }
    }, 'json');

    //上传前预览
    function previewImage(file, id, imghead){
        //设置预览图片格式
        var MAXWIDTH  = 345; 
        var MAXHEIGHT = 220;
        //$('.idcard-mark').show();
        if (file.files && file.files[0]){
            $('#' + id).css('marginTop','0');
            $('#' + id).html('<img id=' + imghead + ' style="width:100%; height:220px;">');
            var img = $('#' + imghead).get(0);
            var reader = new FileReader();
            reader.onload = function(evt){
                $('.idcard-mark').hide();
                img.src = evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);

        } else {
            //兼容IE,使用滤镜
            
            var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            $('#' + id).html('<img id=' + imghead + ' style="width:100%; height:220px;">');
            var img = $('#' + imghead).get(0);
            $('#' + id).css('marginTop','0');
            var oo = file.value;
            $('#' + imghead).attr('src',oo);
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            img.onload = function(){
                $('.idcard-mark').hide();
            }
        };


    };
    
    //第一张图预览
    $('#idcardpositive').change(function(){
        previewImage(this, 'photopositive', 'imgheadpositive');     
    });
    //第二张图预览
    $('#idcardnegative').change(function(){
        previewImage(this, 'photonegative', 'imgheadnegative');  
    });
    //保存证件图片
    $('#reserveImg').click(function(){
        //uploadIdCard();
        $("#positiveform").ajaxSubmit({
            url: https_domain + "/upload/image",
            type: "post",
            enctype: 'multipart/form-data',
            // iframe: true,
            dataType:'json',
            data: { "type": 2 },
            success: function (data){
                if (data.code == '40000'){
                    $("#negativeform").ajaxSubmit({
                        url: https_domain + "/upload/image",
                        type: "post",
                        enctype: 'multipart/form-data',
                        // iframe: true,
                        dataType:'json',
                        data: { "type": 2 },
                        success: function (data){
                            if (data.code == '40000'){
                                $.jBox.tip("操作成功！", "success");
                                setTimeout(function(){
                                    window.location.href= 'http://dev.liqiang365.com/static/login/shipin/new_accountsafe.html'
                                },1500);
                            }else{
                                $.jBox.tip("操作失败！" + data.info, "error");
                            }
                        },
                        error: function (data){
                            $.jBox.tip("操作失败！" + data.info, "error");
                        }
                    });
                }else{
                    $.jBox.tip("操作失败！" + data.info, "error");
                }
            },
            error: function (data){
                $.jBox.tip("操作失败！" + data.info, "error");
            }
        });
    });


    // function uploadIdCard(){
    //     var positiveform = document.getElementById('positiveform');
    //     var formdata = new FormData(positiveform);
    //     formdata.append('uploadFile', $('#positiveform')[0]);
    //     formdata.append('type', 2);
    //     $.ajax({
    //         url: 'https://dev-api.liqiang365.com/upload/image',
    //         type: 'POST',
    //         data: formdata,
    //         //dataType: 'text',
    //         // 告诉jQuery不要去处理发送的数据
    //         processData : false, 
    //         // 告诉jQuery不要去设置Content-Type请求头
    //         contentType : false,
    //         // 发送内容前
    //         //beforeSend: function(){
    //           //showLoading(true, '正在上传文件,请稍后...')
    //         //},
    //         success: function (data) {
    //           if (data.code == '40000') {
    //             var negativeform = document.getElementById('negativeform');
    //             var formdata = new FormData(negativeform);
    //             formdata.append('uploadFile', $('#negativeform')[0]);
    //             formdata.append('type', 2);
    //             $.ajax({
    //                 url: 'https://dev-api.liqiang365.com/upload/image',
    //                 type: 'POST',
    //                 data: formdata,
    //                 //dataType: 'text',
    //                 // 告诉jQuery不要去处理发送的数据
    //                 processData : false, 
    //                 // 告诉jQuery不要去设置Content-Type请求头
    //                 contentType : false,
    //                 // 发送内容前
    //                 //beforeSend: function(){
    //                   //showLoading(true, '正在上传文件,请稍后...')
    //                 //},
    //                 success: function (data) {
    //                   if (data.code == '40000') {
    //                     $.jBox.tip("操作成功！", "success");
    //                     //上传成功后跳转
    //                     setTimeout(function(){
    //                       window.location.href= 'http://dev.liqiang365.com/static/login/shipin/new_accountsafe.html'
    //                     },1500);
    //                   } else {
    //                     $.jBox.tip("操作失败！" + data.info, "error");
    //                   }
    //                 }
    //             });
    //           } else {
    //             $.jBox.tip("操作失败！" + data.info, "error");
    //           }
    //         }
    //     });


    // }



});
