// JavaScript Document
var uid = getCookie('cookie_brsy_h5_uid');

function loadData() {
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type":"1"
	}, false, function(data) {
		if(data.code == "40000") {
			window.all_money = data.resobj.money;
			$("#money").html(data.resobj.money);
		} else {
			$.jBox.tip("页面初始化失败!", "error");
		}
	}, 'json')
	ajaxPostAsyncData(selectSYinhangkaByRyid, {
		"ryid": uid,
		"uid": uid
	}, false, function(data) {
		if(data.resobj.length == 0 || data.resobj == null) {
			$.jBox.tip('请先绑定银行卡', "error");
			setTimeout(function() {
				window.location.href = "/static/wechat/src/self/mycard/card_bind.html"
			}, 1500)

			return;
		}
		var rows = data.resobj;
		var imgurl = '';
		var bankcode1 = rows[0].cardnum;
		var l = bankcode1.length;
		window.bankcode = "**** **** **** " + bankcode1.substring(l - 4, l);
		var first = rows[0].parentbank;
		if(first.length > 5) {
			first = first.substring(0, 5) + '...';
		}
		window.bank = first;
		$('#hidden_zjid').val(rows[0].id);
		if(data.code == "40000") {
			var first = rows[0].parentbank;
			if(first.length > 5) {
				first = first.substring(0, 5) + '...';
			}
			$("#card_list").html("<dd class=\"clearfix card\" id=\"card\"  onclick=\"first(this)\" zjid=" + rows[0].id + "><span id=\"bankcode\" class=\"bankcode fl\">" + bankcode + "</span><span id=\"bank\" class=\"bank\">" + first + "</span></dd>");
			$.each(rows, function(index, value) {
				var kahao = rows[index].cardnum;
				var ssh = rows[index].parentbank;
				var zjid = rows[index].id;
				var l1 = kahao.length;
				kahao = "**** **** **** " + kahao.substring(l1 - 4, l1);
				var checkname = check_cardname(ssh);
				if(ssh.length > 5) {
					ssh = ssh.substring(0, 5) + '...';
				}
				if(checkname == false) {
					$("#card_list").append('');
				} else {
					$("#card_list").append("<dd class=\"clearfix card card1\"  onclick=\"last(this)\" zjid=" + zjid + "><span class=\"bankcode fl\">" + kahao + "</span><span class=\"bank\">" + ssh + "</span></dd>");
				}
			});

		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');

}

function all_withdraw() {

	$("#charge").val(all_money);
}

function tx() {
	var ryid = getCookie('cookie_brsy_h5_uid');
	var yinhangid = $("#hidden_zjid").val();
	var money = $("#charge").val();
	var checkcode = $("#checkcode").val();
	var account = getCookie('cookie_brsy_h5_account');

	if(money == "" || checkcode == "") {
		$.jBox.tip("请完善信息", "error");
		selectCodeCheck();
		return;
	}

	ajaxPostAsyncData(checkIdentifyingcode, {
		"uid" : ryid,
		"code": checkcode,
		"phone": account,
		"sendCodeType":5
	}, false, function(data) {

		var obj = data.resobj;

		if(data.code == "40000") {
			ajaxPostAsyncData(insertSTixian, {
				"uid": ryid,
				"userBankCardId": yinhangid,
				"money": money,
				"account":account,
				"codesms": checkcode
			}, false, function(data) {

				if(data.code == "40000") {
					$.jBox.tip("提现成功!", "success");
					window.location.href = "/static/wechat/src/self/wallet/wallet.html";
				} else {
					$.jBox.tip(data.info, "error");
				}
			}, 'json')
		} else {
			selectCodeCheck();
			$.jBox.tip("验证码不正确!", "error");
		}
	}, 'json')

}
function selectCodeCheck(){
	var time = new Date().getMilliseconds();
		$('#imgCheckCode').attr('src', https_domain + '/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {
	var java_checkCode = getCookie('cookie_brsy_pic_code');
	var checkCode = $('#c_checkCode').val();
	if(checkCode == null || checkCode == "") {
		selectCodeCheck();
		$.jBox.tip("图片验证码不能为空", "error");
		return;
	}
	var account = getCookie('cookie_brsy_h5_account');
	var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(account)) {
		selectCodeCheck();
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	ajaxPostAsyncData(sendCodeCheck, {
		"account": account,
		"sendCodeType": "5",
		"code": checkCode,
		"codeKey": java_checkCode
	}, false, function(data) {
		var obj = data.resobj;
		if(data.code == "40000") {
			$.jBox.tip("验证码发送成功,注意查收!", "success");
		}else{
			selectCodeCheck();
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
}
loadData();

/* modefied by 李思远 at 2017.09.04 for 修改首次操作会提示图片验证码无效 begin   */
selectCodeCheck();
/* modefied by 李思远 at 2017.09.04 for 修改首次操作会提示图片验证码无效 end   */