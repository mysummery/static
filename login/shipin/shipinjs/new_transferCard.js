/****
*** author：李思远
***	date：2017-04-17
***/
$(function(){
	var uid=getCookie('cookie_brsy_pc_uid');
	//可转的卡数量
	var transerCount;
	//已经转换的礼品卡数量
	var studyCount;
	//已经转换的学习卡数量
	var giftCount;
	//已经转换的卡总量
	var transerAllCount;
	//输入的转换卡数量
	var editTransferNum;
	//默认type
	var type = 2;
	//获取可转换卡的数量
	ajaxWebPostAsyncData(groupbuystat_get, {
		"page": 1,
		"uid": uid
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj;
			transerCount = parseInt(Math.ceil(resdata.count / 10));
			studyCount = resdata.studytotal;
			giftCount = resdata.gifttotal;
			transerAllCount = parseInt(studyCount) + parseInt(giftCount);
			$('.gift .promp-num').html(transerCount - transerAllCount);
			$('.study .promp-num').html(transerCount - transerAllCount);
		}
	}, 'json');
	
	//礼品卡和学习卡切换

	function tabChange(a, b, c){
		$(a).click(function(){
			$(b).show();
			$(c).hide();
			$(this).addClass('current');
			$(this).siblings().removeClass('current');
		})
	};
	tabChange('.choose span:eq(0)', '.study', '.gift');
	tabChange('.choose span:eq(1)', '.gift', '.study');


	//获取显示的转卡数量
	$('#new-transfercard-reserve').click(function(){
		
		//判断点击提交后获取的是哪种卡
		if($('.gift').attr('display') != 'none'){
			transferNum = parseInt($('.gift').find('input').val());
			transerSave(2);
		}else{
			transferNum = parseInt($('.study').find('input').val());
			transerSave(1);
		}
		
		//提交可转换卡的数量
		function transerSave(type){
			//如果填写转换数量为0或空
			if(transferNum == '' || $.trim(transferNum) == 0){
				$.jBox.tip("请填写正确数量的数量!", "error");
				return;
			}else{
				//填写卡数量大于拥有卡数量
				if(transferNum > parseInt(transerCount)){
					$.jBox.tip("您的卡余量不足!", "error");
					return;
				}
				//填写卡数量超过50
				if(transferNum > 50){
					$.jBox.tip("输入数量大于50张!", "error");
					return;
				}
			};
			ajaxWebPostAsyncData(groupbuychange, {
				"uid": uid,
				"count": transferNum,
				"type": type
			}, false, function(data) {
				if(data.code == "40000") {
					var resdata = data.resobj;
					$.jBox.tip("转换成功!" + data.info, "success");
					//清空输入框
					$('.study input').val('');
					$('.gift input').val('');

					transerCount = Math.ceil(resdata.count / 10);
					studyCount = resdata.studytotal;
					giftCount = resdata.gifttotal;
					transerAllCount = parseInt(studyCount) + parseInt(giftCount);
					$('.gift .promp-num').html(transerCount - transerAllCount);
					$('.study .promp-num').html(transerCount - transerAllCount);
				}else{
					$.jBox.tip("转换失败!" + data.info, "error");
				}
			}, 'json');
		}

	});

});