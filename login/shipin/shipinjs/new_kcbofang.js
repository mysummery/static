var data = getRequest();
var videoId = data.videoId;
//课程名称的id,用来请求相关课程列表
var videoCourseId = data.videoCourseId;
var freestate = data.freestate;
$(function() {

	//相关推荐
	ajaxWebPostAsyncData(selectBykcid, {
		"page": 1,
		"courseid": "",
		"type": 2
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			$.each(resdata, function(index, value) {
				if(index < 8) {
					$(".recommond").append('<li name=' + resdata[index].id + '><a class="tittle" href="new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId=' + resdata[index].courseid + '&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');
				}

			});
		}
	}, 'json');
	//相关课程列表     
	ajaxWebPostAsyncData(selectBykcid, {
		"courseid": videoCourseId,
		"page": 1,
		"type": 1
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			$.each(resdata, function(index, value) {
				$(".le_list").append('<li name=' + resdata[index].id + '><a class="tittle" href="new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId=' + videoCourseId + '&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');
			});
			var lis = $(".le_list>li").length;
			//			视频下的轮播
			if(lis > 5) {
				$("#arr").css("display", "block");


				//				鼠标移上右箭头切换带光圈图片
				$(".lesson-all #right").hover(function() {

					$(this).html("");
					var img = "<img src = './images/yinright.png' alt = '' />";
					$(this).css({
						"padding-top": "0",
						"height": "61px"
					}).append(img);
				}, function() {
					$(this).html("");
					var img = "<img src = './images/arrright.png' alt = '' />";
					$(this).css({
						"padding-top": "13px",
						"height": "41px"
					}).append(img);
				});

				//鼠标移上左箭头切换带光圈图片
				$(".lesson-all #left").hover(function() {
					$(this).html("");
					var img = "<img src = './images/yinleft.png' alt = '' />";
					$(this).css({
						"padding-top": "0",
						"height": "61px"
					}).append(img);

				}, function() {
					$(this).html("");
					var img = "<img src = './images/arrleft.png' alt = '' />";
					$(this).css({
						"padding-top": "13px",
						"height": "41px"
					}).append(img);
				});
				var imgwidth = $(".le_list>li")[0].offsetWidth;
				var lis = $(".le_list>li").length;
				var pic = 0;
				$("#right").click(function() {
					pic++;
					if(pic > lis - 5) {
						pic = lis - 5;
						return;
					}
					$(".le_list").stop().animate({
						"left": -pic * imgwidth
					}, 1000);
				})
				$("#left").click(function() {
					pic--;
					if(pic < 0) {
						pic = 0
						return;
					}
					$(".le_list").stop().animate({
						"left": -pic * imgwidth
					}, 1000);
				})
			}
		}
	}, 'json');
})

$(function() {
	//	增加播放量
	ajaxWebPostAsyncData(addPlaycount, {
		"id": videoId,
	}, false, function(data) {
		if(data.code == "40000") {}
	}, 'json');
	// 视频播放
	ajaxWebPostAsyncData(selectByzjid, {
		"id": videoId
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj;
			var name = resdata.name;
			var pcimgurl = resdata.pcimgurl;
			var url
			if(resdata.url3) {
				url = resdata.url3;
			} else if(resdata.url2) {
				url = resdata.url2;
			} else if(resdata.url1) {
				url = resdata.url1;
			}
			$(".na").append("<div>" + name + "</div>");
			$("video").attr("poster", pcimgurl);
			//	加载视频                            
			if(freestate == "2") {
				var vipstate = getCookie('cookie_brsy_pc_huiyuan');
				//判断是否登录，没登录的话就跳转登录
				if(!vipstate) {
					$("source").attr("src", "");
					videojs.options.flash.swf = "video-js.swf";
					videojs(document.getElementById('example_video_1'), {}, function() {
						// This is functionally the same as the previous example.	
					})
					$.jBox.tip("该视频需要登录!", "error");

					setTimeout(function() {
						window.location.href = "/static/login/shipin/new_login.html?type=1";
					}, 2000);

				} else if(vipstate == "1") {
					//如果登录，但是freestate=1提示收费
					$("source").attr("src", "");
					videojs.options.flash.swf = "video-js.swf";
					videojs(document.getElementById('example_video_1'), {}, function() {
						// This is functionally the same as the previous example.	

					})

					$.jBox.tip("该视频需要收费观看!", "error");

					setTimeout(function() {
						history.back(-1);
						//						history.go(-1);
					}, 2000);

				} else if(vipstate == "2") {
					$("source").attr("src", url);
					videojs.options.flash.swf = "video-js.swf";
					videojs(document.getElementById('example_video_1'), {}, function() {
						// This is functionally the same as the previous example.	

					})
				}
			} else {
				$("source").attr("src", url);
				videojs.options.flash.swf = "video-js.swf";
				videojs(document.getElementById('example_video_1'), {}, function() {
					// This is functionally the same as the previous example.	

				})
			}

			$(".video-js .vjs-big-play-button ").css("top", "510px");
			$(".video-js .vjs-subtitles-button").css("display", "none");
			$(".video-js .vjs-captions-button").css("display", "none");

		}
	}, 'json');

});