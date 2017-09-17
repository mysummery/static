$(function() {

	var account = getCookie('cookie_brsy_pc_account');
	var uid = getCookie('cookie_brsy_pc_uid');
	$(".selectBank ul").on("click", "li", function() {
		var id = $(this).attr("name");
		var con = $(this).html();
		$(".chooseCard").html(con);
		$(".selectBank").hide();
		flag = true;

		$(".chooseCard").attr("name", id);
	})

	$('.check').hide();

	ajaxWebPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {

		if(data.code == "40000") {
			var resdata = data.resobj;
			var money = resdata.money;
			$(".item .number").html(money);
			$(".item .allMoney").click(function() {

				$("#withdrawMoney").val(money);
			})
			$("#withdrawMoney").blur(function() {
				var withdrawMoney = $("#withdrawMoney").val();
				console.log(withdrawMoney);
					var money = $(".item .number").html();
					console.log(money);
				//		验证提现金额
				if(withdrawMoney < 0 || withdrawMoney == "") {
					$.jBox.tip("输入的金额不能为空或负数", "error");
					return false;
				}

				if(withdrawMoney > money) {
					$.jBox.tip("输入的金额不能大于账户余额", "error");
					return false;
				}

				//		调用checkpic接口
				ajaxWebPostAsyncData(checkpicIdentifyingcode, {
					"account": account,
				}, false, function(data) {
					var obj = data.resobj;
					console.log(obj);
					$('#objval').val(obj);
					if(obj == 1) {
						selectCodeCheck()
						$('.check').show();
					}

				}, 'json')
			})

		}
	}, 'json')

})

//选择银行卡
var flag = true;

function selectBank() {
	var uid = getCookie('cookie_brsy_pc_uid');

	ajaxWebPostAsyncData(selectSYinhangkaByRyid, {
		"uid": uid,
	}, false, function(data) {
		if(data.code == "40000") {

			if(flag == true) {
				$(".selectBank").show();
				flag = false;
				$(".selectBank ul").html("");
				var resdata = data.resobj;
				console.log(resdata);

				$.each(resdata, function(index, value) {
					var kahao = resdata[index].cardnum;
					var len = kahao.length;
					var id = resdata[index].id;
					kahao = "**** **** **** " + kahao.substring(len - 4, len);
					var parentbank = resdata[index].parentbank;
					if(parentbank.length > 4) {
						parentbank = parentbank.substring(0, 4) + '...';
					}
					$(".selectBank ul").append("<li name=" + id + "><span class='kahao'>" + kahao + "</span><span class='parentbank'>" + parentbank + "</span></li>");
				})

			} else {
				$(".selectBank").hide();
				flag = true;
			}

		}
	}, 'json')

}

//获取图片验证码
function selectCodeCheck() {
	var time = new Date().getMilliseconds();
	$('#imgCheckCode').attr('src', https_domain+'/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */
function getCheckcode() {

	var chooseCard = $(".chooseCard").html();
	if(chooseCard == "") {
		$.jBox.tip("请选择银行卡!", "error");
		return false;
	}
	/*var withdrawMoney = $("#withdrawMoney").val();
	console.log(withdrawMoney);
	var money = $(".item .number").html();
	console.log(money);
	//		验证提现金额
	if(withdrawMoney < 0 || withdrawMoney == "") {
		$.jBox.tip("输入的金额不能为空或负数", "error");
		return false;
	}

	if(withdrawMoney > money) {
		$.jBox.tip("输入的金额不能大于账户余额", "error");
		return false;
	}*/
	var obj = $('#objval').val();
	var account = getCookie('cookie_brsy_pc_account');
	if(obj == 0) {
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "5",
			"code": "",
			"codeKey": ""
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {

				$.jBox.tip(data.info, "error");
			}
		}, 'json')
	} else if(obj == 1) {

		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();

		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "5",
			"code": checkCode,
			"codeKey": java_checkCode
		}, false, function(data) {
			var obj = data.resobj;
			if(data.code == "40000") {
				$.jBox.tip("验证码发送成功,注意查收!", "success");
			} else {
				selectCodeCheck();
				$.jBox.tip(data.info, "error");
			}

		}, 'json')
	}

}
//点击提现按钮
function withdrawReserve() {
	var withdrawMoney = $("#withdrawMoney").val();

	var checkcode = $('#checkcode').val();

	var userBankCardId = $(".chooseCard").attr("name");

	var account = getCookie('cookie_brsy_pc_account');
	var uid = getCookie('cookie_brsy_pc_uid');
	if(checkcode == "") {
		$.jBox.tip('请填写手机验证码', 'error');
		return false;
	}
	ajaxWebPostAsyncData(insertSTixian, {
		"account": account,
		"uid": uid,
		"money": withdrawMoney,
		"codesms": checkcode,
		"userBankCardId": userBankCardId
	}, false, function(data) {
		alert(data.code);
		if(data.code == "40000") {
			$.jBox.tip("提现成功", "success");
		} else {

			$.jBox.tip(data.info, "error");

		}
	}, 'json')

}