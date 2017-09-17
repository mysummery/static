// JavaScript Document
function loadData() {
	var zjid = getQueryString("zjid");
	ajaxPostAsyncData(selectSJiluInfoByzjid, {
		"id": zjid,
		"uid":getCookie("cookie_brsy_h5_uid")
	}, false, function(data) {
		var rows = data.resobj;
		if($.trim(data.code) == "40000") {
			$('#title').html(rows.title);
			$('#date').html(rows.createtime);
			$('.form p').html(rows.content);
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
};
loadData();