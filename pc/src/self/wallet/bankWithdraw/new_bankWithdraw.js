$(function() {
	$(".purse").addClass("current");
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



	ajaxWebPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {

		if(data.code == "40000") {
			var resdata = data.resobj;
			window.money = resdata.money;
			$(".item .number").html(money);
			$(".item .allMoney").click(function() {

				$("#withdrawMoney").val(money);
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
				//								console.log(resdata);

				$.each(resdata, function(index, value) {
					var kahao = resdata[index].cardnum;
					var len = kahao.length;
					var id = resdata[index].id;
					var parentbank = resdata[index].parentbank;
					kahao = "**** **** **** " + kahao.substring(len - 4, len);
					var imgurl = check_cardname(parentbank);
					if(imgurl == false) {
						$(".selectBank ul").append("");

					} else if(parentbank.length > 4) {
						parentbank = parentbank.substring(0, 4) + '...';
						$(".selectBank ul").append("<li name=" + id + "><span class='kahao'>" + kahao + "</span><span class='parentbank'>" + parentbank + "</span></li>");

					} else {
						$(".selectBank ul").append("<li name=" + id + "><span class='kahao'>" + kahao + "</span><span class='parentbank'>" + parentbank + "</span></li>");
					}

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
	$('#imgCheckCode').attr('src', https_domain + '/validcode/get?ver=' + time);
}
/**
 * 获取手机验证码
 */

function getCheckcode() {
//	var objval = $('#objval').val();
	var account = getCookie('cookie_brsy_pc_account');
	var withdrawMoney = $("#withdrawMoney").val();
	if(withdrawMoney < 100) {
		$.jBox.tip("提现金额小于100，请前往“365财智平台”公众号进行提现", "error");
		selectCodeCheck();
		return false;
	}
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
				$('#checkcode').val("");
				$('#c_checkCode').val("");
				$.jBox.tip(data.info, "error");
			}

		}, 'json')
/*	if(objval == "0") {
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
				selectCodeCheck();
				$("#objval").val("1");
				$(".check").show();
				$('#checkcode').val("");
				$('#c_checkCode').val("");
				$.jBox.tip(data.info, "error");
				
			}
		}, 'json')
	} else if(objval = "1"){

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
				$('#checkcode').val("");
				$('#c_checkCode').val("");
				$.jBox.tip(data.info, "error");
			}

		}, 'json')

	}*/

}
//点击提现按钮
function withdrawReserve() {

	var checkcode = $('#checkcode').val();


	var userBankCardId = $(".chooseCard").attr("name");

	var account = getCookie('cookie_brsy_pc_account');
	var uid = getCookie('cookie_brsy_pc_uid');

	var withdrawMoney = $("#withdrawMoney").val();
	var money = $(".item .number").html();

	var chooseCard = $(".chooseCard").html();
	if(chooseCard == "") {
		$.jBox.tip("请选择银行卡!", "error");
		selectCodeCheck();
		return false;
	}

	//		验证提现金额
	if(isNaN(withdrawMoney)) {
		$.jBox.tip("请输入数字", "error");
		selectCodeCheck();
		return false;
	}
	if(withdrawMoney == "") {
		$.jBox.tip("提现金额不能为空", "error");
		selectCodeCheck();
		return false;
	}
	if(withdrawMoney < 100) {
		$.jBox.tip("提现金额小于100，请前往“365财智平台”公众号进行提现", "error");
		selectCodeCheck();
		return false;
	}

	if(withdrawMoney > parseFloat(money)) {
		$.jBox.tip("输入的金额不能大于账户余额", "error");
		selectCodeCheck();
		return false;
	}
	if(checkcode == "") {
		$.jBox.tip('请填写手机验证码', 'error');
		selectCodeCheck();
		return false;
	} else {

		ajaxWebPostAsyncData(insertSTixian, {
			"account": account,
			"uid": uid,
			"money": withdrawMoney,
			"codesms": checkcode,
			"userBankCardId": userBankCardId
		}, false, function(data) {
			//		alert(data.code);
			if(data.code == "40000") {
				$.jBox.tip("提现成功", "success");
				setTimeout(function() {
					window.location.href = "/static/pc/src/self/wallet/new_purse.html";
				}, 1000);

			} else {
				selectCodeCheck();
				$('#checkcode').val("");
				$('#c_checkCode').val("");
				$.jBox.tip(data.info, "error");

			}
		}, 'json')
	}
}
selectCodeCheck();
function clearNoNum(obj) {
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
}