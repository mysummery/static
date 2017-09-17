/*
**
*** date: 2017/09/08 
*** author: lsy
**
*/

"use strict";

//获取nav-tab
let navTab = document.getElementsByClassName('nav-item');
//学习榜，分享榜内容容器
let contentItem = document.getElementsByClassName('content-item');
//获取周榜，月榜，总榜按钮
let rankingTab = document.getElementsByClassName('ranking-tab-item');
//周榜，月榜，总榜容器
let rankingItem = document.getElementsByClassName('ranking-list-item');
//学习榜，分享榜tab切换class数组
let class1Tab = ['','content-item','active','content-item active-div'];
//周榜，月榜，总榜tab切换class数组
let class2Tab = ['','ranking-list-item','ranking-tab-active','ranking-list-item ranking-list-active'];
//积分明细入口
let integDetailsBtn = document.querySelector('.ranking-code');


//tab切换函数（参数1：tab切换按钮，参数2：tab切换内容容器，参数3：class数组[1: 还原的tab按钮className，2：还原的tab容器className，3：选中的tab按钮className，4：选中的tab容器className]）
function tabChange (wrapper, items, classes) {
	for (let i = 0; i < wrapper.length; i++) {
		//学习榜，分享榜tab点击
		wrapper[i].onclick = function () {
			for (let j = 0; j < items.length; j++) {
				//还原所有元素样式
				wrapper[j].children[0].className = classes[0];
				items[j].className = classes[1];
			}
			//设置选中的样式
			this.children[0].className = classes[2];
			items[i].className = classes[3];
		}
	}
}

tabChange(navTab, contentItem, class1Tab);
tabChange(rankingTab, rankingItem, class2Tab);

//TODO 积分明细不同页面跳转不同页面
integDetailsBtn.onclick = () => {
	//当选中的是学习榜时(链接后跟from，下一页面接受值，反显相应数据)
	if (navTab[0].children[0].className != '') {
		window.location.href = '/static/wechat/src/self/rankandhonor/rankinglist/integrationDetails/integrationDetails.html?from=learn';
	} else {
		window.location.href = '/static/wechat/src/self/rankandhonor/rankinglist/integrationDetails/integrationDetails.html?from=team';
	}
}

