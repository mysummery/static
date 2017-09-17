/**
 * Created by gaocl on 2016/8/24.
 */

function loadData() {

	var uid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(appSTeamBuyBrokerage, {
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			if(totalpage == "1") {
				$('#scroller-pullUp').hide();
			}
			var htmlStr = "";
			$.each(rows, function(index, value) {
				htmlStr += "<li class=\"clearfix\">";
				htmlStr += "<p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">";
				htmlStr += rows[index].content;
				htmlStr += "</span>";
				htmlStr += "<b><span>";
				htmlStr += rows[index].createtime;
				htmlStr += "</span><span class=\"money\">";
				htmlStr += "+" + rows[index].money;
				htmlStr += "</span></b></i></p></li>";
			});
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#qa").html(htmlStr);
		var count = getCookie("cookie_brsy_h5_teambuy_stat_splitcount");
		$("#total").html(count);
	}, 'json');
	loaded();
}

var page = 1;

function getdataafter() {
	page += 1;
	var uid = getCookie("cookie_brsy_h5_uid");
	//var uid = "7e09dd4c863000";
	ajaxPostAsyncData(appSTeamBuyBrokerage, {
		"uid": uid,
		"page": page
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			var htmlStr = "";
			$.each(rows, function(index, value) {
				if(page > totalpage) {
					$('#scroller-pullUp').hide();
					return false;
				} else {
					htmlStr += "<li class=\"clearfix\">";
					htmlStr += "<p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">";
					htmlStr += rows[index].content;
					htmlStr += "</span>";
					htmlStr += "<b><span>";
					htmlStr += rows[index].createtime;
					htmlStr += "</span><span class=\"money\">";
					htmlStr += "+" + rows[index].money;
					htmlStr += "</span></b></i></p></li>";
				}
			});
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#qa").append(htmlStr);
	}, 'json');
}
loadData();