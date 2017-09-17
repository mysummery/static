/*
**
*** date: 2017/09/12 
*** author: lsy
**
*/
"use strict";

//获取积分详细来源（学习榜or团队榜）
let fromWhere = getQueryString('from');
//初始页码
let pageNum = 1;
//获取数据url
let dataUrl;
//放置数据容器（ul）
let ulWrapper = document.getElementsByTagName('ul')[0];

//获取数据函数
const dataObj = (url, page) => {
	let _html = `<li>
					<h6>下级4500团购成功${url}</h6>
					<p>2016.12.07 18:26:26</p>
					<em>+${page}</em>
				</li>`;

	ulWrapper.innerHTML += _html;
}

switch (fromWhere) {
	//来自学习榜
	case 'learn':
		dataUrl = 'learn';
	break;
	//来自团队榜
	case 'team':
		dataUrl = 'team';
	break;
}

//翻页
function getdataafter() {
	
	pageNum++;
	
	dataObj(dataUrl, pageNum);
	
	setTimeout(function() {
		myScroll.refresh()
	}, 300)
}

loaded();