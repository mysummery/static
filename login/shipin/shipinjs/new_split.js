/**** 
*** author：李思远
***	date：2017-04-17
***/
$(function(){
	var groupbuylevel = getCookie('cookie_brsy_pc_groupbuylevel');
	var uid=getCookie('cookie_brsy_pc_uid');
	//切换级别
	$('.level i').click(function(){
			$(this).addClass('current');
			$(this).siblings().removeClass('current');
		}
	);

	//获取可拆分团购卡数量
	ajaxWebPostAsyncData(groupbuystat_get, {
			"uid": uid
		}, false, function(data) {
			if(data.code == "40000") {
				var resdata = data.resobj;
				$('.promp-num').html(resdata.cancount);
			}
	}, 'json');
	//提交拆分邀请码
	$('#new-split-reserve').click(function(){
		var split_code = $('#new-split-code').val();
		if(split_code == ''){
			$.jBox.tip("邀请码不能为空", "error");
			return;
		}
		ajaxWebPostAsyncData(appSTeamBuySplitSave, {
				"level": groupbuylevel,
				"code": split_code,
				"uid": uid
			}, false, function(data) {
				if(data.code == "40000") {
					var resdata = data.resobj;
					$('.promp-num').html(resdata.cancount);
					$('#new-split-code').val('');
				}else if(data.code == "40010"){
					$.jBox.tip("操作失败!" + data.info, "error");
				}
		}, 'json');
	});
	
});