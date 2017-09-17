// JavaScript Document
 
function loading(){
var code = getQueryString("code");

//alert(code);
var uid=getCookie('cookie_brsy_h5_uid');

if(uid!=null)
{	//$('#self').html("<img src=\"images/self.png\" style=\"width:25%;\">");
	$('#self').html("个人中心");
	$('#self').click(function(){
	var rurl = encodeURIComponent(api+"/static/wechat/src/self/self_center.html");
		window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="
			+ appid
			+ "&redirect_uri="
			+ rurl
			+ "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";}) 
}else{
	$('#self').html("登录");
	$('#self').click(function(){
		//alert("11");
		window.location.href="/static/wechat/src/admin/login/upgrade_login.html?code="+code;
		}) 
	
}
}
function go(){
		var uid=getCookie('cookie_brsy_h5_uid');
		if(uid!=null)
		{	
			var huiyuan=getCookie("cookie_brsy_h5_huiyuan");
			if(huiyuan=="2"){
			window.location.href="/static/wechat/src/self/wantgroup/iwantto_groupbuying.html";
			}else{

				$.jBox.tip("您还不是会员，无法团购，请先升级会员！", "error");
			}
		}else{

			window.location.href="/static/wechat/src/admin/login/upgrade_login.html?code="+code;
		}
	}
function down(){
		window.location.href="/static/wechat/src/admin/download.html";
		}	 