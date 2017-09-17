$(function(){
	var uid=getCookie('cookie_brsy_pc_uid');
	$(".usercenter").removeClass("current");
	$(".accountsafe").addClass("current");
	var idcardstate;
    var usertype;
	ajaxWebPostAsyncData(slectInfoByUid, {
        "uid": uid,
        "type": "1"
    }, false, function(data){
        if(data.code == "40000"){
            var resdata = data.resobj;
            idcardstate = resdata.idcardauditstate;
            usertype = resdata.usertype;
        }else{

        }
    }, 'json');
	//进入页面判断当前审核状态
    if(idcardstate == '3'){
        $('.step ul li:eq(0)').hide();
    }
    if(usertype == '2'){
        $('.step ul li:eq(0)').hide();
    }
});