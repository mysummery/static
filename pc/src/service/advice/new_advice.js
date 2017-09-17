$(function (){
	$(".advice").addClass("current");
})

var uid = getCookie('cookie_brsy_pc_uid');

var feedback = document.getElementById('feedback');
//检测还能输入字符的数量
feedback.onkeyup = function() {
	var len = this.value.length;
	if(len <= 300) {
		document.getElementById('newNumberLength').innerHTML = len;
	}
}


function sub() {
	if (!uid){
		$.jBox.tip("请先登录", "error");
		setTimeout(function () {
			window.location.href = "/static/pc/src/admin/login/new_login.html";
		},1000)
	
	} else {
		var tittle = $("#tit").val();


if(tittle.length > 30) {
	$.jBox.tip("标题不能超过30个字", "error");
	return false;

}

var contact = $("#contact").val();


	var content = feedback.value;
	if(content.match(/^\s*$/)) {
		$.jBox.tip("留言内容不能为空", "error");
		return false;
	}

	ajaxWebPostAsyncData(insertSAdvice, {
		"uid": uid,
		"content": content,
		"title": tittle,
		"contact": contact
	}, false, function(data) {

		if(data.code == "40000") {
			$.jBox.tip("提交成功", "success");
			$("#tit").val("");
			$("#contact").val("");
			$("#feedback").val("");
			$("#newNumberLength").html("0");
		}
	}, 'json');
	}
	

}