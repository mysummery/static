//var domain = "http://www.liqiang365.com";// 正式环境
var domain = "http://dev.liqiang365.com"; // 测试环境
/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
function check_input(a) {
	$(a).prop('checked', 'true');
	$('input_check').not(a).prop('checked', 'false');
}

function label(a) {
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.prop('checked', 'true');
	$('input_check').not(b).prop('checked', 'false');
}
/* added by 张明月 at 2016.11.18 for 修改选中样式 end */

$(function() {
	//初始化数据
	var openid = getQueryString("openid");
	$("#openid").val(openid);
	var mycode = getQueryString("mycode");
	$("#mycode").val(mycode);
	var uid = getQueryString("uid");
	var token = getCookie('cookie_brsy_h5_token');
	$("#uid").val(uid);

	//查询此人是否已是会员
	//var uid = localStorage.getItem("shipinUid");
	//var beicode = localStorage.getItem("beicode");
	//var uid = "7e09dd4c863000";
	var action = "/appSPersonalInformation/slectInfoByUid.ph";
	ajaxPostAsyncData(action, {
		"uid": uid,
		"token": token,
		"updateVersion": "notUpdate"
	}, false, function(data) {
		if(data.code == "40000") {
			var obj = data.resobj.huiyuan;
			if(obj == "2") {
				window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
			}
		}
	}, 'json')
});

//确认
function queren() {
	var xuliehaoType = getQueryString("xuliehaoType");
	var token = getCookie('cookie_brsy_h5_token');
	var uid = $("#uid").val();
	var mycode = $("#mycode").val();
	var beicode = getQueryString("beicode");
	var action = "/appSPersonalInformation/slectInfoByUid.ph";
	ajaxPostAsyncData(action, {
		"uid": uid,
		"token": token,
		"updateVersion": "notUpdate"
	}, false, function(data) {
		if(data.code == "40000") {
			var obj = data.resobj.huiyuan;
			if(obj == "2") {
				window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
			} else {
				/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） begin */
				var value = $("#value").val();
				/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） end */
				//alert(value);
				if("1" == value) {
					//先判断是否是微信浏览器  是提示去其他浏览器
					if(isWeixinWeb()) {
						$(".zhe_").show();
						return;
					}
					//支付宝支付
					var actions = "/appSDingdan/insertOrder.ph";
					ajaxPostAsyncData(actions, {
						"ryid": uid,
						"uid": uid,
						"money": "365",
						"paytype": "1",
						"type": "1",
						"token": token,
						"updateVersion": "notUpdate"
					}, false, function(datas) {
						var obj = datas.resobj;
						var oid = obj.zjid + "PPPP" + obj.ryid + "PPPP" + obj.money; //PPPP1代表充值
						window.location.href = "alipay/apliyphone.html?money=" + obj.money + "&oid=" + oid + "&codes=" + mycode + "&beicode=" + beicode + "&xuliehaoType=" + xuliehaoType;
					}, 'json');
				} else if("2" == value) {

					//获取授权
					var redirectUri = escape(domain + "/static/forAPP/pay/tiaozhuan_scope.html?arg=" + uid + ":" + mycode + ":" + beicode + ":" + xuliehaoType);
					var action_getCodeByUserInfo = "/appweix/authorize.ph?redirect_uri=" + redirectUri + "&scope=snsapi_userinfo";
					window.location.href = action_getCodeByUserInfo;
					//ajaxPostAsyncData(action_getCodeByUserInfo, null, function(datas) {
					//
					//},'json');
				} else if("3" == value) { //激活码充值

					window.location.href = "/static/forAPP/serialpay.html?uid=" + uid + "&mycode=" + mycode;

				}
				/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
				else if("4" == value) {

					//先判断是否是微信浏览器  是提示去其他浏览器
					/*if (isWeixinWeb()) {
						 $(".zhe_").show();
						 return;
					 }*/
					//易宝支付
					var actions = "/appYeePay/order.ph";
					ajaxPostAsyncData(actions, {
						"ryid": uid,
						"uid": uid,
						"money": "365",
						"paytype": "1",
						"channelType": "APP",
						"xuliehaoType": xuliehaoType,
						"type": "1",
						"beicode": beicode,
						"token": token,
						"updateVersion": "notUpdate"
					}, false, function(datas) {
						if(datas.code == "40000") {
							var obj = datas.resobj;
							//alert(obj);
							window.location.href = domain + obj;
						}
					}, 'json');

				} /* added by 张明月 at 2016.11.18 for 增加易宝支付 end */
				else {
					window.location.href = "/static/forAPP/share.html?mycode=" + mycode + "&xuliehaoType=" + xuliehaoType;
				}
			}
		} else {
			$.jBox.tip(data.info, "error");
		}

	}, 'json')
}

//取消遮罩层
function close_() {
	$(".zhe_").hide();
}