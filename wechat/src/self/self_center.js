//$(function() {
//	loadData();
//		$('.sigin').click(function() {
//			if($(this).attr('code') == 1) {
//				$.jBox.tip("您今天已经签到过了", 'error');
//			} else {
//				window.location.href = "/static/wechat/src/service/sign.html";
//			}
//		})
//});
sessionStorage.removeItem('shopurl');
function loadData() {
	var uid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectSJiluByRyidAll, {
		"page" : 1,
		"type":1,
		"uid": uid
	}, false, function(data) {
		var rows = data.resobj.rows;
		window.red = "1";
		if($.trim(data.code) == "40000") {
			//console.log(1);
			$.each(rows, function(index, value) {
				var state = rows[index].state;
				if(state == "1") {
					//console.log(state);
					window.red = "2";
				}
				/*$("#stage_notice").html("<tr onclick=\"team2('"+rows[index].uid+"','"+rows[index].name+"','"+rows[index].xianum+"')\"><td>"+(index+1)+"</td><td>"+rows[index].series+"</td><td>"+rows[index].name+"</td><td>"+rows[index].xianum+"</td><td>"+rows[index].phone+"</td></tr>");*/

			});
		} 
		else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	ajaxPostAsyncData(selectSJiluByRyidAll, {
		"page" : 1,
		"type":2,
		"uid": uid
	}, false, function(data) {
		var rows = data.resobj.rows;
		window.red = "1";
		if($.trim(data.code) == "40000") {
			//console.log(1);
			$.each(rows, function(index, value) {
				var state = rows[index].state;
				if(state == "1") {
					//console.log(state);
					window.red = "2";
				}
				/*$("#stage_notice").html("<tr onclick=\"team2('"+rows[index].uid+"','"+rows[index].name+"','"+rows[index].xianum+"')\"><td>"+(index+1)+"</td><td>"+rows[index].series+"</td><td>"+rows[index].name+"</td><td>"+rows[index].xianum+"</td><td>"+rows[index].phone+"</td></tr>");*/

			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	if(red == "2") {
		$('#notice').html("系统通知<img src=\"/static/wechat/assets/images/notice_red.png\" style=\"width:0.4rem;margin-left:0.5rem;\">");
	} else {
		$('#notice').html("系统通知");
	}
	var mycode = getCookie("cookie_brsy_h5_mycode");

	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type":"1"
	}, false, function(data) {
		var rows = data.resobj;
		if(data.code == "40000") {
			window.huiyuan = rows.vipstate;
			var deadline = data.resobj.vipendtime;
			window.shenfenstatus = data.resobj.authstate;
			$("#deadline").html(deadline);
			if(uid == "") {
				window.location.href = '/static/wechat/src/admin/login/upgrade_login.html';
			} else {
				var rows = data.resobj;
				if(rows.username == null) rows.username = '';
				if(rows.groupbuylevel == "4") {
					var tgjb4num = data.resobj.groupbuycount; //获取创始股东等级
					/*显示不同个数的星星*/
					//if(tgjb4num=="1"){tgjb4num=0;}
					//alert(tgjb4num);
					//t(tgjb4num)
					if(tgjb4num > 10) {
						tgjb4num = 10;
					}
					$("body").append("<img style=\"width:3.8rem;position:absolute;right:1rem;top:2rem;\" src=\"/static/wechat/assets/images/medal_" + tgjb4num + ".png\">");
				} else {
					$('#icon').css('top', '-5rem');
					$('#level').width("0px");
				}
//					var token = data.resobj.token;     签到注释
//					selectSign(token);
				$("#name").html(rows.username + "<span style=\"font-size:1rem;margin-left:1rem;\">" + rows.grade + "</span>"); //名字和等级
				$(".hide_name").val(rows.username);
				var imgurl = rows.headimgurl; //头像
				if(imgurl == '' || imgurl == null || imgurl == "null") {

					$("#imgurl").attr("src", '/static/wechat/assets/images/head_photo.png');
				} else {
					$("#imgurl").attr("src", imgurl);
				}
				var img_height = $("#imgurl").width(); //正方形
				$("#imgurl").height(img_height + 'px');
				
				window.usertype = data.resobj.usertype;
				var invite = getCookie("cookie_brsy_h5_mycode");
				var token = getCookie('cookie_brsy_h5_token');
				if(usertype != '1'&&usertype != '4') //礼品卡用户邀请码不显示
					{
						$(".letter").hide();
					}
					if(usertype == '1'||usertype == '4') //礼品卡用户邀请码不显示邀请码
					{
						$("#invite").html('邀请码' + invite);
					} 
				if(rows.groupbuylevel != "0") {
					$('#icon').attr('src', '/static/wechat/assets/images/dj_' + rows.groupbuylevel + '.png');
				} else if(huiyuan) {
					if(huiyuan == "1") {
						$('#use-time').hide();
						$('#deadline').hide();
						$('#dayNum').hide();
						$('.form1').show();
						$('#upgrade').click(function() {
							var rurl = encodeURIComponent(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=0&token=" + token + "&mycode=" + invite + "&uid=" + uid + "&xuliehaoType=1");
							window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
								appid +
								"&redirect_uri=" +
								rurl +
								"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
						})
					} else {
						$('.form1').hide();

					}
					$('#icon').attr('src', '/static/wechat/assets/images/hy_' + huiyuan + '.png');
				}
			}
			var ismicro=data.resobj.ismicro;//是否店主
			if(ismicro==1){
				$('#myshop').parent('li').hide();
			}
		}

	}, 'json');

}

//function selectSign(token) {
//	var uid = getCookie("cookie_brsy_h5_uid");	
//	var selectSign = "/appSQiandao/getSignInfo.ph"; //查询是否签到的接口
//	var data = {
//		uid: uid,
//		token: token
//	}
//	console.log(token);
//	ajaxPostAsyncData(selectSign, data,false, function(data) {
//		if(data.code == "40000") {
//			console.log(data)
//			console.log(data.resobj)
//			qiandaoDays = data.resobj.qiandaodays;
//			if(data.resobj.state == 1) {
//				$('.sigin').attr('code', '1');
//			} else {
//				$('.sigin').attr('code', '0');
//			}
//		} else {
//			$.jBox.tip("查询签到次数失败!", "error");
//		}
//	}, 'json')
//}

function wallet() {
	/* modified by 张明月 at 2016.11.17 for 增加礼品卡用户无法进入钱包功能 begin */
	if(usertype == '2') { //1=正常用户 2=礼品卡用户 3=学习卡用户
		$.jBox.tip("您是礼品卡用户,无法进入钱包！", "error");
	}
	/* modified by 张明月 at 2016.11.17 for 增加礼品卡用户无法进入钱包功能 end */
	else {
		if(shenfenstatus == "2") {
			var code = getQueryString("code");
			window.location.href = "/static/wechat/src/self/wallet/wallet.html?code=" + code;
		} else{
			$.jBox.tip("身份未认证，请到app端进行认证！", "error");
			//window.location.href = "/static/wechat/realname.html";
		}
	}

}
/* added by 张明月 at 2016.11.17 for 增加礼品卡用户无法进入团队功能 begin */
function myteam() {
	if(usertype == '2') {
		$.jBox.tip("您是礼品卡用户,无法进入团队系统！", "error");
	} else {
		window.location.href = "/static/wechat/src/self/team/team.html";
	}
}
/* added by 张明月 at 2016.11.17 for 增加礼品卡用户无法进入团队功能 end */
function group() {
	/* modified by 张明月 at 2016.11.17 for 增加礼品卡用户无法团购功能 begin */
	if(huiyuan == "2" && usertype == '1') {
		window.location.href = "/static/wechat/src/self/group/groupbuying_manage.html";
	} else if(usertype == '3') {
		$.jBox.tip("您是学习卡用户,无法团购！", "error");
	} else if(usertype == '2') {
		$.jBox.tip("您是礼品卡用户,无法团购！", "error");
	} else {
		$.jBox.tip("您还不是会员，无法团购，请先升级会员！", "error");
	}
	/* modified by 张明月 at 2016.11.17 for 增加礼品卡用户无法团购功能 end */
}

function settings() {
	var code = getQueryString("code");
	window.location.href = "/static/wechat/src/self/settings/settings.html?code=" + code;
}
function letter(){
	var mycode = getCookie("cookie_brsy_h5_mycode");
	var hide_name=$(".hide_name").val();
	
	window.location.href = "/static/wechat/src/self/promotion_letter/letter.html?mycode=" + mycode+"&name="+hide_name;
}
function myshop(){
	window.location.href = "/static/wechat/src/self/myshop/my_shop.html";
}
/*function t(num){
 var str = ""; 
 var sun = Math.floor(num/64); 
 for(var i = 0;i < sun;i++) str += "<img src=\"images/level_crown.png\">"; 
 var month = Math.floor(num/16)%4; 
 for(var j = 0;j < month;j++) str += "<img src=\"images/level_sun.png\">";
  var star = Math.floor(num/4)%4; 
  for(var k = 0;k < star;k ++) str += "<img src=\"images/level_moon.png\">";
  var star = Math.floor(num)%4; 
  for(var k = 0;k < star;k ++) str += "<img src=\"images/level_star.png\">";
   $('#level').html(str); 
  } 
  String.prototype.trim = function(){ 
  return this.replace(/(^[\s]*)|([\s]*$)/g, ""); 
  } 
  */
 loadData();
