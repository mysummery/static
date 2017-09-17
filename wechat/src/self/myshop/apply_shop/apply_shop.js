/**
***
*** lsy date by 2017/07/26
***
*/
"use strict";
//uid
const uid = getCookie('cookie_brsy_h5_uid');
//token
const token = getCookie('cookie_brsy_h5_token');
//account
const account = getCookie('cookie_brsy_h5_account');
//声明用户名
let name;
//声明vip会员
let vipState;
//声明用户团购等级
let groupLevel;
//需要支付钱数
let needPayMoney;
//现金券钱
let microusercost;
//服务费
let microuserServiceCharge;
//押金
let microuserDepostit;
//防止弱网重复点击flag
let repeatFlag = true;
//电话正则
const regTel = new RegExp(/^1[3|4|5|8|6|7][0-9]\d{8}$/);

//获取用户信息(姓名&电话)  
ajaxPostAsyncData(slectInfoByUid, {
	"uid": uid,
	"type": 1
}, false, function(data) {
	if (data.code == '40000') {
		//判断用户是否经过验证
		if (data.resobj.authstate != '2') {
			$.jBox.tip('需要实名认证，请前往APP进行认证', 'info');
			//返回商城首页
			setTimeout(function() {
				window.location.href = '/static/wechat/src/index/shop/shop_index/shop_index.html';
			}, 1500);
			return false;
		}else {
			name = data.resobj.idcardname;
			//vip
			vipState = data.resobj.vipstate;
			//团购等级
			groupLevel = data.resobj.groupbuylevel;
			//姓名不可修改
			document.getElementById('edit-name').value = name;
			//手机号可以修改
			document.getElementById('edit-tel').value = data.resobj.account;
			//非6.5W以上用户交押金
			if (groupLevel != '3' && groupLevel != '4') {
				document.getElementById('apply-apply').getElementsByTagName('span')[1].getElementsByTagName('em')[0].style.display = 'inline';
			}
			
		}
		
	}else {
		$.jBox.tip(data.info, 'error');
	}
}, 'json');

//获取申请钱数
ajaxPostAsyncData(getMonery, {
	"uid": uid
}, false, function(data) {
	if (data.code == '40000') {

		microusercost =  parseInt(data.resobj.microusercost);
		microuserDepostit = parseInt(data.resobj.microuserDepostit);
		microuserServiceCharge = parseInt(data.resobj.microuserServiceCharge);

		microuserDepostit = isNaN(microuserDepostit) ? 0 : microuserDepostit;
		microuserServiceCharge = isNaN(microuserServiceCharge) ? 0 : microuserServiceCharge;
		//需要金额 = 应付金额 + 押金 + 服务费
		needPayMoney = microusercost + microuserDepostit + microuserServiceCharge;

		document.querySelector('.microusercost').innerHTML = microusercost;
		document.querySelector('.microuserDepostit').innerHTML = microuserDepostit;
		document.querySelector('.microuserServiceCharge').innerHTML = microuserServiceCharge;
		document.getElementById('apply-apply').getElementsByTagName('span')[0].innerHTML = needPayMoney;
	}else {
		$.jBox.tip(data.info, 'error');
	}
}, 'json');

//初始化地区选择插件
var area = new LArea();
area.init({
    'trigger': '#address', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
    'valueTo': '#address-value', //选择完毕后id属性输出到该位置
    'keys': {
        id: 'id',
        name: 'name'
    }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
    'type': 1, //数据源类型
    'displayType': 1, //3列
    'data': LAreaData, //数据源
    'onSuccess':function(value,triggerValue){
		// console.log(this.trigger);
        // console.log('value',value);
  	    // console.log('triggerValue',triggerValue);
	}
});

//切换同意协议状态
const agreeDiv = document.getElementById('agree-agreement');

agreeDiv.getElementsByTagName('i')[0].onclick = function () {
	if (this.className == 'active') {
		this.className = '';
	}else {
		this.className = 'active';
	}
}

//点击申请
document.getElementById('apply-btn').onclick = () => {
	if (repeatFlag) {
		// 只允许vip以上用户申请
		// if (vipState != '2') {
		// 	$.jBox.tip('您还不是VIP，无法申请店主', 'info');
		// 	return false;
		// }

		//暂时只允许6.5W以上申请
		if (groupLevel != 3 && groupLevel != 4) {
			$.jBox.tip('高级合伙人及以上级别的团购商，才能申请小微店！', 'info');
			setTimeout(function() {
				window.location.href = '/static/wechat/src/index/shop/shop_index/shop_index.html';
			}, 1500);
			return false;
		}

		//判断是否同意协议
		if (agreeDiv.getElementsByTagName('i')[0].className != 'active') {
			$.jBox.tip('未同意协议无法申请店主', 'info');
			return false;
		}
		
		//电话
		const phone = document.getElementById('edit-tel').value;
		//地址
		const address = document.getElementById('address').value;
		//街道
		const street = document.getElementById('edit-street').value;
		
		if (name == '' || name == 'undefined') {
			$.jBox.tip('用户名不能为空', 'info');
			return false;
		}else if (phone == '' || phone == 'null' || phone == 'undefined' || phone.length != 11 || !regTel.test(phone)) {
			$.jBox.tip('请填写正确的电话', 'info');
			return false;
		}else if (address == '' || address == 'null' || address == 'undefined') {
			$.jBox.tip('请选择店铺地址', 'info');
			return false;
		}else if (street == '' || street == 'null' || street == 'undefined' || street.length < 5 || street.length > 60) {
			$.jBox.tip('请按规定输入街道地址', 'info');
			return false;
		}else {
			repeatFlag = false;
			//验证全部通过
			// 解构赋值 省，市，县
				//通过，截取地址
			const strAddress = address.split(',');
				//声明省，市，县
			let province,
				city,
				county;

			[province, city, county] = strAddress;		  
			//没有县的情况赋值为空
			county = (county == undefined) ? ' ' : county;
			
			//提交订单
			ajaxPostAsyncData(orderSave, {
				"uid": uid,
				"total": needPayMoney,
				"type": 6,
				"phone": phone,
				"province": province,
				"city": city,
				"county": county,
				"street": street
			}, false, function(data) {
				if (data.code == '40000') {
					let orderid = data.resobj.id;
					//修改钱数
					const price = needPayMoney;
					window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + token + "&from=myshop"+"&orderid=" + orderid+ "&price=" + price;
				}else {
					$.jBox.tip(data.info, 'error');
					repeatFlag = true;
				}
			}, 'json');

		}
	}else {
		return false;
	}
	
}