/**
 * Created by gaocl on 2016/8/24.
 */

function loadData() {
	var uid = getCookie("cookie_brsy_h5_uid");
	//var uid = "7e09dd4c863000";
	ajaxPostAsyncData(appSTeamBuySplitGet, {
		"uid": uid,
		"state": 99,
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
				var active = rows[index].jihuolv;
				var name = rows[index].username;
				if(name.length > 15) {
					name = name.substr(0, 15) + '...';
				}
				active = Math.ceil(active * 10000) / 100 + '%';
				htmlStr += "<li><div class=\"clearfix top\"><span class=\"fl\">账号:" + rows[index].account + "</span><span class=\"fr\">拆分日期：" + rows[index].createtime + "</span></div><div class=\"clearfix bottom\"><div class=\"fl left\"><p class=\"name\">" + name + "</p><p class=\"gray\"><span>拆分：" + rows[index].split_count + "张</span><span>余量：" + rows[index].surplus_count + "张</span></p></div><span class=\"fr right\">激活率：" + active + "</span></div></li>";
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

	ajaxPostAsyncData(appSTeamBuySplitGet, {
		"uid": uid,
		"state": 99,
		"page": page
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			var htmlStr = "";
			$.each(rows, function(index, value) {
				var active = rows[index].jihuolv;
				var name = rows[index].toryname;
				if(name.length > 15) {
					name = name.substr(0, 15) + '...';
				}
				active = Math.ceil(active * 10000) / 100 + '%';
				htmlStr += "<li><div class=\"clearfix top\"><span class=\"fl\">账号：" + rows[index].account + "</span><span class=\"fr\">拆分日期：" + rows[index].createtime + "</span></div><div class=\"clearfix bottom\"><div class=\"fl left\"><p class=\"name\">" + name + "</p><p class=\"gray\"><span>拆分：" + rows[index].split_count + "张</span><span>余量：" + rows[index].surplus_count + "张</span></p></div><span class=\"fr right\">激活率：" + active + "</span></div></li>";
			})
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#qa").append(htmlStr);
	}, 'json');
}
loadData();