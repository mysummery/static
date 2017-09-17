/**
***
*** lsy date by 2017/07/25
***
*/
"use strict";

$(function(){
	const uid = getCookie('cookie_brsy_h5_uid');
	//恭喜成为小微店主
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": 1
	},false, function (data) {
		if(data.code = "40000") {
			document.querySelector('span').innerHTML = data.resobj.idcardname;
		}
	});

	ajaxPostAsyncData(latestCrowfund, {
		"page": '1'
	}, false, function(data) {
		if(data.code = "40000") {
			let resdata = data.resobj.rows;

			let htmlStr = "";
			if(data.resobj.rows.length != 0) {
				for(let i = 0; i < 4; i++) {

					//已筹金额
					let money = resdata[i].money;
					//基数
					let amount = resdata[i].amount;
					//计算百分比
					let per,
					percent = Math.ceil(Math.round(money / amount * 10000) / 100.00) + "%";

					htmlStr += "<div class='crowd-box'>";
					htmlStr += "<a href='/static/wechat/src/index/shop/shop_index/goods_details/goods_details.html?id=" + resdata[i].id + "'>";
					htmlStr += "<div class='pic'>";
					htmlStr += "<img src=" + data.resobj.rows[i].mid + ">";
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
				document.querySelector('.crowd-con').innerHTML = htmlStr;
			}

		} else {
			$.jBox.tip("加载最新众筹失败!" + data.info, "error");
		}
	}, "json");
})
