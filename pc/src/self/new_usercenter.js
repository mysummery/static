$(function() {
	var uid = getCookie('cookie_brsy_pc_uid');

	//编辑信息
	function editInfo() {
		ajaxWebPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				var resdata = data.resobj;
		
				//				console.log(resdata);
				var uid = resdata.id;
				var headimg = resdata.headimgurl;
				var groupbuylevel = resdata.groupbuylevel;
				var chikaren = resdata.idcardname;
				var username = resdata.username;
				window.money = resdata.money;
				window.huiyuan = resdata.vipstate;
				window.usertype = data.resobj.usertype;
				window.shenfenstatus = data.resobj.authstate;
				username = decodeURI(username, "utf-8")
				setCookie('cookie_brsy_pc_chikaren', encodeURI(chikaren, "utf-8"), 7);
				setCookie('cookie_brsy_pc_groupbuylevel', encodeURI(groupbuylevel, "utf-8"), 7);

				//			回显信息
				$("#username").val(username);
				$("#account").val(resdata.account);
				$("#phone").val(resdata.phone);
				$("#address").val(resdata.address);
				$("#idcardname").val(resdata.idcardname);
				$(".photo .photoname").html(username);
				$(".photo .levelname").html(resdata.grade);
				$("input[type='radio'][value='" + resdata.sex + "']").prop("checked", true);
				$(".idcardname").html(chikaren);
				//         设置头像
				if(headimg != "") {
					$(".moren").attr("src", headimg).css({
						"width": "114px",
						"height": "114px"
					});
				}
				//			    设置默认头像
				if(headimg == null) {
					var headimg = "/static/pc/assets/images/morenphoto.png";
					$(".moren").attr("src", headimg).css({
						"width": "67px",
						"height": "76px",
						"position": "relative",
						"top": "12px",
						"left": "24px"
					});
				}
				//			    设置王冠
				var groupcount = data.resobj.groupbuycount;
				if(groupbuylevel == "0") {
					if(huiyuan == "1") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel1.png");
					} else if(huiyuan == "2") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel2.png");
					}
				} else {
					if(groupbuylevel == "1") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel3.png");
					} else if(groupbuylevel == "2") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel4.png");
					} else if(groupbuylevel == "3") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel5.png");
					} else if(groupbuylevel == "4") {
						$(".levelpic").attr("src", "/static/pc/assets/images/grouplevel6.png");
					}

				}

			}
		}, 'json')

	}
	editInfo();
	//   保存信息
	$(".Sex input").click(function() {
		if($(this).attr("checked")) {
			var sexval = ($(this).attr("id"));
			$("#sex").val(sexval);
		}
	})
	$("#reserve").click(function() {
		var username = $("#username").val();
         if (username == "") {
         	$.jBox.tip("请输入您的昵称", "error");
         	return false;
         }
		var phone = $("#phone").val();
		var address = $("#address").val();
		var sex = $("#sex").val();
		ajaxWebPostAsyncData(updateInfoByUid, {
			"uid": uid,
			"username": username,
			"phone": phone,
			"sex": sex,
			"email": "",
			"age": "",
			"address": address,
			"headimgurl": ""

		}, false, function(data) {
			if(data.code == "40000") {
				$.jBox.tip("保存成功", "success");
				$(".person .username").html(username);
				$(".photo .photoname").html(username);
				var name = username;
				setCookie('cookie_brsy_pc_name', encodeURI(name, "utf-8"), 7);
			}
		}, 'json')
	})
})

function wallet() {

	/*  增加礼品卡用户无法进入钱包功能  */
	if(usertype == '2') { //1=正常用户 2=礼品卡用户 3=学习卡用户
		$.jBox.tip("您是礼品卡用户,无法进入钱包！", "error");
	} else {
		if(shenfenstatus == "2") {

			window.location.href = "/static/pc/src/self/wallet/new_pursePass.html";
		} else {
			$.jBox.tip("请到账户安全下进行身份审核", "error");

		}
	}

}

function group() {
	/* 增加礼品卡用户无法团购功能 */
	if(huiyuan == "2" && usertype == '1') {
		window.location.href = "/static/pc/src/self/groupbuy/new_groupbuy.html";
	} else if(usertype == '3') {
		$.jBox.tip("您是学习卡用户,无法团购！", "error");
	} else if(usertype == '2') {
		$.jBox.tip("您是礼品卡用户,无法团购！", "error");
	} else {
		$.jBox.tip("您还不是会员，无法团购，请先升级会员！", "error");
	}

}

function myteam() {
	if(usertype == '2') {
		$.jBox.tip("您是礼品卡用户,无法进入团队系统！", "error");
	} else {
		window.location.href = "/static/pc/src/self/team/new_teammanager.html?";
	}
}

function revisepay() {
	if(usertype == '2') { //1=正常用户 2=礼品卡用户 3=学习卡用户
		$.jBox.tip("您是礼品卡用户,无法修改支付密码！", "error");
	}
	/*增加礼品卡用户无法进入钱包功能 */
	else {
		if(shenfenstatus == "2") {

			window.location.href = "/static/pc/src/self/safe/update_pay/new_revisepay.html";
		} else {
			$.jBox.tip("您还未进行身份审核，请先进行认证", "error");
			//			window.location.href = "/static/wechat/realname.html";
		}
	}
}