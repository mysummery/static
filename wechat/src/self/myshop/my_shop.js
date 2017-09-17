function loaddata() {
	var uid = getCookie('cookie_brsy_h5_uid');
//	获取用户信息
	ajaxPostAsyncData(slectInfoByUid, {
		"uid": uid,
		"type": "1"
	}, false, function(data) {
		var rows = data.resobj;
		if(data.code == "40000") {

			var groupbuylevel = data.resobj.groupbuylevel;//团购级别
            
            if(groupbuylevel >= "3" ){
				$(".itemOne").show();//隐藏有效期
				$(".itemTwo").hide();//显示有效期
			} else {
				$(".itemOne").hide();//隐藏有效期
				$(".itemTwo").show();//显示有效期
			}

		}
	}, 'json');
	
//	获取我的微店信息
	
	ajaxPostAsyncData(commissionSum, {
		"status": "",
		"uid": uid
	}, false, function(data) {
		var rows = data.resobj;
		if(data.code == "40000") {
			var microstate = data.resobj.canclestatu;//判断微店状态
			
			
			if (microstate == "1") {
            	$(".verify").html("正在审核中");
            	$("#cancelshop").attr("href","javascript:;");
            }else {     	
				$("#cancelshop").attr("href","/static/wechat/src/self/myshop/cancel_shop/cancel_shop.html");
            }
			
			
			
			var total = data.resobj.total;//佣金总额
			total = parseFloat(total).toFixed(2);
			var beprice = parseInt(total);
			var afprice = total;
			afprice = afprice.toString().replace(/\d+\.(\d*)/, "$1");
			$(".beprice").html(beprice);
			$(".afprice").html(afprice);
			var freeze = data.resobj.freeze;//冻结金额
			freeze = parseFloat(freeze).toFixed(2);
			var thaw = data.resobj.thaw;//转入余额
			thaw = parseFloat(thaw).toFixed(2);
			$('.freeze').html(freeze);
			$('.thaw').html(thaw);
			$('.endtime').html(data.resobj.endtime);//有效期
		}
	}, 'json');
}
loaddata();