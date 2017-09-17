$(function() {
	var uid = getQueryString("uid");
	var token = getQueryString("token");

	ajaxPostAsyncData(prize_count, {//获取能抽奖的次数
		"uid": uid,
		"token": token,
		"updateVersion": "V2.0"
	}, false, function(data) {
		if(data.code == "40000") {
			window.playnum = data.resobj; //初始次数，由后台传入
			//alert(playnum);
			$('.playnum').html(playnum);
		} else {
			//$.jBox.tip(data.info,'error');
		}
	}, 'json')
	ajaxPostAsyncData(prize_record, {//获取中奖名单
		
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
	scroll_();
})

var lottery = {
	index: -1, //当前转动到哪个位置，起点位置
	count: 0, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 0, //转动次数
	cycle: 15, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1, //中奖位置
	init: function(id) {
		if($("#" + id).find(".lottery-unit").length > 0) {
			$lottery = $("#" + id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(".lottery-unit-" + this.index).addClass("active");
		};
	},
	roll: function() {
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-" + index).removeClass("active");
		index += 1;
		if(index > count - 1) {
			index = 0;
		};
		$(lottery).find(".lottery-unit-" + index).addClass("active");
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};

function roll() {

	lottery.times += 1;
	lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
	if(lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize = -1;
		lottery.times = 0;
		setTimeout(function() {
			//var l = $('.lottery-unit.active').children('img').attr('src');

			//alert(lottery.index);
			var text = lottery.index;
			var playnum = $('.playnum').html();
			if(text == '1') {
				$('#win .gift_name').html('获得特等奖');
				$('#win').show('fast');
				$('.cover').show();
			}
			if(text == '0' || text == '2' || text == '4' || text == '6') {
				if(playnum != '0') {
					$('#fill').show('fast');
					$('.cover').show();
				} else {
					$('#fill_no').show('fast');
					$('.cover').show();
					//alert($('#fill_no').offset().top);
				}
			}
			if(text == '7') {
				$('#win .gift_name').html('获得一等奖');
				$('#win').show('fast');
				$('.cover').show();
			}
			if(text == '3') {
				$('#win .gift_name').html('获得二等奖');
				$('#win').show('fast');
				$('.cover').show();
			}
			if(text == '5') {
				$('#win .gift_name').html('获得三等奖');
				$('#win').show('fast');
				$('.cover').show();
			}
			var audio = document.getElementById("myAudio");
			audio.pause();
		}, 1000);
		$('#playbtn').removeAttr('disabled')
		click = false;
	} else {
		if(lottery.times < lottery.cycle) {
			lottery.speed -= 10;
		} else if(lottery.times == lottery.cycle) {
			//var index = Math.random()*(lottery.count)|0;//中奖物品通过一个随机数生成
			var index = $('#gift').val(); //中奖位置，class几
			lottery.prize = index;
			/*setTimeout(function() {  
			var l = $('.lottery-unit.active').children('img').attr('src');
			alert(l);   
			},index*500)*/
		} else {
			if(lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
				lottery.speed += 110;
			} else {
				lottery.speed += 20;
			}
		}
		if(lottery.speed < 40) {
			lottery.speed = 40;
		};
		//console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
		lottery.timer = setTimeout(roll, lottery.speed); //循环调用
	}

	return false;
}

var click = false;

window.onload = function() {
	lottery.init('lottery');
	$("#playbtn").click(function() {
		$('#playbtn').attr('disabled', 'disabled');
		$('#playbtn').addClass('active');
		var playnum = $('.playnum').html(); //剩余次数
		var audio = document.getElementById("myAudio");
		audio.play();
		playnum--;
		//alert(playnum);
		if(playnum < 0) {
			$('.playnum').html(0);
		} else {
			$('.playnum').html(playnum);
		}

		//alert(total);
		if(playnum == '-1') {
			$('#fill_no').show('fast');
			$('.cover').show();
			return false;
		} else {
			$('.playnum').html(playnum);
			var uid = getQueryString("uid");
			var token = getQueryString("token");
			ajaxPostAsyncData(prize_roll, {//点击抽奖
					"uid": uid,
					"token": token,
					"updateVersion": "V2.0"
				}, false, function(data) {
					//alert(data.code);
					if(data.code == "40000") {

						if(data.resobj.state == '1') { //是否中奖
							var gift = data.resobj.prizeid; //奖品id
							var zjid = data.resobj.id; //主键id
							$('#zjid').val(zjid);
							$('#gift_c').val(gift);
							//alert(data.resobj.jiangid);
							console.log(data);
							if(gift == '0') {
								gift = '1';
							} else if(gift == '1') {
								gift = '7';
							} else if(gift == '2') {
								gift = '3';
							} else if(gift == '3') {
								gift = '5';
							}
							$('#gift').val(gift);
						} else {
							var arr = [0, 2, 4, 6];
							var randomNumber = Math.floor(Math.random() * (3 + 1));
							var gift = arr[randomNumber];
							$('#gift').val(gift);
						}
					} else {
						//$.jBox.tip(data.info,'error');
					}
				}, 'json')
				//			var arr = [0, 2, 4, 6];
				//		var randomNumber = Math.floor(Math.random() * (3 + 1));
				//			var gift = arr[randomNumber];
				//			alert(randomNumber);
				//		$('#gift').val(gift);
			if(click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
				return false;
			} else {
				lottery.speed = 100;
				roll(); //转圈过程不响应click事件，会将click置为false

				click = true; //一次抽奖完成后，设置click为true，可继续抽奖

				return false;
			}
		}
	});
};

setInterval(function() {
		$("#lottery").toggleClass('lottery_bg');
	}, 500)
	//关闭按钮
function close_(a) {
	$(a).parents('.alert').hide();
	$('.cover').hide();
	$('.lottery-unit').removeClass('active');
	$('#lottery table td a').removeClass('active');
	$('#playbtn').removeClass('active');
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