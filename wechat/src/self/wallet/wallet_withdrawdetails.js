// JavaScript Document
function initEdit() {
	var ryid = getCookie("cookie_brsy_h5_uid");

	ajaxPostAsyncData(selectSTixian_list, {
		"page" : 1,
		"uid" : ryid
	}, false, function(data) {

		if(data.code == "40000") {
			var rows = data.resobj.rows;
			var len = rows.length;
			var totalpage = data.resobj.total;
			if(len <= 10) {
				$('#scroller-pullUp').hide();
			} //只有一页的时候隐藏下拉刷新
			$.each(rows, function(index, value) {
				$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">提现</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money add\">" + rows[index].money + "元</span></p>");
			});
		} else {
			$('#qa').html("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">没有提现记录</span><b><span></span></b></i><span class=\"money add\"></span></p>");
		}
	}, 'json')
}

var page = 1;
/*function getdatabefor () {
	loadData();
}*/
function getdataafter() {
	page += 1;
	var ryid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectSTixian_list, {
		"uid" : ryid,
		"page" : page
	}, false, function(data) {
		var rows = data.resobj.rows;
		var len1 = rows.length;
		var totalpage = data.resobj.total;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				if(len1 == 0) {
					$('#scroller-pullUp').hide();
					return false;
				} else {
					$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">提现</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money add\">" + rows[index].money + "元</span></p>");
				}
			});
		}
	}, 'json');
}