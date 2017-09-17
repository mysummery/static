// JavaScript Document

var ryid = getCookie('cookie_brsy_h5_uid');

function next() {
	var chikaren = $('#name').val();
	var kahao = $('#bank_code').val();
	setCookie('cookie_brsy_h5_chikaren', encodeURI(chikaren,"utf-8"), 7);
	setCookie('cookie_brsy_h5_kahao', kahao, 7);
	if(kahao == "" || chikaren == "") {
		//alert("用户名和密码不能为空!");
		$.jBox.tip("请完善信息!", "error");
		return false;
	} else {
		var flag = true;
		ajaxPostAsyncData(selectSYinhangkaByRyid, {
			"ryid": ryid,
			"uid": ryid
		}, false, function(data) {
			var rows = data.resobj;
			$.each(rows, function(index, value) {
				if(rows[index].kahao === kahao) {
					flag = false;
				}

			})

		}, 'json')
		ajaxPostAsyncData(selectyinhangkaType, {
			"cardnum": kahao,
		}, false, function(data) {
			var rows = data.resobj;
			var parentbank=rows.parentbank;
			var cardtype=rows.cardtype;
			if(parentbank==undefined||cardtype==undefined){
				$.jBox.tip("银行卡卡号有误，请重新输入!", "error");
			}else{
				if(flag) {
					window.location.href = "/static/wechat/src/self/mycard/card_information.html?parentbank="+parentbank+"&cardtype="+cardtype;
				} else {
					$.jBox.tip("您已绑定过该银行卡，请绑定其他银行卡!", "error");
		}
			}
			
		}, 'json')
		

	}

}