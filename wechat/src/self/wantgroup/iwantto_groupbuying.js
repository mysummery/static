/**
 * Created by gaocl on 2016/8/26.
 */

//$('#price').click(function() {
//	$('.option').slideToggle();
//	$('.select').toggleClass('pos1');
//	if($('.select').hasClass('pos1')) {
//		$(this).html('4500元团购');
//
//	} else {
//
//		$('.self_account').hide();
//	}
//})

$(".split_jibie").change(function() {
	if($(this).find('option:checked').attr('code') == 4) {
		$('.self_account').show();
	} else {
		$('.self_account').hide();

	}
});

function loadData() {
	var account = getCookie("cookie_brsy_h5_account");
	$("#teambuy_account").val(account);
}

function submitPost() {
	if(!$('#checkbox-1').prop('checked')) {
		$.jBox.tip('请先同意协议', '');
		return;
	}

	var uid = getCookie("cookie_brsy_h5_uid");
	var name = $("#teambuy_name").val();
	var phone = $("#teambuy_phone").val();
	var account = $("#teambuy_account").val();

	var splitCode = $(".split_jibie option:checked").attr("code");

	var jibieHtml = $("#price").html();
	var jibie = 0;
	var regu = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(phone)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	}
	var teambuyTip = '';
	var teamBuyCount = '';
	if(splitCode == 0) {
		jibie = 1;
		teamBuyCount = 39;
		teambuyTip = '您即将申请4500级别，请确认！';
	} else if(splitCode == 1) {
		jibie = 2;
		teamBuyCount = 250;
		teambuyTip = '您即将申请2.5万级别，请确认！';
	} else if(splitCode == 2) {
		jibie = 3;
		teamBuyCount = 738;
		teambuyTip = '您即将申请6.5万级别，请确认！';
	} else if(splitCode == 3) {
		jibie = 4;
		teamBuyCount = 2250;
		teambuyTip = '您即将申请19.8万级别，请确认！';
	} else if(splitCode == 4) {
		jibie = 99;
		var teamBuyCount = $('#teambuy_selfaccount').val();
	}
	if(jibie === 0) {
		$.jBox.tip('请选择团购级别', '');
	} else if(uid === null || account === null || account === '') {
		$.jBox.tip('无用户信息，请重新登录', '');
	} else if(name === null || name === '') {
		$.jBox.tip('请输入姓名', '');
	} else if(phone === null || phone === '') {
		$.jBox.tip('请输入手机号', '');
	} else {
		//		var teamBuyCount = $('#teambuy_selfaccount').val();
		if($('.self_account').css('display') != 'none') {
			var regu = /^[0-9]*$/;
			var re = new RegExp(regu);
			if(!re.test(teamBuyCount)) {
				$.jBox.tip("请输入正确的团购数量", "error");
				return false;

			}
			/* modefied by 李思远 at 2017.09.04 for 自定义数量最大修改为2475 begin   */
			if(teamBuyCount < 39 || teamBuyCount > 2475) {
			/* modefied by 李思远 at 2017.09.04 for 自定义数量最大修改为2475 end   */
				$.jBox.tip("请输入正确的团购数量", "error");
				return false;
			} else {
				if(confirm('您即将申请' + teamBuyCount + "个激活码，请确认！")) {
					ajaxPostAsyncData(save, {
						"level": 99,
						"name": name,
						"uid": uid,
						"account": account,
						"count": teamBuyCount
					}, false, function(data) {
						if($.trim(data.code) == "40000") {
							$.jBox.tip('团购成功', '');
							window.setTimeout(function() {
								history.go(-1);
							}, 1000);
						} else {
							$.jBox.tip(data.info, 'error');
						}
					}, 'json');
				}
			}
		} else {
			if(confirm(teambuyTip)) {
				ajaxPostAsyncData(save, {
					"level": jibie,
					"name": name,
					"uid": uid,
					"account": account,
					"count": teamBuyCount
				}, false, function(data) {
					if($.trim(data.code) == "40000") {
						$.jBox.tip('团购成功', '');
						window.setTimeout(function() {
							history.go(-1);
						}, 1000);

					} else {
						$.jBox.tip(data.info, 'error');
					}
				}, 'json');
			}

		}
	}
}
loadData();