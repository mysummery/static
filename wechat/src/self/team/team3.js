/**
 * Created by zuohq on 2016/8/29.
 *
 */

function loadData() {
	var uid = getQueryString("uid");
	$("#indent_table_id").html("<tr><td>序号</td><td>等级</td><td>姓名</td><td>学员人数</td><td>手机号</td></tr>");
	window.number = 0;

	var getParam = function(key) {
		var lot = location.search;
		var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
		return decodeURIComponent(lot.replace(reg, "$1"));
	}

	var name = getParam("name");
	var xianum = getQueryString("xianum");
	document.title = "3级-" + name + "团队";
	$("#name").html(name);
	$("#xianum").html(xianum);
	if(xianum < 15) {
		$('#scroller-pullUp').hide();
	}

	//获取团队列表和总收益
	ajaxPostAsyncData(selectMyTuandui, {
		"uid": uid
	}, false, function(data) {
		//console.log(data);
		var rows = data.resobj.rows;
		//var uid=rows[index].uid;
		if($.trim(data.code) == "40000") {

			$.each(rows, function(index, value) {
				if(rows[index].name == null) {
					rows[index].name = ''
				}
				var phone1 = rows[index].phone;
				phone = phone1.substr(0, 3) + "****" + phone1.substr(7, 11);
				$("#indent_table_id").append("<tr onclick=\"team3('" + rows[index].uid + "','" + rows[index].name + "','" + rows[index].xianum + "')\"><td>" + (index + 1) + "</td><td>" + rows[index].series + "</td><td>" + rows[index].name + "</td><td>" + rows[index].xianum + "</td><td>" + phone + "</td></tr>");
				number = number + 1;
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
var number = 15;

function getdataafter() {
	page += 1;
	var uid = getQueryString("uid");
	ajaxPostAsyncData(selectMyTuandui, {
		"uid": uid,
		"page": page
	}, false, function(data) {
		//console.log(data);
		var rows = data.resobj.rows;
		//var uid=rows[index].uid;
		var totalpage = data.resobj.total;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				if(page > totalpage) {
					alert(page);
					return false;
				} else {
					var xianum = rows[index].xianum;
					number += 1;
					if(rows[index].name == null) {
						rows[index].name = ''
					}
					var str = "<tr><td>" + number + "</td><td>" + rows[index].series + "</td><td>" + rows[index].name + "</td><td>" + rows[index].xianum + "</td><td>" + rows[index].phone + "</td></tr>";
					$("#indent_table_id").append(str);

				}
			});
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
}
loadData();