/*
*** author: 李思远;
*** date: 2017-05-12;
*/
$(function(){
	"use strict";
	var strAddress,
		province,
		city,
		county;
	var type = 1;
	//防止重复点击
	var repeatFlag = true;
	//城市选择初始化
	var area = new LArea();
    area.init({
        'trigger': '#city', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
        'valueTo': '#city-value', //选择完毕后id属性输出到该位置
        'keys': {
            id: 'id',
            name: 'name'
        }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
        'type': 1, //数据源类型
        'displayType': 1, //3列
        'data': LAreaData, //数据源
        'onSuccess':function(value,triggerValue){
        	
   		}
	});

	var uid = getCookie("cookie_brsy_h5_uid");

	//切换性别
	$('.add-address-sex a').click(function() {
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
	});
	//设置默认地址
	$('.set-default-address i').click(function() {
		$(this).toggleClass('current');
		$(this).hasClass('current') ? type = 1 : type = 0;
	});
	



	//获取编辑id
	var receiveId = getQueryString("sendId");
	if( receiveId != null ){
		//分别获取编辑地址的值
		var receiveUsername = getQueryString("sendUsername");
		var receiveSex = getQueryString("sendSex");
		var receiveTel = getQueryString("sendTel");
		var receiveProvince = getQueryString("sendProvince");
		var receiveCity = getQueryString("sendCity");
		var receiveCounty = getQueryString("sendCounty");
		var receiveStreet= getQueryString("sendStreet");
		var receiveFirst= getQueryString("sendFirst");
		//赋值 
		document.getElementById('receiver-man').value = decodeURI(receiveUsername, 'UTF-8');
		if(decodeURI(receiveSex, 'UTF-8') == '先生'){

		}else {
			$('.add-address-sex a').removeClass('current');
			$('.add-address-sex a').eq(1).addClass('current');
		}
		//去除电话号码中间的空格
		$('#receiver-tel').val(receiveTel.replace(/\s/g,''));
		$('#city').val(decodeURI(receiveProvince, 'UTF-8') + ',' + decodeURI(receiveCity, 'UTF-8') + ',' + decodeURI(receiveCounty, 'UTF-8'));
		$('.add-address-street textarea').val(decodeURI(receiveStreet, 'UTF-8'));
		if(receiveFirst == 0){
			$('.set-default-address i').removeClass('current');
		}
		//循环列表，是否强行设为默认地址
		ajaxPostAsyncData(https_domain + '/useraddress/list', {
			"uid": uid
		}, false, function(data){
			//success
			if(data.code == '40000'){
				
				if(data.resobj.length == 1){
					$('.set-default-address i').off('click');
				}
			}else{
			//error
				$.jBox.tip(data.info, 'error');
			}
		}, 'json');
	}else {
		//循环列表，是否强行设为默认地址
		ajaxPostAsyncData(https_domain + '/useraddress/list', { 
			"uid": uid
		}, false, function(data){
			//success
			if(data.code == '40000'){
				
				if(data.resobj.length < 1){
					$('.set-default-address i').off('click');
				}
			}else{
			//error
				$.jBox.tip(data.info, 'error');
			}
		}, 'json');
	}
	
	
	//保存收货地址
	$('.save-address button').click(function(){

		//处理所选择的地区
		strAddress = $('#city').val().split(',');
		//解构赋值
		[province, city, county] = strAddress;
    	( county == undefined ) ?  county = ' ' : county = county;

    	
		//收货人姓名
		var username = $.trim(document.getElementById('receiver-man').value);
		//性别
		var usersex = $('.add-address-sex .current').attr('data-sex');
		//电话
		var usertel = $.trim(document.getElementById('receiver-tel').value);
		//街道
		var street = $.trim($('.add-address-street textarea').val());
		
		//电话正则
		var regu = /^1[3|4|5|8|6|7][0-9]\d{8}$/;
		var re = new RegExp(regu);
		if ( username == '' || username == null ) {
			$.jBox.tip('请输入收货人姓名', 'error');
			return false
		}else if ( usertel == '' || usertel == null || usertel.length != 11 || !re.test(usertel) ) {
			$.jBox.tip('请输入正确联系电话', 'error');
			return false
		}else if ( province == undefined ) {
			$.jBox.tip('请选择所在地区', 'error');
			return false
		}else if ( street == '' || street == null || street.length < 5 || street.length > 50 || !isNaN(street) ){
			$.jBox.tip('请输入正确详细地址', 'error');
			return false
		}else {
			if (repeatFlag) {
				repeatFlag = false;

				if(receiveId != null){
					//更新收货地址
					ajaxPostAsyncData(https_domain + '/useraddress/update', {
						"id": receiveId,
						"uid": uid,
						"username": username,
						"sex": usersex,
						"phone": usertel,
						"province": province,
						"city": city,
						"county": county,
						"street": street,
						"first": type//1默认地址
					}, false, function(data) {
						if(data.code == '40000'){
						//success
							$('.save-address input').attr('disabled','disabled');
							$.jBox.tip('设置成功', 'success');
							setTimeout(function(){
								window.location.href = '/static/wechat/src/index/shop/address/address.html'
							},1000);
						}else{
						//error
							$.jBox.tip('设置失败'+ data.info, 'error');
							repeatFlag = true;
						}
					}, 'json')
				}else {
					//设置此地址为默认地址
					ajaxPostAsyncData(https_domain + '/useraddress/save', {
						"uid": uid,
						"username": username,
						"sex": usersex,
						"phone": usertel,
						"province": province,
						"city": city,
						"county": county,
						"street": street,
						"first": type//1默认地址
					}, false, function(data){
						//success
						if(data.code == '40000'){
							$.jBox.tip('设置成功', 'success');
							$('.save-address input').attr('disabled','disabled');
							setTimeout(function(){
								window.location.href = '/static/wechat/src/index/shop/address/address.html'
							},1000);
						}else{
						//error
							$.jBox.tip('设置失败'+ data.info, 'error');
							repeatFlag = true;
						}
					}, 'json');
				}
			}else {
				return false;
			}
		}
	});
})