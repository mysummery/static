$(function() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var username = decodeURI(getCookie('cookie_brsy_pc_name'), "utf-8");
	//	加载未登录时头部
	var con = "";
	con += '<span class="tel fl">客服热线：400-9009-365</span>' +
		'<div class="wel">' +
		'<span class="welcome">您好，欢迎来到李强365！</span>' +
		'<span class="logreg">请' +
		'<a class="login" href="new_login.html"> 登录</a> | ' +
		'<a class="register" href="new_register.html">注册</a>' +
		'</span>' +
		'</div>'

	$(".header").html(con);

	if(uid != null) {

		//		加载头部
		var str = "";
		str += "<span class='tel fl'>客服热线：400-9009-365</span>" +
			"<div class='personal' style='display:none;'>" +
			"<span class='person'>" +
			"<span class='username'></span>" +
			"<b></b>" +
			"<ul class='nav'>" +
			"<li class='current'>" +
			"<a class='one' href='new_usercenter.html'>个人资料</a>" +
			"</li>" +
			"<li>" +
			"<a class='two' href='new_accountsafe.html'>账户安全</a>" +
			"</li>" +
			"<li>" +
			"<a class='three' href='new_userlevel.html'>会员等级</a>" +
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
		'<a href="index.html"><img src="./images/logo.png" alt="" /></a>' +
		'</div>' +
		'<div class="nav fl" style="overflow:hidden">' +
		'<ul>' +
		'<li class="index">' +
		'<a href="index.html">首页</a>' +
		'</li>' +
		'<li class="shipin">' +
		'<a href="new_shipin.html">课程</a>' +
		'</li>' +
		'<li class="downd">' +
		'<a href="new_downd.html">客户端</a>' +
		'</li>' +
		'<li style="visibility:hidden">' +
		'<a href="javascript:void(0);">开通会员</a>' +
		'</li>' +
		'<li style="visibility:hidden">' +
		'<a href="javascript:void(0);">我的课程</a>' +
		'</li>' +
		'</ul>' +
		'<div class="research fl">' +
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
'<img class="moren" src="./images/morenphoto.png" alt="" />'+
'</div>'+
'<div class="photos"><div class="photoname"></div>'+
'<div class="levelname">助理讲师</div></div>'+
'</div>'+
'<div class="person-mess">'+
'<ul>'+
'<li class="usercenter">'+
'<b></b>'+
'<a href="new_usercenter.html">个人资料</a>'+
'<span></span>'+
'</li>'+
'<li class="accountsafe">'+
'<b></b>'+
'<a href="new_accountsafe.html">账户安全</a>'+
'<span></span>'+
'</li>'+
'<li class="userlevel">'+
'<b></b>'+
'<a href="new_userlevel.html">会员等级</a>'+
'<span></span>'+
'</li>'+
'<li class="purse">'+
'<b></b>'+
'<a href="new_purse.html">钱包管理</a>'+
'<span></span>'+
'</li>'+
'<li class="groupbuy">'+
'<b></b>'+
'<a href="new_groupbuy.html">团购管理</a>'+
'<span></span>'+
'</li>'+
'<li class="teammanager">'+
'<b></b>'+
'<a href="new_teammanager.html">团队管理</a>'+
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
'<a href="new_aboutus.html">关于我们</a>'+
'<span></span>'+
'</li>'+
'<li class="advice">'+
'<b></b>'+
'<a href="new_advice.html">意见反馈</a>'+
'<span></span>'+
'</li>'+
'<li class="answer">'+
'<b></b>'+
'<a href="new_answer.html">常见问题</a>'+
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
		'<a href="new_aboutus.html">关于我们</a>' +
		'</li>' +
		'<li>' +
		'<a href="new_advice.html">意见反馈</a>' +
		'</li>' +
		'<li>' +
		'<a href="new_answer.html">常见问题</a>' +
		'</li>' +
		'</ul>' +
		'</div>' +
		'<div class="weibo">' +
		'<p>官方微博： liqiang365.com </p>' +
		'<p>微信公众号： 博睿思远 </p>' +
		'<p>客服电话： 400-9009-365</p>' +
		'</div>' +
		'</div>' +
		'<div class="footer-right">' +
		'<div class="erweima fr">' +
		'<img src="./images/new_erweima.png" alt="" />' +
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

	window.location.href = "/static/login/shipin/index.html";

}