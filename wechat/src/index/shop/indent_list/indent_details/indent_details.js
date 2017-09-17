var id = getQueryString('orderId');
var uid = getCookie('cookie_brsy_h5_uid');
var reason = '订单不能按预计时间送达';
var price = ''; //单价
var token = '';
var expressstate = ''; //物流状态
var total = ''; //总价
var ordertype = ''; //订单类型
var vipstate = ''; //是否会员，否1是2
var vipprice = 0; //会员单价
//var id='3d670e12e4c544db8fad21d2a13b45';
function check_input(a) {
	$(a).prop('checked', 'true');
	$('input_check').not(a).prop('checked', 'false');
}

function label(a) {
	$(a).addClass('hover');
	$(a).siblings('.chooses').removeClass('hover');
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.prop('checked', 'true');
	$('input_check').not(b).prop('checked', 'false');
	reason = $(a).find('input').val();

}

function ye() {
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": 1,
		"page": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			var money = Math.round(parseFloat(data.resobj.money) * 100) / 100;
			$("#yue").html("￥" + money);
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
}
//ye();
//关闭弹窗
$(document).on('click', '.close', function(e) {
	$(this).parents('.handle_tc').removeClass('my-show');
	$('.cover').hide();
})

$(function() {
	//var orderInfo="http://10.1.1.120:8080/spOrder/orderInfo";
	ajaxPostAsyncData(orderInfo, {
			"uid": uid,
			"orderId": id,
		}, false, function(data) {
			if(data.code == "40000") {
				var username = data.resobj.username; //姓名
				var phone = data.resobj.phone; //电话
				var address = data.resobj.address; //地址
				var state = data.resobj.state; //订单状态（是否完成）
				var paystate = data.resobj.paystate; //支付状态
				expressstate = data.resobj.expressstate; //发货状态
				var refundstate = data.resobj.refundstate; //退款状态（已发货已收货不能退款）
				//var refundstate="3";
				var refundreason = data.resobj.refuserefundreason; //退款失败原因
				var expressno = data.resobj.expressno; //物流单号
				ordertype = data.resobj.orderType; //订单类型，1闪电购2众筹

				if(expressstate == '0') {
					$('.logistics').hide();
					//$('.send').hide();
				} else if(expressstate == '1') {
					$('.logistics_state').html('物流运输中');
					$('.logistics_number').html(expressno);
				} else {
					$('.logistics_state').html('已送达');
					$('.logistics_number').html(expressno);
				}
				$('.indent_number').html(id);
				$('.indent_number').live('click', function() {
					//alert(id);
					$('.cover').show();
					$('.numbers').html(id);
					$('.indent_number_tc').show();

				})
				$('.cover').live('click', function() {
					//alert(id);
					$(this).hide();
					$('.indent_number_tc').hide();

				})
				if(state == '1') {
					if(refundstate == '2') {
						$('.indent_state').html('退款成功');
						$('.paytype_').html('已退');
						$('.t_success').show();
						$('.done').show();
						if(expressstate == '0') {
							$('.sends').hide();
						}
					} else {
						$('.indent_state').html('完成');
						$('.done').show();
						if(paystate == '1') {
							//$('.indent_state').html('已支付');
							$('.paytype_').html('已付');
						}
						if(refundstate == '-1') {
							$('.fail_reason').show();
							$('.t_fail').show();
							$('.done').hide();
							$('.fail_reason_content').html(refundreason);
						}
					}

				} else if(state == '-1') {
					$('.indent_state').html('已取消');
					$('.cancel').show();
					if(expressstate == '0') {
						$('.sends').hide();
					}
				} else {
					if(paystate == '1') {
						//$('.indent_state').html('已支付');
						$('.paytype_').html('已付');
						if(refundstate == '-1') {
							$('.indent_state').html('退款失败');

							$('.fail_reason').show();
							$('.t_fail').show();
							$('.fail_reason_content').html(refundreason);
							if(expressstate == '1') {
								$('.t_fail #fail_confirm').addClass('white');
								$('.t_fail #fail_confirm').removeClass('del_indent');
								$('.t_fail #fail_confirm').html('确认收货');
							} else if(expressstate == '0') {
								$('.t_fail #fail_confirm').hide();
								$('.logistics').show();
								$('.logistics').html('商家正在处理订单，尚未发货');
								$('.logistics').css('text-align', 'right');
								$('.logistics').css('background', 'none');
								$('.sends').hide();
							}
						} else if(refundstate == '1' || refundstate == '3'|| refundstate == '4') {
							$('.indent_state').html('退款中');
							$('.t_ing').show();
							$('.sends').hide();
							if(refundstate == '4'){
								$('.t_ing').hide();
							}
						} else if(refundstate == '2') {
							$('.indent_state').html('退款成功');
							$('.paytype_').html('已退');
							$('.t_success').show();
						} else if(refundstate == '0') {
							if(expressstate == '1') {
								$('.indent_state').html('待收货');

								$('.send_done').show();
							} else if(expressstate == '2') {

								$('.indent_state').html('完成');
								$('.done').show();
							} else if(expressstate == '0') {
								$('.indent_state').html('待发货');
								$('.logistics').show();
								$('.logistics').html('商家正在处理订单，尚未发货');
								$('.logistics').css('text-align', 'right');
								$('.logistics').css('background', 'none');
								$('.pay_success').show();
								$('.sends').hide();
							}

						}
					} else if(paystate == '0') {
						$('.paytype_').html('需付');
						$('.indent_state').html('待付款');
						$('.wait_pay').show();
						$('.sends').hide();
					} else {
						$('.indent_state').html('支付超时');
					}
				}
				var name = data.resobj.goodname; //商品名称
				var amount = data.resobj.amount; //商品个数
				price = data.resobj.unitprice; //单价
				total = data.resobj.total; //总价
				var color = data.resobj.color; //颜色
				var modeltype = data.resobj.modeltype; //型号
				var appimgurl = data.resobj.activiimgurl; //商品图片
				var invoicetitle = data.resobj.invoicetitle; //发票抬头
				//			$('.commissionprice').html(data.resobj.commissionMoney );//佣金
				//			var token=getCookie("cookie_brsy_h5_token");
				//			//不是店主不显示佣金
				//				ajaxPostAsyncData_share(slectInfoByUid, {
				//					"token": token,
				//					"uid": uid,
				//					"type": 1
				//				}, true, function(data) {
				//					if(data.code == "40000") {
				//						if(data.resobj.ismicro==1){
				$('.commission').hide();
				/*}
					}
				}, 'json')*/
				if(invoicetitle.indexOf(',') != -1) {
					var xy_number = invoicetitle.split(',');
					invoicetitle = xy_number[0];
					var xy_numbers = xy_number[1];
					if(xy_numbers != '') {
						$('.invoice_bottom').show();
					}

					$('.companyname').html(xy_numbers);
				}
				//闪电购不显示vip价格
				if(ordertype == '1') {
					$('.goods_price .price').html(price);
					$('.commonprice .price').html(price);
				}
				if(ordertype == '3') {
					ajaxPostAsyncData(slectInfoByUid, {
						"uid": uid,
						"type": 1,
						"page": "1"
					}, false, function(data) {
						if(data.code == "40000") {
							vipstate = data.resobj.vipstate;
						} else {
							$.jBox.tip("页面初始化失败!", "error");
						}
					}, 'json')
					$('.goods_light').show();
					vipprice = data.resobj.vipprice;
					commonprice = price;
					//console.log(price);
					$('.commonprice b').html(commonprice);
					if(vipstate == '2') {

						$('.commonprice').addClass('del_price');
						$('.commonprice b').removeClass('blue');
						$('.goods_price .price').html(vipprice);
					} else {
						$('.goods_price .price').html(commonprice);
						$('.vipprice').addClass('del_price');
						$('.vipprice b').removeClass('blue');
					}

					$('.price_light').html(vipprice);
				}

			}
			var expresstime = data.resobj.expresstime; //配送日期
			var expresscompany = data.resobj.comName; //物流公司
			var createtime = data.resobj.createtime; //支付时间（订单时间）
			var remark = data.resobj.remark; //留言
			var invoicespec = data.resobj.invoicespec; //发票类型
			switch(invoicespec) {
				case 1:
					invoicespec = '电脑配件';
					break;
				case 2:
					invoicespec = '耗材';
					break;
				case 3:
					invoicespec = '明细';
					break;
				case 4:
					invoicespec = '办公用品';
					break;
			}
			if(remark != '') {
				$('.remark p').html('<span style="font-size:1.3rem;color:#666;">留言：</span>' + remark);
				$('.remark p').show();
				var ua = navigator.userAgent.toLowerCase();
				if(/iphone|ipad|ipod/.test(ua)) {
					$('.remark textarea').css('color', "#000000");
				}
			}
			if(invoicetitle == '') {
				invoicetitle = '个人';
			} else if(invoicetitle == '1') {
				invoicetitle = '未开具发票';
			}
			var paytype = data.resobj.paytype; //支付方式
			if(paytype == '1') {
				paytype = '支付宝';
			} else if(paytype == '2') {
				paytype = '微信';
			} else if(paytype == '3') {
				paytype = '银联';
			} else if(paytype == '4') {
				paytype = '余额';
			} else if(paytype == '5') {
				paytype = '序列号';
			} else if(paytype == '6') {
				paytype = '银联';
			} else if(paytype == '7') {
				paytype = '现金券';
			} else if(paytype == '0' || paytype == null) {
				$('.pay_send .pay').hide();
				//paytype='未选择';
			}
			$('.name').html(username);
			$('.phone').html(phone);
			$('.address_bottom').html(address);
			$('.goods_num').html(amount);
			if(color == "无颜色") {
				$(".goodscol").hide();
			} else if(color == "无规格") {

				$(".goods_xq").hide();
			} else {
				$('.goods_color').html(color);
			}

			$('.goods_name').html(name);
			if(modeltype == "") {
				$(".goodstype").hide();
			} else {
				$('.goods_xh').html(modeltype);
			}

			if(ordertype == '2') {
				$('.price').html(price);
				$('.invoice.goods .fl').html('商品金额');
				$('.invoice.goods .price').html(total);
				//$('.commission').show();
			}

			$('.goods_img').attr('src', appimgurl);
			if(invoicespec == 0) {
				$('.invoice .title').html(invoicetitle);
			} else {
				$('.invoice .title').html(invoicespec + '-' + invoicetitle);
			}

			//$('.companyname').html(invoicetitle);
			$('.paytype').html(paytype);
			$('.send_date').html(expresstime);
			$('.sendcompany').html(expresscompany);
			$('.total_money').html(total);
			$('.indent_date').html(createtime);
		
	}, 'json');
})
//取消订单
$('#cancel_indent').live('click', function() {
	$('.cover').show();
	$('#cancel_tc').addClass('my-show');
})

$('.submit_cancel_indent').live('click', function() {
	//var sd_cancelOrder='http://10.1.1.144:8080/spPurchaseOrder/cancelOrder';
	if(ordertype == '1') { //闪电购
		ajaxPostAsyncData(sd_cancelOrder, {
			"uid": uid,
			"orderId": id,
			"reason": reason
		}, false, function(data) {
			if(data.code == "40000") {
				$('#cancel_tc').removeClass('my-show');
				$('.cover').hide();
				$.jBox.tip("取消成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
				}, 1000)
			} else {
				$.jBox.tip(data.resobj, "error");
			}
		}, 'json')
	} else if(ordertype == '2') { //众筹
		ajaxPostAsyncData(cancelOrder, {
			"uid": uid,
			"orderId": id,
			"reason": reason
		}, false, function(data) {
			if(data.code == "40000") {
				$('#cancel_tc').removeClass('my-show');
				$('.cover').hide();
				$.jBox.tip("取消成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
				}, 1000)
			} else {
				$.jBox.tip(data.resobj, "error");
			}
		}, 'json')
	} else { //超市
		ajaxPostAsyncData(spcancelOrder, {
			"uid": uid,
			"orderId": id,
			"reason": reason
		}, false, function(data) {
			if(data.code == "40000") {
				$('#cancel_tc').removeClass('my-show');
				$('.cover').hide();
				$.jBox.tip("取消成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
				}, 1000)
			} else {
				$.jBox.tip(data.resobj, "error");
			}
		}, 'json')
	}

})
$(document).on('click', '.close_choose', function(e) {
		$(this).parents('.choose').hide();
		$('.cover').hide();
	})
	//删除订单

$('.delete_indent_confirm').live('click', function() {
	ajaxPostAsyncData(delOrder, {
		"uid": uid,
		"orderId": id
	}, false, function(data) {
		if(data.code == "40000") {
			$('.delete_indent_confirm').parents('.choose').hide();
			$('.cover').hide();
			$.jBox.tip("删除成功!", "success");
			window.setTimeout(function() {
				window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
			}, 1000)
		} else {
			$.jBox.tip(data.resobj, "error");
		}
	}, 'json')
})

$('.del_indent').live('click', function() {
		$('.cancel_indent_tc').show();
		$('.cover').show();
	})
	//物流
$(document).on('click', '.logistics', function(e) {
		if(expressstate == '0') {
			return false;
		} else {
			window.location.href = "/static/wechat/src/index/shop/indent_list/indent_details/logistics.html?orderid=" + id;
		}

	})
	//申请退款
$('.t_money').live('click', function() {
	$('.cover').show();
	$('#refund_tc').addClass('my-show');
})
$('.submit_refund_indent').live('click', function() {
	ajaxPostAsyncData(refundApply, {
		"uid": uid,
		"orderId": id,
		"refund": reason
	}, false, function(data) {
		if(data.code == "40000") {
			$('#cancel_tc').removeClass('my-show');
			$('.cover').hide();
			$.jBox.tip("申请退款成功!", "success");
			window.setTimeout(function() {
				window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
			}, 1000)
		} else {
			$.jBox.tip(data.resobj, "error");
		}
	}, 'json')
})

// $('.tk_confirm').live('click',function(){

// 		var refund=$('.tips textarea').val();
// 		var refundApply="http://10.1.1.120:8080/spOrder/refundApply";
// 		ajaxPostAsyncData(refundApply, {
// 		"uid":uid,
// 		"orderId":id,
// 		"refund":refund
// 	}, false, function(data) {
// 		if(data.code == "40000") {
// 			$('.tk_confirm').parents('.choose').hide();
// 			$('.cover').hide();
// 			$.jBox.tip("申请成功!", "success");
// 			window.setTimeout(function(){
// 				window.location.href="/static/wechat/src/index/shop/indent_list/indent_list.html";
// 			},1000)
// 		} else {
// 			$.jBox.tip(data.resobj, "error");
// 		}
// 	}, 'json')

// })
//取消退款
$('#cancel_t').live('click', function() {
	$('.qx_tc').show();
	$('.cover').show();
})
$('.tk_qx').live('click', function() {
		//var refundCancel="http://10.1.1.120:8080/spOrder/refundCancel";
		ajaxPostAsyncData(refundCancel, {
			"uid": uid,
			"orderId": id,
		}, false, function(data) {
			if(data.code == "40000") {
				$('.tk_qx').parents('.choose').hide();
				$('.cover').hide();
				$.jBox.tip("取消成功!", "success");
				window.setTimeout(function() {
					window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
				}, 1000)
			} else {
				$.jBox.tip(data.resobj, "error");
			}
		}, 'json')
	})
	//去付款
$('.pay_go').live('click', function() {
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": 1,
		"page": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			token = data.resobj.token;
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
	window.location.href = "/static/wechat/src/index/shop/indent_handle/indent_pay/indent_pay.html?orderid=" + id + "&price=" + total + "&token=" + token;
})
$('#send_confirm').live('click', function() {
		$('.sh_tc').show();
		$('.cover').show();
	})
	//确认收货
$('.qr_sh').live('click', function() {
	ajaxPostAsyncData(gotGoods, {
		"uid": uid,
		"orderId": id,
	}, false, function(data) {
		if(data.code == "40000") {
			$('.qr_sh').parents('.choose').hide();
			$('.cover').hide();
			$.jBox.tip("确认收货成功!", "success");
			window.setTimeout(function() {
				window.location.href = "/static/wechat/src/index/shop/indent_list/indent_list.html";
			}, 1000)
		} else {
			$.jBox.tip(data.resobj, "error");
		}
	}, 'json')
})
$('#fail_confirm.white').live('click', function() {
	$('.sh_tc').show();
	$('.cover').show();
})
$('.pay.goods').show();

function loades() {
	//console.log($('.hides').height());
	if($('.hides').height() <= 30) {
		$('.hides').parents('.total').css('padding', '0px');
		$('.border_line').hide();
	}
	$('.pf').hide(); //隐藏发票
	$('.hides').parents('.total').css('margin-bottom', '0px');
}