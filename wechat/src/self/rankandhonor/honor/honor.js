/*
**
*** date: 2017/09/12 
*** author: lsy
**
*/
"use strict";

//七大图片(以后可能会更多)
let items = document.querySelectorAll('.item');
//弹出框遮罩层
let cWrapper = document.getElementById('pop-wrapper');
//获取点击关闭的按钮
let closeBtn = document.getElementById('pop-close');
//弹出框内容
const jsonData = {
	"text": ['订阅李阳老师专栏', '订阅李光斗老师专栏', '订阅刘景兰老师专栏', '学习超过50个小时', '分享超过100次', '购买超过100次', '成为小微店主'],
	"honor": ['获得李阳老师专栏勋章', '获得李光斗老师专栏勋章', '获得刘景兰老师专栏徽章', '获得超级学霸徽章', '获得知识搬运工徽章', '获得购物达人徽章', '获得小微店主徽章'],
	"default": '即可获得该勋章'
};

//每个图片点击
for (let i = 0; i < items.length; i++) {
	items[i].onclick = function () {
		//弹出框内容标签
		let pop = document.querySelector('.pop');
		//弹出层打开
		cWrapper.style.display = 'block';
		//获取点击元素的图片src
		let _src = this.children[0].getAttribute('src');
		//赋值src给弹出框的图片
		pop.children[0].setAttribute('src', _src);
		//forExample: 学习超过50个小时
		pop.children[1].innerHTML = jsonData.text[i];
		//如果是点亮的图片
			//length值是字符串长度，这里是item
		if (this.className.length > 4) {
			//恭喜您
			document.querySelector('.pop-box').children[0].innerHTML = '恭喜您';
			//forExample: 获得学英语勋章
			pop.children[2].innerHTML = jsonData.honor[i];
		} else {
			//提示
			document.querySelector('.pop-box').children[0].innerHTML = '提示';
			//即可获得该勋章
			pop.children[2].innerHTML = jsonData.default;
		}
	}
}

//关闭弹出框
closeBtn.onclick = () => {
	cWrapper.style.display = 'none';
}

//遮罩层下禁止滑动屏幕
cWrapper.addEventListener('touchmove', function (ev) {
    event.preventDefault();
});

