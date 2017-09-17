// JavaScript Document
window.ryid = getCookie("cookie_brsy_h5_uid");
//window.ryid = "7e09dd4c863000";
function all_lessons() {

	$('#all').toggleClass('lesson_gray'); //背景图更改
	$('.left-lessons').toggle();
	if($('.second-lessons').css('display') != "none") {
		$('.second-lessons').hide();
	}
	/*$('.left-lessons').stop().animate({ //菜单显示
						left: "0px",
					  }, 500 );
*/
}
$(".type").click(function() {
	$(this).siblings('.type').removeClass('blue');
	$(this).addClass('blue'); //字体变蓝
	var sorting = $(this).attr('data');
	var t = $(this).attr('id');
	var tap = '.video_' + t;
	var classname = t + '_blue';
	$(tap).addClass(classname); //更改背景图
	$(tap).removeClass('lesson_gray');
	$(tap).siblings('span').addClass('lesson_gray');
	menu3(show_fflid, '1', sorting);

})

function loadData() {
	ajaxPostAsyncData(sfEnlei, {
	}, false, function(data) {
		var rows = data.resobj;
		if($.trim(data.code) == "40000") {
			$.each(rows, function(index, value) {
				$(".all_lessons").append("<li onclick=\"menu2(this,'" + rows[index].id + "')\"><span><img src=\"/static/wechat/assets/images/lessons_" + rows[index].id + ".png\">" + rows[index].name + "</span></li>");
			});
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	var fflid = getQueryString('zjid');
	ajaxPostAsyncData(selectSFenleiTwo, {
		"id": fflid,
		"page" : "1"
	}, false, function(data) {
		var rows = data.resobj.rows;
		window.totalpage = data.resobj.total;
		if($.trim(data.code) == "40000") {
			var f = rows[0].id; //默认显示第一组
			menu3(f, '1', '1');
			$.each(rows, function(index, value) {
				$(".second-lessons").append("<dd onclick=\"menu3('" + rows[index].id + "','1','1')\">" + rows[index].name + "</dd>");
			});
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	loaded();
}

function menu2(column, fflid) {
	$(column).addClass('blue'); //字体变蓝
	$(column).siblings('li').removeClass('blue');
	var fflid = fflid;
	ajaxPostAsyncData(selectSFenleiTwo, {
		"id": fflid,
		"page":"1"
	}, false, function(data) {
		var rows = data.resobj.rows;
		if($.trim(data.code) == "40000") {
			var str = ''
			$.each(rows, function(index, value) {
				str += "<dd after=" + rows[index].id + " onclick=\"menu3('" + rows[index].id + "','1','1')\">" + rows[index].name + "</dd>";
			});
			$(".second-lessons").html(str);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	$(".second-lessons").show();
}

function menu3(fflid, page, type) {
	//	$('.type').removeClass('blue');
	//	$('#date').addClass('blue');
	window.show_fflid = fflid;
	window.show_type = type;
	$('.left-lessons').hide();
	/*$('.left-lessons').stop().animate({ //菜单显示
						left: "-38%",
					  }, 500 );*/
	$(".second-lessons").hide();
	$('#all').addClass('lesson_gray');
	var fflid = fflid;
	window.page = parseInt(page);
	//	var page = page;
	var type = type;
	ajaxPostAsyncData(selectSFenleikc, {
		"id": fflid,
		"page": page,
		"type": type,
		"ryid": ryid,
		"uid": ryid
	}, false, function(data) {
		var rows = data.resobj.rows;
		window.totalpage = data.resobj.total;
		if(totalpage == 1) {
			$('#scroller-pullUp').hide();
		} else {
			$('#scroller-pullUp').show();
		}
		if($.trim(data.code) == "40000") {
			var str = ''
			$.each(rows, function(index, value) {
				var name = rows[index].name;
				if(name.length > 10) {
					name = name.substr(0, 10) + "...";
				}
				var date = rows[index].updatetime;
				date = date.substr(5, 6);
				str += "<li onclick=\"lessons_list('" + rows[index].id + "','" + rows[index].name + "','" + rows[index].scstate + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].appimgurl2 + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span><span class=\"video_count fr blue\">" + rows[index].videocount + "集</span></dd><dd class=\"bottom clearfix\"><span class=\"video_date fl  video_lesson_date date_blue\">" + date + "</span><span class=\"video_play fl \">" + rows[index].playcount + "</span><span class=\"video_download fl \">" + rows[index].downloadcount + "</span></dd></dl></div></li>";
			});
			$("#indent_table_id").html(str);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	loaded();
}

function getdataafter() {
	page += 1;
	console.log(page);
	if(page > totalpage) {
		return false;
	} else {
		ajaxPostAsyncData(selectSFenleikc, {
			"id": fflid,
			"page": page,
			"type": type,
			"ryid": ryid,
			"uid": ryid
		}, false, function(data) {
			var rows = data.resobj.rows;
			var totalpage = data.resobj.total;
			if($.trim(data.code) == "40000") {
				var str = '';
				$.each(rows, function(index, value) {
					var name = rows[index].name;
					if(name.length > 10) {
						name = name.substr(0, 10) + "...";
					}
					var date = rows[index].updatetime;
					date = date.substr(4, 10);
					str += "<li onclick=\"lessons_list('" + rows[index].id + "','" + rows[index].name + "','" + rows[index].scstate + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].appimgurl2 + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span><span class=\"video_count fr blue\">" + rows[index].videocount + "集</span></dd><dd class=\"bottom clearfix\"><span class=\"video_date fl  video_lesson_date date_blue\">" + date + "</span><span class=\"video_play fl \">" + rows[index].playcount + "</span><span class=\"video_download fl \">" + rows[index].downloadcount + "</span></dd></dl></div></li>";
				});
				$("#indent_table_id").append(str);

			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	}

}

function lessons_list(zjid, name, scstate) {
	window.location.href = "/static/wechat/src/index/lessons_list/lessons_list.html?zjid=" + zjid + "&name=" + name + "&scstate=" + scstate;
}