// JavaScript Document
function loadData() {
	var uid = getCookie("cookie_brsy_pc_uid");
	var account = getCookie("cookie_brsy_pc_account");
	ajaxWebPostAsyncData(selectSYinhangkaByRyid, {
		"uid": uid
	}, false, function(data) {
	
		if(data.code == "40000") {
		var rows = data.resobj;
	
		console.log(rows)
		var imgurl = '';
		var str='';
			$.each(rows, function(index, value) {
				var chikaren = rows[index].cardholder;
				var kahao = rows[index].cardnum;
				var ssh = rows[index].parentbank;
				var cardtype = rows[index].cardtype;
				if (cardtype.length>3){
					cardtype = cardtype.substring(0, 3);
				}
				console.log(cardtype);
				var len = kahao.length;
				kahao = "**** **** **** " + kahao.substring(len - 4, len);
				var imgurl = check_cardname(ssh);
				console.log(imgurl);
				//alert(imgurl);
				if(imgurl == false) {
					$(".cardBox").append("");
				} else {	
	
					$(".card-info").append("<div id='cardBox'><div class='card-top'><img class='fl' src='./images/bank_" + imgurl + ".png'/><div class='tit'><p>"+kahao+"</p></div><div class='type fr'>"+cardtype +"</div></div><div class='card-bottom'><p>持卡人：<span>"+chikaren+"</span></p><p>手机号码：<span>"+account+"</span></p></div></div>");
				}
				
				if (cardtype == null){
					$(".type").hide();
				}
			});

		} else {
			$.jBox.tip(data.info, '');
		}
		
	}, 'json');
};

loadData();