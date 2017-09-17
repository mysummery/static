/****
*** author：李思远
***	date：2017-04-17
***/
$(function(){

	$(".groupbuy").addClass("current");
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
			$('#giftcard').find('input').val('');
			$('#studycard').find('input').val('');
		})
	};
	tabChange('.choose span:eq(0)', '.gift', '.study');
	tabChange('.choose span:eq(1)', '.study', '.gift');


	//获取显示的转卡数量
	$('#new-transfercard-reserve').click(function(){
		
		//判断点击提交后获取的是哪种卡
		if($('#giftcard').css('display') != 'none'){
			transferNum = parseInt($('#giftcard').find('input').val());
			transerSave(2);
			return;
		}
		if($('#studycard').css('display') != 'none'){
			transferNum = parseInt($('#studycard').find('input').val());
			transerSave(1);
			return;
		}
		
		//提交可转换卡的数量
		function transerSave(type){
			//如果填写转换数量为0或空
			if(transferNum == '' || $.trim(transferNum) == 0 || isNaN(transferNum)){
				$.jBox.tip("请填写正确数量的数量!", "error");
				return false;
			}else if(transferNum > parseInt(transerCount)){
				//填写卡数量大于拥有卡数量
				$.jBox.tip("您的卡余量不足!", "error");
				return false;
			}else if(transferNum > 50){
				//填写卡数量超过50
				$.jBox.tip("输入数量大于50张!", "error");
				return false;
			}else{
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
						setTimeout(function(){
								window.location.href = '/static/pc/src/self/groupbuy/new_groupbuy.html';
							}
						,1000);

					}else{
						$.jBox.tip("转换失败!" + data.info, "error");
					}
				}, 'json');
			}
			
		}

	});

});
