$(function() {
	$(".purse").addClass("current");
	var account = getCookie('cookie_brsy_pc_account');
	$("#phone").val(account);
//	$('.check').hide();
	$("#transmoney").blur(function() {

		var account = getCookie('cookie_brsy_pc_account');
		var uid = getCookie('cookie_brsy_pc_uid');
		var transmoney = $("#transmoney").val();
		//		验证转账金额
		ajaxWebPostAsyncData(slectInfoByUid, {
				"uid": uid,
				"type": "1"
			}, false, function(data) {
				if(data.code == "40000") {
					var resdata = data.resobj;
					window.money = resdata.money;

				}
			}, 'json')

	})

})

function transreserve() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var targetAccount = $("#targetAccount").val();
	var targetName = $("#targetName").val();
	var checkcode = $('#checkcode').val();
    var transmoney = $("#transmoney").val();
	var targetAccount = $("#targetAccount").val();
	var regu = /^1[3|4|5|6|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(targetAccount)) {
		$.jBox.tip("对方手机号格式不正确", "error");
		return false;
	} else if(targetAccount.length != 11) {
		$.jBox.tip('账号必须是正确的手机号', 'error');
		return false;
	}
	if(targetName == "") {
		$.jBox.tip("请输入对方姓名!", "error");
		return false;
	}
	if(transmoney == "") {
		$.jBox.tip("输入的金额不能为空", "error");
		return false;
	} else if(transmoney > parseFloat(money)) {
		$.jBox.tip("输入的金额不能大于账户余额", "error");
		return false;
	}
	if(checkcode == "") {
		$.jBox.tip("请输入手机验证码!", "error");
		return false;
	}

	
	ajaxWebPostAsyncData(transferAccount, {
		"account": targetAccount,
		"uid": uid,
		"money": transmoney,
		"codeSms": checkcode,
		"username": targetName
	}, false, function(data) {

		if(data.code == "40000") {
			$.jBox.tip("转账成功", "success");
			setTimeout(function () {
				window.location.href = "/static/pc/src/self/wallet/new_purse.html";
			},1000);
		} else {
            selectCodeCheck();
            $('#checkcode').val("");
				$('#c_checkCode').val("");
			$.jBox.tip(data.info, "error");

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
	var account = $("#phone").val();
//	var obj = $('#objval').val();
	var java_checkCode = getCookie('cookie_brsy_pic_code');
	var checkCode = $('#c_checkCode').val();

		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "6",
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
	/*if(obj == 0) {
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "6",
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
	} else if(obj == 1) {

		var java_checkCode = getCookie('cookie_brsy_pic_code');
		var checkCode = $('#c_checkCode').val();

		if(checkCode == null || checkCode == "") {
			$.jBox.tip("图片验证码不能为空", "error");
			return;
		}
		ajaxWebPostAsyncData(sendCodeCheck, {
			"account": account,
			"sendCodeType": "6",
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
selectCodeCheck();
 function clearNoNum(obj){  
        //修复第一个字符是小数点 的情况.  
        if(obj.value !=''&& obj.value.substr(0,1) == '.'){  
            obj.value="";  
        }  
          
        obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
        obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的       
        obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");      
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数       
        if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
            if(obj.value.substr(0,1) == '0' && obj.value.length == 2){  
                obj.value= obj.value.substr(1,obj.value.length);      
            }  
        }      
    }      