// JavaScript Document
var ryid = getCookie("cookie_brsy_h5_uid");
function play(zjid) {
	window.location.href = "/static/wechat/src/service/play/play.html?zjid=" + zjid + "&ryid=" + ryid + "&type=1";
}
function player(videoid,courseid,freestate) {
	window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?courseid="+courseid+"&videoid="+videoid+"&freestate="+freestate+"&sharetag=app";
}
function loadData() {
	
	//	var ryid = "7e09dd4c863000";
	$("#search_input").val('');
	//获取收藏
	ajaxPostAsyncData(selectSShoucangByRyid, {
		"uid": ryid,
		"page": page
	}, false, function(data) {
		var rows = data.resobj.rows;
		window.totalpage = data.resobj.total; //获取页数
		if(totalpage == "1") { //只有一页的时候隐藏下拉
			$('#scroller-pullUp').hide();
		}
		if(totalpage == "0") { //没有收藏时的提示语
			$('#scroller-pullUp').html('没有收藏，快去添加吧');
		}
		if($.trim(data.code) == "40000") {

			$("#indent_table_id").html('');
			$.each(rows, function(index, value) {
				//var updatetime = rows[index].updatetime;
				//var updatetime_cut = updatetime.substr(0, 10); //截取日期
				//var updatetime_cut=1;
				var name = rows[index].name;
				var flag= rows[index].flag;
				if(name.length > 10) {
					name = name.substr(0, 10) + "...";
				} //截取视频名
				if(flag=='flag'){
					$("#indent_table_id").append("<li onclick=\"player('" + rows[index].videoid + "','"  + rows[index].courseid + "','" + rows[index].freestate + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img  src=" + rows[index].appimgurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl\">" + rows[index].duration + "</span></dd></dl></div></li>");
				}else{
					$("#indent_table_id").append("<li onclick=\"play('" + rows[index].videoid + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img  src=" + rows[index].appimgurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl\">" + rows[index].duration + "</span></dd></dl></div></li>");
				}
				
				
			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	loaded();

};

var page = 1;

function getdataafter() {
	page += 1;
	if(page > totalpage) {
		return false;
	} else {
		var ryid = getCookie("cookie_brsy_h5_uid");
		ajaxPostAsyncData(selectSShoucangByRyid, {
			"page": page,
			"uid": ryid
		}, false, function(data) {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			if($.trim(data.code) == "40000") {
				$.each(rows, function(index, value) {

					var updatetime = rows[index].updatetime;
					var updatetime_cut = updatetime.substr(0, 10);
					$("#indent_table_id").append("<li><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].imgappurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + rows[index].name + "</span><span class=\"video_count fr blue\">" + rows[index].jishu + "集</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl\">" + rows[index].bofangliang + "</span><span class=\"video_download fl\">" + rows[index].xiazailiang + "</span><span class=\"video_date fr gray\">" + updatetime_cut + "</span></dd></dl></div></li>");

				});
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	}
}
loadData();