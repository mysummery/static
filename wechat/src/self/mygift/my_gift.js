var type = 0,
	uid = getCookie('cookie_brsy_h5_uid'),
	page = 1,
	index = 1,
	total = 0;
$(function() {
	selectGiftNum(type, uid, page);
	$('.center-button').find('div').click(function() {
		$('.gift-footer').show();
		$(this).parent().find('div').attr('class', '');
		$(this).attr('class', 'on');
		if($(this).attr('code') == 0) {
				type = 0;
				page = 1;
				index = 1;
			selectGiftNum(type, uid, page);
			myScroll.refresh();
		} else {
				type = 1;
				page = 1;
				index = 1;
			selectGiftNum(type, uid, page);
			myScroll.refresh();
		}
	})
	loaded();

});

function selectGiftNum(type, uid, page) {
	//查询礼品卡数据
	var _data = {
		uid: uid,
		type: type,
		page: page
	}
	ajaxPostAsyncData(selectGiftCardByRyid, _data, false, function(data) {
		if(data.code = "40000") {
			if(data.resobj.rows.length <= 0 || data.resobj.rows.length == null) {
				$('#scroller-pullUp').hide();
				$('.gift-footer').hide();
				$('.gift-column').html('<img src="/static/wechat/assets/images/lpCard.png">');
				return;
			}
			//数据追加	
			var _html = "";
			var _htmlRight = "";
			total = data.resobj.total;
			$('.gift-footer').find('span').html(data.resobj.records);
			if(data.resobj.rows.length < 45) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}

			for(var i = 0; i < data.resobj.rows.length; i++) {
				_html += "<div class='item-gift'>" +
					"<div class='gift-item-left'>";
				if(type == 0) {
					if(index < 10) {
						_html += "<div>序号：00" + index + "</div>";
					} else if(index >= 10 && index < 100) {
						_html += "<div>序号：0" + index + "</div>";
					} else {
						_html += "<div>序号：" + index + "</div>"
					}

					_html += "</div><div class='gift-item-right'>" +
						"<div>礼品激活码：" +
						"<div class='giftNumber'><p>" + data.resobj.rows[i].code.substr(0, 8) + "</p></div></div>" +
						"</div>" +
						"</div>";

				} else {

					_html += "<div>礼品激活码：" +
						"<span class='giftNumber' style='background: #fff;    float: none;'>" + data.resobj.rows[i].code.substr(0, 8) + "</span></div>" +
						"</div>";

					if(data.resobj.rows[i].remark == null || data.resobj.rows[i].remark == "") {
						_htmlRight = "<div class='gift-item-right' style='width: 17rem;line-height: 5.3rem;'>" +
							"<p>激活账号：等待确认</p>" +
							"</div>";
					} else {
						_htmlRight = "<div class='gift-item-right' style='width: 17rem;line-height: 5.3rem;'>" +
							"<p>激活账号：" + data.resobj.rows[i].remark + "</p>" +
							"</div>";
					}
					_html += _htmlRight;
				}

				_html += "</div>";
				index++;
			}
			$('.gift-column').html(_html);
			//loaded();
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	});
};
var myScroll;
/**
 * Scroll刷新
 */
function loaded() {
	console.log('scroll刷新');
	//定义一系列变量
	var upIcon = $("#up-icon");
	var downIcon = $("#down-icon");
	//new一个iscroll对象
	myScroll = new IScroll('#wrapper', {
		probeType: 3,
		click: true,
		mouseWheel: true,
		preventDefaultException: {
			tagName: /^(INPUT|P)$/
		}

	});

	myScroll.on("scroll", function() {
		console.log('myScroll.on');
		var y = this.y; //拉的距离（负数）
		//console.log(y)
		var maxY = this.maxScrollY - y; //整个页面高度-拉的距离=整个页面高度
		//console.log(maxY)
		var downHasClass = downIcon.hasClass("reverse_icon");
		var upHasClass = upIcon.hasClass("reverse_icon");
		if(y >= 40) {
			!downHasClass && downIcon.addClass("reverse_icon");
			return "";
		} else if(y < 40 && y > 0) {
			downHasClass && downIcon.removeClass("reverse_icon");
			return "";
		}

		if(maxY >= 40) {
			!upHasClass && upIcon.addClass("reverse_icon");
			return "";
		} else if(maxY < 40 && maxY >= 0) {
			upHasClass && upIcon.removeClass("reverse_icon");
			return "";
		}
	});

	//自定义上拉刷新
	myScroll.on("slideUp", function() {
		if(this.maxScrollY - this.y > 40) {
			getdataafter(type, uid);
			upIcon.removeClass("reverse_icon");
			setTimeout(function() {
				myScroll.refresh()
			}, 300)

		}
	});
}

function getdataafter(type, uid) {
	page++;
	var _data = {
		uid: uid,
		type: type,
		page: page
	}
//	if(page > total) {
//		page = total;
//		return;
//	}
	ajaxPostAsyncData(selectGiftCardByRyid, _data, false, function(data) {
		if(data.code = "40000") {
			console.log('我加载啦');
			//数据追加	
			var _html = "";
			var _htmlRight = "";

			for(var i = 0; i < data.resobj.rows.length; i++) {

				_html += "<div class='item-gift'>" +
					"<div class='gift-item-left'>";
				if(type == 0) {
					if(index < 10) {
						_html += "<div>序号：00" + index + "</div>";
					} else if(index >= 10 && index < 100) {
						_html += "<div>序号：0" + index + "</div>";
					} else {
						_html += "<div>序号：" + index + "</div>"
					}

					_html += "</div><div class='gift-item-right'>" +
						"<div>礼品激活码：" +
						"<div class='giftNumber'><p>" + data.resobj.rows[i].code.substr(0, 8) + "</p></div></div>" +
						"</div>" +
						"</div>";

				} else {

					_html += "<div>礼品激活码：" +
						"<span class='giftNumber' style='background: #fff;    float: none;'>" + data.resobj.rows[i].code.substr(0, 8) + "</span></div>" +
						"</div>";

					if(data.resobj.rows[i].price == null || data.resobj.rows[i].price == "") {
						_htmlRight = "<div class='gift-item-right' style='width: 17rem;line-height: 5.3rem;'>" +
							"<p>激活账号：等待确认</p>" +
							"</div>";
					} else {
						_htmlRight = "<div class='gift-item-right' style='width: 17rem;line-height: 5.3rem;'>" +
							"<p>激活账号：" + data.resobj.rows[i].price + "</p>" +
							"</div>";
					}
					_html += _htmlRight;
				}

				_html += "</div>";
				index++;
			}
			$('.gift-column').append(_html);

		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	});
}