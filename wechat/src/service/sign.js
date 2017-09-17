//var qiandaodais = getQueryString("qiandaoDays");
$(function() {
//	$('.signNumber').find('span').html(qiandaodais);
//
//	if(qiandaodais % 8 == 0) {
//		for(var i = 0; i < 7; i++) {
//			$('.signList').find('ul:last-child>li:eq(' + i + ')').html((parseInt(qiandaodais) + i) + "天");
//		}
//	} else {
//		console.log('没进');
//	}
//	 
	selectSign();
	$('.clickSign').click(function() {
		if($(this).attr('code') == 1){
			return;
		}
		var uid = getCookie("cookie_brsy_h5_uid");
		var clickSign = "/appSQiandao/signIn.ph";
		var data = {
			uid: uid
		}
		$(this).find('img').attr('src', '/static/wechat/assets/images/afterSign.png');
		$(this).attr('code','1');
		ajaxPostAsyncData(clickSign, data,false, function(data) {
			if(data.code == "40000") {
				console.log(data.resobj)
				console.log('签到成功！');
				selectSign();
//				$('.signNumber').find('span').html(parseInt(qiandaodais)+parseInt(1));

			} else {
				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	})
});
function selectSign(){
	var uid = getCookie("cookie_brsy_h5_uid");	
	var selectSign = "/appSQiandao/getSignInfo.ph"; //查询是否签到的接口
	ajaxPostAsyncData(selectSign, {
		uid: uid,
		token: getCookie('cookie_brsy_h5_token')
	},false, function(data) {
		if(data.code == "40000") {
			console.log(data)
			console.log(data.resobj)
			$('.signNumber').find('span').html(data.resobj.qiandaodays);
			if(data.resobj.state == 1){
				$('.clickSign').find('img').attr('src', '/static/wechat/assets/images/afterSign.png');
			}
		} else {
			$.jBox.tip("查询签到次数失败!", "error");
		}
	}, 'json')
}
