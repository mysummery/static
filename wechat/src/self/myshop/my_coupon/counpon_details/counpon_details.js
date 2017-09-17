var uid = getCookie("cookie_brsy_h5_uid");
var token = getCookie("cookie_brsy_h5_token");
//var uid = "7e088b4c2c7000";
var page = 1;

//获取第一页的数据
$(function() {
	getList(page, uid);
	loaded();
})

//上拉加载
function getdataafter() {
	page++;
	getList(page, uid);
}



function getList(page, uid) {
	ajaxPostAsyncData(couponList, {
		"page": page,
		"uid": uid,
		"token":token
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			if(resdata.length == 0) {
				$('.main').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无现金券明细</p></div>')
				$('#scroller-pullUp').hide();
			} else {
			//不足10条隐藏上拉
			if(resdata.length < 10) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			var htmlStr = "";
			for(var i = 0; i < resdata.length; i++) {

				htmlStr += '<div class="counpon">';
				htmlStr += '<div class="wid">';
				htmlStr += '<div class="goodsname">';
				htmlStr += '<span class="name fl">'+resdata[i].name+'</span>';
				//现金券用途，1购物2转入余额（已废弃）3退款
				if (resdata[i].type == "1"){
					htmlStr += '<span class="deduct fr">-'+resdata[i].usemoney+'元</span>';
					htmlStr += '<div class="time fr">';
					htmlStr += '<span class="fl">购物</span>';
				}else {
					htmlStr += '<span class="add fr">+'+resdata[i].usemoney+'元</span>';
					htmlStr += '<div class="time fr">';
					htmlStr += '<span class="fl">退款</span>';
				}
				//对账时间不允许修改
				htmlStr += '<span class="fr">'+resdata[i].createtime+'</span>';
				htmlStr += '</div>';
				htmlStr += '</div>'; 
				htmlStr += '</div>';
				htmlStr += '</div>';
			}
			$(".main").append(htmlStr);
			}
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
}