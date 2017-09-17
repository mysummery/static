/**** 
*** author：李思远
***	date：2017-04-17
***/
$(function(){
	var uid=getCookie('cookie_brsy_pc_uid');
	
	$(".groupbuy").addClass("current");

	var level = 1;
	//切换级别
	$('.level i').click(function(){
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
			level = $(this).attr('data-level');
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
			return false;
		}else{
			ajaxWebPostAsyncData(appSTeamBuySplitSave, {
				"level": level,
				"code": split_code,
				"uid": uid
			}, false, function(data) {
				if(data.code == "40000") {
					var resdata = data.resobj;
					$('.promp-num').html(resdata.cancount);
					$('#new-split-code').val('');
					$.jBox.tip("拆分成功!", "success");
					setTimeout(function(){
						window.location.href = '/static/pc/src/self/groupbuy/new_groupbuy.html';
					},1500);
				}else{
					$.jBox.tip("操作失败!" + data.info, "error");
					return false;
				}
			}, 'json');
		}
		
	});
	
});