/**
***
*** lsy date by 2017/07/25
***
*/
"use strict";
	
$(function() {
	const uid = getCookie('cookie_brsy_h5_uid');
	//仿密码输入框容器
	const inputBox = document.querySelector(".sixDigitPassword");
	//容器中的方块(i)
	const inputBoxLi = inputBox.getElementsByTagName('i');
	//获取屏幕高度赋值，改变bg-color
	document.getElementById('cancel-container').style.height = window.innerHeight + 'px';
	//input居中显示
	const halfWidth = (window.innerWidth - 306)/2;
	
	document.getElementById('payPassword_rsainput').style.left = halfWidth;
	//输入框输入时
    document.getElementById('payPassword_rsainput').onkeyup = function() {
    	
    	let that = this;
    	//input的value
		let inp_v = this.value;
		//value长度
		let inp_l = this.value.length;
		//蓝框位置
		
		if( inp_l == 6 ){
			//最后一个输入框显示
			inputBoxLi[inp_l - 1].className = 'active';
			inputBoxLi[inp_l - 1].querySelector('b').style.display = 'block';
			//最后一个输入框蓝框位置
			document.querySelector(".input-cursor").style.left = (inp_l - 1) * 51 + 'px';
			//验证输入的密码
			ajaxPostAsyncData(purse_password, {
				"uid": uid,
				"paypassword": inp_v
			}, false, function(data) {
				if (data.code == '40000') {

					$.jBox.tip('验证通过', 'info');
					//去往取消成功页面
					setTimeout(function(){
						window.location.href = '/static/wechat/src/self/myshop/cancel_shop/cancel_shop_tip.html';
					}, 1000)

				}else {
		
					$.jBox.tip(data.info, 'info');
					//验证失败清空密码
					that.value = '';
					//回复初始状态
					for (let i = 0; i < inputBoxLi.length; i++) {
						inputBoxLi[i].className = '';
						inputBoxLi[i].querySelector('b').style.display = 'none';
					}
					inputBoxLi[0].className = 'active';
					document.querySelector(".input-cursor").style.left = 0 + 'px';

				}
			});
		}else if (inp_l >= 7){

			return false;

		}else {
			// 输入长度 2--5时
			for (let i = 0; i < inputBoxLi.length; i++) {
				inputBoxLi[i].className = '';
				//显示输入之前的黑点
				if ( i < inp_l) {
					inputBoxLi[i].querySelector('b').style.display = 'block';
				}else {
					//隐藏删除之后的黑点
					inputBoxLi[i].querySelector('b').style.display = 'none';
				}
				
			}
			//当前框状态
			inputBoxLi[inp_l].className = 'active';
			document.querySelector(".input-cursor").style.left = inp_l * 51 + 'px';
		}
			
	};
	
});