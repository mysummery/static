var vipState; //1普通  2 会员
function loadData() {
	var uid = getCookie("cookie_brsy_h5_uid");
	var light_id; //闪电购id
	var authstate; //1未认证 2  已认证

	var ismicro; //是否小微店主
	var groupbuyLevel;
	var percent;

	//请求顶部轮播数据
	if (uid != '' && uid != null) {
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			'type': "1"
		}, false, function(data) {
			if(data.code = "40000") {
				if(data.resobj.length != 0) {
					ismicro = data.resobj.ismicro;
					authstate = data.resobj.authstate;
					vipState = data.resobj.vipstate;
					groupbuyLevel = data.resobj.groupbuylevel;
					$(".shopentry").show();
					if(ismicro == "0") {
						$(".applyshop").html('我的微店');
					}
				}
			} else {
				$.jBox.tip("查询失败!" + data.info, "error");
			}
		}, "json");
	}

	$(".shopentry").click(function() {
		//判断身份是否认证、是否vip、是否6.5万及以上团购商
		if (uid != '' && uid != null) {
			if(authstate != "2") {
				$.jBox.tip("需要实名认证，请前往APP进行认证!", "error");
			} else if(groupbuyLevel < "3") {
				$.jBox.tip("高级合伙人及以上级别的团购商，才能申请小微店！", "error");
			} else {
				//判断是否小微店主，0是1不是
				if(ismicro == "1") {
					window.location.href = "/static/wechat/src/self/myshop/apply_shop/apply_shop.html";
				} else {

					window.location.href = "/static/wechat/src/self/myshop/my_shop.html";
				}
			}
		}else {
			$.jBox.tip("为了获取更好的体验，建议您先登录！", "error");
			setTimeout(function() {
				window.location.href = "/static/wechat/src/admin/login/upgrade_login.html";
			}, 2000)
		}
			

		//		else if(vipState == "1") {
		//			$.jBox.tip("请先升级为VIP，才能申请小微店", "error");
		//		}
		

	})

	//请求顶部轮播数据
	ajaxPostAsyncData(SPcrowfundSlide, {
		"page": '1'
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.crowList;
			if(resdata.length != 0) {
				var htmlStr = "";
				for(var i = 0; i < resdata.length; i++) {
					htmlStr += '<div class="swiper-slide">';
					//					如果type为1,是闪电购
					if(resdata[i].type == "1") {
						htmlStr += '<a href="/static/wechat/src/index/shop/lightingBuy/lightning_detail.html?id=' + resdata[i].id + '">';
						//如果type为2,是众筹
					} else if(resdata[i].type == "2") {
						htmlStr += '<a href="/static/wechat/src/index/shop/shop_index/goods_details/goods_details.html?id=' + resdata[i].id + '">';
						//如果type为3,是超市
					} else {
						htmlStr += '<a href="/static/wechat/src/index/shop/superBuy/super_detail.html?id=' + resdata[i].id + '">';
					}
					//如果appimgurl有值，优先使用这个字段，没有则使用big
					if(resdata[i].appimgurl != "") {
						htmlStr += '<img class="swiper-img" src=' + resdata[i].appimgurl + '>';
					} else {
						htmlStr += '<img class="swiper-img" src=' + resdata[i].big + '>';

					}

					htmlStr += '</a>';
					htmlStr += "</div>";
				}
				$(".swiper-container1 .swiper-wrapper").append(htmlStr);
			}
		} else {
			$.jBox.tip("轮播图查询失败!" + data.info, "error");
		}
	}, "json");
	// 轮播
	var mySwiper = new Swiper('.swiper-container1', {
		pagination: '.swiper-pagination',
		direction: 'horizontal',
		autoplay: 1000,
		speed: 1000,
		loop: true,
		autoplayDisableOnInteraction: false,
	})

	//	今日推荐数据
	//	ajaxPostAsyncData(todayRecommend, {
	//		"page": '1'
	//	}, false, function(data) {
	//		if(data.code = "40000") {
	//			for(var i = 0; i < data.resobj.rows.length; i++) {
	//				$(".swiper-container2 .swiper-wrapper").append('<div class="swiper-slide"><a href="/static/wechat/src/index/shop/shop_index/goods_details/goods_details.html?id=' + data.resobj.rows[i].id + '"><div class="radius"><img class="" src=' + data.resobj.rows[i].mid + '></div><p>' + data.resobj.rows[i].title + '</p></a></div>')
	//			}
	//		} else {
	//			$.jBox.tip("查询失败!" + data.info, "error");
	//		}
	//	}, "json");
	// 获取闪电购信息
	ajaxPostAsyncData(fcPurchaselist, {
		page: 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			if(data.resobj.rows.length != 0) {
				var light_img = data.resobj.rows[0].appimgurl2;
				$(".light-content>img").attr("src", light_img);
				light_id = data.resobj.rows[0].id; //闪电购id
			} else {
				$(".today").hide();
			}
		} else {
			$.jBox.tip(data.info, '');
		}

	}, 'json');
	//点击闪电购banner图
	$(document).on('click', '.light-content', function(e) {
		if(light_id != '' && light_id != undefined) {
			window.location.href = "/static/wechat/src/index/shop/lightingBuy/lightning_detail.html?id=" + light_id;
		} else {
			$.jBox.tip('暂无闪电购！', "error");
		}

	})

	//	最新众筹
	ajaxPostAsyncData(latestCrowfund, {
		"page": '1'
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			var htmlStr = "";
			if(data.resobj.rows.length != 0) {
				for(var i = 0; i < data.resobj.rows.length; i++) {
					var money = resdata[i].money;
					var amount = resdata[i].amount;
					percent = Math.ceil(Math.round(money / amount * 10000) / 100.00) + "%";
					htmlStr += "<div class='crowd-box'>";
					htmlStr += "<a href='/static/wechat/src/index/shop/shop_index/goods_details/goods_details.html?id=" + resdata[i].id + "'>";
					htmlStr += "<div class='pic'>";
					htmlStr += "<img src=" + data.resobj.rows[i].mid + " alt='' />";
					htmlStr += "</div>";
					htmlStr += "<div class='crowd-text'>";
					htmlStr += "<p>" + resdata[i].title + "</p>";
					htmlStr += "<span>";
					if(parseFloat(percent) > 100) {
						percent = 100 + "%";
						htmlStr += "<b style='width:" + percent + ";'></b>";
					} else {
						htmlStr += "<b style='width:" + percent + ";'></b>";
					}

					htmlStr += "</span>";
					htmlStr += "<div class='crowd-num'>";
					htmlStr += "已筹:";
					htmlStr += "<span>";
					htmlStr += "￥" + resdata[i].money + "";
					htmlStr += "</span>";
					htmlStr += "<b>";
					htmlStr += "" + percent + "";
					htmlStr += "</b>";
					htmlStr += "</div>";
					htmlStr += "</div>";
					htmlStr += "</a>";
					htmlStr += "</div>";

				}
				$(".crowd-con").append(htmlStr);
			}

		} else {
			$.jBox.tip("加载最新众筹失败!" + data.info, "error");
		}
	}, "json");

}

loadData();
var category = ""; //类型
var page = "1"; //初始化第一页
$(function() {
	spMarketList(page, category);
	//超市分类切换
	$(".super-type li").click(function() {
		//		清空列表内容
		$(".super-con").html("");
		page = "1";
		//		点击状态切换图片
		$(this).addClass("current").siblings().removeClass("current");
		category = $(this).index();
		//       如果点击下标为0的,category传空
		if(category == "0") {
			category = "";
		}
		spMarketList(page, category);
		setTimeout(function() {
			myScroll.refresh()
		}, 300);
	})
})
	//获取商品列表
function spMarketList(page, category) {
	ajaxPostAsyncData(spMarketlist, {
		"page": page,
		"category": category
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			var htmlStr = "";
			//数据若小于10，隐藏上拉加载
			if(resdata.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			if(data.resobj.rows.length != 0) {
				for(var i = 0; i < data.resobj.rows.length; i++) {
					var money = resdata[i].money;
					var amount = resdata[i].amount;
					htmlStr += "<div class='super-box'>";
					htmlStr += "<a href='/static/wechat/src/index/shop/superBuy/super_detail.html?id=" + resdata[i].id + "'>";
					htmlStr += "<div class='pic'>";
					htmlStr += "<img src=" + data.resobj.rows[i].marketAppimgurl2 + " alt='' />";
					htmlStr += "</div>";
					htmlStr += "<div class='super-text'>";
					htmlStr += "<p>" + resdata[i].name + "</p>";
					htmlStr += "<div class='super-num'>";
					if(vipState == "1") {
						//						如果不是会员
						htmlStr += "<b>￥" + resdata[i].marketPrice + "</b>";
					} else {
						//						如果是会员
						htmlStr += "<b>￥" + resdata[i].vipprice + "</b>";
					}

					htmlStr += "<del>￥" + resdata[i].price + "</del>";
					htmlStr += "</div>";
					htmlStr += "</div>";
					htmlStr += "</a>";
					htmlStr += "</div>";

				}
				$(".super-con").append(htmlStr);
			}

		} else {
			$.jBox.tip("加载超市专区失败!" + data.info, "error");
		}
	}, "json");
}
//超市专区上拉加载
function getdataafter() {
	page++;
	spMarketList(page, category);
}
