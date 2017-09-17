$(function(){
	
	$(".usercenter").removeClass("current");
	$(".accountsafe").addClass("current");
	/*var account = getCookie('cookie_brsy_pc_account');
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
                if(resdata == '3'){
                    $('.step ul li:eq(0)').hide();
                }
            }
    }, 'json');*/
});