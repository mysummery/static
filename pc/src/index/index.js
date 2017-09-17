

$(function() {
	$(".index").addClass("current");
    ajaxWebPostAsyncData(slide,{
			"type": "2"
		}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj;
			$.each(resdata, function(index, value) {	
//				点击图片跳转
				$(".banner-con .pic").append('<li><a href="'+resdata[index].pclinkurl+'"><img src="' + resdata[index].pcimgurl + '" alt=\"\" /></a></li>');
				

			});
			$(".banner-con .pic").append('<li><a href="'+resdata[0].pclinkurl+'"><img src="' + resdata[0].pcimgurl + '" alt=\"\" /></a></li>');
//			点击侧边栏跳转
			$(".banner-nav li").click(function (){
					var idx = $(this).index();
					idx = idx+1;
				window.location.href =  "/static/pc/src/lessons/shipinList/new_shipin.html?titleId="+idx+"";
                 

				})
				
		}
	},'json')
	
// 2 顶部轮播图
	// 循环遍历出.nav-list 中的每个 a,侧导航栏与下标同步
	for(var i = 0; i < $(".banner .nav-list a").length; i++) {
		var lists = $(".banner .nav-list a")[i];
		lists.index = i;
		lists.onmouseover = function() {

			$(".banner .pic").stop().animate({
				"left": -this.index * $(".banner .pic img").width() + "px"
			}, 1000);
			$(this).parent().addClass("current").siblings().removeClass("current");
			$(".banner-page span").eq(this.index).addClass("on").siblings().removeClass("on");
			pic1 = square = this.index;
		}	
	}

	//  下标轮播
	
		for(var i = 0; i < $(".banner-page span").length; i++) {
		var span = $(".banner-page span")[i];
		span.index = i;
		span.onmouseover = function() {
			$(".banner ul").stop().animate({
				"left": -this.index * $(".banner ul img").width() + "px"
			}, 1000);
			$(this).addClass("on").siblings().removeClass("on");
			pic1 = square = this.index;
		}
	}
//		定时器 三秒
	var pic1=0;
	var square= 0;
	var timer = setInterval(function () {
		if(pic1 == $(".pic li").length - 1) {
			pic1 = 0;
			$(".banner-con ul").css("left", '0px');
		} 
			pic1++;
			
		$(".banner-con ul").animate({
			"left": -pic1 * $(".banner-con ul img").width() + "px"
		}, 1500);
		// circle同步变化
		if(square == $(".banner-page").children().length - 1) {
			square = 0;
		} else {
			square++;
		}

		for(var i = 0; i < $(".banner-page").children().length; i++) {
			$(".banner-page").children().eq(i).removeClass("on");
		}
		$(".banner-page").children().eq(square).addClass('on');
	}, 3000);
//	鼠标移上清楚定时器
	$(".banner").mouseover(function () {
		clearInterval(timer);
	})
//	鼠标离开重启定时器
	$(".banner").mouseleave(function () {
		 timer = setInterval(function () {
		if(pic1 == $(".pic li").length - 1) {
			pic1 = 0;
			$(".banner-con ul").css("left", '0px');
		}
			pic1++;
		
		$(".banner-con ul").animate({
			"left": -pic1 * $(".banner-con ul img").width() + "px"
		}, 1500);
		// circle同步变化
		if(square == $(".banner-page").children().length - 1) {
			square = 0;
		} else {
			square++;
		}

		for(var i = 0; i < $(".banner-page").children().length; i++) {
			$(".banner-page").children().eq(i).removeClass("on");
		}
		$(".banner-page").children().eq(square).addClass('on');
	}, 3000);
	
	
	})
// 3 八大板块轮播
    //  点击circle切换图片
	var imgWidth  = $(".lunbo-con>ul")[0].offsetWidth; //获得宽度

	for(var i = 0; i < $(".circle").children().length; i++) {
		var li = $(".circle").children()[i];
		li.index = i;
		li.onmouseover = function() {
			for(var j = 0; j < $(".circle").children().length; j++) {
				$(".circle").children().eq(j).removeClass("current");
			}
			$(this).addClass('current');
			var idx = this.index;
			var target = -idx * imgWidth;
			$(".lunbo-con").stop().animate({
				"left": target + "px"
			}, 1000);

			pic = square = idx;
		};
	}

// 右箭头聚焦切换为带光圈箭头图片
	$(".eightpic .arrright").hover(function () {
		 $(this).html("");
        var img = "<img src = '/static/pc/assets/images/yinright.png' alt = '' />";
        $(this).css({"padding-top":"0","height":"61px"}).append(img);

	},function () {
		$(this).html("");
        var img = "<img src = '/static/pc/assets/images/arrright.png' alt = '' />";
        $(this).css({"padding-top":"12px","height":"41px"}).append(img);
	});
//	左箭头聚焦切换为带光圈箭头图片
	$(".eightpic .arrleft").hover(function () {
		 $(this).html("");
        var img = "<img src = '/static/pc/assets/images/yinleft.png' alt = '' />";
        $(this).css({"padding-top":"0","height":"61px"}).append(img);

	},function () {
		$(this).html("");
        var img = "<img src = '/static/pc/assets/images/arrleft.png' alt = '' />";
        $(this).css({"padding-top":"12px","height":"41px"}).append(img);
	})
	
//	右箭头点击事件
	var pic = 0;
	var squarelittel = 0;
	$(".eightpic .arrright").click(function() {
  
		if(pic == $(".lunbo-con>ul").length - 1) {
			pic = 0;
			$(".lunbo-con").css("left", 0);

		}
		pic++;
		var imgWidth = $(".lunbo-con>ul")[0].offsetWidth; //获得宽度
		
		var target = -pic * imgWidth;

		$(".lunbo-con").stop().animate({
			"left": target + "px"
		}, 1000);

		// circle同步变化
		if(squarelittel == $(".circle").children().length - 1) {
			squarelittel = 0;
		} else {
			squarelittel++;
		}

		$(".circle").children('span').removeClass("current");
		$(".circle").children('span').eq(squarelittel).addClass('current');


	});
//左箭头点击事件
	$(".eightpic .arrleft").click(function() {
		var imgWidth = $(".lunbo-con>ul")[0].offsetWidth; //获得宽度
		if(pic == 0) {
			pic = $(".lunbo-con>ul").length - 1;
			target = -pic * imgWidth;
			$(".lunbo-con").css("left", target + "px");
		}
		pic--;	
		target = -pic * imgWidth;
		$(".lunbo-con").stop().animate({
			"left": target + "px"
		}, 1000);

		// circle同步变化
		if(squarelittel == 0) {
			squarelittel = $(".circle").children().length - 1;
		} else {
			squarelittel--;
		}
		$(".circle").children('span').removeClass("current");
		$(".circle").children('span').eq(squarelittel).addClass('current');

	});
	
//	精品视频

	ajaxWebPostAsyncData(selectBykcid, {
		"page": 1,
		"courseid": "",
		"type": 2
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj.rows;
			$.each(resdata, function(index, value) {
				var freestate = resdata[index].freestate;
				if(index < 8) {
					$(".team-pic>ul").append('<li name=' + resdata[index].id + '><a class="tittle" href="/static/pc/src/lessons/chbofang/new_chbofang.html?videoId=' + resdata[index].id + '&videoCourseId='+resdata[index].courseid +'&freestate=' + freestate + '"><img class="pic" src="' + resdata[index].pcimgurl + '"/><p>' + resdata[index].name + '</p></a><div class="click"><div class="right_float"><span class="arr"></span><span class="num">' + resdata[index].playcount + '</span></div></div></li>');
				}

			});
		}
	}, 'json');



});