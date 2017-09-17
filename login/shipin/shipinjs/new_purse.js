$(function() {
	var uid = getCookie('cookie_brsy_pc_uid');
	var account = getCookie('cookie_brsy_pc_account');
	
	$(".purse").addClass("current");
	//查看所有记录
	var page = 1;
	var type = "2,3,4,6,7";
	$("#allRecord").addClass("on");
	$("#allRecord").click(function() {
		allrecord(page, uid, type);
	})

	function allrecord(a, b, c) {
		$("#tittle-more").show();
		$("#tittle-income").hide();
		ajaxWebPostAsyncData(selectSJiluByRyidAllType, {
			"page": a,
			"uid": b,
			type: c
		}, false, function(data) {
			if(data.code == "40000") {
				console.log(data);
				var currentPageSize = data.resobj.currentPageSize;
				var page = data.resobj.page;
				var resdata = data.resobj.rows;
				var total = data.resobj.result;
				if(total) {
					$(".total").show();
				} else {
					$(".total").hide();
				}
				$(".pager").html("");
				$(".box-cont ul").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if(page == 1) {
					$(".page .one").addClass("end");
				} else {
					$(".page .one").removeClass("end");
				}

				if(resdata.length % currentPageSize > 0) {
					$(".page .two").addClass("end");

				}
				if (resdata.length==0){
						$(".page .two").addClass("end");
					}
			
				$.each(resdata, function(index, value) {

					var type = resdata[index].type;

					if(type == "2") {
						type = "转入";
						state = "收账成功"
					} else if(type == "3") {
						type = "提现";
						var state = resdata[index].state;
						if(state == "1") {
							state = "审核中";
							reason = "审核中";
						} else if(state == "2") {
							state = "审核不通过";

						} else if(state == "3") {
							state = "审核通过";
							reason = "审核通过";
						}
					} else if(type == "4") {
						type = "转出"
						state = "转账成功"
					} else if(type == "6") {
						type = "充值";
						state = "充值成功"
					} else if(type == "7") {
						type = "充值";
						state = "充值成功"
					}
					$(".box-cont ul").append('<li><div class="bigbox"><span class="time">' + resdata[index].createtime + '</span><span class="account">' + account + '</span><span class="action">' + type + '</span><span class="sum">' + resdata[index].money + '</span><span class="status">' + state + '</span><span class="mess">详情<b></b></span></div><div class="mess-box" style="display:none;"><p>' + resdata[index].content + '</p></div></li>')
				})
				$(".box-cont .bigbox").on("click", ".mess", function() {
					$(this).parent('.bigbox').siblings('.mess-box').toggle();
				})
				$(".pager>li").eq(0).on("click", "a", function() {
					// 如果是第一页
					if(page == 1) {

						return;
					}
					$(".page .one").removeClass("end");
					page--;
					allrecord(page, uid, type);
				})
				$(".pager>li").eq(1).on("click", "a", function() {

					if(resdata.length % currentPageSize > 0) {

						return;
					}
					if(resdata.length!=0 &&　resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						page++;

						allrecord(page, uid, type);
					}
				})
			}
		}, 'json')

	}
	allrecord(page, uid, type);
})

$(function() {

	var uid = getCookie('cookie_brsy_pc_uid');
	var account = getCookie('cookie_brsy_pc_account');
	//	显示账户余额
	ajaxWebPostAsyncData(slectInfoByUid, {
		"type": 1,
		"uid": uid
	}, false, function(data) {
		if(data.code == "40000") {
			var resdata = data.resobj;
			$(".bal_num").html(resdata.money);
			var usertype = resdata.usertype;
			var parentcode = resdata.parentcode;
			$(".tzchongzhi").click(function() {
				if(usertype == 1) {
					window.location.href = "new_recharge.html?usertype=" + usertype + "&parentcode=" + parentcode + "";
				}
			})
		}
	}, 'json')
	$(".switch").click(function() {
		if($(".mess-top span").hasClass("on")) {
			$(".mess-con").hide();
			$(".mess-hide").show();
			$(".mess-top span").html("隐藏")
			$(".mess-top span").removeClass("on");
			$(".bal_n").html("****");
		} else {
			$(".mess-top span").addClass("on");
			$(".mess-con").show();
			$(".mess-hide").hide();
			$(".mess-top span").html("展开");
		}
	})

	$(".nav-record li").click(function() {
		$(this).addClass('on');
	$(this).siblings('li').removeClass('on');
		$(".total").css("color", "#ffa800");
	})

	//	收益记录
	function shouyi(a, b) {
		$("#tittle-more").hide();
		$("#tittle-income").show();
		ajaxWebPostAsyncData(selectMySShouyi, {
			"page": a,
			"uid": b
		}, false, function(data) {

			$(".box-cont ul").html("");
			if(data.code == "40000") {
				console.log(data);
				var currentPageSize = data.resobj.currentPageSize;
				var page = data.resobj.page;
				var resdata = data.resobj.rows;
				var total = data.resobj.result;
				if(total) {
					var str = "收益总计 : " + total;
					$(".total").show();
					$(".tomoney").html(str);
				}
				$(".pager").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if(page == 1) {
					$(".page .one").addClass("end");
				} else {
					$(".page .one").removeClass("end");
				}

				if(resdata.length % currentPageSize > 0) {
					$(".page .two").addClass("end");

				}
				if (resdata.length==0){
						$(".page .two").addClass("end");
					}
			
				$.each(resdata, function(index, value) {
					var username = resdata[index].username
					if (username == null) {
						username =""; 
					}else if(username.length > 4) {
						username = username.substring(0,4) + '...';
					}
					
					
					$(".box-cont ul").append('<li><div class="bigbox"><span class="time">' + resdata[index].createtime + '</span><span class="account">' + account + '</span><span class="action">收益</span><span class="sum">' + resdata[index].money + '</span><span class="status"></span><span class="mess">'+username+'</span></div></li>')
				})
				
				$(".pager>li").eq(0).on("click", "a", function() {
					// 如果是第一页
					if(page == 1) {
						return;
					}
					$(".page .one").removeClass("end");
					page--;
					shouyi(page, uid);
				})
				$(".pager>li").eq(1).on("click", "a", function() {
					if(resdata.length % currentPageSize > 0) {
						return;
					}
					if(resdata.length!=0　&&　resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						page++;
						shouyi(page, uid);

					}
				})

			}
		}, 'json')
	}
	$("#gainRecord").click(function() {
			$(".box-cont ul").html("");
			var page = 1;
			shouyi(page, uid);
		})
		//	提现记录
	$("#withdrawRecord").click(function() {
		$(".box-cont ul").html("");
		var page = 1;
		tixian(page, uid);

	})

	function tixian(a, b) {
		$("#tittle-more").show();
		$("#tittle-income").hide();
		ajaxWebPostAsyncData(selectSTixian_list, {
			"page": a,
			"uid": b
		}, false, function(data) {
			$(".box-cont ul").html("");
			if(data.code == "40000") {
				var total = data.resobj.result;
				var currentPageSize = data.resobj.currentPageSize;
				var page = data.resobj.page;
				var resdata = data.resobj.rows;
				var total = data.resobj.result;
				if(total) {
					var str = "提现总计 : " + total;
					$(".total").show();
					$(".tomoney").html(str);
				}
				$(".pager").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if(page == 1) {
					$(".page .one").addClass("end");
				} else {
					$(".page .one").removeClass("end");
				}
				
				if(resdata.length % currentPageSize > 0) {
					$(".page .two").addClass("end");

				}
				if (resdata.length==0){
						$(".page .two").addClass("end");
					}
			
				$.each(resdata, function(index, value) {
					var state = resdata[index].state;
					var reason = resdata[index].reason;
					if(state == "1") {
						state = "审核中";
						reason = "审核中";
					} else if(state == "2") {
						state = "审核不通过";

					} else if(state == "3") {
						state = "审核通过";
						reason = "审核通过";
					}

					$(".box-cont ul").append('<li><div class="bigbox"><span class="time">' + resdata[index].createtime + '</span><span class="account">' + account + '</span><span class="action">提现</span><span class="sum">' + resdata[index].money + '</span><span class="status">' + state + '</span><span class="mess">详情<b></b></span></div><div class="mess-box" style="display:none;"><p>' + reason + '</p></div></li>')
				})
				$(".box-cont .bigbox").on("click", ".mess", function() {
					$(this).parent('.bigbox').siblings('.mess-box').toggle();
				})
				$(".pager>li").eq(0).on("click", "a", function() {
					// 如果是第一页
					if(page == 1) {

						return;
					}
					$(".page .one").removeClass("end");
					page--;
					tixian(page, uid);
				})
				$(".pager>li").eq(1).on("click", "a", function() {
					if(resdata.length % currentPageSize > 0) {

						return;
					}
					if(resdata.length!=0 &&　resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						page++;
						tixian(page, uid);

					}
				})

			}
		}, 'json')

	}

	//	转账记录
	$("#transferRecord").click(function() {
		$(".box-cont ul").html("");
		var page = 1;
		var type = "0";
		zhuanzhang(page, type, uid);

	})

	function zhuanzhang(a, b, c) {
		$("#tittle-more").show();
		$("#tittle-income").hide();
		ajaxWebPostAsyncData(selectTransferRecordByUid, {
			"page": a,
			"type": b,
			"uid": c
		}, false, function(data) {
			$(".box-cont ul").html("");
			if(data.code == "40000") {

				var currentPageSize = data.resobj.currentPageSize;
				var page = data.resobj.page;
				var resdata = data.resobj.rows;
				var total = data.resobj.result;
				console.log(resdata.length);
				console.log(currentPageSize);
				if(total) {
					$(".total").show();
					$(".tomoney").html(total);
				} else {
					$(".total").hide();
				}
				$(".pager").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if(page == 1) {
					$(".page .one").addClass("end");
				} else {
					$(".page .one").removeClass("end");
				}

				if(resdata.length % currentPageSize > 0) {
					$(".page .two").addClass("end");

				}
				if (resdata.length==0){
						$(".page .two").addClass("end");
					}
			
				$.each(resdata, function(index, value) {
					var money = resdata[index].money;
					var type = resdata[index].type;
					var state = "";

					if(type == "2") {
						type = "转入";
						state = "收账成功"

					} else if(type == "4") {
						type = "转出";
						state = "转账成功"
					}

					$(".box-cont ul").append('<li><div class="bigbox"><span class="time">' + resdata[index].createtime + '</span><span class="account">' + account + '</span><span class="action">' + type + '</span><span class="sum">' + resdata[index].money + '</span><span class="status">' + state + '</span><span class="mess">详情<b></b></span></div><div class="mess-box" style="display:none;"><p>' + resdata[index].content + '</p></div></li>')

				})
				$(".box-cont .bigbox").on("click", ".mess", function() {
					$(this).parent('.bigbox').siblings('.mess-box').toggle();
				})

				$(".pager>li").eq(0).on("click", "a", function() {
					var type = 0
						// 如果是第一页
					if(page == 1) {

						return;
					}
					$(".page .one").removeClass("end");
					page--;

					zhuanzhang(page, uid, type);
				})
				$(".pager>li").eq(1).on("click", "a", function() {
					var type = 0
					if(resdata.length % currentPageSize > 0) {

						return;
					}
					if(resdata.length!=0 &&　resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						var type = 0;
						page++;
						zhuanzhang(page, uid, type);
					}
				})

			}
		}, 'json')
	}
	//充值记录
	$("#rechargerRecord").click(function() {
		var page = 1;
		var type = "6,7";
		chongzhi(page, uid, type);
	});

	function chongzhi(a, b, c) {
		$("#tittle-more").show();
		$("#tittle-income").hide();
		ajaxWebPostAsyncData(selectSJiluByRyidAllType, {
			"page": a,
			"uid": b,
			type: c
		}, false, function(data) {
			$(".box-cont ul").html("");
			if(data.code == "40000") {
				var currentPageSize = data.resobj.currentPageSize;
				var page = data.resobj.page;
				var resdata = data.resobj.rows;
				var type = "6,7";
				var total = data.resobj.result;

				if(total) {
					$(".total").show();
					$(".tomoney").html(total);
				} else {
					$(".total").hide();
				}
				$(".pager").html("");
				$(".pager").append("<li><a href='javascript:;' class='one'>上一页</a></li><li><a href='javascript:;' class='two'>下一页</a></li>");
				if(page == 1) {
					$(".page .one").addClass("end");
				} else {
					$(".page .one").removeClass("end");
				}
				if(resdata.length % currentPageSize > 0) {
					$(".page .two").addClass("end");
					
				}
				if (resdata.length==0){
						$(".page .two").addClass("end");
					}
			
				$.each(resdata, function(index, value) {
					var drawstate = resdata[index].drawstate;
					if(drawstate == null || drawstate == undefined) {
						drawstate = "";
					}
					$(".box-cont ul").append('<li><div class="bigbox"><span class="time">' + resdata[index].createtime + '</span><span class="account">' + account + '</span><span class="action">充值</span><span class="sum">' + resdata[index].money + '</span><span class="status">充值成功</span><span class="mess">详情<b></b></span></div><div class="mess-box" style="display:none;"><p>' + resdata[index].content + '</p></div></li>')

				})
				$(".box-cont .bigbox").on("click", ".mess", function() {
					$(this).parent('.bigbox').siblings('.mess-box').toggle();
				})
				$(".pager>li").eq(0).on("click", "a", function() {
					// 如果是第一页
					if(page == 1) {
						return;
					}
					$(".page .one").removeClass("end");
					page--;
					chongzhi(page, uid, type);
				})
				$(".pager>li").eq(1).on("click", "a", function() {
					if(resdata.length % currentPageSize > 0) {	
					return;
					}
					if(resdata.length!=0 &&　resdata.length % currentPageSize == 0) {
						$(".page .two").removeClass("end");
						page++;

						chongzhi(page, uid, type);
					}
				})

			}
		}, 'json')
	}

})