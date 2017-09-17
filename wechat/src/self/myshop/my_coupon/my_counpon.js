var uid = getCookie("cookie_brsy_h5_uid");
//转入余额
/*$('#turn').click(function() {
	$('.turn_tc').show();
	$('.cover').show();
})*/

//关闭、取消
/*$('.close').click(function() {
	$('.turn_tc').hide();
	$('.cover').hide();
})*/

$(function() {
	//获取我的现金券
	ajaxPostAsyncData(couponlist, {
			"uid": uid,
			"page": '1'
		}, true, function(data) {
			if(data.code == "40000") {
				if(data.resobj.rows != '') {
					//现金券金额及小数点前后不同显示
					var money = data.resobj.rows[0].money;//总金额
					money = parseFloat(money).toFixed(2);
					var beprice = parseInt(money);
					var afprice = money;
					afprice = afprice.toString().replace(/\d+\.(\d*)/, "$1")
					$(".beprice").html(beprice);
					$(".afprice").html(afprice);
					//冻结截止日期
					//$('.deadline').html(data.resobj.rows[0].endtime);
				}

			}
		}, 'json')
		//获取众筹列表
	ajaxPostAsyncData(latestCrowfund, {
		"page": '1'
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			var htmlStr = "";
			if(data.resobj.rows.length != 0) {
				for(var i = 0; i < 4; i++) {
					//					console.log(data);
					var money = resdata[i].money;
					var amount = resdata[i].amount;
					var per;
					var percent = Math.ceil(Math.round(money / amount * 10000) / 100.00) + "%";
					htmlStr += "<div class='crowd-box'>";
					htmlStr += "<a href='javascript:;' data-id=" + resdata[i].id + ">";
					htmlStr += "<div class='pic'>";
					htmlStr += "<img src=" + data.resobj.rows[i].mid + " alt='' />";
					htmlStr += "</div>";
					htmlStr += "<div class='crowd-text'>";
					htmlStr += "<p>" + resdata[i].title + "</p>";
					htmlStr += "<span>";
					if(parseFloat(percent) > 100) {
						per = 100 + "%";
						htmlStr += "<b style='width:" + per + ";'></b>";
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
			$.jBox.tip("加载众筹失败!" + data.info, "error");
		}
	}, "json");
})

//点击进入商品详情
$(document).on('click', '.crowd-box', function(e) {
	var id = $(this).find('a').attr('data-id');
	window.location.href = "/static/wechat/src/index/shop/shop_index/goods_details/goods_details.html?id=" + id;
})

//验证数字
/*function clearNoNum(obj) {
	//修复第一个字符是小数点 的情况.  
	if(obj.value != '' && obj.value.substr(0, 1) == '.') {
		obj.value = "";
	}

	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符  
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的       
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数       
	if(obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		if(obj.value.substr(0, 1) == '0' && obj.value.length == 2) {
			obj.value = obj.value.substr(1, obj.value.length);
		}
	}

}*/