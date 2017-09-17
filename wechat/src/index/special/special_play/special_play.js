var uid = getCookie('cookie_brsy_h5_uid');
var courseid = getQueryString("courseid"); //课程id
var subid = getQueryString("subid"); //专栏id
var freestate = getQueryString("freestate"); //是否免费，1免费2收费
var videoidapp = getQueryString("videoid"); //视频id
$(function() {
	
	//获取老师名称
	ajaxPostAsyncData_share(subjectvideogetinfo, {
		"courseid": courseid
	}, false, function(data){
		if($.trim(data.code) == "40000"){
			$('.teacher').html(data.resobj.lecturer);
		}else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');

	ajaxPostAsyncData_share(subjectvideoget, {
		"subCourseid": courseid,
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var htmlStr = "";
			var videoUrl = '';
			//先显示第一个
				//如果没有流畅...以此类推
			if ( rows[0].url1 != '' ) {
				htmlStr += "<li videourl=" + rows[0].url1 + ">";
				videoUrl = rows[0].url1;
			}else {
				if ( rows[0].url2 != '' ) {
					htmlStr += "<li videourl=" + rows[0].url2 + ">";
					videoUrl = rows[0].url2;
				}else {
					htmlStr += "<li videourl=" + rows[0].url3 + ">";
					videoUrl = rows[0].url3;
				}
			}
			htmlStr += "<div class=\"p clearfix\" videoid=" + rows[0].id + ">";
			htmlStr += "<p class=\"video_img\">";
			htmlStr += "<img src=" + rows[0].appimgurl + ">";
			htmlStr += "<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>";
			htmlStr += "</p>";
			htmlStr += "<dl class=\"fl\">";
			htmlStr += "<dd class=\"top clearfix\">";
			htmlStr += "<span class=\"video_name fl blue\">" + rows[0].name + "</span>";
			htmlStr += "</dd>";
			htmlStr += "<dd class=\"bottom clearfix\">";
			htmlStr += "<span class=\"video_play fl   list_play\">" + rows[0].createtime.substr(0, 10) + "</span>";
			htmlStr += "<span class=\"video_date fl   video_lesson_date list_time\">" + rows[0].duration + "</span>";
			htmlStr += "</dd>";
			htmlStr += "</dl>";
			htmlStr += "</div>";
			htmlStr += "</li>";

			//数据填充
			var video_name = rows[0].name;
			$('.video-tittle span').html(video_name);
			document.title = video_name;
			var videourl = videoUrl;
			$('#video').attr('src', videourl);
			var playcount = rows[0].playcount;
			$('.playnum').html(playcount);
			var createtime = rows[0].createtime.substr(0, 10);
			$('.lzdate').html(createtime);
			var videoid = rows[0].id;
			$('.scstate').attr('videoid', videoid);

			//更新播放量
			ajaxPostAsyncData_share(updateplay, {
				"videoid": videoid,
				"courseid": courseid,
				"page": page
			}, false, function(data) {
				//alert(sczjid);
				if(data.code == "40000") {

				} else {
					$.jBox.tip(data.info, '');
				}
			}, 'json');
			//获取真实高度重新赋值，确保数据得到
			var h = $('.list').height();
			$('#wrapper').css('top', h + "px");

			//未登录不显示是否收藏
			if(uid == '' || uid == null) {
				$('.scstate').hide();
			} else {
				//查詢是否收藏
				ajaxPostAsyncData(videocollect_get, {
					"videoid": videoid,
					"uid": uid
				}, false, function(data) {
					//alert(sczjid);
					if(data.code == "40000") {
						if(data.resobj.state == 1) {
							$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png');
						} else {
							$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png');
						}

					} else {
						$.jBox.tip(data.info, '');
					}
				}, 'json'); 
			}

			$.each(rows, function(index, value) {

				var subcoursename = rows[index].subcoursename;
				var time = rows[index].createtime;
				//var courseid=rows[index].id;
				var freestate1 = rows[index].freestate;
				//				if(name.length > 15) {
				//					name = name.substr(0, 15) + '...';
				//				}

				if(index != 0) {

					if ( rows[index].url1 != '' ) {
						htmlStr += "<li videourl=" + rows[index].url1 + ">";
					}else {
						if ( rows[index].url2 != '' ) {
							htmlStr += "<li videourl=" + rows[index].url2 + ">";
						}else {
							htmlStr += "<li videourl=" + rows[index].url3 + ">";
						}
					}
					htmlStr += "<div class=\"p clearfix\" videoid=" + rows[index].id + ">";
					htmlStr += "<p class=\"video_img\" playnum=" + rows[index].playcount + ">";
					htmlStr += "<img src=" + rows[index].appimgurl + ">";
					//htmlStr += "<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>";
					htmlStr += "</p>";
					htmlStr += "<dl class=\"fl\">";
					htmlStr += "<dd class=\"top clearfix\">";
					htmlStr += "<span class=\"video_name fl \">" + rows[index].name + "</span>";
					htmlStr += "</dd>";
					htmlStr += "<dd class=\"bottom clearfix\">";
					htmlStr += "<span class=\"video_play fl   list_play\">" + rows[index].createtime.substr(0, 10) + "</span>";
					htmlStr += "<span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span>";
					htmlStr += "</dd>";
					htmlStr += "</dl>";
					htmlStr += "</div>";
					htmlStr += "</li>";
				}
				//htmlStr += "<li><span class=\"date\">"+time+"</span><span class=\"lesson_title\">"+subcoursename+"</span></li>";
			});
			$("#indent_table_id").append(htmlStr);

		} else {
			$.jBox.tip(data.info, '');
		}

	}, 'json');

})
//点击视频列表
$('#indent_table_id li').live('click', function() {
	//var nameWidth = $("dd .innderspan").width();
	//if ($(".video_name.bule").width())
		
		var videourl = $(this).attr('videourl');
		var videoid = $(this).children('div').attr('videoid');
		var playnum = $(this).find('.video_img').attr('playnum');
		$('.playnum').html(playnum);
		var list_time = $(this).find('.list_play').html();
		$('.lzdate').html(list_time);
		var video_name = $(this).find('.video_name').html();
		$('title').html(video_name);
		$('.video-tittle span').html(video_name);
		$('#video').attr('src', videourl);
		if($(this).find('.current_box').length == 0) {
			$(this).find('.video_img').append("<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>");
		}

		$(this).find('.video_name').addClass('blue');
		var h = $('.list').height();
		$('#wrapper').css('top', h + "px");
		
		$(this).siblings('li').find('.video_img .current_box').detach();
		$(this).siblings('li').find('.video_name').removeClass('blue');
		$('.scstate').attr('videoid', videoid);
		if(uid == '' || uid == null) {
			$('.scstate').hide();
		} else {
			ajaxPostAsyncData(videocollect_get, {
				"videoid": videoid,
				"uid": uid
			}, false, function(data) {
				//alert(sczjid);
				if(data.code == "40000") {
					if(data.resobj.state == 1) {
						$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png');
					} else {
						$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png');
					}

				} else {
					$.jBox.tip(data.info, '');
				}
			}, 'json');
		}
		//更新播放次数
		ajaxPostAsyncData_share(updateplay, {
			"videoid": videoid,
			"courseid": courseid,
			"page": page
		}, false, function(data) {
			//alert(sczjid);
			if(data.code == "40000") {

			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json'); 
		document.getElementById('video').play();
	})
	//function play(a,videourl){
	//	
	//	$(a).children('.video_img img').append("<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>");
	//	$(a).siblings('li').children('.video_img img').remove("<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>");
	//}

//收藏按钮
$('.out').live('click', function() {
	if(uid == "" || uid == null || uid == "undefined") {
		$.jBox.tip("该视频先登录才能收藏,请返回并登录!", "error");
		return false;
	}
	//var sczjid = "";
	if($('.scstate').attr('src') == "/static/wechat/assets/images/star_yes.png") {
		var type = 2;
		$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png'); //收藏状态
	} else {
		$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png'); //收藏状态
		var type = 1;
	}
	var videoid = $('.scstate').attr('videoid');
	//alert(videoid);
	ajaxPostAsyncData(videocollect_update, {
		"videoid": videoid,
		"type": type,
		"uid": uid
	}, false, function(data) {
		//alert(sczjid);
		if(data.code == "40000") {
			if(type == 2) {
				$.jBox.tip('删除收藏成功', 'success');
			} else {
				$.jBox.tip('收藏成功', 'success');
			}

		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');

})
var page = 1;

function getdataafter() {
	//console.log($('#indent_table_id').children('li').length);
	page += 1;
	if($('#indent_table_id').children('li').length >= 10) {
		ajaxPostAsyncData_share(subjectvideoget, {
			"subid": subid,
			"uid": uid,
			"page": page
		}, false, function(data) {
			if($.trim(data.code) == "40000") {
				var rows = data.resobj.rows;
				var htmlStr = "";
				$.each(rows, function(index, value) {

					var subcoursename = rows[index].name;
					var time = rows[index].createtime.substr(0, 10);

					//var courseid=rows[index].id;
					var freestate1 = rows[index].freestate;
					//				if(name.length > 15) {
					//					name = name.substr(0, 15) + '...';
					//				}

					htmlStr += "<li videourl=" + rows[index].url1 + ">";
					htmlStr += "<div class=\"p clearfix\" videoid=" + rows[index].id + ">";
					htmlStr += "<p class=\"video_img\">";
					htmlStr += "<img src=" + rows[index].appimgurl + ">";
					//htmlStr += "<span class=\"current_box\"><img src=\"/static/wechat/assets/images/play_current.png\" class=\"current\"></span>";
					htmlStr += "</p>";
					htmlStr += "<dl class=\"fl\">";
					htmlStr += "<dd class=\"top clearfix\">";
					htmlStr += "<span class=\"video_name fl \">" + rows[index].name + "</span>";
					htmlStr += "</dd>";
					htmlStr += "<dd class=\"bottom clearfix\">";
					htmlStr += "<span class=\"video_play fl   list_play\">" + time + "</span>";
					htmlStr += "<span class=\"video_date fl   video_lesson_date list_time\">" + rows[index].duration + "</span>";
					htmlStr += "</dd>";
					htmlStr += "</dl>";
					htmlStr += "</div>";
					htmlStr += "</li>";

					//htmlStr += "<li><span class=\"date\">"+time+"</span><span class=\"lesson_title\">"+subcoursename+"</span></li>";
				});
				$("#indent_table_id").append(htmlStr);

			} else {
				$.jBox.tip(data.info, '');
			}

		}, 'json');
	}

}