// JavaScript Document
//create by zmy

function loadData() {
	window.ryid = getCookie("cookie_brsy_h5_uid");
	//	window.ryid = "7e09dd4c863000";$('.scstate').hide();
//	if(ryid == '' || ryid == null) {
//		$('.scstate').hide();
//	} else {
//		var scstate = getQueryString("scstate");
//		$('.scstate').attr('src', '/static/wechat/assets/images/star_' + scstate + '.png');
//	}
	window.kcid = getQueryString("zjid");
	//收藏状态
	ajaxPostAsyncData(selectSFenleiByzjid, {
		"courseid": kcid
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			$('.list h2 span').html(data.resobj.name); //课程名称
			$('.intro').html(data.resobj.intro); //课程介绍
			var imgappurl = data.resobj.appimgurl;
			$('.bg').attr('src', imgappurl); //课程图片
			document.title = data.resobj.name;
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	var h = $('.list').height();
	$('#wrapper').css('top', h + "px")
	ajaxPostAsyncData(selectBykcid, {
		"page": page,
		"type": type,
		"courseid": kcid
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
			$.each(rows, function(index, value) { //课程列表
				var name = rows[index].name;
				if(rows[index].newupload == '1') {
					if(rows[index].free == '1') {
						str += "<li style=\"position:relative;\" onclick=\"play('" + rows[index].id + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\" style=\"position:relative;\"><img src=" + rows[index].pcimgurl + "><img src=\"/static/wechat/assets/images/icon_free.png\" style=\"position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;\"></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].playcount + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span></dd></dl></div><img src=\"/static/wechat/assets/images/icon_new.png\" style=\"position:absolute;width:7rem;top:0.5rem;right:0.5rem\"></li>";
					} else {
						str += "<li style=\"position:relative;\" onclick=\"play('" + rows[index].id + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].pcimgurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].playcount + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span></dd></dl></div><img src=\"/static/wechat/assets/images/icon_new.png\" style=\"position:absolute;width:7rem;top:0.5rem;right:0.5rem\"></li>";
					}
				} else {
					if(rows[index].free == '1') {
						str += "<li onclick=\"play('" + rows[index].id + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\" style=\"position:relative;\"><img src=" + rows[index].pcimgurl + "><img src=\"/static/wechat/assets/images/icon_free.png\" style=\"position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;\"></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].playcount + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span></dd></dl></div></li>";
					} else {
						str += "<li onclick=\"play('" + rows[index].id + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].pcimgurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].playcount + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span></dd></dl></div></li>";
					}
				}
			});
			$("#indent_table_id").html(str);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
}

function play(zjid, ryid) {
	window.location.href = "/static/wechat/src/service/play/play.html?zjid=" + zjid + "&ryid=" + ryid ;
}

function sc(sc) {
	var sczjid = "";
	if($('.scstate').attr('src') == "/static/wechat/assets/images/star_yes.png") {
		ajaxPostAsyncData(selectSShoucangByRyid, {
			"ryid": ryid,
			"uid": ryid
		}, false, function(data) {
			var rows = data.resobj.rows;
			if($.trim(data.code) == "40000") {

				$.each(rows, function(index, value) {
					var zjid = rows[index].zjid;
					if(zjid == kcid) {
						sczjid = rows[index].sczjid;
						//alert(sczjid);
					} //获取sczjid

				});
			} else {
				$.jBox.tip("页面初始化失败", 'error');
			}
		}, 'json');
		$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png'); //收藏状态
		ajaxPostAsyncData(deleteSShoucang, {
			"sczjid": sczjid,
			"uid": ryid
		}, false, function(data) {
			//alert(sczjid);
			if(data.code == "40000") {
				$.jBox.tip('删除收藏成功', 'success');
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	} else {
		$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png'); //收藏状态
		ajaxPostAsyncData(insertSShoucang, {
			"ryid": ryid,
			"kcid": kcid,
			"uid": ryid
		}, false, function(data) {
			if($.trim(data.code) == "40000") {
				$.jBox.tip('收藏成功', 'success');
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');

	}

}

function loaded() {
	//定义一系列变量
	var myScroll;
	var upIcon = $("#up-icon");
	var downIcon = $("#down-icon");
	//new一个iscroll对象	
	myScroll = new IScroll('#wrapper', {
		probeType: 3,
		click: true,
		mouseWheel: true
	});

	myScroll.on("scroll", function() {

		var y = this.y; //拉的距离（负数）
		//console.log(y)
		var maxY = this.maxScrollY - y; //整个页面高度-拉的距离=整个页面高度
		//console.log(maxY)
		var downHasClass = downIcon.hasClass("reverse_icon");
		var upHasClass = upIcon.hasClass("reverse_icon");
		if(y >= 40) {
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		} else if(y < 40 && y > 0) {
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}

		if(maxY >= 40) {
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		} else if(maxY < 40 && maxY >= 0) {
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});
	//自定义下拉刷新事件
	myScroll.on("slideDown", function() {
		if(this.y > 40) {
			getdatabefor(1)
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)
		}
	});
	//自定义上拉刷新
	myScroll.on("slideUp", function() {
		if(this.maxScrollY - this.y > 40) {
			getdataafter(2);
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)

		}
	});
}
var type = 1;
var page = 1;

function getdataafter() {
	page += 1;
	if(page > totalpage) {
		return false;
	} else {
		ajaxPostAsyncData(selectBykcid, {
			"page": page,
			"type": type,
			"courseid": kcid
		}, false, function(data) {
			var rows = data.resobj.rows;
			if($.trim(data.code) == "40000") {
				var str = ''
				$.each(rows, function(index, value) { //课程列表
					var name = rows[index].name;
					if(rows[index].newupload == '1') {
						if(rows[index].free == '1') {
							str += "<li style=\"position:relative;\" onclick=\"play('" + rows[index].zjid + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\" style=\"position:relative;\"><img src=" + rows[index].imgappurl + "><img src=\"/static/wechat/assets/images/icon_free.png\" style=\"position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;\"></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].bofangliang + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].shichang + "</span></dd></dl></div><img src=\"/static/wechat/assets/images/icon_new.png\" style=\"position:absolute;width:7rem;top:0.5rem;right:0.5rem\"></li>";
						} else {
							str += "<li style=\"position:relative;\" onclick=\"play('" + rows[index].zjid + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].imgappurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].bofangliang + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].shichang + "</span></dd></dl></div><img src=\"/static/wechat/assets/images/icon_new.png\" style=\"position:absolute;width:7rem;top:0.5rem;right:0.5rem\"></li>";
						}
					} else {
						if(rows[index].free == '1') {
							str += "<li onclick=\"play('" + rows[index].zjid + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\" style=\"position:relative;\"><img src=" + rows[index].imgappurl + "><img src=\"/static/wechat/assets/images/icon_free.png\" style=\"position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;\"></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].bofangliang + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].shichang + "</span></dd></dl></div></li>";
						} else {
							str += "<li onclick=\"play('" + rows[index].zjid + "','" + ryid + "')\"><div class=\"p clearfix\"><p class=\"video_img\"><img src=" + rows[index].imgappurl + "></p><dl class=\"fl\"><dd class=\"top clearfix\"><span class=\"video_name fl\">" + name + "</span></dd><dd class=\"bottom clearfix\"><span class=\"video_play fl   list_play\">" + rows[index].bofangliang + "</span><span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].shichang + "</span></dd></dl></div></li>";
						}
					}
				});
				$("#indent_table_id").append(str);
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
	}
}