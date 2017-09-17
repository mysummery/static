/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
var orderid = getQueryString('orderid'); //订单id
var price = getQueryString("price"); //价格
var from = getQueryString("from"); //来源
var fromAppShop = getCookie("fromAppShop"); //从商城App注册用户
var shopurl = sessionStorage.shopurl; //判断是否商城用户

$('.charge').html(price);

var shareTag = getQueryString("shareTag"); //分享类型
var token = getQueryString("token");
var uid = getCookie("cookie_brsy_h5_uid");
var mycode = getCookie("cookie_brsy_h5_mycode"); //我的激活码

//选择支付方式 修改样式
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
	$('.balance').removeClass('current');
	$(a).find('.balance').addClass('current');
}
/* added by 张明月 at 2016.11.18 for 修改选中样式 end */

ajaxPostAsyncData_share(slectInfoByUid, {
		"token": token,
		"uid": uid,
		"type": 1
	}, true, function(data) {
		//没认证不显示余额支付
		var shenfenstatus = data.resobj.authstate; //身份认证
		if(shenfenstatus != "2") {
			$('.wrapper.ye').parents('li').hide();
		}
		//不是微店店主不显示现金券，将余额置成选择状态
		if(data.resobj.ismicro == 1) {
			$('.coupon_pay').hide();
			$('label').removeClass('checked');
			$('#check1').next('label').addClass('checked');
			$('#check1').attr('checked', 'checked');
			$('#check6').attr('checked', 'false');
			$('.wallet_balance').addClass('current');
			$('.coupon_balance').removeClass('current');
			$('#value').val('5');
		}
		//不是小微店主同时未验证身份
		if (shenfenstatus != "2" && data.resobj.ismicro == 1) {
			$('.wx').trigger('click');
		}
		//钱包余额
		$('.wallet_balance').html('￥' + data.resobj.money);

	}, 'json')
	//获取现金券
ajaxPostAsyncData(couponlist, {
	"token": token,
	"uid": uid,
	"page": '1'
}, true, function(data) {
	if(data.code == "40000") {
		if(data.resobj.rows != '') {
			//现金券id
			var counponid = data.resobj.rows[0].id;
			//现金券详情
			ajaxPostAsyncData(couponget, {
				"uid": uid,
				"token": token,
				"id": counponid,
				"page": '1'
			}, true, function(data) {
				if(data.code == "40000") {
					if(data.resobj != '') {
						//当前现金券剩余金额
						$('.coupon_balance').html('￥' + data.resobj.money);

					}

				}
			}, 'json')
		}

	}
}, 'json')

//确认
function queren() {

	ajaxPostAsyncData_share(slectInfoByUid, {
		"token": token,
		"uid": uid,
		"type": 1
	}, true, function(data) {
		if(data.code == "40000") {
			var obj = data.resobj.vipstate;
			var beicode = data.resobj.parentcode;

			/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） begin */
			
			//支付方式
			var value = $("#value").val();

			/* modified by 张明月 at 2016.11.18 for 修改v	alue获取方式（因为布局改变了） end */
			
			//微信支付
			if(value == "2") {
				var redirectUri = escape(api + "/static/wechat/src/service/tiaozhuan/shop_subscribe_scope.html?arg=" + uid + ":" + mycode + ":" + beicode + ":" + orderid + ":1" + ":" + shareTag + ":" + token);
				var action_getCodeByUserInfo = weixingz_auth + "?redirectUri=" + redirectUri + "&scope=snsapi_userinfo";
				window.location.href = action_getCodeByUserInfo;
			}
			/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
			
			//银联支付
			else if(value == "4") {
				setCookie('cookie_brsy_h5_yee', 1, 7);
				ajaxPostAsyncData_share(spYiBaoPaysign, {
					"token": token,
					"uid": uid,
					"orderId": orderid, //订单号
					"channelType": "APP"
				}, false, function(datas) {
					if(datas.code == "40000") {
						var obj = datas.resobj;
						//alert(obj);
						window.location.href = obj;
					}
				}, 'json');

			}
			//余额支付
			else if(value == "5") {
				//显示密码验证框
				pwdshow();
			}
			//现金券支付
			else if(value == "6") {
				//显示密码验证框
				pwdshow();
			} else {
				$.jBox.tip(data.info, "error");
			}

		}
	}, 'json')
}

//取消遮罩层
function close_tc() {
	$('.tc_password ').hide();
	$('.pay_cover').hide();
	$('#zf_password').val('');
}
//显示密码验证框
function pwdshow() {
	$('.tc_password ').show();
	$('.pay_cover').show();
	$('#zf_password').val('');
}
//确认密码
function confirm_pwd() {
	var uid = getCookie('cookie_brsy_h5_uid');
	var pursepassword = $("#zf_password").val();
	var regu = new RegExp("^[0-9]*$");
	var re = new RegExp(regu);
	if(!re.test(pursepassword)) {
		$.jBox.tip('密码为6位数字', 'error');
		$('#zf_password').val('');
		return false;
	} else if(pursepassword.length < 6) {
		$.jBox.tip('密码为6位数字', 'error');
		$('#zf_password').val('');
		return false;
	} else {
		ajaxPostAsyncData(purse_password, {
			"uid": uid,
			"paypassword": pursepassword
		}, false, function(data) {
			if(data.code == "40000") {
				$('.tc_password ').hide();
				$('.pay_cover').hide();
				var value = $("#value").val();
				//余额支付
				if(value == '5') {
					ajaxPostAsyncData_share(spPaypay, {
						"token": token,
						"uid": uid,
						"orderId": orderid, //订单号
						"channelType": "APP"
					}, false, function(datas) {
						if(datas.code == "40000") {
							$.jBox.tip("支付成功！", "success");
							window.setTimeout(function() {
								if (shopurl != '' && shopurl != undefined) {
									window.location.href = '/static/forAPP/share_shop.html';
								}else {
									window.location.href = '/static/wechat/src/index/shop/indent_list/indent_list.html?pay=success';
								}
							}, 1000);

						} else {
							$.jBox.tip(datas.info, "error");
						}
					}, 'json');
				} 
				//现金券支付
				else if(value == '6') {
					ajaxPostAsyncData_share(cashcouponpaypay, {
						"token": token,
						"uid": uid,
						"orderId": orderid,
						"channelType": "APP"
					}, false, function(datas) {
						if(datas.code == "40000") {
							$.jBox.tip("支付成功！", "success");
							window.setTimeout(function() {
								if (shopurl != '' && shopurl != undefined) {
									window.location.href = '/static/forAPP/share_shop.html';
								}else {
									window.location.href = '/static/wechat/src/index/shop/indent_list/indent_list.html?pay=success';
								}
								
							}, 1000)

						} else {
							$.jBox.tip(datas.info, "error");
						}
					}, 'json');
				}

			} else if(data.code == "40014") {

				$.jBox.tip("当前密码错误!", "error");
				$('#zf_password').val('');
			} else {
				$.jBox.tip(data.info, "error");
				$('#zf_password').val('');
			}
		}, 'json');
	}

}