var endtime;
var gid;
var price;
var timeDiff;
var id; //闪电购id
var vip_discount; //vip折率
var persent_; //已售进度
var total_count; //总数
//var vipstate; //会员状态
var num;
id = getQueryString("id");
var uid = getCookie('cookie_brsy_h5_uid');
var addprice; //浮动价

var type = getQueryString('type');

if(type!='shoplink'){
	$('.shopMark').hide();
}else{
	$('.shopMark').show();
	var shopurl = document.location.href;//获取当前页面地址
	sessionStorage.shopurl=shopurl;//存入localStorage
}

$('.shopMark i').click(function() {
	$('.shopMark').hide();
});


function loadData() {

	//查询是否会员
	//	ajaxPostAsyncData(slectInfoByUid, {
	//		"uid": uid,
	//		"type": 1,
	//	}, false, function(data) {
	//		if(data.code == "40000") {
	//			vipstate = data.resobj.vipstate;
	//		} else {
	//			$.jBox.tip("页面初始化失败!", "error");
	//		}
	//	}, 'json');

	//	闪电购详情
	ajaxPostAsyncData(lightningBuy, {
		"id": id
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj;
			//model小图
			var appimgurl3 = data.resobj.appimgurl3;
			$(".buy-model-header img").attr("src", appimgurl3);
			//剩余时间
			timeDiff = resdata.diffmillis;
			//已售数量
			num = resdata.numbers;
			price = resdata.price;
			//商品gid
			gid = resdata.gid;
			//商品总数
			total_count = resdata.count;

			if(price == null) {
				price = 0;
			}
			//标题和副标题
			$('.intro').html(resdata.title);
			$('.sub-title').html(resdata.title2);
			gid = resdata.gid;
			//对活动价进行处理
			price = parseFloat(price).toFixed(2);
			$('.bin-price').html(price);
			var beprice = parseInt(price);
			var afprice = Math.abs(price).toFixed(2);
			afprice = afprice.toString().replace(/\d+\.(\d*)/, "$1")
			$(".numsell>span").html(num);
			$(".beprice").html(beprice);
			$(".afprice").html(afprice);
		} else {
			$.jBox.tip("查询失败" + data.info, "error");
		}
	}, "json");

	ajaxPostAsyncData(spOrderGetSellCount, {
		"gid": gid,
		"type": "1",
		"activityid": id
	}, false, function(data) {
		if(data.code = "40000") {
			//已售数量
			var sellcount = data.resobj.count;
			//总数量
			total_count = parseInt(total_count) + parseInt(sellcount);
			persent_ = Math.round(100 * sellcount / total_count);
			//已售进度条
			$('.percent').html('已售' + persent_ + '%');
			//判断当已售比例大于100与小于0
			if(persent_ > 100) {
				persent_ = 100;
			} else if(persent_ < 0) {
				persent_ = 0;
			}

			$('.left').css('width', persent_ + '%');
			$(".numsell>span").html(sellcount);

		} else {
			$.jBox.tip("查询失败" + data.info, "error");
		}
	}, "json");

	//	商品id获取详情
	ajaxPostAsyncData(superlightningDetail, {
		"id": gid
	}, false, function(data) {
		if(data.code = "40000") {

			var resdata = data.resobj;
			//原始价格
			var oldprice = resdata.price;
			//商品详情
			var descrip = resdata.descrip;
			//轮播图
			var slideimg = resdata.slideimgurls;
			slide = slideimg.split(",");
			for(var i = 1; i < slide.length; i++) {
				$(".swiper-container1 .swiper-wrapper").append('<div class="swiper-slide"><a href="javascript:0;"><img class="swiper-img" src=' + slide[i] + '></a></div>')
			}
			oldprice = "￥" + parseFloat(oldprice).toFixed(2);
			$(".oldprice").html(oldprice);
			//富文本商品详情
			$(".goods_des").html(descrip);

		} else {
			$.jBox.tip("查询失败" + data.info, "error");
		}
	}, "json");

	// 轮播
	var mySwiper = new Swiper('.swiper-container1', {
		pagination: '.swiper-pagination',
		direction: 'horizontal',
		autoplay: true,
		speed: 3000,
		loop: true,
		autoplayDisableOnInteraction: false,
	})

	//商品规格

	ajaxPostAsyncData(orderPreInfo, {
		"gid": gid
	}, false, function(data) {
		if(data.code == "40000") {
			var colorstr = '';
			var typestr = '';
			var divindex = 0;

			$.each(data.resobj, function(index, value) {
				var value1 = value;
				if(index == "无型号") {

					$(".indent-sub-change-color").hide(); //隐藏颜色
					$('.default-type span:eq(0)').hide(); //隐藏已选颜色
					$('.buy-model-header-content p:eq(1) span:eq(0)').hide(); //隐藏已选颜色

				} else if(index == "无规格") {
					$('.default-type').hide(); //隐藏选择规格型号等
					$('.default-type h6').hide();
					$(".indent-sub-change").hide(); //全部隐藏
					//无规格赋值gsId
					$.each(value1, function(index, value) {
						gsId = value.gsId;
					});
				} else if(index == "无颜色") {
					$('.indent-sub-change-color').hide();
				}

				colorstr += "<li>" + [index] + "</li>";
				divindex++;
				$.each(value1, function(index, value) {
					if(value.type == "") {
						//如果类型为空隐藏型号
						$(".indent-sub-change-model ").hide();
						gsId = value.gsId;
					} else {
						if(value.flag == '1') {
							typestr += "<li data-gsId=" + value.gsId + " data-add=" + value.addprice + " class=\"div" + divindex + " light\">" + value.type + "</li>";
						} else {
							typestr += "<li data-gsId=" + value.gsId + " data-add=" + value.addprice + " class=\"div" + divindex + " gray\">" + value.type + "</li>";
						}
					}

				});
				$('.types').html(typestr);
			});
			$('.colors').html(colorstr);

		} else {

		}
	}, 'json')

	//无颜色,有型号时gsid 
	if($('.indent-sub-change-color').css('display') == 'none' && $('.indent-sub-change-model').css('display') != 'none') {
		gsId = $('.indent-sub-change-model li.current').attr('data-gsid');
	}

	//根据颜色换规格
	$(document).on('click', '.colors li', function(e) {
		$('.types li').removeClass('current');
		var index = $(this).index() + 1;
		$(this).addClass('current');
		$(this).siblings('li').removeClass('current');
		var class_ = '.div' + index;
		var classes = '.div' + index + '.light';
		$('.types li').not(class_).hide();
		//$(classes).siblings('li').addClass('gray');
		//$(classes).eq(0).addClass('current');
		$(class_).show();
		//$(classes).eq(0).trigger('click');

		//不存在型号时
		if($('.indent-sub-change-model').css('display') == 'none') {
			$('.buy-model-header-content p:eq(1)').show();
			$('.buy-model-header-content h6').hide();
			//详情页规格型号数据更改
			$('.default-type h6').hide();
			$('.default-type p').show();
			$('.default-type span:eq(0)').html('"' + $('.colors .current').html() + '"');
			$('.default-type span:eq(1)').html('');
			//mdoel规格型号数据更改
			$('.buy-model-header-content p:eq(1) span:eq(0)').html('"' + $('.colors .current').html() + '"');
			$('.buy-model-header-content p:eq(1) span:eq(1)').html('');
		} else {
			//详情页规格型号数据更改
			$('.default-type span:eq(0)').html('"' + $('.colors .current').html() + '"');
			//mdoel规格型号数据更改
			$('.buy-model-header-content p:eq(1) span:eq(0)').html('"' + $('.colors .current').html() + '"');
			$('.buy-model-header-content p:eq(1) span:eq(1)').html('');
			$('.buy-model-header-content p:eq(1)').hide();
			$('.buy-model-header-content h6').show();
			$('.default-type h6').show();
			$('.default-type p').hide();
		}

	});
	//不同型号切换
	$(document).on('click', '.types li.light', function(e) {

		$(this).addClass('current');
		$(this).siblings('li').removeClass('current');
		var type = $(this).html();
		var color = $('.colors li.current').html();
		//获取被点击规格的浮动价
		addprice = $(this).attr('data-add');

		gsId = $('.types li.current').attr('data-gsId'); //商品规格id

		//如果有颜色选项
		if($('.indent-sub-change-color').css('display') != 'none') {
			//选中状态时更新已选值
			for(var i = 0; i < $('.colors li').length; i++) {
				//如果已经选中颜色
				if($('.colors li').eq(i).hasClass('current')) {
					$('.buy-model-header-content p:eq(1)').show();
					$('.default-type h6').hide();
					$('.default-type p').show();
					$('.buy-model-header-content h6').hide();
					$('.buy-model-header-content p:eq(1) span:eq(1)').html('"' + $('.types .current').html() + '"');
					$('.default-type span:eq(1)').html('"' + $('.types .current').html() + '"');
					//更改价格
					if(addprice != '') {
						vipvals = (Number(price) + Number(addprice)); //加上浮动价的vip单价
						vipvals = Number(vipvals).toFixed(2);
						//选择后的价格（加浮动价）
						$(".buy-model-header-content p:eq(0) span").html(vipvals);
						//if(vipstate == 1) {
						//vipvals = (Number(price) + Number(addprice)); //加上浮动价的vip单价
						//vipvals = Number(vipvals).toFixed(2);
						//选择后的价格（加浮动价）
						//$(".buy-model-header-content p:eq(0) span").html(vipvals);
						//valstotal = Number(valstotal).toFixed(2);
						//} else {
						//vals = (Number(price) + Number(addprice)); //加上浮动价之后的商品单价
						//vals = Number(vals).toFixed(2);
						//$(".goods_price .price").html(vals);
						//选择后的价格（加浮动价）
						//$(".buy-model-header-content p:eq(0) span").html(vals);
					}
				}

			}
		} else {
			$('.default-type h6').hide();
			$('.default-type p').show();
			$('.default-type span:eq(0)').html('');
			$('.default-type span:eq(1)').html('"' + $('.types .current').html() + '"');
			$('.buy-model-header-content h6').hide();
			$('.buy-model-header-content p:eq(1)').show();
			$('.buy-model-header-content p:eq(1) span:eq(0)').html('');
			$('.buy-model-header-content p:eq(1) span:eq(1)').html('"' + $('.types .current').html() + '"');
			if(addprice != '') {
				vipvals = (Number(price) + Number(addprice)); //加上浮动价的vip单价
				vipvals = Number(vipvals).toFixed(2);
				//选择后的价格（加浮动价）
				$(".buy-model-header-content p:eq(0) span").html(vipvals);
				//if(vipstate == 1) {
				//vipvals = (Number(price) + Number(addprice)); //加上浮动价的vip单价
				//vipvals = Number(vipvals).toFixed(2);
				//选择后的价格（加浮动价）
				//$(".buy-model-header-content p:eq(0) span").html(vipvals);
				//valstotal = Number(valstotal).toFixed(2);
				//} else {
				//	vals = (Number(price) + Number(addprice)); //加上浮动价之后的商品单价
				//	vals = Number(vals).toFixed(2);
				//$(".goods_price .price").html(vals);
				//选择后的价格（加浮动价）
				//$(".buy-model-header-content p:eq(0) span").html(vals);
				//}
			}
		}
	});

}

loadData();

//倒计时

var intDiff = parseInt(timeDiff); //倒计时总秒数量
intDiff = Math.round(intDiff / 1000);
var timer = null;

function time() {
	var day = 0,

		hour = 0,

		minute = 0,

		second = 0; //时间默认值		

	if(intDiff > 0) {

		day = Math.floor(intDiff / (60 * 60 * 24));

		hour = Math.floor(intDiff / (60 * 60)) - (day * 24);

		minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);

		second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);

	}

	if(hour <= 9) hour = '0' + hour;

	if(minute <= 9) minute = '0' + minute;

	if(second <= 9) second = '0' + second;

	$('#day_show').html(day + "天");

	$('#hour_show').html(hour);

	$('#minute_show').html(minute);

	$('#second_show').html(second);

	intDiff--;

}
time();

timer = setInterval(time, 1000);

//遮罩层下禁止滑动屏幕
$(".mark").on('touchmove', function(event) {
	event.preventDefault();
}, false);
// $("#buy-model").on('touchmove', function(event) {
// 	event.preventDefault();
// }, false);

//展开遮罩层
$('.default-type p').click(function() {
	$('.types li.current').trigger('click');
	$('.mark').show();
	$('#buy-model').show();
	//	$('#buy-model').css('bottom', '0');
});

//点击请选择规格型号
$('.default-type h6').click(function() {
	$('.mark').show();
	$('#buy-model').show();
	//	$('#buy-model').css('bottom', '0');
	$('.buy-btn').html('立即购买');
});

//点击关闭遮罩层
$('.close-model').click(function() {
	$('.mark').hide();
	$('#buy-model').hide();
	//	$('#buy-model').css('bottom', '-110%');
});

//点击确定
$('.buy-btn').click(function() {
	var _gsid = $('.types li.current').attr('data-gsId');
	if(_gsid == undefined) {
		_gsid = gsId;
	}
	//规格
	var colorC = $('.colors .current').html();
	//型号
	var typeC = $('.types .current').html();
	var finalPrice = $('.buy-model-header-content p:eq(0) span').html();
	//如果没有颜色
	if($('.indent-sub-change-color').css('display') == 'none') {
		if($('.types li.current').length != 1) {
			$.jBox.tip("请选择型号", "info");
			return false;
		} else {
			$('#buy-model').hide();
			//			$('#buy-model').css('bottom', '-110%');
			if(type == "shoplink") {
				window.location.href = '/static/wechat/src/admin/login/upgrade_login.html?from=shoplogin';
			} else {
				setTimeout(function() {
					window.location.href = '/static/wechat/src/index/shop/lightingBuy/indent_submit/indent_submit.html?gsId=' + _gsid + '&price=' + finalPrice + '&color=' + colorC + '&type=' + typeC + '&id=' + gid + "&ids=" + id + "&num=1";
					$('.mark').hide();
				}, 800);
			}
		}
	}
	//如果没有型号
	if($('.indent-sub-change-model').css('display') == 'none') {
		if($('.colors li.current').length != 1) {
			$.jBox.tip("请选择规格", "info");
			return false;
		} else {
			$('#buy-model').hide();
			//			$('#buy-model').css('bottom', '-110%');
			if(type == "shoplink") {
				window.location.href = '/static/wechat/src/admin/login/upgrade_login.html?from=shoplogin';
			} else {
				setTimeout(function() {
					window.location.href = '/static/wechat/src/index/shop/lightingBuy/indent_submit/indent_submit.html?gsId=' + _gsid + '&price=' + finalPrice + '&color=' + colorC + '&type=' + typeC + '&id=' + gid + "&ids=" + id + "&num=1";
					$('.mark').hide();
				}, 800);
			}

		}
	}
	//如果都有
	if($('.indent-sub-change-color').css('display') != 'none' && $('.indent-sub-change-model').css('display') != 'none') {
		if($('.colors li.current').length != 1) {
			$.jBox.tip("请选择规格", "info");
			return false;
		} else if($('.types li.current').length != 1) {
			$.jBox.tip("请选择型号", "info");
			return false;
		} else {
			$('#buy-model').hide();
			//			$('#buy-model').css('bottom', '-110%');
			if(type == "shoplink") {
				window.location.href = '/static/wechat/src/admin/login/upgrade_login.html?from=shoplogin';
			} else {
				setTimeout(function() {
					window.location.href = '/static/wechat/src/index/shop/lightingBuy/indent_submit/indent_submit.html?gsId=' + _gsid + '&price=' + finalPrice + '&color=' + colorC + '&type=' + typeC + '&id=' + gid + "&ids=" + id + "&num=1";
					$('.mark').hide();
				}, 800);
			}

		}
	}
});

//页面底部立即购买（非蒙层）
$(".purchase").click(function() {
	if($('.default-type h6').css('display') == 'none') {
		var _gsid = gsId;
		if(_gsid == undefined) {
			_gsid = gsId;
		}
		//规格
		var colorC = $('.colors .current').html();
		//型号
		var typeC = $('.types .current').html();
		var finalPrice = price;
		if(type == "shoplink") {
			window.location.href = '/static/wechat/src/admin/login/upgrade_login.html?from=shoplogin';
		} else {

			window.location.href = '/static/wechat/src/index/shop/lightingBuy/indent_submit/indent_submit.html?gsId=' + _gsid + '&price=' + finalPrice + '&color=' + colorC + '&type=' + typeC + '&id=' + gid + "&ids=" + id + "&num=1";
		}
	} else {
		$('.default-type h6').trigger('click');
		$('.buy-btn').html('确定');
	}
})