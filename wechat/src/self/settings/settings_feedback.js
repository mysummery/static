var fkrid = getCookie('cookie_brsy_h5_uid');

function sub() {
	var content = feedback.value;
	var title = $('#title').val();
	var contact = $('#email').val();
	if(content.match(/^\s*$/)) {
		$.jBox.tip("留言内容不能为空", "error");
		return false;
	}
	if(title.match(/^\s*$/)) {
		$.jBox.tip("标题不能为空", "error");
		return false;
	}
	if(contact.match(/^\s*$/)) {
		$.jBox.tip("联系方式不能为空", "error");
		return false;
	}
	ajaxPostAsyncData(insertSAdvice, {
		"uid": fkrid,
		"title": title,
		"contact": contact,
		"content": content
	}, false, function(data) {
		//alert(data.code);
		if(data.code == "40000") {
			$.jBox.tip("提交成功", "success");
			window.location.href = "/static/wechat/src/self/self_center.html";
		}
	}, 'json');
}