/**
 * Created by gaocl on 2016/8/26.
 */
$('#price').click(function() {
	$('.option').slideToggle();
	$('.select').toggleClass('pos');
	if($('.select').hasClass('pos')) {
		$(this).html('4500元团购');
	}
})
$('.select dd').click(function() {
	$('.option').slideUp();
	$('.select').removeClass('pos');
	$('#price').html($(this).html());
})

function loadData() {
	var cancount = getCookie("cookie_brsy_h5_teambuy_stat_cancount");
	$("#split_count").html(cancount);
}
$('#confirm_split').click(function() {
	var uid = getCookie("cookie_brsy_h5_uid");
	var code = $("#split_code").val();
	var splitCode = $(".split_jibie option:checked").attr("code");
	var jibie = 0;
	var splitTip = '';
	if(splitCode == 1) {
		jibie = 1;
		splitTip = '您即将拆分给' + code + '用户39个激活码，请确认！';
	} else if(splitCode == 2) {
		jibie = 2;
		splitTip = '您即将拆分给' + code + '用户250个激活码，请确认！';
	} else if(splitCode == 3) {
		jibie = 3;
		splitTip = '您即将拆分给' + code + '用户738个激活码，请确认！';
	}
	if(jibie === 0) {
		$.jBox.tip('请选择团购级别', '');
	} else if(uid === null || uid === '') {
		$.jBox.tip('无用户信息，请重新登录', '');
	} else if(code === null || code === '') {
		$.jBox.tip('请输入邀请码', '');
	} else {
		
		if(confirm(splitTip)) {
			$('#confirm_split').attr('disabled',true);
			ajaxPostAsyncData(appSTeamBuySplitSave, {
				"level": jibie,
				"uid": uid,
				"code": code
			}, true, function(data) {
				if($.trim(data.code) == "40000") {
					$.jBox.tip('拆分成功', 'success');
					window.setTimeout(function() {
						history.go(-1);
					}, 2000);

				} else {
					$('#confirm_split').attr('disabled',false);
					$.jBox.tip(data.info, 'error');
				}
			},"json",function() {
				$('#confirm_split').attr('disabled',false);
				console.log('请求结束');
			});
		}
	}
})
loadData();