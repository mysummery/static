// JavaScript Document
function loadData() {
	var ryid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectSYinhangkaByRyid, {
		"uid": ryid
	}, false, function(data) {
		var rows = data.resobj;
		var imgurl = '';
		if(data.code == "40000") {
			$.each(rows, function(index, value) {
				var kahao = rows[index].cardnum;
				var ssh = rows[index].parentbank;
				var l = kahao.length;
				kahao = "**** **** **** " + kahao.substring(l - 4, l);
				var imgurl = check_cardname(ssh);
				//alert(imgurl);
				if(imgurl == false) {
					$(".card_list").append("");
				} else {
					// var zjid=rows[index].zjid;
					//$(".card_list").append("<li><img src=\"images/bank_"+zjid+".png\" class=\"bank_logo fl\"><p class=\"bank_code\">"+kahao+"</p></li>");
					$(".card_list").append("<li><img src=\"/static/wechat/assets/images/bank_" + imgurl + ".png\" class=\"bank_logo fl\"><p class=\"bank_code\">" + kahao + "</p></li>");
				}
			});

		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
};

loadData();