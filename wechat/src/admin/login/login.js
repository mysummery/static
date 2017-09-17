/**
 * 初始化页面
 */
var tg = getQueryString("tg");//是否是推广链接过来的
var from=getQueryString("from");//其他分类跳转类型
var shopurl=sessionStorage.shopurl;//获取跳转链接
/* added by 张明月 at 2017.08.22 for 判断是否商城登录 begin */
if(shopurl!=null&&shopurl!=''&&shopurl!=undefined&&shopurl.indexOf('&')!=-1){
	shopurl=shopurl.substr(0,shopurl.indexOf('&'));//截掉from
}
/* added by 张明月 at 2017.08.22 for 判断是否商城登录 end */
function login() {
	var code = getQueryString("code");
	var account = $("#account").val();
	var password = $("#password").val();
	if(account == "" || password == "") { 
		//alert("用户名和密码不能为空!");
		$.jBox.tip("用户名和密码不能为空!", "error");
		return false;
	}
	//alert("1111");

	var regu = /^1[0|1|3|4|5|6|7|8][0-9]\d{4,8}$/;
	var re = new RegExp(regu);

	if(!re.test(account)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	setCookie('isLogin', '1', 7);
	ajaxPostAsyncData(loginAjax, {
		"account": account,
		"password": password,
		"oneType" : "1" // 0 是非单点登录 ， 1是单点登录
	}, false, function(data) {
		if(data.code == "40000") {
			var uid = data.resobj.id;
			var mycode = data.resobj.usercode;
			var account = data.resobj.account;
			var name = data.resobj.username;
			var imgurl = data.resobj.headimgurl;
			var jztime = data.resobj.vipendtime;
			var huiyuan = data.resobj.vipstate;
			var tuangoujibie = data.resobj.groupbuylevel;
			var shenfenstatus = data.resobj.authstate;
			var usertype = data.resobj.usertype;
			var token = data.resobj.token;
			clearCookie_new();
			setCookie('cookie_brsy_h5_uid', uid, 7);
			setCookie('cookie_brsy_h5_mycode', mycode, 7);
			setCookie('cookie_brsy_h5_account', account, 7);
			setCookie('cookie_brsy_h5_name', encodeURIComponent(name), 7);
			setCookie('cookie_brsy_h5_imgurl', imgurl, 7);
			setCookie('cookie_brsy_h5_jztime', jztime, 7);
			setCookie('cookie_brsy_h5_huiyuan', huiyuan, 7);
			setCookie('cookie_brsy_h5_tuangoujibie', tuangoujibie, 7);
			setCookie('cookie_brsy_h5_shenfenstatus', shenfenstatus, 7);
			setCookie('cookie_brsy_h5_usertype', usertype, 7);

			setCookie('cookie_brsy_h5_token', token, 7);
			setCookie('isLogin', '2', 7);
			ajaxPostAsyncData(slectInfoByUid, {
				"uid": uid,
				"type":"1"
			}, false, function(data) {
				if(data.code == "40000") {
					var id=getQueryString("id");
					if(huiyuan == "1"&&id==null) {
/*						var rurl = encodeURIComponent(api + "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?mycode=" + mycode + "&uid=" + uid);
						window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
							appid +
							"&redirect_uri=" +
							rurl +
							"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";*/
						if(from == 'shoplogin'){
							setCookie('fromAppShop', 'fromAppShop', 7);
							window.location.href =shopurl;
						}else{
							window.location.href = "/static/wechat/src/service/tiaozhuan/tiaozhuan_gongzhong.html?shareTag=0&token=" + token + "&mycode=" + mycode + "&uid=" + uid + "&xuliehaoType=1";
						}
						
					} else {
						
						if(tg == 'tg') {
							window.setTimeout(function() {
								window.location.href = "/static/wechat/src/index/generalize.html?code=" + code;
							}, 1000);
						}else if(id!=null){
							window.location.href = "/static/wechat/src/index/special/special_liyang.html?id="+id;
						}else if(from=='live'){
							window.location.href = "/static/wechat/live/live/live.html";
						}else if(from=='show'){
							window.location.href = "/static/wechat/live/live/show.html";
							/* added by 张明月 at 2017.08.22 for 判断是否商城登录 begin */
						}else if(shopurl!=''&&shopurl!=undefined){
							setCookie('fromAppShop', 'fromAppShop', 7);
							window.location.href =shopurl;
						}/* added by 张明月 at 2017.08.22 for 判断是否商城登录 end */
						else {
							window.setTimeout(function() {
								window.location.href = "/static/wechat/src/index/shipin_index.html?code=" + code;
							}, 1000);
						}
					}
				} else {
					alert('获取用户信息失败' + data.code);
				}
			}, 'json')
		} else {
			$.jBox.tip("登录失败!" + data.info, "error");
		}
	}, 'json', function() {
		setCookie('isLogin', '2', 7);
	});

}

function goregister() {
	var code = getQueryString("code");
	window.location.href = "/static/wechat/src/admin/register/upgrade_register.html?code=" + code+"&from="+from;
}

function forget_password() {
	var code = getQueryString("code");
	window.location.href = "/static/wechat/src/admin/forget/upgrade_forget.html?code=" + code;
}