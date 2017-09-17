var uid = getCookie("cookie_brsy_h5_uid");
var page = 1;

//获取第一页的数据
$(function(){
	getList(page,uid);
	loaded();
})

//上拉加载
function getdataafter() {
	page++;
	getList(page,uid);
}

//获取专栏列表
function getList(page,uid) {
	ajaxPostAsyncData(newsubjectlist, {
		"page": page,
		"uid":uid
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			if(resdata.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			var htmlStr = "";
			for(var i = 0; i < resdata.length; i++) {
				
				htmlStr+= "<li>";
				htmlStr+="<a href='/static/wechat/src/index/special/special_liyang.html?id="+resdata[i].id+"'>";//传专栏id跳转至专栏详情页
				htmlStr+="<div class='p clearfix'>";
				htmlStr+="<p class='special_img fl'><img src='"+resdata[i].pctopimgurl+"'></p>";//专栏图片
				htmlStr+="<dl class='fl'>"	;
				htmlStr+='<dd class="top clearfix">';
				htmlStr+='<span class="video_name fl">'+resdata[i].subname+'</span>';//专栏名
				//htmlStr+='<span class="fr more"></span>';
				htmlStr+='</dd>';
				htmlStr+='<dd class="middle clearfix">'	;	
				htmlStr+='<span class="video_des fl">'+resdata[i].intro+'</span>';//专栏介绍
				htmlStr+='</dd>';
				htmlStr+='<dd class="bottom clearfix">';
				
				//已订阅显示已订阅，未订阅显示价格
				if (resdata[i].state=="0") {
					htmlStr+='<span class="video_time">￥'+resdata[i].price+'/年</span>';//专栏价格
				}
				if (resdata[i].state=="1") {
					htmlStr+='<span class="subscribed">已订阅</span>';
				}
				htmlStr+='</dd>';
				htmlStr+='</dl>';
				htmlStr+='</div>';
				htmlStr+="</a>";
				htmlStr+='</li>';		
			}
			$("#subject_table").append(htmlStr);
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
}
