// JavaScript Document
$(function() {
	var uid = getQueryString("uid");
	var token = getQueryString("token");
	var $btn = $('.playbtn');
	//var playnum=3;
	//$('.playnum').html(playnum);
	var action = "/appSJiang/getChance.ph"; //获取能抽奖的次数
	ajaxPostAsyncData(action, {
		"uid": uid,
		"token": token,
		"updateVersion": "notUpdate"
	}, false, function(data) {
		//alert(data.code);
		if(data.code == "40000") {
			window.playnum = data.resobj; //初始次数，由后台传入
			$('.playnum').html(playnum);
		} else {
			//$.jBox.tip(data.info,'error');
		}
	}, 'json')

	var isture = 0;

	var clickfunc = function() {

		var action = "/appSJiang/rollForPrize.ph"; //点击抽奖
		ajaxPostAsyncData(action, {
				"uid": uid,
				"token": token,
				"updateVersion": "notUpdate"
			}, false, function(data) {
				//alert(data.code);
				if(data.code == "40000") {
					if(data.resobj.status == '1') { //是否中奖
						var gift = data.resobj.jiangid; //奖品id
						var zjid = data.resobj.zjid; //主键id
						$('#zjid').val(zjid);
						//alert(data.resobj.jiangid);
						console.log(data);
						$('#gift').val(gift);
					} else {
						var gift = '00';
						$('#gift').val(gift);
					}
				} else {
					//$.jBox.tip(data.info,'error');
				}
			}, 'json')
			//var data = [1, 2, 3, 4, 5, 6];
			//data为随机出来的结果，根据概率后的结果
			//data = data[Math.floor(Math.random() * data.length)];
		var gift = $('#gift').val();
		//alert(gift);
		switch(gift) {
			case '0':
				rotateFunc(1, 0, '4'); //特等奖
				break;
			case '1':
				rotateFunc(2, 60, '1'); //一等奖
				break;
			case '00':
				rotateFunc(3, 120, '0'); //没中奖
				break;
			case '3':
				rotateFunc(4, 180, '3'); //三等奖
				break;
			case '2':
				rotateFunc(5, 240, '2'); //二等奖
				break;
			case '00':
				rotateFunc(6, 300, '0'); //没中奖
				break;
		}
	}
	var playbtn = document.getElementById('playbtn');
	playbtn.addEventListener('click', function() {
		$('#playbtn').attr('disabled', 'disabled');
		if(playnum == '0') {
			//$.jBox.tip('没有机会了','error');
			$('#fill_no .top').html('很抱歉');
			$('#fill_no').show('fast');
			$('.cover').show();
			return false;
		}
		var audio = document.getElementById("myAudio");
		audio.play();
		isture = true; // 标志为 在执行
		//先判断是否登录,未登录则执行下面的函数
		if(1 == 2) {
			$('.playnum').html('0');
			alert("请先登录");
			isture = false;
		} else { //登录了就执行下面
			if(playnum <= 0) { //当抽奖次数为0的时候执行
				$('#fill_no .top').html('很抱歉');
				$('#fill_no').show('fast');
				$('.cover').show();
				$('.playnum').html(0);
				isture = false;
			} else { //还有次数就执行
				playnum = playnum - 1; //执行转盘了则次数减1
				if(playnum <= 0) {
					playnum = 0;
				}
				$('.playnum').html(playnum);
				clickfunc();
			}
		}
	});
	var rotateFunc = function(awards, angle, text) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0,
			duration: 3000, //旋转时间
			animateTo: angle + 1440, //让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				var audio = document.getElementById("myAudio");
				audio.pause();
				//alert(text);
				if(text == '4') {
					$('#win .gift_name').html('获得特等奖');
					$('#win').show('fast');
					$('.cover').show();
				}
				if(text == '0') {
					if(playnum != '0') {
						$('#fill').show('fast');
						$('.cover').show();
					} else {
						$('#fill_no .top').html('很抱歉,没中奖');
						$('#fill_no').show('fast');
						$('.cover').show();
						//alert($('#fill_no').offset().top);
					}
				}
				if(text == '1') {
					$('#win .gift_name').html('获得一等奖');
					$('#win').show('fast');
					$('.cover').show();
				}
				if(text == '2') {
					$('#win .gift_name').html('获得二等奖');
					$('#win').show('fast');
					$('.cover').show();
				}
				if(text == '3') {
					$('#win .gift_name').html('获得三等奖');
					$('#win').show('fast');
					$('.cover').show();
				}
			}
		});
		$('.playbtn').attr('disabled', 'false');
	};
});
//关闭按钮
function close_(a) {
	$(a).parents('.alert').hide();
	$('.cover').hide();
}
//中奖名单和奖品设置的切换	
function chose(a) {
	$(a).addClass('active');
	$(a).siblings('button').removeClass('active');
	if($(a).hasClass('btn1')) {
		$('.gifts').show();
		$('.lists').hide();
	} else {
		$('.gifts').hide();
		var action1 = "/appSJiang/getRecord.ph"; //获取中奖名单
		ajaxPostAsyncData(action1, {

		}, false, function(data) {
			if(data.code == "40000") {
				var rows = data.resobj;
				var htmlstr = '';
				$.each(rows, function(index, value) {
					var userName = rows[index].userName;
					if(userName === null || userName === "") {
						return true;
					}
					if(userName.length > 4) {
						userName = userName.substr(0, 4) + '...';
					}
					var phone = rows[index].phone;
					phone = phone.substr(0, 3) + '****' + phone.substr(7, 11);
					htmlstr += "<li><span>" + userName + "</span><span>" + phone + "</span><span>" + rows[index].jiangName + "</span></li>";
				});
				//htmlstr+="<li><span>王晓路</span><span>155****7777</span><span>签名书</span></li><li><span>王晓路</span><span>155****7777</span><span>签名书</span></li><li><span>王晓路</span><span>155****7777</span><span>签名书</span></li>"
				$('#demo1').html(htmlstr);
			} else {
				$.jBox.tip(data.info, 'error');
			}
		}, 'json')
		$('.lists').show();
		scroll_();

	}
}
//中奖名单滚动
function scroll_() {
	var l = $('#demo1 li').length;
	if(l < 4) {
		return false;
	} else {
		speed = 50; //数字越大滚得越慢
		var tab = document.getElementById("indemo");
		var tab1 = document.getElementById("demo1");
		var tab2 = document.getElementById("demo2");
		tab2.innerHTML = tab1.innerHTML;
		tab.scrollTop = tab1.offsetHeight;

		function Marquee() {

			if(tab.scrollTop >= tab1.offsetHeight) {
				tab.scrollTop -= tab2.offsetHeight;

			} else {
				tab.scrollTop += 1;
			}
		}
		var MyMar = setInterval(Marquee, speed);
	}
}