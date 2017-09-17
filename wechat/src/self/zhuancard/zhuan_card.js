var uid = getCookie('cookie_brsy_h5_uid');
var type = 2;//需要默认给2-礼品卡
var count = getQueryString('count');
var cancount = getQueryString('cancount');
var gifttotal = getQueryString('gifttotal');
var studytotal = getQueryString('studytotal');
$(function() {
	$('.message-button').find('div').click(function() {
		$('#cover').hide();
		$('.message').hide();
	});
	$('.message-button1').find('div').click(function() {
		if($(this).attr('code') == 0) {
			console.log('取消进入转换方法')
			$('#cover').hide();
			$('.message1').hide();
		} else {
			zhuanhuan($('.body-zhuan-one').find('input').val());
			$('#cover').hide();
			$('.message1').hide();
		}

	})
	
	$('.body-zhuan-three>div').click(function() {
		var inputThis = $('.body-zhuan-one').find('input');
		if(inputThis.val() == "" || inputThis.val() == "0" || inputThis.val().substr(0, 1) == "0") {
			$('.message-body').html('数量不能为0！');
			$('#cover').show();
			$('.message').show();
		} else {
			if(parseInt(inputThis.val()) > parseInt(count)) {
				$('.message-body').html('您的卡余量不足！');
				$('#cover').show();
				$('.message').show();
				$('.number').html(1);
			} else {
				$('.number').html(inputThis.val());
				$('#cover').show();
				$('.message1').show();
			}

		}
	})
	$('.body-zhuan-one').find('input').bind('input propertychange', function() {
		if($(this).val() > 50) {
			$('#cover').show();
			$('.message').show();
			$('.message-body').html('数量不能超过50张');
			$(this).val(50);
			return;
		}
		if($(this).val() !== "") {
			$('.body-zhuan-three>div').css({
				'color': '#fff'
			});
		} else {
			$('.body-zhuan-three>div').css({
				'color': 'rgba(255,255,255,0.5)'
			});
		}
	})
	$('.center-button').find('div').click(function() {
		$(this).parent().find('div').attr('class', '');
		$(this).attr('class', 'on');
		if($(this).attr('code') == 0) {
			type = 2;
			$('.cardName').html('礼品卡');
			$('.about-lipin').show();
			$('.about-xuexi').hide();
		} else {
			type = 1;
			$('.cardName').html('学习卡');
			$('.about-xuexi').show();
			$('.about-lipin').hide();
		}

	})
	var cancount_turn = Math.ceil(count / 10);
	var total = parseInt(gifttotal) + parseInt(studytotal);
	var can = cancount_turn - total;
	
	$('.cancount').html(cancount_turn);
	$('.already').html(total);
	$('.canturn').html(can);

});

function zhuanhuan(changeCount) {
	var _data = {
			uid: uid,
			count: changeCount,
			type : type //1学习卡 2礼品卡
		}
		//alert(count);
		
		ajaxPostAsyncData(groupbuychange, _data, true, function(data) {
			if(data.code == "40000") {
				location.href = "/static/wechat/src/self/group/groupbuying_manage.html";
			} else {
				$.jBox.tip("转换失败!" + data.info, "error");
			}
		});

}