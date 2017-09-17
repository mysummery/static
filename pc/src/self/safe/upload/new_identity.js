/**** 
*** author：李思远
*** date：2017-04-24
***/

$(function(){
    var uid=getCookie('cookie_brsy_pc_uid');
    var account = getCookie('cookie_brsy_pc_account');
    var idcardstate;
    var idcardurlpositive;
    var idcardurlnegative;
    var idcardname;
    var failreason;
    ajaxWebPostAsyncData(slectInfoByUid, {
        "uid": uid,
        "type": "1"
    }, false, function(data){
        if(data.code == "40000"){
            var resdata = data.resobj;
            idcardstate = resdata.idcardauditstate;
            failreason = resdata.reason;
            $('#fail-reason').html('失败原因：' + failreason);
        }else{

        }
    }, 'json');
    //进入页面判断当前审核状态
    console.log(failreason)
    if(idcardstate == '1'){
        $('.third').show();
        $('.third .identitynow').show();
        
    }else if(idcardstate == '2'){
        $('.third').show();
        $('.third .idenfaliure').show();
        $('#reupload').click(function(){
            $('.first').show();
            $('.third').hide();
        });
    }else if(idcardstate == '3'){
        
    }else if(idcardstate == '0'){
        $('.first').show();
    }


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
        idcardname = $('#icardname').val();
        console.log(idcardname)
        if(idcardname == null || idcardname == ''){
            $.jBox.tip("请输入身份证姓名", "error");
            return false;
        }else{
            //uploadIdCard();
            $("#positiveform").ajaxSubmit({
                url: uploadImage,
                type: "post",
                enctype: 'multipart/form-data',
                // iframe: true,
                dataType:'json',
                data: { "type": 2 },
                success: function (data){
                    if (data.code == '40000'){
                        var resdata = data.resobj;
                        idcardurlpositive = resdata.fileUrl;
                        $("#negativeform").ajaxSubmit({
                            url: uploadImage,
                            type: "post",
                            enctype: 'multipart/form-data',
                            // iframe: true,
                            dataType:'json',
                            data: { "type": 2 },
                            success: function (data){
                                if (data.code == '40000'){
                                    var resdata = data.resobj;
                                    idcardurlnegative = resdata.fileUrl;
                                    $.jBox.tip("操作成功！", "success");
                                    setTimeout(function(){
                                        $('.first').hide();
                                        $('.second').show();
                                    },1000);
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
        };
    });


    $('#save-information').click(function(){
        var newpaypassword = $('#newpaypsd').val();
        var confirmpaypassword = $('#confirmpaypsd').val();
        var regu = new RegExp("^[0-9]*$");
        var re = new RegExp(regu);
        if(!re.test(newpaypassword)) {
            $.jBox.tip('密码为6位数字', 'error');
            return false;
        }else if (newpaypassword.length < 6){
            $.jBox.tip('密码为6位数字', 'error');
            return false;
        }else if (newpaypassword.length > 6){
            $.jBox.tip('密码为6位数字', 'error');
            return false;
        }else if (!re.test(confirmpaypassword)){
                $.jBox.tip('密码为6位数字', "error");
                return false;
        }else if (confirmpaypassword.length < 6){
            $.jBox.tip('密码为6位数字', 'error');
            return false;
        }else if (newpaypassword != confirmpaypassword){
            $.jBox.tip('两次密码输入不一致', 'error');
            return false;
        }else{
            paypassword = confirmpaypassword;

            ajaxWebPostAsyncData(https_domain + '/user/identify', {
                "uid": uid,
                "paypassword": paypassword,
                "idcardpositive": idcardurlpositive,
                "idcardnegative": idcardurlnegative,
                "idcardname": idcardname
            }, false, function(data) {
                if(data.code == "40000") {
                    $.jBox.tip("上传成功!", "success");
                    setTimeout(function(){
                        window.location.href = '/static/pc/src/self/information/new_usercenter.html'
                    },1000);
                }else {
                    $.jBox.tip("操作失败" + data.info, "error");
                }
            }, 'json');
        }

        
    });

    
});
