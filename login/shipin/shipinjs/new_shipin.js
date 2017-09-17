
$(function() {
	
		selectOne();
		//	点击分类
		$(".gOne").on("click", "li", function() {

			$(this).children("a").addClass("current").parent().siblings().children("a").removeClass("current");

			$(".gTwo").find("li").remove();
			$(".gThree").find("li").remove();
			$(".gFour").find("li").remove();
			var id = $(this).attr("name");
			$(".video-bar span").eq(0).addClass("current").siblings().removeClass("current");
			$("video-bar span").click(function() {
				$(this).addClass("current").siblings().removeClass("current");
			})
			selectTwo(id);
		});

		//点击课程集
		$(".gTwo").on("click", "li", function() {
			$(this).children("a").addClass("current").parent().siblings().children("a").removeClass("current");
			$(".gThree").find("li").remove();
			$(".gFour").find("li").remove();
			var id = $(this).attr("name");
			var type = 1;
			$(".video-bar span").eq(0).addClass("current").siblings().removeClass("current");
			$("video-bar span").click(function() {
				$(this).addClass("current").siblings().removeClass("current");
			})
			selectThree(id, type);
		});

		//点击课程名称
		$(".gThree").on("click", "li", function() {
			$(this).children("a").addClass("current").parent().siblings().children("a").removeClass("current");
			$(this).addClass("current").siblings().removeClass();

			$(".gFour").find("li").remove();
			var id = $(this).attr("name");
			var type = 1;
			var page = 1;
			$(".video-bar span").eq(0).addClass("current").siblings().removeClass("current");
			selectFour(id, page,type);
			//	点击最新
			$(".selectNew").click(function() {
				$(".gFour").find("li").remove();
				$(this).addClass("current").siblings().removeClass("current");
				selectNew(id);
			})
			//	点击最热
			$(".selectHot").click(function() {
					$(".gFour").find("li").remove();
					$(this).addClass("current").siblings().removeClass("current");
					selectHot(id);
				})
				//	点击综合
			$(".all").click(function() {
				$(".gFour").find("li").remove();
				$(this).addClass("current").siblings().removeClass("current");
				
				selectFour(id,page,type);
			})
		});
		$(".shipin").addClass("current");

	})
	//刷新页面请求第一行分类数据
function selectOne() {
	ajaxWebPostAsyncData(sfEnlei, null, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj;
			var id = resdata[0].id;
			$.each(resdata, function(index, value) {
				$(".gOne").append("<li name=" + resdata[index].id + "><a   href='javascript:void(0)'>" + resdata[index].name + "</a></li>");
				$(".gOne a:first").addClass("current");
			});
			selectTwo(id);
		}
	}, 'json')
	if($(".gFour li").length >= 10) {
				$('.two').removeClass('end');
				//alert(page);
			}else{
				$('.two').addClass('end');
			}
}

//请求第二行课程集数据
function selectTwo(id) {
	ajaxWebPostAsyncData(selectSFenleiTwo, {
		"page": 1,
		"id": id
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			var id = resdata[0].id;
			var type = 1;
			$.each(resdata, function(index, value) {
				$(".gTwo").append("<li name=" + resdata[index].id + "><a href='javascript:void(0)'>" + resdata[index].name + "</a></li>");
				$(".gTwo a:first").addClass("current");
			});
			selectThree(id, type);
		}
	}, 'json')
}

//请求第三行课程名称数据

function selectThree(id, type) {
	ajaxWebPostAsyncData(selectSFenleikc, {
		"page": 1,
		"id": id,
		"type": type
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			var id = resdata[0].id;
			var type = 1;
			$.each(resdata, function(index, value) {
				$(".gThree").append("<li name=" + resdata[index].id + "><a href='javascript:void(0)'>" + resdata[index].name + "</a></li>");
				$(".gThree a:first").addClass("current");
			});
              var page = 1;
			selectFour(id,page, type);
			$(".selectNew").click(function() {
				$(".gFour").find("li").remove();
				$(this).addClass("current").siblings().removeClass("current");
				selectNew(id);
			})

			$(".selectHot").click(function() {
				$(".gFour").find("li").remove();
				$(this).addClass("current").siblings().removeClass("current");
				selectHot(id);
			})
			$(".all").click(function() {
				$(".gFour").find("li").remove();
				$(this).addClass("current").siblings().removeClass("current");
				
				selectFour(id,page,type);
				
			})
		}
	}, 'json')
}

//请求视频列表

function selectFour(id, b,type) {
	ajaxWebPostAsyncData(selectBykcid, {
		"courseid": id,
		"page": b,
		"type": type,
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			var page = data.resobj.page;
			var currentPageSize = data.resobj.currentPageSize;
			$(".pager").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if (page == 1){
						$(".page .one").addClass("end");
				}else {
					$(".page .one").removeClass("end");
				}
			$.each(resdata, function(index, value) {
				var freestate = resdata[index].freestate;
				$(".gFour").append('<li name=' + resdata[index].id + '><a class="tittle" href="new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId=' + id + '&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');

			});
//			分页
			$(".pager>li").eq(0).on("click", "a", function() {
					// 如果是第一页
					if(page == 1) {	
					$(".page .one").addClass("end");
						return;
					}
					$(".page .one").removeClass("end");
					page--;
					selectFour(id, page,type)
			})
				$(".pager>li").eq(1).on("click", "a", function() {
					
					if(resdata.length % currentPageSize > 0) {
						$(".page .two").addClass("end");
						return;
					}
					if(resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						page++;

						selectFour(id, page,type)
					}
				})
		}
	}, 'json')
	if($(".gFour li").length >= 50) {
				$('.two').removeClass('end');
				//alert(page);
			}else{
				$('.two').addClass('end');
			}
}

//最新视频
function selectNew(id) {
	ajaxWebPostAsyncData(selectBykcid, {
		"page": "1",
		"courseid": id,
		"type": "6"
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			$(".pager").html("");
			$.each(resdata, function(index, value) {
				var freestate = resdata[index].freestate;
				$(".gFour").append('<li name=' + resdata[index].id + '><a class="tittle" href="new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId=' + id + '&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');
			});
		}
	}, 'json')
	if($(".gFour li").length >= 50) {
				$('.two').removeClass('end');
				//alert(page);
			}else{
				$('.two').addClass('end');
			}
}

function selectHot(id) {
	ajaxWebPostAsyncData(selectBykcid, {
		"page": "1",
		"courseid": id,
		"type": "7"
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			$(".pager").html("");
			$.each(resdata, function(index, value) {
				var freestate = resdata[index].freestate;
				$(".gFour").append('<li name=' + resdata[index].id + '><a class="tittle" href="new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId=' + id + '&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');

			});
		}
	}, 'json')
	if($(".gFour li").length >= 50) {
				$('.two').removeClass('end');
				//alert(page);
			}else{
				$('.two').addClass('end');
			}
}