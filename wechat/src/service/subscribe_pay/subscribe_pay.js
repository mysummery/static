/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
var xuliehaoType = getQueryString('xuliehaoType');
var courseid = getCookie("cookie_brsy_h5_courseid");
var price = getCookie("cookie_brsy_h5_price");
var subid = getCookie("cookie_brsy_h5_subid");

//console.log(price);
$('.charge').html(price);

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

//确认
function queren() {
	var shareTag = getQueryString("shareTag");
	var token = getQueryString("token");
	var uid = getQueryString("uid");
	var mycode = getQueryString("mycode");
	var xuliehaoType = getQueryString("xuliehaoType");

	ajaxPostAsyncData_share(slectInfoByUid, {
		"token": token,
		"uid": uid,
		"type": 1
	}, true, function(data) {
		if(data.code == "40000") {
			var obj = data.resobj.vipstate;
			var beicode = data.resobj.parentcode;

			/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） begin */
			var value = $("#value").val();
			//alert(value);
			/* modified by 张明月 at 2016.11.18 for 修改v	alue获取方式（因为布局改变了） end */
			if("1" == value) {
				//先判断是否是微信浏览器  是提示去其他浏览器
				if(isWeixinWeb()) {
					$(".zhe_").show();
					return;
				}
				//支付宝支付
				ajaxPostAsyncData(insertOrder, {
					"uid": uid,
					"ryid": uid,
					"money": price,
					"paytype": "1",
					"type": "3"
				}, false, function(datas) {
					var obj = datas.resobj;
					var oid = obj.zjid + "PPPP" + obj.ryid + "PPPP" + obj.money; //PPPP1代表充值
					window.location.href = "/static/wechat/src/service/apliy/apliyphone.html?money=" + obj.money + "&oid=" + oid + "&codes=" + mycode + "&beicode=" + beicode + "&xuliehaoType=1";
				}, 'json');
			} else if("2" == value) { //微信支付
				ajaxPostAsyncData_share(orderSave, {
					"token": token,
					"uid": uid,
					"total": price,
					"type": "3",
					"parentCode": beicode,
					"xuliehaoType": xuliehaoType //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
				}, false, function(data) {
					if(data.code == "40000") {
						var redirectUri = escape(api + "/static/wechat/src/service/tiaozhuan/subscribe_scope.html?arg=" + uid + ":" + mycode + ":" + beicode + ":" + data.resobj.id + ":1" + ":" + shareTag + ":" + token);
						var action_getCodeByUserInfo = weixingz_auth + "?redirectUri=" + redirectUri + "&scope=snsapi_userinfo&courseid=" + courseid;

						window.location.href = action_getCodeByUserInfo;

					} else if(data.code == '40018') {
						var orderid = data.resobj.id;

						window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;

					} else {
						$.jBox.tip(datas.info, "error");
					}

				}, 'json');

			} else if("3" == value) { //激活码充值
				ajaxPostAsyncData_share(orderSave, {
					"token": token,
					"uid": uid,
					"total": price,
					"type": "3",
					"parentCode": beicode,
					"xuliehaoType": "0" //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
				}, false, function(data) {
					if(data.code == "40000") {
						window.location.href = "/static/wechat/src/service/apliy/serialpay_weixin.html?token=" + token + "&uid=" + uid + "&orderId=" + data.resobj.id;
					}
				}, 'json');
			}
			/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
			else if("4" == value) { //银联支付
				//var orderSave="http://10.1.1.210:8080/order/save";
				ajaxPostAsyncData_share(orderSave, {
					"token": token,
					"uid": uid,
					"total": price,
					"type": "3",
					"parentCode": beicode,
					"xuliehaoType": xuliehaoType //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
				}, false, function(data) {
					if(data.code == "40000") {
						//易宝支付
						ajaxPostAsyncData_share(yeepay_sign, {
							"token": token,
							"uid": uid,
							"orderId": data.resobj.id, //订单号
							"channelType": "APP"
						}, false, function(datas) {
							if(data.code == "40000") {
								var obj = datas.resobj;
								window.location.href = obj;
							}
						}, 'json');
					} else if(data.code == '40018') {
						var orderid=data.resobj.id;
						window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;

					} else {
						$.jBox.tip("生成订单失败！" + data.info, "error");
					}
				}, 'json');

			} /* added by 张明月 at 2016.11.18 for 增加易宝支付 end */
			//余额支付
			else if("5" == value) {
				ajaxPostAsyncData_share(orderSave, {
					"token": token,
					"uid": uid,
					"total": price,
					"type": "3",
					"parentCode": beicode,
					"xuliehaoType": xuliehaoType //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
				}, false, function(data) {
					if(data.code == "40000") {
						ajaxPostAsyncData_share(walletpay, {
							"token": token,
							"uid": uid,
							"orderId": data.resobj.id, //订单号
							"channelType": "APP"
						}, false, function(datas) {
							if(datas.code == "40000") {
								//var courseid=getQueryString('xuliehaoType');
								//alert(courseid);
								//alert(xuliehaoType);
								window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&courseid=" + courseid + "&freestate=2";
							}  else {
								$.jBox.tip( datas.info, "error");
							}
						}, 'json');
					}else if(data.code == '40018') {
								var orderid = data.resobj.id;

								window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;

							}
					else {
						$.jBox.tip("生成订单失败！" + data.info, "error");
					}
				}, 'json');

			} else {
				alert("选项有误！");
			}

		}
	}, 'json')
}

//取消遮罩层
function close_() {
	$(".zhe_").hide();
}

//function onBridgeReady(obj) {
//
//	WeixinJSBridge.invoke(
//		'getBrandWCPayRequest', {
//			"appId": appid, //公众号ID，由商户传入  
//			"timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数
//			"nonceStr": obj.nonceStr, //支付签名随机串，不长于 32 位
//			"package": obj.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//			"signType": obj.signType, //微信签名方式：MD5
//			"paySign": obj.paySign //微信支付签名
//		},
//
//		function(res) {
//			if(res.err_msg == "get_brand_wcpay_request:ok") {
//				var beicode = $("#mycode").val();
//				setCookie('cookie_brsy_h5_huiyuan', '2', 7);
//				window.location.href = "/static/wechat/src/index/shipin_index.html"; //支付成功，跳转的页面
//			} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//		}
//	);
//}

function return1() {
	window.location.href = "/static/wechat/src/self/self_center.html?openid=" + openid;
}