var orderId=getQueryString('orderid');
var uid = getCookie('cookie_brsy_h5_uid');
ajaxPostAsyncData(slectInfoByUid, {
						"uid": uid,
						"type": "1"
					}, false, function(data) {
						if(data.code == "40000") {
							window.token = data.resobj.token;
							window.beicode = data.resobj.parentcode;
							window.mycode = data.resobj.usercode;
							//localStorage.clear();
							//window.location.href = "/static/wechat/src/index/shop/indent_handle/indent_pay/indent_pay.html?orderid=" + orderid + "&price=" + price + "&token=" + token;
						}
					}, 'json');
ajaxPostAsyncData_share(followOrder, {
		"token":token,
		"uid":uid,
		"orderId": orderId,
	}, false, function(data1) {
		if($.trim(data1.code) == "40000") {
			var num= data1.resobj.expressNo;//单号
			var com= data1.resobj.expressCom;//公司
			$('.company').html(com+'快递');
			$('.number').html(num);
			var rows = data1.resobj.express.data;
			var htmlStr = "";
			$.each(rows, function(index, value) {
				htmlStr+="<li class=\"timeline-item\">";
				htmlStr+="<div class=\"timeline-item-head\">";
				htmlStr+="<i class=\"weui_icon weui_icon_success_no_circle timeline-item-checked hide\">";
				if(index==0){
					htmlStr+="<i class=\"weui_icon weui_icon_success_no_circle timeline-item-checked timeline-item-checked1\"></i>";
				}
				htmlStr+="</i>";
				htmlStr+="</div>";
				htmlStr+="<div class=\"timeline-item-tail\"></div>";
				htmlStr+="<div class=\"timeline-item-content\">";
				htmlStr+="<h4>"+rows[index].context+"</h4>";
				htmlStr+="<p>"+rows[index].time+"</p>";
				htmlStr+="</div>";
				htmlStr+="</li>";
			})
			}
		$('.list ul').html(htmlStr);
		},'json')
