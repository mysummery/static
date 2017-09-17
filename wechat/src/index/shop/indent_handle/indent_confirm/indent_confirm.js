/*
*** author: 李思远;
*** date: 2017-05-05;
*/
"use strict";


var numAdd = document.getElementById('indent-sub-num-add');
var	numMinus = document.getElementById('indent-sub-num-minus');
var numInput = document.getElementById('indent-sub-num-input');
//创建方法
const numHandle = {
	//增加 1
	addHandle: function() {
		numInput.value = parseInt(numInput.value) + 1
	},
	//减少 1
	minusHandle: function() {
		//当数值大于1
		if (parseInt(numInput.value) > 1) {
			numInput.value = parseInt(numInput.value) - 1
		}else {
			return false;
		}
	}
}
//点击 +
numAdd.onclick = () => {
	numHandle.addHandle();
}
//点击 -
numMinus.onclick = () => {
	numHandle.minusHandle();
}

//切换type
$('.indent-sub-type ul li, .indent-sub-invoice-content ul li').click(function() {
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});

//发票显示
$('.label-switch input').click(function(){
	$('.invoice-information-all').slideToggle(300);
});
//选择个人发票
$('.invoice-information-change a:eq(0)').click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	$('.edit-corporate-name').slideUp();
});
//选择公司发票
$('.invoice-information-change a:eq(1)').click(function(){
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	$('.edit-corporate-name').slideDown();
});
