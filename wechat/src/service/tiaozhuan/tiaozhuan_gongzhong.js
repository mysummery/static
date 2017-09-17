/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
var shareTag = getQueryString("shareTag");
var token = getQueryString("token");
var uid = getQueryString("uid");
var mycode = getQueryString("mycode");
var xuliehaoType = getQueryString("xuliehaoType");
var obj; //是否会员
/* added by 张明月 at 2017.08.22 for 判断是否商城注册 begin */
var beicode; //被邀请码
var usertype; //用户类型
ajaxPostAsyncData_share(slectInfoByUid, {
	"token": token,
	"uid": uid,
	"type": 1
}, true, function(data) {
	if(data.code == "40000") {
		obj = data.resobj.vipstate;
		beicode = data.resobj.parentcode;
		/*added by 张明月 at 2017.08.22 for 商城升级显示邀请码 begin*/
		usertype = data.resobj.usertype;
		//判断是否商城用户
		if(usertype != '4') {
			$('.shop_user').hide();
			$('.tips').hide();

		}
		/*added by 张明月 at 2017.08.22 for 商城升级显示邀请码 end*/
	}
}, 'json')
/* added by 张明月 at 2017.08.22 for 判断是否商城注册 end */
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
	/* added by 张明月 at 2017.08.22 for 商城升级邀请码判断 begin  */
	if(usertype == '4') {
		if($('#invitecode').val() == '') {
			$.jBox.tip("请输入邀请码", "error");
			return false;
		} else {
			beicode = $('#invitecode').val();
		}

	}
	/* added by 张明月 at 2017.08.22 for 商城升级增加邀请码判断 end*/
	if(obj == "2") {
		window.location.href = "/static/forAPP/share.html?mycode=" + mycode;
	} else {
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
				"money": "365",
				"paytype": "1",
				"type": "1"
			}, false, function(datas) {
				if(datas.code == '40000') {
					var obj = datas.resobj;
					var oid = obj.zjid + "PPPP" + obj.ryid + "PPPP" + obj.money; //PPPP1代表充值
					window.location.href = "/static/wechat/src/service/apliy/apliyphone.html?money=" + obj.money + "&oid=" + oid + "&codes=" + mycode + "&beicode=" + beicode + "&xuliehaoType=1";
				} else if(datas.code == '40018') {
					if(uid == '' || uid == null) {
						$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");
					} else {
						var orderid = datas.resobj.id;
						window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;
					}
				}else{
					$.jBox.tip("生成订单失败！"+data.info, "error");
				}

			}, 'json');
		} else if("2" == value) {

			ajaxPostAsyncData_share(orderSave, {
				"token": token,
				"uid": uid,
				"total": "365",
				"type": "1",
				"parentCode": beicode,
				"xuliehaoType": xuliehaoType //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
			}, false, function(data) {
				//console.log(data)
				if(data.code == "40000") {
					var redirectUri = escape(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_scope.html?arg=" + uid + ":" + mycode + ":" + beicode + ":" + data.resobj.id + ":1" + ":" + shareTag + ":" + token);
					var action_getCodeByUserInfo = weixingz_auth + "?redirectUri=" + redirectUri + "&scope=snsapi_userinfo";
					window.location.href = action_getCodeByUserInfo;

				} else if(data.code == "40018") {
					var uids = getCookie("cookie_brsy_h5_uid");
					if(uids == '' || uids == null) {
						$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");
					} else {
						var orderid = data.resobj.id;
						window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;
					}
					//						}else {
					//							$.jBox.tip("生成订单失败！" , "error");
				}else{
					$.jBox.tip("生成订单失败！"+data.info, "error");
				}

			}, 'json');

		} else if("3" == value) { //激活码充值
			//					ajaxPostAsyncData_share(orderSave, {
			//						"token":token,
			//						"uid": uid,
			//						"total": "365",
			//						"type": "1",
			//						"parentCode": beicode,
			//						"xuliehaoType": "0" //1是激化码，2是礼品卡，3是学习卡 0=默认或未用激化码
			//					}, false, function(data) {
			//						if(data.code == "40000") {
			window.location.href = "/static/wechat/src/service/apliy/serialpay_weixin.html?token=" + token + "&uid=" + uid;
			//						}else if(data.code=='40018'){
			//							var uids=getCookie("cookie_brsy_h5_uid");
			//							if(uids==''||uids==null){
			//								$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");
			//							}else{
			//							var orderid=data.resobj.id;
			//							window.location.href="/static/wechat/src/self/indent/indent_detail.html?orderid="+orderid;
			//							}
			//						}
			//					}, 'json');
		}
		/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
		else if("4" == value) {
			ajaxPostAsyncData_share(orderSave, {
				"token": token,
				"uid": uid,
				"total": "365",
				"type": "1",
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
						if(datas.code == "40000") {
							var obj = datas.resobj;
							window.location.href = obj;
						}
					}, 'json');
				} else if(data.code == '40018') {
					var uids = getCookie("cookie_brsy_h5_uid");
					if(uids == '' || uids == null) {
						$.jBox.tip("您已经下过单了，去公众号或者APP的个人中心支付吧。", "error");
					} else {
						var orderid = data.resobj.id;
						window.location.href = "/static/wechat/src/self/indent/indent_detail.html?orderid=" + orderid;
					}

				} else {
					$.jBox.tip("生成订单失败！"+data.info, "error");
				}
			}, 'json');

		} /* added by 张明月 at 2016.11.18 for 增加易宝支付 end */
		else {
			alert("选项有误！");
		}
	}

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