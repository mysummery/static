// JavaScript Document
var myScroll;
var index = 0;
var page = 1;
var ryid = getCookie("cookie_brsy_h5_uid");
//声明用户团购等级
var groupLevel;

//获取用户团购等级
ajaxPostAsyncData(slectInfoByUid, {
	"uid": ryid,
	"type": 1
}, false, function(data) {
	if (data.code == '40000') {
		//团购等级
		groupLevel = data.resobj.groupbuylevel;
	}else {
		$.jBox.tip(data.info, 'error');
	}
}, 'json');

var dataFn = {
	completedIndent: function() {
		//  var ryid = "7e09dd4c863000";
		ajaxPostAsyncData(selectSDingdanByRyid, {
			"uid": ryid,
			"page": page,
			"state": "2"
		}, false, function(data) {
			var rows = data.resobj.rows;
			//var uid=rows[index].uid;
			//			console.log(rows);
			if(rows.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			var str = '';
			if($.trim(data.code) == "40000") {
				$.each(rows, function(index, value) {
					var state = '';
					var type = '';
					var title = '';
					var gopay = '';
					var updatetime = rows[index].updatetime;

					str += "<div class=\"list-box\" orderid=\"" + rows[index].id + "\" ids=\"" + rows[index].ids + "\">";
					str += "<p>";
					str += "<span class=\"tit fl\">";

					if(rows[index].state == "2") {
						state = "已支付";

					}
					if(rows[index].type == "1") {
						type = "会员升级";
						title = "李强365会员升级";
						str += "<b class=\"vip\"></b>" + type + "</span>";
						var imgs = "gradebg.png";
					} else if(rows[index].type == "3") {
						type = "专栏订阅";
						title = rows[index].name;
						str += "<b class=\"dy\"></b>" + type + "</span>";
						var imgs = "indent_list.png";
					} else if(rows[index].type == "2") {
						type = "钱包充值";
						title = "余额充值";
						var imgs = "charge_in.png";
						str += "<b class=\"chargemoney\"></b>" + type + "</span>";
					}else if(rows[index].type == "6") {
						type = "小微店";
						title = "开通小微店";
						var imgs = "weshop.png";
						str += "<b class=\"weshop\"></b>" + type + "</span>";
					} 
					else {
						type = "竞价问答";
						var imgs = "answerpay.png";
						title = "直播问题竞价";
						str += "<b class=\"answer\"></b>" + type + "</span>";
					}
					str += "<span class=\"status fr\">" + state + "</span>";
					str += "</p>";
					str += "<div class=\"box-con\">";
					str += "<div class=\"big-bg fl\">";
					str += "<img src=/static/wechat/assets/images/" + imgs + ">";
					str += "</div>";
					str += "<div class=\"list-text\">";
					str += "<p class=\"one\">";
					str += "<span class=\"text-tit\">" + title + "</span>";
					str += "<span class=\"price fr\">￥<span class=\"pricenum\">" + rows[index].total + "</span></span>";
					str += "</p>";
					str += "<p class=\"two\">";
					var createtime = rows[index].createtime
					if(rows[index].type == "3") {
						createtime = rows[index].createtime.substr(0, 10).replace(/-/g, '.');
						var year = parseInt(createtime.substr(0, 4)) + 1;
						year.toString();
						var days = createtime.substr(4, createtime.length);
						var deadline = year + days;
						str += "<span class=\"text-time\">有效期：" + createtime + '-' + deadline + "</span>";
					} else if(rows[index].type == "2" || rows[index].type == "4" || rows[index].type == "5") {
						if(updatetime == null) {
							str += "<span class=\"text-time\">支付时间：" + createtime + "</span>";
						} else {
							str += "<span class=\"text-time\">支付时间：" + updatetime + "</span>";
						}
					}else if (rows[index].type == "6") {
						//6.5W以下用户显示有效期
						if (groupLevel != '3' && groupLevel != '4') {
							createtime = rows[index].createtime.substr(0, 10).replace(/-/g, '.');
							var year = parseInt(createtime.substr(0, 4)) + 1;
							year.toString();
							var days = createtime.substr(4, createtime.length);
							var deadline = year + days;
							str += "<span class=\"text-time\">有效期：" + createtime + '-' + deadline + "</span>";
						}
					}
					str += "<span class=\"num fr\">×1</span>";
					str += "</p>";
					str += "</div>";
					str += "</div>";
					str += gopay;
					str += "</div>";

				});
				if(page == 1) {
					if(rows.length < 1) {
						$('.indentList').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indentList').html(str);
					}
				} else {
					$('.indentList').append(str);
				}

			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	},

	noPay: function() {
		//  var ryid = "7e09dd4c863000";
		ajaxPostAsyncData(selectSDingdanByRyid, {
			"uid": ryid,
			"page": page,
			"state": "1"
		}, false, function(data) {
			var rows = data.resobj.rows;
			//var uid=rows[index].uid;

			if(rows.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			var str = '';
			if($.trim(data.code) == "40000") {
				$.each(rows, function(index, value) {
					var state = '';
					var type = '';
					var title = '';
					var gopay = '';
					var updatetime = rows[index].updatetime;
					str += "<div class=\"list-box\" orderid=\"" + rows[index].id + "\" ids=\"" + rows[index].ids + "\">";
					str += "<p>";
					str += "<span class=\"tit fl\">";

					if(rows[index].state == "1") {
						state = "待支付";
						if(rows[index].type == "1") {
							gopay = "<div class=\"btn\"><button class=\"vippay\" orderid=\"" + rows[index].id + "\">立即支付</button></div>";
						} else if(rows[index].type == "3") {
							gopay = "<div class=\"btn\"><button class=\"subpay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
						} else if(rows[index].type == "2") {
							gopay = "<div class=\"btn\"><button class=\"chargepay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
						} else {
							gopay = "<div class=\"btn\"><button class=\"answerpay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
						}
					}
					if(rows[index].type == "1") {
						type = "会员升级";
						title = "李强365会员升级";
						str += "<b class=\"vip\"></b>" + type + "</span>";
						var imgs = "gradebg.png";
					} else if(rows[index].type == "3") {
						type = "专栏订阅";
						title = rows[index].name;
						str += "<b class=\"dy\"></b>" + type + "</span>";
						var imgs = "indent_list.png";
					} else if(rows[index].type == "2") {
						type = "钱包充值";
						title = "余额充值";
						var imgs = "charge_in.png";
						str += "<b class=\"chargemoney\"></b>" + type + "</span>";
					}else if(rows[index].type == "6") {
						type = "小微店";
						title = "开通小微店";
						var imgs = "weshop.png";
						str += "<b class=\"weshop\"></b>" + type + "</span>";
					} 
					else {
						type = "竞价问答";
						var imgs = "answerpay.png";
						title = "直播问题竞价";
						str += "<b class=\"answer\"></b>" + type + "</span>";
					}
					str += "<span class=\"status fr\">" + state + "</span>";
					str += "</p>";
					str += "<div class=\"box-con\">";
					str += "<div class=\"big-bg fl\">";
					str += "<img src=/static/wechat/assets/images/" + imgs + ">";
					str += "</div>";
					str += "<div class=\"list-text\">";
					str += "<p class=\"one\">";
					str += "<span class=\"text-tit\">" + title + "</span>";
					str += "<span class=\"price fr\">￥<span class=\"pricenum\">" + rows[index].total + "</span></span>";
					str += "</p>";
					str += "<p class=\"two\">";
					str += "<span class=\"num fr\">×1</span>";
					str += "</p>";
					str += "</div>";
					str += "</div>";
					str += gopay;
					str += "</div>";

				});
				if(page == 1) {
					if(rows.length < 1) {
						$('.indentList').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
					} else {
						$('.indentList').html(str);
					}
				} else {
					$('.indentList').append(str);
				}

			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	}
}

function loadData() {

	//  var ryid = "7e09dd4c863000";
	ajaxPostAsyncData(selectSDingdanByRyid, {
		"uid": ryid,
		"page": page
	}, false, function(data) {
		var rows = data.resobj.rows;
		//var uid=rows[index].uid;

		//		console.log(rows);
		if(rows.length < 10) {
			$('#scroller-pullUp').hide();
		} else {
			$('#scroller-pullUp').show();
		}
		var str = '';
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				var updatetime = rows[index].updatetime;
				var state = '';
				var type = '';
				var title = '';
				var gopay = '';

				str += "<div class=\"list-box\" orderid=\"" + rows[index].id + "\" ids=\"" + rows[index].ids + "\">";
				str += "<p>";
				str += "<span class=\"tit fl\">";
				if(rows[index].state == "-2") {
					state = "已退款";
				} else if(rows[index].state == "-1") {
					state = "超时";
				} else if(rows[index].state == "0") {
					state = "已取消";
				} else if(rows[index].state == "2") {
					state = "已支付";
				} else {
					state = "待支付";

					if(rows[index].type == "1") {
						gopay = "<div class=\"btn\"><button class=\"vippay\" orderid=\"" + rows[index].id + "\">立即支付</button></div>";
					} else if(rows[index].type == "3") {
						gopay = "<div class=\"btn\"><button class=\"subpay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
					} else if(rows[index].type == "2") {
						gopay = "<div class=\"btn\"><button class=\"chargepay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
					} else {
						gopay = "<div class=\"btn\"><button class=\"answerpay\" orderid=\"" + rows[index].id + "\" subid=\"" + rows[index].subjectid + "\">立即支付</button></div>";
					}
				}
				if(rows[index].type == "1") {
					type = "会员升级";
					title = "李强365会员升级";
					str += "<b class=\"vip\"></b>" + type + "</span>";
					var imgs = "gradebg.png";
				} else if(rows[index].type == "3") {
					type = "专栏订阅";
					title = rows[index].name;
					str += "<b class=\"dy\"></b>" + type + "</span>";
					var imgs = "indent_list.png";
				} else if(rows[index].type == "2") {
					type = "钱包充值";
					title = "余额充值";
					var imgs = "charge_in.png";
					str += "<b class=\"chargemoney\"></b>" + type + "</span>";
				}else if(rows[index].type == "6") {
					type = "小微店";
					title = "开通小微店";
					var imgs = "weshop.png";
					str += "<b class=\"weshop\"></b>" + type + "</span>";
				} 
				else {
					type = "竞价问答";
					var imgs = "answerpay.png";
					title = "直播问题竞价";
					str += "<b class=\"answer\"></b>" + type + "</span>";
				}
				str += "<span class=\"status fr\">" + state + "</span>";
				str += "</p>";
				str += "<div class=\"box-con\">";
				str += "<div class=\"big-bg fl\">";
				str += "<img src=/static/wechat/assets/images/" + imgs + ">";
				str += "</div>";
				str += "<div class=\"list-text\">";
				str += "<p class=\"one\">";
				str += "<span class=\"text-tit\">" + title + "</span>";
				str += "<span class=\"price fr\">￥<span class=\"pricenum\">" + rows[index].total + "</span></span>";
				str += "</p>";
				str += "<p class=\"two\">";
				var createtime = rows[index].createtime
				if(rows[index].type == "3") {
					createtime = rows[index].createtime.substr(0, 10).replace(/-/g, '.');
					var year = parseInt(createtime.substr(0, 4)) + 1;
					year.toString();
					var days = createtime.substr(4, createtime.length);
					var deadline = year + days;
					str += "<span class=\"text-time\">有效期：" + createtime + '-' + deadline + "</span>";
				} else if(rows[index].type == "2" || rows[index].type == "4" || rows[index].type == "5") {
					if(state != "待支付") {
							
						
					if(updatetime == null) {
						str += "<span class=\"text-time\">支付时间：" + createtime + "</span>";
					} else {
						str += "<span class=\"text-time\">支付时间：" + updatetime + "</span>";
						
					}
					//alert(state);
					}

				} else if (rows[index].type == "6") {
					//6.5W以下用户显示有效期
					if (groupLevel != '3' && groupLevel != '4') {
						createtime = rows[index].createtime.substr(0, 10).replace(/-/g, '.');
						var year = parseInt(createtime.substr(0, 4)) + 1;
						year.toString();
						var days = createtime.substr(4, createtime.length);
						var deadline = year + days;
						str += "<span class=\"text-time\">有效期：" + createtime + '-' + deadline + "</span>";
					}
				}
				str += "<span class=\"num fr\">×1</span>";
				str += "</p>";
				str += "</div>";
				str += "</div>";
				str += gopay;
				str += "</div>";

			});
			if(page == 1) {
				if(rows.length < 1) {
					$('.indentList').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无列表</p></div>')
				} else {
					$('.indentList').html(str);
				}
			} else {
				$('.indentList').append(str);
			}
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
};

$('.indent-list-tab ul li').click(function() {
	index = $(this).index();
	page = 1;
	//清空原有数据
	$('.indentList').html('');
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	switch(index) {
		//全部
		case 0:

			loadData();

			break;
			//待付款
		case 1:

			dataFn.noPay();

			break;
			//支付成功
		case 2:

			dataFn.completedIndent();

			break;
	}
	setTimeout(function() {
		myScroll.refresh()
	}, 300)
});
/*function getdatabefor () {
	loadData();
}*/
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
		//		console.log('1')
		if(this.maxScrollY - this.y > 1) {
			//			console.log('2')
			getdataafter();
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)

		}
	});
	var paystate = getQueryString("paystate");
	if(paystate == 'success') {
		$('#indent-list-ul li').eq(2).trigger('click');
		dataFn.completedIndent();
	}
}

function getdataafter() {
	page++;
	switch(index) {
		//全部
		case 0:
			loadData();
			break;
			//待付款
		case 1:
			dataFn.noPay();
			break;
			//支付成功
		case 2:
			dataFn.completedIndent();
			break;
	};
	setTimeout(function() {
		myScroll.refresh()
	}, 300)
}
var uid = getCookie("cookie_brsy_h5_uid");
//vip会员
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
	//专栏升级
$('.subpay').live('click', function(event) {
		event.stopPropagation();
		var subid = $(this).attr('subid');
		var orderid = $(this).attr('orderid');
		var price = $(this).parents('.list-box').find('.pricenum').html();
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
	//余额充值 
$('.chargepay').live('click', function(event) {
		event.stopPropagation();
		var subid = $(this).attr('subid');
		var orderid = $(this).attr('orderid');
		var price = $(this).parents('.list-box').find('.pricenum').html();
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				window.token = data.resobj.token;
				window.beicode = data.resobj.parentcode;
				window.mycode = data.resobj.usercode;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&xuliehaoType=" + subid + "&from=charge" + "&orderid=" + orderid + "&price=" + price;
			}
		}, 'json');
	})
	//竞价问答
$('.answerpay').live('click', function(event) {
	event.stopPropagation();
	var subid = $(this).attr('subid');
	var orderid = $(this).attr('orderid');
	var price = $(this).parents('.list-box').find('.pricenum').html();
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {
		if(data.code == "40000") {
			window.token = data.resobj.token;
			window.beicode = data.resobj.parentcode;
			window.mycode = data.resobj.usercode;
			window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&way=answerpay" + "&xuliehaoType=" + subid + "&from=charge" + "&orderid=" + orderid + "&price=" + price;
		}
	}, 'json');
})
	//微店
$('.weshopPay').live('click', function(event) {
	event.stopPropagation();
	var orderid = $(this).attr('orderid');
	var price = $(this).parents('.list-box').find('.pricenum').html();
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
$('.list-box').live('click', function() {
	var orderid = $(this).attr('orderid');
	var ids = $(this).attr('ids');
	window.location.href = "/static/wechat/src/self/indent/indent_detail.html?ids=" + ids + "&&orderid=" + orderid;
})

document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
loadData();
loaded();