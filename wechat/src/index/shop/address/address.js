/*
*** author: 李思远;
*** date: 2017-05-10;
*/
$(function(){
	"use strict";
	//获取地址列表
	var uid = getCookie("cookie_brsy_h5_uid");

	ajaxPostAsyncData(https_domain + '/useraddress/list', {
		"uid": uid
	}, false, function(data){
		if(data.code == '40000'){
			var resobj = data.resobj;
			var _html = '';
			$.each(resobj, function(i){
				_html += '<div class="address-list" data-id=' + resobj[i].id + '>';
				_html += '<div class="address-list-container"><div class="choose_address">';
				_html += '<div class="address-user">';
				_html += '<span class="user-name">' + resobj[i].username + '</span>';
				_html += '<span class="user-sex">' + resobj[i].sex + '</span>';
				_html += '<span class="user-tel">' + resobj[i].phone + '</span>';
				_html += '</div>';
				_html += '<div class="address-address">';
				_html += '<p>';
				_html += '<span class="user-province">' + resobj[i].province + '</span>';
				_html += '<span class="user-city">' + resobj[i].city + '</span>';
				_html += '<span class="user-county">' + resobj[i].county + '</span>';
				_html += '<span class="user-street">' + resobj[i].street +'</span>';
				_html += '</p></div>';
				_html += '</div>';
				_html += '<div class="address-handle clearfix">';
				//默认地址
				if( resobj[i].first == 1 ){
					_html += '<a class="current" href="javascript:;"><i></i>默认地址</a>';
				}else {
					_html += '<a href="javascript:;"><i></i>默认地址</a>';
				}
				//_html += '<span class="address-delete fr"><i></i>删除</span>';
				_html += '<span class="address-edit fr"><i></i>编辑</span>';
				_html += '</div>';
				_html += '</div>';
				_html += '</div>';
				//如果没有默认地址
				if($.inArray('1', resobj[i].first) == -1){
					var defaultId = resobj[0].id;
					var defaultUsername = resobj[0].username;
					var defaultSex = resobj[0].sex;
					var defaultPhone = resobj[0].phone;
					var defaultProvince = resobj[0].province;
					var defaultCity = resobj[0].city;
					var defaultCounty = resobj[0].county;
					var defaultStreet = resobj[0].street;		
					ajaxPostAsyncData(https_domain + '/useraddress/update', {
						"id" : defaultId,
						"uid": uid,
						"username": defaultUsername,
						"sex": defaultSex,
						"phone": defaultPhone,
						"province": defaultProvince,
						"city": defaultCity,
						"county": defaultCounty,
						"street": defaultStreet,
						"first": 1
					}, false, function(data){
						if(data.code == '40000'){
							setTimeout(function(){
								$('.address-list').eq(0).find('.address-handle a').addClass('current');
							}, 100);
						}
					}, 'json');
				}
			});
			$('section').append(_html);
		}else {
			$.jBox.tip(data.info, 'error');
		}
	}, 'json');
	//编辑地址
	$('.address-edit').on('click', function() {
		var _sendId = $(this).parents('.address-list').attr('data-id');
		var _sendUsername = encodeURI(encodeURI($(this).parents('.address-list').find('.user-name').html()));
		var _sendSex = encodeURI(encodeURI($(this).parents('.address-list').find('.user-sex').html()));
		var _sendTel = $(this).parents('.address-list').find('.user-tel').html();
		var _sendProvince = encodeURI(encodeURI($(this).parents('.address-list').find('.user-province').html()));
		var _sendCity = encodeURI(encodeURI($(this).parents('.address-list').find('.user-city').html()));
		var _sendCounty = encodeURI(encodeURI($(this).parents('.address-list').find('.user-county').html()));
		var _sendStreet = encodeURI(encodeURI($(this).parents('.address-list').find('.user-street').html()));
		var _sendFirst;
		if($(this).parents('.address-list').find('a').hasClass('current')){
			_sendFirst = 1;
		}else {
			_sendFirst = 0;
		}
		//跳往编辑地址
		window.location.href = '/static/wechat/src/index/shop/address/add_address/add_address.html?sendId=' + _sendId +'&sendUsername=' + _sendUsername + '&sendSex=' + _sendSex + '&sendTel=' + _sendTel + '&sendProvince=' + _sendProvince + '&sendCity=' + _sendCity + '&sendCounty=' + _sendCounty + '&sendStreet=' + _sendStreet + '&sendFirst=' + _sendFirst; 
	});



	//处理电话格式
	var userTel = document.getElementsByClassName('user-tel');
	for (let i = 0; i < userTel.length; i++) {
		userTel[i].innerHTML = userTel[i].innerHTML.substring(0,3)+" "+userTel[i].innerHTML.substring(3,7)+" "+userTel[i].innerHTML.substring(7,11);
	};

	//切换默认地址
		//如果地址列表大于1
	if($('.address-handle a').length > 1){
		$('.address-handle a').on('click', function() {
			$(this).addClass('current');
			$(this).parents('.address-list').siblings().find('.address-handle a').removeClass('current');
			var defaultId = $(this).parents('.address-list').attr('data-id');
			var defaultUsername = $(this).parents('.address-list').find('.user-name').html();
			var defaultSex = $(this).parents('.address-list').find('.user-sex').html();
			var defaultPhone = $(this).parents('.address-list').find('.user-tel').html();
			var defaultProvince = $(this).parents('.address-list').find('.user-province').html();
			var defaultCity = $(this).parents('.address-list').find('.user-city').html();
			var defaultCounty = $(this).parents('.address-list').find('.user-county').html();
			var defaultStreet = $(this).parents('.address-list').find('.user-street').html();
			//更新列表
			ajaxPostAsyncData(https_domain + '/useraddress/update', {
				"id" : defaultId,
				"uid": uid,
				"username": defaultUsername,
				"sex": defaultSex,
				"phone": defaultPhone,
				"province": defaultProvince,
				"city": defaultCity,
				"county": defaultCounty,
				"street": defaultStreet,
				"first": 1
			}, false, function(data){
				if(data.code == '40000'){
					
				}
			}, 'json');
		});
	}else {
		$('.address-handle a').off('click');
	}

	//删除地址
	$('.address-delete').on('click', function(){
		
		//获取删除元素id
		var id = $(this).parents('.address-list').attr('data-id');
		var that = this;
		//列表数大于1
		if($('.address-list').length > 1){
			//如果删除的是默认地址
			if($(this).prev('a').hasClass('current')){
				//下一个紧邻地址变成默认地址
				$(this).parents('.address-list').next('.address-list').find('.address-handle a').addClass('current');
				//删除地址
				ajaxPostAsyncData(https_domain + '/useraddress/delete', {
					"id": id,
					"uid": uid
				}, false, function(data){
					if(data.code == '40000'){
						$.jBox.tip('删除成功', 'success');
						$(that).parents('.address-list').remove();
					}else {
						$.jBox.tip('删除失败' + data.info, 'error');
					}
				}, 'json');
				//查询列表
				ajaxPostAsyncData(https_domain + '/useraddress/list', {
					"uid": uid
				}, false, function(data){
					if(data.code == '40000'){
						var resobj = data.resobj[0];
						var [defaultId, defaultUsername, defaultSex, defaultPhone, defaultProvince, defaultCity, defaultCounty, defaultStreet] = [resobj.id, resobj.username, resobj.sex, resobj.phone, resobj.province, resobj.city, resobj.county, resobj.street];
						//更新列表
						ajaxPostAsyncData(https_domain + '/useraddress/update', {
							"id" : defaultId,
							"uid": uid,
							"username": defaultUsername,
							"sex": defaultSex,
							"phone": defaultPhone,
							"province": defaultProvince,
							"city": defaultCity,
							"county": defaultCounty,
							"street": defaultStreet,
							"first": 1
						}, false, function(data){
							if(data.code == '40000'){
								
								
							}
						}, 'json');
					}
				}, 'json');
			}else{
				//如果删除的不是默认地址
				ajaxPostAsyncData(https_domain + '/useraddress/delete', {
					"id": id,
					"uid": uid
				}, false, function(data){
					if(data.code == '40000'){
						$.jBox.tip('删除成功', 'success');
						$(that).parents('.address-list').remove();
					}else {
						$.jBox.tip('删除失败' + data.info, 'error');
					}
				}, 'json');
			}
		}else {
			//只有一条地址
			ajaxPostAsyncData(https_domain + '/useraddress/delete', {
				"id": id,
				"uid": uid
			}, false, function(data){
				if(data.code == '40000'){
					$.jBox.tip('删除成功', 'success');
					$(that).parents('.address-list').remove();
				}else {
					$.jBox.tip('删除失败' + data.info, 'error');
				}
			}, 'json');
		}
		
	});

	//添加地址
	$(document).on('click', '#add-address', function(){
		window.location.href = '/static/wechat/src/index/shop/address/add_address/add_address.html';
	});
})
//选择收货地址

$(document).on('click', '.choose_address', function(e){
	var addressid=$(this).parents('.address-list').attr('data-id');
	var name=$(this).find('.user-name').html();
	var phone=$(this).find('.user-tel').html();
	var address=$(this).find('.address-address').text();
	var from=getCookie("from");
	if(from=='shop'){
		window.location.href = '/static/wechat/src/index/shop/indent_handle/indent_submit/indent_submit.html?addressid='+addressid+'&name='+name+"&phone="+phone+"&address="+address;
	}else if(from=='market'){
		window.location.href = '/static/wechat/src/index/shop/superBuy/super_indent/super_indent.html?addressid='+addressid+'&name='+name+"&phone="+phone+"&address="+address;
	}
	else{
		window.location.href = '/static/wechat/src/index/shop/lightingBuy/indent_submit/indent_submit.html?addressid='+addressid+'&name='+name+"&phone="+phone+"&address="+address;
	}
	//deleteCookie('from');
	setCookie('from', 'light', 7);
});