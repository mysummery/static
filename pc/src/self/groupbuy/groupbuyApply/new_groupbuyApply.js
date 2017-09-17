/**** 
*** author：李思远
***	date：2017-04-18
***/

$(function(){
	$(".groupbuy").addClass("current");
	var uid = getCookie('cookie_brsy_pc_uid');
	var account = getCookie('cookie_brsy_pc_account');
	var username = getCookie('cookie_brsy_pc_name');
	$('#apply-username').val(decodeURI(username, "utf-8"));
	$('#apply-tel').val(account);
	//级别分级：1，2，3，4，99
	var level;
	var name;
	var tel;
	//电话正则
	var regTel = new RegExp(/^1[3|4|5|8|7][0-9]\d{4,8}$/);
	//获取填写的数量
	var count;
	//平台vip帐号
	$('.vip input').val(account);
	$('.level i').click(function(){
		$('.level i').removeClass('groupbuyApply-current');
		$(this).addClass('groupbuyApply-current');
		//自定义数量隐藏与清空
		$('.custom').hide();
		$('.custom input').val('');
	});
	$('.level i:eq(-1)').click(function(){
		//自定义数量显示
		$('.custom').show();
	});



	$('#new-groupbuyApply-reserve').click(function(){
		level = $('.groupbuyApply-current').attr('data-level');
		//根据level级别获取不同的count
		if(level == '1'){
			count = 39;
		}else if (level == '2') {
			count = 250;
		}else if (level == '3') {
			count = 738;
		}else if (level == '4') {
			count = 2250;
		}else if (level == '99') {
			count = $('.custom input').val();
		}

		name = $('.name input').val();
		tel = $('.tel input').val();
		
		//姓名
		if(name == '' || name == null){
			$.jBox.tip("请填写正确的姓名!", "error");
			return false;
		}else if(!regTel.test(tel) || tel == '' || tel.length != 11){
			//联系电话
			$.jBox.tip("请填写正确的联系电话!", "error");
			return false;
		}else if(!$('#checkbox-1').is(':checked')){
			//同意条款
			$.jBox.tip("请同意李强365《团购服务条款》!", "error");
			return false;
		}else {
			if($('.custom').css('display') != 'none'){
				if($('.custom input').val() < 39 || $('.custom input').val() > 2250 || isNaN(count)){
					$.jBox.tip("请填写正确的团购数量(39~2250之间)!", "error");
					return false;
				}else{
					ajaxWebPostAsyncData(save, {
						"uid": uid,
						"name": name,
						"level": level,
						"account": account,
						"count": count
					}, false, function(data) {
						if(data.code == "40000") {
							var resdata = data.resobj;
							$.jBox.tip("申请成功!", "success");
							//成功后清空值		
							$('.custom input').val('');
							$('.name input').val('');
							$('.tel input').val('');
							setTimeout(function(){
								window.location.href = '/static/pc/src/self/groupbuy/new_groupbuy.html';
							},1000);
						}else{
							$.jBox.tip("申请失败!" + data.info, "error");
						}
					}, 'json');
				}
			}else{
				ajaxWebPostAsyncData(save, {
					"uid": uid,
					"name": name,
					"level": level,
					"account": account,
					"count": count
				}, false, function(data) {
					if(data.code == "40000") {
						var resdata = data.resobj;
						$.jBox.tip("申请成功!", "success");
						//成功后清空值		
						$('.custom input').val('');
						$('.name input').val('');
						$('.tel input').val('');
						setTimeout(function(){
							window.location.href = '/static/pc/src/self/groupbuy/new_groupbuy.html';
						},1000);
					}else{
						$.jBox.tip("申请失败!" + data.info, "error");
					}
				}, 'json');
			}
			
		};



		
	});
	
})