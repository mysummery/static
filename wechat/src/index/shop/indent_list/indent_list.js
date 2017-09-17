/*
 *** author: 李思远;
 *** date: 2017-05-16;
 */
//var https_domain="http://10.1.1.120:8080";

/* 
	**
	**added by 李思远 at 2017.08.24 for 
	**添加强制退款功能(refundstate = 4)，显示退款中（全部，订单完成，退款里面都可以查询出来）
	**优化业务逻辑 state=>paystate=>expressstate=>refundstate
	**
 */
var type = 0,
	uid = getCookie('cookie_brsy_h5_uid'),
	page = 1, //初始页数
	index = 0,	//tab下标
	total = 0;	
var myScroll;
var repeatFlag = true; //防止多次触发
var dataFn = {
	//待付款
	noPay: function() {
		ajaxPostAsyncData(listUnPay, {
			"page": page,
			"uid": uid
		}, false, function(data) {
			if(data.code == "40000") {
				repeatFlag = true;
				var resobjRow = data.resobj.rows;
				var _html = '';
				//数据若小于10，隐藏上拉加载
				if(resobjRow.length < 10) {
					$('#scroller-pullUp').hide();
				} else {
					$('#scroller-pullUp').show();
				}
				$.each(resobjRow, function(i) {
					_html += '<div class="indent-sublist">';
					_html += '<div class="indent-sublist-state clearfix">';
					if(resobjRow[i].orderType == '1') {
						_html += '<span class="fl sd">闪电购</span>';
					} else if(resobjRow[i].orderType == '2') {
						_html += '<span class="fl zc">众筹商城</span>';
					} else {
						_html += '<span class="fl cs">365超市</span>';
					}
					_html += '<span class="fr">待付款</span>';
					_html += '</div>';
					_html += '<div class="indent-sublist-information clearfix" data-orderId=' + resobjRow[i].orderId + '>';
					_html += '<div class="indent-sublist-img fl">';
					_html += '<img src="' + resobjRow[i].activiimgurl + '" alt="">';;
					_html += '</div>';
					_html += '<div class="indent-sublist-text fl">';
					_html += '<p>' + resobjRow[i].goodname + '</p>';
					_html += '<h5>订单编号：<span>' + resobjRow[i].orderId + '</span></h5>';
					//_html += '<h6>颜色：<span>' + resobjRow[i].color + '</span>型号：<span>' + resobjRow[i].type + '</span></h6>';
					if(resobjRow[i].color == "无颜色") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else if(resobjRow[i].type == "") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					}
					_html += '</div>';
					_html += '<div class="indent-sublist-money fr">';
					_html += '<p>￥<span>' + resobjRow[i].total + '</span></p>';
					_html += '<h6>x<span>' + resobjRow[i].amount + '</span></h6>';
					_html += '</div>';
					_html += '</div>';
					_html += '<div class="indent-sublist-handle">';
					_html += '<a href="javascript:;">立即支付</a>';
					_html += '</div>';
					_html += '</div>';
				});
				if(page == 1) {
					if(resobjRow.length < 1) {
						$('.indent-list-container').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indent-list-container').html(_html);
					}
				} else {
					$('.indent-list-container').append(_html);
				}
			} else {
				$.jBox.tip("查询失败!" + data.info, "error");
				repeatFlag = true;
			}
		}, 'json');
	},
	//支付成功
	successPay: function() {
		ajaxPostAsyncData(listPay, {
			"page": page,
			"uid": uid
		}, false, function(data) {
			if(data.code == "40000") {
				repeatFlag = true;
				var resobjRow = data.resobj.rows;
				var _html = '';
				//数据若小于10，隐藏上拉加载
				if(resobjRow.length < 10) {
					$('#scroller-pullUp').hide();
				} else {
					$('#scroller-pullUp').show();
				}
				$.each(resobjRow, function(i) {
					_html += '<div class="indent-sublist">';
					_html += '<div class="indent-sublist-state clearfix">';
					if(resobjRow[i].orderType == '1') {
						_html += '<span class="fl sd">闪电购</span>';
					} else if(resobjRow[i].orderType == '2') {
						_html += '<span class="fl zc">众筹商城</span>';
					} else {
						_html += '<span class="fl cs">365超市</span>';
					}

					switch(resobjRow[i].refundstate) {
						//拒绝退款
						// case -1:
						// 	_html += '<span class="indent-sublist-state-red fr">退款失败</span>';
						// 	break;
							//未退款
						case 0:
							if (resobjRow[i].expressstate == 0) {
								_html += '<span class="fr">待发货</span>'
							} else if (resobjRow[i].expressstate == 1) {
								_html += '<span class="fr">待收货</span>';
							}
							break;
						// 	//退款中
						// case 1:
						// 	_html += '<span class="indent-sublist-state-red fr">退款中</span>';
						// 	break;
						// case 3:
						// 	_html += '<span class="indent-sublist-state-red fr">退款中</span>';
						// 	break;
						// case 4:
						// 	_html += '<span class="indent-sublist-state-red fr">退款中</span>';
						// break;
					}

					_html += '</div>';
					_html += '<div class="indent-sublist-information clearfix" data-orderId=' + resobjRow[i].orderId + '>';
					_html += '<div class="indent-sublist-img fl">';
					_html += '<img src="' + resobjRow[i].activiimgurl + '" alt="">';
					_html += '</div>';
					_html += '<div class="indent-sublist-text fl">';
					_html += '<p>' + resobjRow[i].goodname + '</p>';
					_html += '<h5>订单编号：<span>' + resobjRow[i].orderId + '</span></h5>';
					//_html += '<h6>颜色：<span>' + resobjRow[i].color + '</span>型号：<span>' + resobjRow[i].type + '</span></h6>';
					if(resobjRow[i].color == "无颜色") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else
					if(resobjRow[i].type == "") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					}
					_html += '</div>';
					_html += '<div class="indent-sublist-money fr">';
					_html += '<p>￥<span>' + resobjRow[i].total + '</span></p>';
					_html += '<h6>x<span>' + resobjRow[i].amount + '</span></h6>';
					_html += '</div>';
					_html += '</div>';
					switch(resobjRow[i].refundstate) {
						case 0:
							//未发货
							if(resobjRow[i].expressstate == 0 ) {
								_html += '<div class="indent-sublist-handle">';
								_html += '<a href="javascript:;">退款</a>';
								_html += '</div>';
							} else if (resobjRow[i].expressstate == 1) {
							//待收货
								_html += '<div class="indent-sublist-handle">';
								_html += '<a href="javascript:;" style="margin-right: 1rem;">退款</a>';
								_html += '<a class="indent-sublist-sure" href="javascript:;">确认收货</a></span>';
								_html += '</div>';
							}
							break;
					}
					_html += '</div>';
				});
				if(page == 1) {
					if(resobjRow.length < 1) {
						$('.indent-list-container').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indent-list-container').html(_html);
					}
				} else {
					$('.indent-list-container').append(_html);
				}
			} else {
				$.jBox.tip("查询失败!" + data.info, "error");
				repeatFlag = true;
			}
		}, 'json');
	},
	//订单完成
	completedIndent: function() {
		ajaxPostAsyncData(listFinish, {
			"page": page,
			"uid": uid
		}, false, function(data) {
			if(data.code == "40000") {
				repeatFlag = true;
				var resobjRow = data.resobj.rows;
				var _html = '';
				//数据若小于10，隐藏上拉加载
				if(resobjRow.length < 10) {
					$('#scroller-pullUp').hide();
				} else {
					$('#scroller-pullUp').show();
				}
				$.each(resobjRow, function(i) {
					_html += '<div class="indent-sublist">';
					_html += '<div class="indent-sublist-state clearfix">';
					if(resobjRow[i].orderType == '1') {
						_html += '<span class="fl sd">闪电购</span>';
					} else if(resobjRow[i].orderType == '2') {
						_html += '<span class="fl zc">众筹商城</span>';
					} else {
						_html += '<span class="fl cs">365超市</span>';
					}
					if (resobjRow[i].state == 2) {
						_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
					}else {
						switch(resobjRow[i].refundstate) {
							//已退款
							case 2:
								_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
								break;
							case 4:
								_html += '<span class="indent-sublist-state-red fr">退款中</span>';
								break;
							default:
								_html += '<span class="indent-sublist-state-gray fr">订单完成</span>';
						}
					}
					_html += '</div>';
					_html += '<div class="indent-sublist-information clearfix" data-orderId=' + resobjRow[i].orderId + '>';
					_html += '<div class="indent-sublist-img fl">';
					_html += '<img src="' + resobjRow[i].activiimgurl + '" alt="">';
					_html += '</div>';
					_html += '<div class="indent-sublist-text fl">';
					_html += '<p>' + resobjRow[i].goodname + '</p>';
					_html += '<h5>订单编号：<span>' + resobjRow[i].orderId + '</span></h5>';
					if(resobjRow[i].color == "无颜色") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else if(resobjRow[i].type == "") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					}
					_html += '</div>';
					_html += '<div class="indent-sublist-money fr">';
					_html += '<p>￥<span>' + resobjRow[i].total + '</span></p>';
					_html += '<h6>x<span>' + resobjRow[i].amount + '</span></h6>';
					_html += '</div>';
					_html += '</div>';
					switch(resobjRow[i].refundstate) {
						//已退款
						case 2:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
						case 4:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
					}
					_html += '</div>';
				});
				if(page == 1) {
					if(resobjRow.length < 1) {
						$('.indent-list-container').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indent-list-container').html(_html);
					}
				} else {
					$('.indent-list-container').append(_html);
				}
			} else {
				$.jBox.tip("查询失败!" + data.info, "error");
				repeatFlag = true;
			}
		}, 'json');
	},
	//退款
	refundIndent: function() {
		ajaxPostAsyncData(listRefund, {
			"page": page,
			"uid": uid
		}, false, function(data) {
			if(data.code == "40000") {
				repeatFlag = true;
				var resobjRow = data.resobj.rows;
				var _html = '';
				//数据若小于10，隐藏上拉加载
				if(resobjRow.length < 10) {
					$('#scroller-pullUp').hide();
				} else {
					$('#scroller-pullUp').show();
				}
				$.each(resobjRow, function(i) {
					_html += '<div class="indent-sublist">';
					_html += '<div class="indent-sublist-state clearfix">';
					if(resobjRow[i].orderType == '1') {
						_html += '<span class="fl sd">闪电购</span>';
					} else if(resobjRow[i].orderType == '2') {
						_html += '<span class="fl zc">众筹商城</span>';
					} else {
						_html += '<span class="fl cs">365超市</span>';
					}
					
					if (resobjRow[i].state == 2) {
						_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
					}else {
						switch(resobjRow[i].refundstate) {
							//拒绝退款
							case -1:
								_html += '<span class="indent-sublist-state-red fr">退款失败</span>';
								break;
								//退款中
							case 1:
								_html += '<span class="indent-sublist-state-red fr">退款中</span>';
								break;
								//退款完成
							case 2:
								_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
								break;
								//商家同意退款
							case 3:
								_html += '<span class="indent-sublist-state-red fr">退款中</span>';
								break;
								//强制退款
							case 4:
								_html += '<span class="indent-sublist-state-red fr">退款中</span>';
								break;
						}
					}
					
					_html += '</div>';
					_html += '<div class="indent-sublist-information clearfix" data-orderId=' + resobjRow[i].orderId + '>';
					_html += '<div class="indent-sublist-img fl">';
					_html += '<img src="' + resobjRow[i].activiimgurl + '" alt="">';
					_html += '</div>';
					_html += '<div class="indent-sublist-text fl">';
					_html += '<p>' + resobjRow[i].goodname + '</p>';
					_html += '<h5>订单编号：<span>' + resobjRow[i].orderId + '</span></h5>';
					//_html += '<h6>颜色：<span>' + resobjRow[i].color + '</span>型号：<span>' + resobjRow[i].type + '</span></h6>';
					if(resobjRow[i].color == "无颜色") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else if(resobjRow[i].type == "") {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '</h6>';
					} else {
						_html += '<h6 class="allspec">';
						_html += '<span class="goodscol">规格：';
						_html += '<span>' + resobjRow[i].color + '</span>';
						_html += '</span>';
						_html += '<span class="goodstype">型号：';
						_html += '<span>' + resobjRow[i].type + '</span>';
						_html += '</span>';
						_html += '</h6>';
					}
					_html += '</div>';
					_html += '<div class="indent-sublist-money fr">';
					_html += '<p>￥<span>' + resobjRow[i].total + '</span></p>';
					_html += '<h6>x<span>' + resobjRow[i].amount + '</span></h6>';
					_html += '</div>';
					_html += '</div>';
					
					
					switch(resobjRow[i].refundstate) {
						//拒绝退款
						case -1:
							_html += '<div class="indent-sublist-handle">';
							_html += '<i>查看失败原因</i>';
							_html += '<span><a href="tel:400-9009-365">联系客服</a>';
							if(resobjRow[i].expressstate == 0) {
								_html += '</span>';
							} else {
								_html += '<a class="indent-sublist-sure" href="javascript:;">确认收货</a></span>';
							}
							_html += '</div>';
							break;
							//退款中
						case 1:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break
							//退款完成
						case 2:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
							//商家同意退款
						case 3:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
							//强制退款
						case 4:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
					}

					
					_html += '</div>';
				});
				if(page == 1) {
					if(resobjRow.length < 1) {
						$('.indent-list-container').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indent-list-container').html(_html);
					}
				} else {
					$('.indent-list-container').append(_html);
				}
			} else {
				$.jBox.tip("查询失败!" + data.info, "error");
				repeatFlag = true;
			}
		}, 'json');
	}
}
initData();
loaded();
/*tab切换*/
$('.indent-list-tab ul li').click(function() {
	index = $(this).index();
	page = 1;
	//清空原有数据
	$('.indent-list-container').html('');
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	if (repeatFlag) {
		repeatFlag = false;
		switch(index) {
			//全部
			case 0:

				initData();

				break;
				//待付款
			case 1:

				dataFn.noPay();

				break;
				//支付成功
			case 2:

				dataFn.successPay();

				break;
				//订单完成
			case 3:

				dataFn.completedIndent();

				break;
				//退款
			case 4:

				dataFn.refundIndent();

				break;
		}
	}
	setTimeout(function() {
		myScroll.refresh()
	}, 300)
});

//数据初始化(全部)
function initData() {
	ajaxPostAsyncData(listAll, {
		"uid": uid,
		"page": page
	}, false, function(data) {
		if(data.code = "40000") {
			repeatFlag = true;
			var resobjRow = data.resobj.rows;
			var _html = '';
			//数据若小于10，隐藏上拉加载
			if(resobjRow.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			$.each(resobjRow, function(i) {
				_html += '<div class="indent-sublist">';
				_html += '<div class="indent-sublist-state clearfix">';
				if(resobjRow[i].orderType == '1') {
					_html += '<span class="fl sd">闪电购</span>';
				} else if(resobjRow[i].orderType == '2') {
					_html += '<span class="fl zc">众筹商城</span>';
				} else {
					_html += '<span class="fl cs">365超市</span>';
				}
				//未完成
				if(resobjRow[i].state == 0) {
					switch(resobjRow[i].paystate) {
						//支付超时
						case -1:
							_html += '<span class="fr">待付款</span>';
							break;
							//未支付
						case 0:
							_html += '<span class="fr">待付款</span>';
							break;
							//已支付
						default:
							//待发货
							if(resobjRow[i].expressstate == 0) {
								switch(resobjRow[i].refundstate) {
									//拒绝退款
									case -1:
										_html += '<span class="indent-sublist-state-red fr">退款失败</span>';
										break;
										//未退款 
									case 0:
										_html += '<span class="fr">待发货</span>';
										break;
										//退款中
									case 1:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
									case 3:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
									case 4:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
										//已退款
									default:
										_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
								}
							} else if(resobjRow[i].expressstate == 1) {
								//已发货
								switch(resobjRow[i].refundstate) {
									//拒绝退款
									case -1:
										_html += '<span class="indent-sublist-state-red fr">退款失败</span>';
										break;
										//未退款 
									case 0:
										_html += '<span class="fr">待收货</span>';
										break;
										//退款中
									case 1:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
									case 3:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
									case 4:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
										//已退款
									default:
										_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
								}

							} else {
								//已收货
								switch(resobjRow[i].refundstate) {
									case 3:
										_html += '<span class="indent-sublist-state-red fr">退款中</span>';
										break;
									default: 
										_html += '<span class="indent-sublist-state-gray fr">订单完成</span>';
								}
								

							}
					}
				} else if(resobjRow[i].state == 1) {
					//已完成
					switch(resobjRow[i].refundstate) {
						//退款完成
						case 2:
							_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
							break;
						default:
							_html += '<span class="indent-sublist-state-gray fr">订单完成</span>';
					}
				} else if(resobjRow[i].state == 2) {
					//已关闭
					_html += '<span class="indent-sublist-state-gray fr">退款成功</span>';
				}else {
					//已取消
					_html += '<span class="indent-sublist-state-gray fr">订单取消</span>';
				}
				_html += '</div>';
				_html += '<div class="indent-sublist-information clearfix" data-orderId=' + resobjRow[i].orderId + '>';
				_html += '<div class="indent-sublist-img fl">';
				_html += '<img src="' + resobjRow[i].activiimgurl + '" alt="">';
				_html += '</div>';
				_html += '<div class="indent-sublist-text fl">';
				_html += '<p>' + resobjRow[i].goodname + '</p>';
				_html += '<h5>订单编号：<span>' + resobjRow[i].orderId + '</span></h5>';
				if(resobjRow[i].color == "无颜色") {
					_html += '<h6 class="allspec">';
					_html += '<span class="goodstype">型号：';
					_html += '<span>' + resobjRow[i].type + '</span>';
					_html += '</span>';
					_html += '</h6>';
				} else if(resobjRow[i].type == "") {
					_html += '<h6 class="allspec">';
					_html += '<span class="goodscol">规格：';
					_html += '<span>' + resobjRow[i].color + '</span>';
					_html += '</span>';
					_html += '</h6>';
				} else {
					_html += '<h6 class="allspec">';
					_html += '<span class="goodscol">规格：';
					_html += '<span>' + resobjRow[i].color + '</span>';
					_html += '</span>';
					_html += '<span class="goodstype">型号：';
					_html += '<span>' + resobjRow[i].type + '</span>';
					_html += '</span>';
					_html += '</h6>';
				}

				//_html += '<h6>颜色：<span>'+ resobjRow[i].color +'</span>型号：<span>' + resobjRow[i].type + '</span></h6>';
				_html += '</div>';
				_html += '<div class="indent-sublist-money fr">';
				_html += '<p>￥<span>' + resobjRow[i].total + '</span></p>';
				_html += '<h6>x<span>' + resobjRow[i].amount + '</span></h6>';
				_html += '</div>';
				_html += '</div>';

				//未完成
				if(resobjRow[i].state == 0) {
					switch(resobjRow[i].paystate) {
						//支付超时
						case -1:
							_html += '<div class="indent-sublist-handle">';
							_html += '<a href="javascript:;">立即支付</a>';
							_html += '</div>';
							break;
							//未支付
						case 0:
							_html += '<div class="indent-sublist-handle">';
							_html += '<a href="javascript:;">立即支付</a>';
							_html += '</div>';
							break;
							//已支付
						default:
							//待发货
							if(resobjRow[i].expressstate == 0) {
								switch(resobjRow[i].refundstate) {
									//拒绝退款
									case -1:
										_html += '<div class="indent-sublist-handle">';
										_html += '<i>查看失败原因</i>';
										_html += '<span><a href="tel:400-9009-365">联系客服</a>';
										_html += '</span>';
										_html += '</div>';
										break;
										//未退款 
									case 0:
										_html += '<div class="indent-sublist-handle">';
										_html += '<a href="javascript:;">退款</a>';
										_html += '</div>';
										break;
										//退款中
									case 1:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									case 3:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									case 4:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									default:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
								}
							} else if(resobjRow[i].expressstate == 1) {
								//已发货
								switch(resobjRow[i].refundstate) {
									case -1:
										_html += '<div class="indent-sublist-handle">';
										_html += '<i>查看失败原因</i>';
										_html += '<span><a href="tel:400-9009-365">联系客服</a>';
										_html += '<a class="indent-sublist-sure" href="javascript:;">确认收货</a></span>';
										_html += '</div>';
										break;
										//未退款 
									case 0:
										_html += '<div class="indent-sublist-handle">';
										_html += '<a href="javascript:;" style="margin-right: 1rem;">退款</a>';
										_html += '<a class="indent-sublist-sure" href="javascript:;">确认收货</a></span>';
										_html += '</div>';
										break;
										//退款中
									case 1:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									case 3:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									case 4:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									default:
										_html += '<div class="indent-sublist-handle">';
										_html += '<a href="javascript:;">确认收货</a>';
										_html += '</div>';
								}
							} else if (resobjRow[i].expressstate == 2) {
								//已收货
								switch(resobjRow[i].refundstate) {
									case 3:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
									case 4:
										_html += '<div class="indent-sublist-handle">';
										_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
										_html += '</div>';
										break;
								}
							}

					}
				} else if(resobjRow[i].state == 1) {
					//已完成
					switch(resobjRow[i].refundstate) {
						//已退款
						case 2:
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
						default:
							_html += '';
					}
				} else if (resobjRow[i].state == 2) {
					switch(resobjRow[i].refundstate) {
						//订单关闭
						case 2: 
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
						case 4: 
							_html += '<div class="indent-sublist-handle">';
							_html += '退款金额：<span>' + resobjRow[i].total + '</span>';
							_html += '</div>';
							break;
						default:
							_html += '';
					}
				} else {
					//已取消
					_html += '';
				}
				_html += '</div>';

			});
			if(page == 1) {
				if(resobjRow.length < 1) {
					$('.indent-list-container').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
				} else {
					$('.indent-list-container').html(_html);
				}
			} else {
				$('.indent-list-container').append(_html);
			}

			if(data.resobj.rows.length < 1) {
				$('#scroller-pullUp').hide();
			}
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
			repeatFlag = true;
		}
	}, 'json');
}

/**
 * Scroll刷新
 */
function loaded() {
	//console.log('scroll刷新1');
	//定义一系列变量
	var upIcon = $("#up-icon");
	var downIcon = $("#down-icon");
	//new一个iscroll对象
	myScroll = new IScroll('#wrapper', {
		probeType: 1,
		preventDefault: false,
		click: true,
		mouseWheel: true
			// preventDefaultException: {
			// 	tagName: /^(INPUT|P)$/
			// }

	});

	myScroll.on("scroll", function() {

	});

	//自定义上拉刷新
	myScroll.on("scroll", function() {
		console.log('1')
		if(this.maxScrollY - this.y > 1) {
			console.log('2')
			getDataAfter();
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)

		}
	});
	var paystate = getQueryString("pay");
	if(paystate == 'success') {
		$('#indent-list-ul li').eq(2).trigger('click');
		dataFn.successPay();
	}
}

//翻页
function getDataAfter() {
	page++;
	if (repeatFlag) {
		repeatFlag = false;
		switch(index) {
			//全部
			case 0:
				initData();
				break;
				//待付款
			case 1:
				dataFn.noPay();
				break;
				//支付成功
			case 2:
				dataFn.successPay();
				break;
				//订单完成
			case 3:
				dataFn.completedIndent();
				break;
				//退款
			case 4:
				dataFn.refundIndent();
				break;
		};
	}
	
	setTimeout(function() {
		myScroll.refresh()
	}, 300)
}

//跳转
$(document).on('click', '.indent-sublist-information', function() {
	let orderId = $(this).attr('data-orderId');
	window.location.href = '/static/wechat/src/index/shop/indent_list/indent_details/indent_details.html?orderId=' + orderId;
});

$(document).on('click', '.indent-sublist-handle > a', function() {
	let orderId = $(this).parents('.indent-sublist-handle').prev().attr('data-orderId');
	window.location.href = '/static/wechat/src/index/shop/indent_list/indent_details/indent_details.html?orderId=' + orderId;
});

$(document).on('click', '.indent-sublist-sure', function() {
	let orderId = $(this).parents('.indent-sublist-handle').prev().attr('data-orderId');
	window.location.href = '/static/wechat/src/index/shop/indent_list/indent_details/indent_details.html?orderId=' + orderId;
});
//查看失败原因
$(document).on('click', '.indent-sublist-handle i', function() {
	let orderId = $(this).parents('.indent-sublist-handle').prev().attr('data-orderId');
	ajaxPostAsyncData(orderInfo, {
		"orderId": orderId,
		"uid": uid
	}, false, function(data) {
		if(data.code == '40000') {
			$('#mark').show();
			$('.reason-box-information p').html(data.resobj.refuserefundreason);
			$('.reason-box-sure').click(function() {
				$('#mark').hide();
			});
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, 'json');
});
//iscroll 优化
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

deleteCookie('yeepay');