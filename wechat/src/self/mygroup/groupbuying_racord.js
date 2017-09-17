/**
 * Created by gaocl on 2016/8/24.
 */

function loadData() {
	var uid = getCookie("cookie_brsy_h5_uid");
	//var uid = "7e09dd4c863000";
	ajaxPostAsyncData(appSTeamBuyGet, {
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			
			var htmlStr = "";
			$.each(rows, function(index, value) {
				htmlStr += "<li class=\"clearfix\">";
				htmlStr += "<p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">";
				if(rows[index].state == 1) {
					htmlStr += "成功团购";
				} else if(rows[index].state == -2) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 0) {
					htmlStr += "待审核";
				} else if(rows[index].state == -1) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 2) {
					htmlStr += "从他人拆分";
				}
				htmlStr += rows[index].count + "个激活码</span>";
				htmlStr += "<b><span>";
				htmlStr += rows[index].createtime;
				htmlStr += "</span><span>";
				htmlStr += "";
				htmlStr += "</span></b></i><span class=\"money\">";
				//if(rows[index].jibie == 1){
				//    htmlStr += "4500.00";
				//}else if(rows[index].jibie == 2){
				//    htmlStr += "25000.00";
				//}else if(rows[index].jibie == 3){
				//    htmlStr += "65000.00";
				//}else if(rows[index].jibie == 4){
				//    htmlStr += "180000.00";
				//}
				htmlStr += rows[index].total + "元</span></p></li>";
			});
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#qa").html(htmlStr);
		var count = getCookie("cookie_brsy_h5_teambuy_stat_count");
		$("#total").html(count);
	}, 'json');
	loaded();
}

var page = 1;

function getdataafter() {
	page += 1;
	var uid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(appSTeamBuyGet, {
		"uid": uid,
		"page": page
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			
				var htmlStr = "";
				$.each(rows, function(index, value) {
					htmlStr += "<li class=\"clearfix\">";
					htmlStr += "<p class=\"clearfix\"><i class=\"fl\"><span class=\"turn\">";
					if(rows[index].state == 1) {
						htmlStr += "成功团购";
					} else if(rows[index].state == -2) {
						htmlStr += "已拒绝";
					} else if(rows[index].state == 0) {
						htmlStr += "待审核";
					} else if(rows[index].state == -1) {
						htmlStr += "已拒绝";
					} else if(rows[index].state == 2) {
						htmlStr += "从他人拆分";
					}
					htmlStr += rows[index].count;
					htmlStr += "个激活码</span>";
					htmlStr += "<b><span>";
					htmlStr += rows[index].createtime;
					htmlStr += "</span><span>";
					htmlStr += "";
					htmlStr += "</span></b></i><span class=\"money\">";
					//if(rows[index].jibie == 1){
					//    htmlStr += "4500.00";
					//}else if(rows[index].jibie == 2){
					//    htmlStr += "25000.00";
					//}else if(rows[index].jibie == 3){
					//    htmlStr += "65000.00";
					//}else if(rows[index].jibie == 4){
					//    htmlStr += "180000.00";
					//}
					htmlStr += rows[index].total + "元</span></p></li>";
				});
			
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#qa").append(htmlStr);
	}, 'json');
}
loadData();