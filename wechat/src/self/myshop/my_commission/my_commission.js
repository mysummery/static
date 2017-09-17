var uid = getCookie("cookie_brsy_h5_uid");
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

//获取佣金列表
function getList(page, uid) {
	ajaxPostAsyncData(commissionList, {
		"page": page,
		"uid": uid
	}, false, function(data) {
		if(data.code = "40000") {
			var resdata = data.resobj.rows;
			if(resdata.length == 0) {
				$('.main').html('<div class="indent-sublist-no"><img src="/static/wechat/assets/images/no_list.png"/><p>暂无佣金记录</p></div>')
				$('#scroller-pullUp').hide();
			} else {
				//少于十条隐藏上拉
				if(resdata.length < 10) {
					$('#scroller-pullUp').hide();
				} else {
					$('#scroller-pullUp').show();
				}
				var htmlStr = "";
				for(var i = 0; i < resdata.length; i++) {
					htmlStr += '<div class="commission">';
					htmlStr += '<div class="wid">';
					htmlStr += '<div class="goodsname">';
					htmlStr += '<span class="name fl">' + resdata[i].goodsname + '</span>';
					//判断转入状态，0未转入，1已转入，2已对冲
					if(resdata[i].status == "2") {
						htmlStr += '<span class="deduct fr">-' + resdata[i].money + '元</span>';
					} else if(resdata[i].status == "1" || resdata[i].status == "0") {
						
						htmlStr += '<span class="add fr">+' + resdata[i].money + '元</span>';
					}

					htmlStr += '<div class="time fr">';
					if(resdata[i].status == "0") {
						htmlStr += '<span class="fl blue">待转入</span>';
					} else if(resdata[i].status == "1") {
						htmlStr += '<span class="fl">已转入</span>';
					} else {
						htmlStr += '<span class="fl">退款扣除佣金</span>';
					}
					
					htmlStr += '<span class="fr">' + resdata[i].createtime + '</span>';
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