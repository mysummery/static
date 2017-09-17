/**
 * Created by zuohq on 2016/8/29.
 *
 */

function loadData() {
	var ryid = getCookie("cookie_brsy_h5_uid");
	//获取收益记录
	ajaxPostAsyncData(selectMySShouyi, {
		"uid": ryid,
		"page":1
	}, false, function(data) {
		var rows = data.resobj.rows;
		var len = rows.length;

		//console.log(data.resobj);
		var totalpage = data.resobj.total;
		if(len <= 10) {
			$('#scroller-pullUp').hide();
		} //只有一页的时候隐藏下拉刷新
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
//				if(rows[index].name == null) {
//					rows[index].name = ''
//				}
				if(rows[index].username == null) {
					rows[index].username = ''
				}
				//姓名为null时显示为空
				$("#indent_table_id").append("<tr><td>" + rows[index].createtime + "</td><td>" + rows[index].username + "</td><td>" + rows[index].money + "元</td></tr>");
			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
};

var page = 1;
/*function getdatabefor () {
	loadData();
}*/
function getdataafter() {
	page += 1;
	var ryid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectMySShouyi, {
		"uid": ryid,
		"page": page
	}, false, function(data) {
		var rows = data.resobj.rows;
		var len = rows.length;
		var totalpage = data.resobj.total;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				if(len == 0) {
					return false;
				} else {
					var str = "<tr><td>" + rows[index].createtime + "</td><td>" + rows[index].username + "</td><td>" + rows[index].money + "元</td></tr>";
					$("#indent_table_id").append(str);
				}
			});
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
}
loadData();