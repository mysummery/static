$(function() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var username = decodeURI(getCookie('cookie_brsy_pc_name'), "utf-8");
	var vipstate = getCookie("cookie_brsy_pc_huiyuan");
	//	加载未登录时头部
	var con = "";
	con += '<span class="tel fl">客服热线：400-9009-365</span>' +
		'<div class="wel">' +
		'<span class="welcome">您好，欢迎来到李强365！</span>' +
		'<span class="logreg">请' +
		'<a class="login" href="/static/pc/src/admin/login/new_login.html"> 登录</a> | ' +
		'<a class="register" href="/static/pc/src/admin/register/new_register.html">注册</a>' +
		'</span>' +
		'</div>'

	$(".header").html(con);

	if(uid != null && vipstate == "2") {

		//		加载头部
		var str = "";
		str += "<span class='tel fl'>客服热线：400-9009-365</span>" +
			"<div class='personal' style='display:none;'>" +
			"<span class='person'>" +
			"<span class='username'></span>" +
			"<b></b>" +
			"<ul class='nav'>" +
			"<li class='current'>" +
			"<a class='one' href='/static/pc/src/self/information/new_usercenter.html'>个人资料</a>" +
			"</li>" +
			"<li>" +
			"<a class='two' href='/static/pc/src/self/safe/new_accountsafe.html'>账户安全</a>" +
			"</li>" +
			"<li onclick='tuichu();'>" +
			"<a class='five'>退出</a>" +
			"</li>" +
			"</ul>" +
			"</span><span>您好!</span>" +
			"</div>"

		$(".header").html(str);
		$(".personal").css("display", "block");
		$(".person .username").html(username);
		$(".photo .photoname").html(username);

	}else if(vipstate == "1"){
		//		加载头部
		var str = "";
		str += "<span class='tel fl'>客服热线：400-9009-365</span>" +
		"<a class='upgrade' href='/static/pc/src/admin/upgradeVip/upgradeVip.html'>请升级vip会员</a>"+
			"<div class='personal' style='display:none;'>" +
			
			"<span class='person'>" +
			"<span class='username'></span>" +
			"<b></b>" +
			"<ul class='nav'>" +
			"<li class='current'>" +
			"<a class='one' href='/static/pc/src/self/information/new_usercenter.html'>个人资料</a>" +
			"</li>" +
			"<li>" +
			"<a class='two' href='/static/pc/src/self/safe/new_accountsafe.html'>账户安全</a>" +
			"</li>" +
			"<li onclick='tuichu();'>" +
			"<a class='five'>退出</a>" +
			"</li>" +
			"</ul>" +
			"</span><span>您好!</span>" +
			"</div>"

		$(".header").html(str);
		$(".personal").css("display", "block");
		$(".person .username").html(username);
		$(".photo .photoname").html(username);
	}

	var navstr = "";
	navstr += '<div class="nav-con">' +
		'<div class="logo fl">' +
		'<a href="/static/pc/src/index/index.html"><img src="/static/pc/assets/images/logo.png" alt="" /></a>' +
		'</div>' +
		'<div class="nav fl" style="overflow:hidden">' +
		'<ul>' +
		'<li class="index">' +
		'<a href="/index.html">首页</a>' +
		'</li>' +
		'<li class="shipin">' +
		'<a href="/static/pc/src/lessons/shipinList/new_shipin.html">课程</a>' +
		'</li>' +
		'<li class="downd">' +
		'<a href="/static/pc/src/service/downd/new_downd.html">客户端下载</a>' +
		'</li>' +
		'<li style="visibility:hidden">' +
		'<a href="javascript:void(0);">开通会员</a>' +
		'</li>' +
		'<li style="visibility:hidden">' +
		'<a href="javascript:void(0);">我的课程</a>' +
		'</li>' +
		'</ul>' +
		'<div class="research fl" style="visibility:hidden">' +
		'<input placeholder="请输入关键字" class="fr" type="text" /> <i class="bg-res"></i>' +
		'</div>' +
		'</div>' +
		'</div>'
	$(".navpart").html(navstr);
	//加载版心有头像左侧
	
	var wLeftPhoto = "";
	wLeftPhoto+='<div class="photo">'+
	'<div class="level-bg">'+
'<img class="levelpic" src="" alt="" />'+
'</div>'+
'<div class="photo-bg">'+
'<b class="edit-bg">'+
'<a href="/static/pc/src/self/information/useravater/new_useravater.html">'+
'</a>'+
'</b>'+
'<img class="moren" src="/static/pc/assets/images/morenphoto.png" alt="" />'+
'</div>'+
'<div class="photos"><div class="photoname"></div>'+
'<div class="levelname">助理讲师</div></div>'+
'</div>'+
'<div class="person-mess">'+
'<ul>'+
'<li class="usercenter">'+
'<b></b>'+
'<a href="/static/pc/src/self/information/new_usercenter.html">个人资料</a>'+
'<span></span>'+
'</li>'+
'<li class="accountsafe">'+
'<b></b>'+
'<a href="/static/pc/src/self/safe/new_accountsafe.html">账户安全</a>'+
'<span></span>'+
'</li>'+
'<li class="purse">'+
'<b></b>'+
'<a onclick="wallet()" href="javascript:;">钱包管理</a>'+
'<span></span>'+
'</li>'+
'<li class="groupbuy">'+
'<b></b>'+
'<a onclick="group()" href="javascript:;">团购管理</a>'+
'<span></span>'+
'</li>'+
'<li class="teammanager">'+
'<b></b>'+
'<a onclick="myteam()" href="javascript:;">团队管理</a>'+
'<span></span>'+
'<i></i>'+
'</li>'+
'</ul>'+
'</div>'
$(".wrap-left-photo").html(wLeftPhoto);
//	加载版心左侧
var wrapLstr = "";
wrapLstr +=
'<div class="person-mess" style="margin-top:50px;">'+
'<ul>'+
'<li class="aboutus">'+
'<b></b>'+ 
'<a href="/static/pc/src/service/aboutus/new_aboutus.html">关于我们</a>'+
'<span></span>'+
'</li>'+
'<li class="advice">'+
'<b></b>'+
'<a href="/static/pc/src/service/advice/new_advice.html">意见反馈</a>'+
'<span></span>'+
'</li>'+
'<li class="answer">'+
'<b></b>'+
'<a href="/static/pc/src/service/answer/new_answer.html">常见问题</a>'+
'<span></span>'+
'<i></i>'+
'</li>'+
'</ul>'+
'</div>'
$(".about-foot").html(wrapLstr);
	//	加载footer
	var footStr = "";
	footStr += '<div class="footer-wrap">' +
		'<div class="footer-top">' +
		'<div class="footer-left fl">' +
		'<div class="about-us">' +
		'<ul>' +
		'<li class="one">' +
		'<a href="/static/pc/src/service/aboutus/new_aboutus.html">关于我们</a>' +
		'</li>' +
		'<li>' +
		'<a href="/static/pc/src/service/advice/new_advice.html">意见反馈</a>' +
		'</li>' +
		'<li>' +
		'<a href="/static/pc/src/service/answer/new_answer.html">常见问题</a>' +
		'</li>' +
		'</ul>' +
		'</div>' +
		'<div class="weibo">' +
		'<p>官方网站： liqiang365.com </p>' +
		'<p>微信公众号： 365财智平台 </p>' +
		'<p>客服电话： 400-9009-365</p>' +
		'</div>' +
		'</div>' +
		'<div class="footer-right">' +
		'<div class="erweima fr">' +
		'<img src="/static/pc/assets/images/new_erweima.png" alt="" />' +
		'<p class="tittle">App下载</p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<div class="footer-bottom">' +
		'<p>Copyright <span>&copy;</span> 2016-2017 北京博睿思远网络科技有限公司All Rights Reserved</p>' +
		'<p>京ICP备16024892</p>' +
		'</div>' +
		'</div>'
	$(".footer").html(footStr);
})

function tuichu() {

	clearCookie();

	window.location.href = "/static/pc/src/index/index.html";

}