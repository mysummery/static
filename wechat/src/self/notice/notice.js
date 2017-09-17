// JavaScript Document
function details(zjid) {
	$(this).children('.notice_title').removeClass('red');
	window.location.href = "notice_details.html?zjid=" + zjid;
}
var p = ''; //定义用来判断是否调用过接口的变量
function personal(a) {
	window.type=2;
	$(a).addClass('choosed');
	$('#personal_notice').show();
	$('#stage').removeClass('choosed');
	$('#stage_notice').hide();
	if(p != '') {
		return false;
	} //判断变量值是否改变，改变了则不再调用接口
	var ryid = getCookie("cookie_brsy_h5_uid");
	//var ryid = "7e09dd4c863000";
	window.personalnum = 0;
	ajaxPostAsyncData(selectSJiluByRyidAll, {
		"type": 2,
		"uid": ryid,
		"page": "1"
	}, false, function(data) {
		window.p = "p"; //调用过接口则修改变量值
		var rows = data.resobj.rows;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				var type = rows[index].type;
				var state = rows[index].state;
				if(type != "1") {
					personalnum += 1;
					if(state == "1") {
						$("#personal_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl red\">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
					} else {
						$("#personal_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl \">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
					}
				}
				/*$("#stage_notice").html("<tr onclick=\"team2('"+rows[index].uid+"','"+rows[index].name+"','"+rows[index].xianum+"')\"><td>"+(index+1)+"</td><td>"+rows[index].series+"</td><td>"+rows[index].name+"</td><td>"+rows[index].xianum+"</td><td>"+rows[index].phone+"</td></tr>");*/

			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	if(personalnum > 7) {
		$('#scroller-pullUp').show();
	} else {
		$('#scroller-pullUp').hide();
	}
	loaded();
}

function stage(a) {
	//loaded();
	window.type=1;
	$(a).addClass('choosed');
	$('#stage_notice').show();
	$('#personal').removeClass('choosed');
	$('#personal_notice').hide();
	if(stagenum < 7) {
		$('#scroller-pullUp').hide();
	}
	//alert(type)
}

function loadData() {
	window.type=1;
	var ryid = getCookie("cookie_brsy_h5_uid");
	//获取平台消息
	window.stagenum = 0;
	ajaxPostAsyncData(selectSJiluByRyidAll, {
		"type": type,
		"uid": ryid,
		"page": "1"
	}, false, function(data) {
		var rows = data.resobj.rows;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				//var type = rows[index].type;
				var state = rows[index].state;
				//				if(type == "1") {
				//					stagenum += 1;
				if(state == "1") {
					$("#stage_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl red\">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
				} else {
					$("#stage_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl \">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
				}
				//				}
				/*$("#stage_notice").html("<tr onclick=\"team2('"+rows[index].uid+"','"+rows[index].name+"','"+rows[index].xianum+"')\"><td>"+(index+1)+"</td><td>"+rows[index].series+"</td><td>"+rows[index].name+"</td><td>"+rows[index].xianum+"</td><td>"+rows[index].phone+"</td></tr>");*/

			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');

	//	if(stagenum < 7) {
	//		$('#scroller-pullUp').hide();
	//	}
}

var page = 1;
/*function getdatabefor () {
	loadData();
}*/
function getdataafter() {
	page += 1;
	var ryid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(selectSJiluByRyidAll, {
		"type": type,
		"uid": ryid,
		"page": page
	}, false, function(data) {
		//var type =1;
		var rows = data.resobj.rows;
		var totalpage = data.resobj.total;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
//				if(page > totalpage) {
//					return false;
//				} else {
					var type = rows[index].type;
					var state = rows[index].state;
					if(type == "1") {
						if(state == "1") {
							$("#stage_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl red\">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
						} else {
							$("#stage_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl \">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
						}
					} else {
						if(state == "1") {
							$("#personal_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl red\">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
						} else {
							$("#personal_notice").append("<li onclick=\"details('" + rows[index].id + "')\"><p class=\"notice_top clearfix\"><span class=\"notice_title fl \">" + rows[index].title + "</span><span  class=\"notice_date fr\">" + rows[index].createtime + "</span></p><p class=\"notice_content\"><span>" + rows[index].content + "</span></p></li>");
						}
					}

//				}
			});
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	
}
loadData();