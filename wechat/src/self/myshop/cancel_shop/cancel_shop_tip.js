/**
***
*** lsy date by 2017/07/25
***
*/
"use strict";
const uid = getCookie('cookie_brsy_h5_uid');
//获取屏幕高度赋值，改变bg-color
document.getElementById('cancel-container').style.height = window.innerHeight + 'px';

//确定取消微店
document.getElementById('cancel-sure').onclick = () => {
	
	ajaxPostAsyncData(cancelMicrouser, {
		"uid": uid
	}, false, function(data) {
		if(data.code == '40000') {
			$.jBox.tip('申请成功', 'success');
			//前往个人页面
			setTimeout(function(){
				window.location.href = '/static/wechat/src/self/myshop/my_shop.html';
			}, 1000);
		}else {
			$.jBox.tip(data.info, 'info');
			return false;
		}
	}, 'json');
}

//不取消微店啦

document.getElementById('cancel-cancel').onclick = () => {
	window.location.href = '/static/wechat/src/self/myshop/my_shop.html';
}