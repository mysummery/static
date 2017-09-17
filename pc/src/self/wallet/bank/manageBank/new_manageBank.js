// JavaScript Document
$(function() {
	var uid = getCookie("cookie_brsy_pc_uid");
	$(".purse").addClass("current");

})
var uid = getCookie("cookie_brsy_pc_uid");

function loadData() {
	var account = getCookie("cookie_brsy_pc_account");
	ajaxWebPostAsyncData(selectSYinhangkaByRyid, {
		"uid": uid
	}, false, function(data) {
		if(data.code == "40000") {
		
			var rows = data.resobj;
			var imgurl = '';
			var str = '';
			$.each(rows, function(index, value) {
				var chikaren = rows[index].cardholder;
				var kahao = rows[index].cardnum;
				var ssh = rows[index].parentbank;
				var cardtype = rows[index].cardtype;
				var bankid = rows[index].id;
				if(cardtype == null) {
					cardtype == "";
				} else if(cardtype.length > 3) {
					cardtype = cardtype.substring(0, 3);
				}
				var len = kahao.length;
				kahao = "**** **** **** " + kahao.substring(len - 4, len);
				var imgurl = check_cardname(ssh);
				//alert(imgurl);
				if(imgurl == false) {
					$(".cardBox").append("");
				} else {
					$(".card-info").append("<div class='cardBox'><div class='card-top'><img class='fl' src='/static/pc/assets/images/bank_" + imgurl + ".png'/><div class='tit'><p>" + kahao + "</p></div><div class='type fr'>" + cardtype + "</div></div><div class='card-bottom'><p>持卡人：<span>" + chikaren + "</span></p><p>手机号码：<span>" + account + "</span></p><b name=" + bankid + ">解绑</b></div></div>");
				}

				if(cardtype == null) {
					$(".type").hide();
				}
			});

		} else {
			$.jBox.tip(data.info, '');
		}

	}, 'json');
};

loadData();


	$(".cardBox b").on('click',function (){
	          var id = $(this).attr("name");
	         
	          var that = this;
	          var submit = function(v, h, f) {
			   if(v == 'yes') {
			   	
				ajaxWebPostAsyncData(deleteBankCard, {
					"uid": uid,
					"id": id
				}, false, function(data) {
                      
					if(data.code == "40000") {
						var resdata = data.resobj;
						
						$(that).parent().parent('.cardBox').remove();

					}else {
						$.jBox.tip('删除失败'+data.info, 'success');
					}
				}, 'json')
				
			}
			if(v == 'no') {
//				$.jBox.tip('没保存。');
			}
			if(v == 'cancel') {
//				$.jBox.tip('已取消。');
			}

			return true;
		};
		// 可根据需求仿上例子定义按钮
		$.jBox.warning("您确定要解绑该银行卡吗？", "提示", submit);
		
	})


