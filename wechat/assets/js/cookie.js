/**
 * Created by gaocl on 2016/8/24.
 */
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

function setCookie(name, value) {
   var exp = new Date();  
       exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
       document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString()+";path=/";  
       return true;  
	
}
//清理cookie
function clearCookie(){
	
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie=keys[i]+"=;expires=" + (new Date(0)).toUTCString()+";path=/";
    }
    var code = getQueryString("code");
    window.location.href="/static-new/wechat/src/admin/login/upgrade_login.html?code="+code;
}