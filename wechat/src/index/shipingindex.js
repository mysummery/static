window.ryid = getCookie("cookie_brsy_h5_uid");
window.token = getCookie("cookie_brsy_h5_token");
function loading() {
	var code = getQueryString("code");
	if(ryid != null && token != null) { //$('#self').html("<img src=\"images/self.png\" style=\"width:25%;\">");
		$('#self').html("个人中心");
		$('#self').click(function() {
			var rurl = encodeURIComponent(api + "/static/wechat/src/self/self_center.html");
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
				appid +
				"&redirect_uri=" +
				rurl +
				"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
		})
	} else {
		$('#self').html("登录");
		$('#self').click(function() {
			//alert("11");
			window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
		})

	}
}

function go() {
	var ryid = getCookie('cookie_brsy_h5_uid');
	if(ryid != null) {
		var huiyuan = getCookie("cookie_brsy_h5_huiyuan");
		if(huiyuan == "2") {
			window.location.href = "/static/wechat/src/self/wantgroup/iwantto_groupbuying.html";
		} else {

			$.jBox.tip("您还不是会员，无法团购，请先升级会员！", "error");
		}
	} else {

		window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
	}
}

function down() {
	window.location.href = "/static/wechat/src/admin/download.html";
}

function loadData() {
	// 判断是否已经登录

	loading();
	//请求数据
	ajaxPostAsyncData(slide, {
	}, false, function(data) {
		if(data.code = "40000") {
		 for(var i = 0; i < data.resobj.length; i++){
		 	$(".swiper-container .swiper-wrapper").append('<div class="swiper-slide"><a href="' + data.resobj[i].applinkurl + '"><img class="swiper-img" src=' + data.resobj[i].appimgurl + '></a></div>')
		 }
		} else {
			$.jBox.tip("轮播图查询失败!" + data.info, "error");
		}
	}, "json");
	

	ajaxPostAsyncData(sfEnlei, {
	}, false, function(data) {
		if(data.code = "40000") {
			//初始化
			var i = 1;
			var tempobjimg = data.resobj.lunboimgs;
			var tempobjoption = data.resobj.fenleis;

			for(var temp in tempobjimg) {
				var getParam = function(key) {
					var lot = tempobjimg[temp].dizhi;
					var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
					return decodeURIComponent(lot.replace(reg, "$1"));
				}
				var dizhi = getParam("zjid");
//				$(".swiper-container .swiper-wrapper").append('<div class="swiper-slide"><a href="' + tempobjimg[temp].dizhi + '"><img class="swiper-img" src=' + tempobjimg[temp].appimg + '></a></div>')
			};

		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
	var options = document.getElementsByClassName('option');
	for(var i = 0; i < options.length; i++) {
		options[i].onclick = function() {
			var zjid = $(this).attr("name")
			window.location.href = "/static/wechat/src/index/lessons/lessons.html?zjid=" + zjid
		}
	}
	//热门

	ajaxPostAsyncData(selectBykcid, {
		"page":page,
		"courseid" : "",
		"type" : "2"
	}, false, function(data) {
		if(data.code == "40000") {
			var tempimg = data.resobj.rows;
			var totalpage = data.resobj.total;
			if(totalpage == 1) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			for(var temp in tempimg) {
//				if(tempimg[temp].kcname.length > 10) {
//					tempimg[temp].kcname = tempimg[temp].kcname.substr(0, 9) + "...";
//				}
				$("#hot .module-context").append('<div class="module-img hot-img "><div class="img"  onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].kcname + '</p></div>')
					// 简单版
				if(tempimg[temp].free == '1') {
					$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"  style="position:relative;" onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '><img src="/static/wechat/assets/images/icon_free.png" style="position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;"></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
				} else {
					$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"   onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
				}

			}
		} else {
			$.jBox.tip("加载热门推荐失败!" + data.info, "error");
		}
	}, "json");
	/* 精选
	 var  recommend = "/appSShipin/selectBytuijian.ph"
	 ajaxPostAsyncData(recommend,{page:1},true, function (data) {
	 if (data.code == "40000") {
	 var tempimg =  data.resobj.rows;
	 for(var temp of tempimg) {
	 $("#splendid .module-context").append('<div class="module-img hot-img "><div class="img"><img src='+temp.imgappurl+'></div><p class="module-p">'+temp.kcname+'</p></div>')
	 }
	 }else{
	 $.jBox.tip("登录失败!" + data.info, "error");
	 }
	 },"json")
	 // vip
	 var vip = "/appSShipin/selectBytuijian.ph?page=1";
	 ajaxPostAsyncData(vip,null,true, function (data) {
	 if(data.code == "40000") {
	 var tempimg =  data.resobj.rows;
	 for(var temp of tempimg) {
	 $("#VIP .module-context").append('<div class="module-img hot-img "><div class="img"><img src='+temp.imgappurl+'></div><p class="module-p">'+temp.kcname+'</p></div>')
	 }
	 }else{
	 $.jBox.tip("登录失败!" + data.info, "error");
	 }
	 },"json");*/

	// 轮播
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'horizontal',
		autoplay: 1000,
		speed: 1000,
		loop: true,
		autoplayDisableOnInteraction: false,
	})
	$('#btn').click(function() {
		mySwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
	})

}

var page = 1;

function getdataafter() {
	page = page + 1;
	ajaxPostAsyncData(selectBykcid, {
		"page":page,
		"courseid" : "",
		"type" : "2"
	}, false, function(data) {
		if(data.code == "40000") {
			var tempimg = data.resobj.rows;
			var totalpage = data.resobj.total;
//			if(page > totalpage) {
//				return false;
//			} else {
				for(var temp in tempimg) {
//					if(tempimg[temp].kcname.length > 10) {
//						tempimg[temp].kcname = tempimg[temp].kcname.substr(0, 9) + "...";
//					}
					// 简单版
					if(tempimg[temp].free == '1') {
						$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"  style="position:relative;" onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '><img src="/static/wechat/assets/images/icon_free.png" style="position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;"></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
					} else {
						$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"   onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
					}
				}
//			}
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
}

function player(zjid) {
	window.location.href = "/static/wechat/src/service/play/play.html?zjid=" + zjid + "&ryid=" + ryid + "&type=1";
}
loadData();