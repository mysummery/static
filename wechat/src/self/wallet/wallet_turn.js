// JavaScript Document
function initEdit() {
	var ryid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectTransferRecordByUid, {
		"uid": ryid,
		"type": 0,
		"page": 1
	}, false, function(data) {
		if(data.code == "40000") {
			var rows = data.resobj.rows;
			var len = rows.length;
			var totalpage = data.resobj.total;
			if(len <= 10) {
				$('#scroller-pullUp').hide();
			} //只有一页的时候隐藏下拉刷新
			$.each(rows, function(index, value) {
				var money = rows[index].money;
				var type = rows[index].type;
				if(money != null) {
					if(type == '2') {
						type = '转入';
						$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">" + type + "</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money add\">+" + rows[index].money + "元</span></p>");
					} else if(type == '4') {
						type = '转出';
						$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">" + type + "</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money subtract\">-" + rows[index].money + "元</span></p>");

					}
				}
			});
		} else {
			$('#qa').html("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">没有转账记录</span><b><span></span></b></i><span class=\"money add\"></span></p>");
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
	ajaxPostAsyncData(selectTransferRecordByUid, {
		"type": 0,
		"uid": ryid,
		"page": page
	}, false, function(data) {
		var rows = data.resobj.rows;
		var len1 = rows.length;
		var totalpage = data.resobj.total;
		if(len1 == 0) {
			$('#scroller-pullUp').hide();
			return false;
		} else {
			if($.trim(data.code) == "40000") {
				$.each(rows, function(index, value) {
					var type = rows[index].type;
					if(type == '2') {
						type = '转入';
						$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">" + type + "</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money add\">+" + rows[index].money + "元</span></p>");
					} else if(type == '4') {
						type = '转出';
						$("#qa").append("<li class=\"clearfix\"><p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">" + type + "</span><b><span>" + rows[index].createtime + "</span></b></i><span class=\"money subtract\">-" + rows[index].money + "元</span></p>");

					}
				});
			}
		}
	}, 'json');
}