var id = getQueryString('orderid');
//var ids = getQueryString('orderid');
//var id = "0f8c51a7ff024e37b35b6a1b8ac7f3";
var groupbuyLevel;
var uid = getCookie('cookie_brsy_h5_uid');
//var id='3d670e12e4c544db8fad21d2a13b45';

//总钱数
var totalMoney;
//现金券钱
var microusercost;
//服务费
var microuserServiceCharge;
//押金
var microuserDepostit;

//获取用户团购等级
ajaxPostAsyncData(slectInfoByUid, {
	"uid": uid,
	"type": 1
}, false, function(data) {
	if (data.code == '40000') {
		//团购等级
		groupbuyLevel = data.resobj.groupbuylevel;
	}else {
		$.jBox.tip(data.info, 'error');
	}
}, 'json');

//获取申请小微店钱数
ajaxPostAsyncData(getMonery, {
	"uid": uid
}, false, function(data) {
	if (data.code == '40000') {

		microusercost =  parseInt(data.resobj.microusercost);
		microuserDepostit = parseInt(data.resobj.microuserDepostit);
		microuserServiceCharge = parseInt(data.resobj.microuserServiceCharge);

		microuserDepostit = isNaN(microuserDepostit) ? 0 : microuserDepostit;
		microuserServiceCharge = isNaN(microuserServiceCharge) ? 0 : microuserServiceCharge;
		//需要金额 = 应付金额 + 押金 + 服务费
		totalMoney = microusercost + microuserDepostit + microuserServiceCharge;

	}else {
		$.jBox.tip(data.info, 'error');
	}
}, 'json');

$('.close').live('click', function() {
	$(this).parents('.cancel_tc').hide();
	$('.cover').hide();
})
$(function() {
	var orderDetail = https_domain + "/order/detail";
	ajaxPostAsyncData(orderDetail, {
		"id": id,
		"uid": uid
	}, false, function(data) {
		if(data.code == "40000") {
			//			console.log(data);
			var username = data.resobj.username; //姓名
			var phone = data.resobj.phone; //电话
			var address = data.resobj.address; //地址
			var state = data.resobj.state; //订单状态（是否完成）
			var paystate = data.resobj.paystate; //支付状态
			var type = data.resobj.type;
			var total = data.resobj.total;
			var subid = data.resobj.subjectid;
			var orderid = data.resobj.id;
			var createtime = data.resobj.createtime;
			var updatetime = data.resobj.updatetime;
		
			$('.indent_number').html(id);

				//计算有效期
				var validityCreatetime = data.resobj.createtime.substr(0, 10).replace(/-/g, '.');
				var year = parseInt(validityCreatetime.substr(0, 4)) + 1;
				    year.toString();
				var days = validityCreatetime.substr(4, validityCreatetime.length);
				var deadline = year + days;

			if(state == 1) {
				$(".indent_state").html("待支付")
				$(".wait_pay").show();
				$(".text-time").hide();
			} else {
				$(".indent_state").html("完成");
				$(".pay_total>p>span").html("已支付：<span class='dosign'>￥</span>")
				$(".done").show();
			}

			if(type == "1") {
				$(".text-tit").html("李强365会员升级");

				$(".clearfix img").attr("src", "/static/wechat/assets/images/gradebg.png");
				//					var year=parseInt(createtime.substr(0,4))+2;
				$(".wait_pay button").eq(1).removeClass().addClass("vippay");
				$(".vippay").attr("orderid", orderid);
			} else if(type == "3") {
				$(".text-tit").html(data.resobj.name);
				$(".clearfix img").attr("src", "/static/wechat/assets/images/indent_list.png");
				
				$(".text-time").html("有效期：" + validityCreatetime + '-' + deadline + "");
				$(".wait_pay button").eq(1).removeClass().addClass("pay_go");
				$(".pay_go").attr("name", subid);
				$(".pay_go").attr("orderid", orderid);
			} else if(type == "2") {
				$(".text-tit").html("余额充值");
				$(".wait_pay button").eq(1).removeClass().addClass("chargepay");
				if(updatetime == null) {
					$(".text-time").html("支付时间：" + createtime + "");
				} else {
					$(".text-time").html("支付时间：" + updatetime + "");
				}

				$(".chargepay").attr("orderid", orderid);
				$(".clearfix img").attr("src", "/static/wechat/assets/images/charge_in.png");
			} else if(type == "6") {
				//如果是6.5万以下级别，加上有效期
				if (groupbuyLevel < "3") {
					$(".text-time").html("有效期：" + validityCreatetime + '-' + deadline);
				}
				$(".text-tit").html("开通小微店");
				
				$(".wait_pay button").eq(1).removeClass().addClass("weshopPay");
				$(".weshopPay").attr("orderid", orderid);
				$(".clearfix img").attr("src", "/static/wechat/assets/images/weshop.png");
			} else {
				$(".text-tit").html("直播问题竞价");
				if(updatetime == null) {
					$(".text-time").html("支付时间：" + createtime + "");
				} else {
					$(".text-time").html("支付时间：" + updatetime + "");
				}
				$(".wait_pay button").eq(1).removeClass().addClass("answerpay");
				$(".answerpay").attr("orderid", orderid);
				$(".clearfix img").attr("src", "/static/wechat/assets/images/answerpay.png");
			}

			var createtime = data.resobj.createtime; //支付时间（订单时间）
			var paytype = data.resobj.paytype; //支付方式
			if(paytype == "1") {
				$(".payWay").html("支付宝");
			} else if(paytype == "2") {
				$(".payWay").html("微信");
			} else if(paytype == "3") {
				$(".payWay").html("银联");
			} else if(paytype == "4") {
				$(".payWay").html("余额支付");
			} else if(paytype == "5") {
				$(".payWay").html("序列号");
			} else if(paytype == "6") {
				$(".payWay").html("易宝");
			} else {
				$(".payWay").html("未选择");
			}
			if(type == "6") {
				//如果是6.5万以上级别
				if (groupbuyLevel == "3" || groupbuyLevel == "4") {
					$(".weshop").show();
					//隐藏手续费和押金
					$(".servicemoney").hide();
				}else {
					//显示所有
					$(".weshop").show();
				}
				
				$(".otherdetail").hide();
				$(".price span").html(total);
				$('.total_money').html(total);
				$(".shopPrice").eq(0).html("￥"+ microusercost);
				$(".shopPrice").eq(1).html("￥"+ microuserDepostit);
				$(".shopPrice").eq(2).html("￥"+ microuserServiceCharge);
				$('.indent_date').html(createtime);
			} else {
				$(".weshop").hide();
				$(".otherdetail").show();
				$('.total_money').html(total);
				/* modefied by 李思远 at 2017.09.04 for 修改显示金钱不对(只针对虚拟订单1个) begin   */
				$(".dosign .price").html(total);
				/* modefied by 李思远 at 2017.09.04 for 修改显示金钱不对 end   */
				$(".price span").html(total);
				$('.indent_date').html(createtime);
			}

		}

	}, 'json');

})

//取消订单
$('#cancel_indent').live('click', function() {
	$('.cover').show();
	$('.quxiao_indent_tc').show();
})
var cancelOrder = https_domain + "/order/cancel";
$('.quxiao_indent_confirm').live('click', function() {
	ajaxPostAsyncData(cancelOrder, {
		"uid": uid,
		"id": id
	}, false, function(data) {
		if(data.code == "40000") {
			$('.quxiao_indent_confirm').parents('.choose').hide();
			$('.cover').hide();
			$.jBox.tip("取消成功!", "success");
			window.setTimeout(function() {
				window.location.href = "/static/wechat/src/self/indent/indent.html";
			}, 1000)
		} else {
			$.jBox.tip(data.resobj, "error");
		}
	}, 'json')
})

//删除订单

$('#done_delete').live('click', function() {
	$('.cover').show();
	$('.cancel_indent_tc').show();
})
$('.close_choose').live('click', function() {
	$(this).parents('.choose').hide();
	$('.cover').hide();
})
var delOrder = https_domain + "/order/delete";
$('.delete_indent_confirm').live('click', function() {
		ajaxPostAsyncData(delOrder, {
			"uid": uid,
			"id": id
		}, false, function(data) {
			if(data.code == "40000") {
				$('.delete_indent_confirm').parents('.choose').hide();
				$('.cover').hide();
				$.jBox.tip("删除成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/self/indent/indent.html";
				}, 1000)
			} else {
				$.jBox.tip(data.resobj, "error");
			}
		}, 'json')
	})
	//李阳专栏支付

$(".pay_go").live("click", function() {
		event.stopPropagation();
		var subid = $(this).attr("name");
		var orderid = $(this).attr('orderid');
		var price = $(this).parents('.wait_pay').siblings(".pay_total").find('.total_money ').html();
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				window.token = data.resobj.token;
				window.beicode = data.resobj.parentcode;
				window.mycode = data.resobj.usercode;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&xuliehaoType=" + subid + "&orderid=" + orderid + "&price=" + price;
			}
		}, 'json');
	})
	//vip支付
$('.vippay').live('click', function(event) {
		event.stopPropagation();
		var orderid = $(this).attr('orderid');
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				window.token = data.resobj.token;
				window.beicode = data.resobj.parentcode;
				window.mycode = data.resobj.usercode;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_up.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&orderid=" + orderid;
			}
		}, 'json');
	})
	//余额充值 
$('.chargepay').live('click', function(event) {
		event.stopPropagation();
		var subid = $(this).attr('subid');
		var orderid = $(this).attr('orderid');
		var price = $(this).parents('.wait_pay').siblings(".pay_total").find('.total_money ').html();
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				window.token = data.resobj.token;
				window.beicode = data.resobj.parentcode;
				window.mycode = data.resobj.usercode;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&from=charge" + "&orderid=" + orderid + "&price=" + price;
			}
		}, 'json');
	})
	//竞价问答
$('.answerpay').live('click', function(event) {
		event.stopPropagation();
//		var subid = $(this).attr('subid');
		var orderid = $(this).attr('orderid');
		var price = $(this).parents('.wait_pay').siblings(".pay_total").find('.total_money ').html();
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				window.token = data.resobj.token;
				window.beicode = data.resobj.parentcode;
				window.mycode = data.resobj.usercode;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&way=answerpay" + "&orderid=" + orderid + "&price=" + price;
			}
		}, 'json');
	})
	//微店支付
	//微店
$('.weshopPay').live('click', function(event) {
	event.stopPropagation();
	var orderid = $(this).attr('orderid');
	var price = $(this).parents('.wait_pay').siblings(".pay_total").find('.total_money ').html();
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			window.token = data.resobj.token;
			window.beicode = data.resobj.parentcode;
			window.mycode = data.resobj.usercode;
			window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&from=myshop" + "&orderid=" + orderid + "&price=" + price;
		}
	}, 'json');
})