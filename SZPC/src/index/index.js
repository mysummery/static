$(function() {
	//	播放视频
	var largeplay = document.getElementById("largeplay");
	var playbutton = document.getElementById("playbutton");
	playbutton.onclick = function() {
			$(".video-large-wrap").show();
			largeplay.play();
		}
		//	关闭视频
	$("#close").click(function() {
			$(".video-large-wrap").hide();
			largeplay.pause();
		})
		//设置背景图为屏幕高度
	var screenHeight = window.screen.height;
	$(".first_bg").css("height", screenHeight);
	$(".second_bg").css("height", screenHeight);
	$(".third_bg").css("height", screenHeight);

})
var wrap = document.getElementById("wrap");
var main = document.getElementById("main");
var hei = document.body.clientHeight;
wrap.style.height = hei + "px";
var obj = document.getElementsByTagName("div");
for(var i = 0; i < obj.length; i++) {
	if(obj[i].className == 'page') {
		obj[i].style.height = hei + "px";
	}
}
//如果不加时间控制，滚动会过度灵敏，一次翻好几屏
var startTime = 0, //翻屏起始时间  
	endTime = 0,
	now = 0;
//浏览器兼容      
if((navigator.userAgent.toLowerCase().indexOf("firefox") != -1)) {
	document.addEventListener("DOMMouseScroll", scrollFun, false);
} else if(document.addEventListener) {
	document.addEventListener("mousewheel", scrollFun, false);
} else if(document.attachEvent) {
	document.attachEvent("onmousewheel", scrollFun);
} else {
	document.onmousewheel = scrollFun;
}

//滚动事件处理函数
function scrollFun(event) {
	startTime = new Date().getTime();
	var delta = event.detail || (-event.wheelDelta);
	//mousewheel事件中的 “event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动
	//DOMMouseScroll事件中的 “event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动
	if((endTime - startTime) < -1000) {
		if(delta > 0 && parseInt(main.offsetTop) > -(hei * 3)) {
			//向下滚动
			now = now - hei;
			toPage(now);
		}
		if(delta < 0 && parseInt(main.offsetTop) < 0) {
			//向上滚动
			now = now + hei;
			toPage(now);
		}
		endTime = new Date().getTime();
	} else {
		event.preventDefault();
	}
}

function toPage(now) {
	$("#main").animate({
		top: (now + 'px')
	}, 1000); //jquery实现动画效果
	//setTimeout("main.style.top = now + 'px'",1000);     javascript 实现动画效果
}