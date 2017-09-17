$(function () {
	
	$(".groupbuy").addClass("current");
})

var uid = getCookie("cookie_brsy_pc_uid");
window.ids_page='option_group';
window.page=1;
	
function loadData() {
	
	ajaxWebPostAsyncData(groupbuystat_get, {
		"uid": uid
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var count = 0;
			var cancount = 0;
			var splitcount = 0;
			var salecount = 0;
			if(data.resobj != null) {
				//console.log(data);
				count = data.resobj.count;
				cancount = data.resobj.cancount;
				splitcount = data.resobj.splitcount;
				salecount = data.resobj.salecount;
				jihuocount = data.resobj.jihuocount;
				//				jihuolv = Math.ceil(jihuolv * 10000) / 100 + '%';
				studycount = data.resobj.studycount;
				giftcount = data.resobj.giftcount;
				studytotal = data.resobj.studytotal;
				gifttotal = data.resobj.gifttotal;
			}
			$(".bal_num").html(cancount);
			$("#teamBuyCanCount").html(count);
			$("#card_count1").html(splitcount);
			$("#card_count2").html(salecount);
			$('#split_count').html(splitcount);
			$("#jihuocount").html(jihuocount);
			$('#groupbuy_count').html(count);
			$('.gift_total').html(gifttotal);
			$('.study_total').html(studytotal);
			$('.gift_surplus').html(giftcount);
			$('.study_surplus').html(studycount);
			//			展开隐藏 内容切换
			$(".switch").click(function() {
				if($(".mess-top .switch").hasClass("on")) {
					$(".mess-con").hide();
					$(".mess-hide").show();
					$(".tittle p").hide();
					$(".mess-top .switch").html("展开")
					$(".mess-top .switch").removeClass("on");
					$(".bal_n").html("****");
				} else {
					$(".mess-top .switch").addClass("on");
					$(".mess-con").show();
					$(".mess-hide").hide();
					$(".tittle p").show();
					$(".mess-top .switch").html("隐藏");
				}
			})
			setCookie("cookie_brsy_pc_teambuy_stat_count", count);
			setCookie("cookie_brsy_pc_teambuy_stat_cancount", cancount);
			setCookie("cookie_brsy_pc_teambuy_stat_splitcount", splitcount);
			setCookie("cookie_brsy_pc_teambuy_stat_salecount", salecount);
			setCookie("cookie_brsy_pc_teambuy_stat_jihuocount", jihuocount);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json')
	ajaxWebPostAsyncData(appSTeamBuyGet, {
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var htmlStr = "";
			$.each(rows, function(index, value) {
				htmlStr += "<li>";
				htmlStr += "<div>";
				htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
				htmlStr += "<span class=\"activeCode\">" + rows[index].count + "个激活码</span>";
				htmlStr += "<span class=\"money\">" + rows[index].total + "元</span>";
				htmlStr += "<span class=\"status\">";
				if(rows[index].state == 1) {
					htmlStr += "成功团购";
				} else if(rows[index].state == -2) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 0) {
					htmlStr += "待审核";
				} else if(rows[index].state == -1) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 2) {
					htmlStr += "从他人拆分";
				}
				htmlStr += "</span>";
				htmlStr += "</div></li>";
			});
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#group-record").html(htmlStr);
		var count = getCookie("cookie_brsy_pc_teambuy_stat_count");
		$("#total").html(count);
	}, 'json');
	if($("#group-record li").length >= 20) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
}
$(".option").live("click", function() {
	window.page = 1;
	$('#Previous').addClass('unable');
	//alert(page);
	$(this).addClass('hover');
	$(this).siblings('.option').removeClass('hover');
	
	//window.series = $(this).text();
	var ids = $(this).attr('id');
	window.ids_page=ids;
	if(ids == 'option_group') {
		$("#group_content").show();
		$("#group_content").siblings('.contents').hide();
		//alert($(".group-record li").length);
		if($(".group-record li").length >= 20) {
			//page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	} else if(ids == 'option_split') {
		if($('#split_content .split-record li').length == 0) {
			ajaxWebPostAsyncData(appSTeamBuySplitGet, {
				"uid": uid,
				"state": 99,
				"page": 1
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					var rows = data.resobj.rows;
					var htmlStr = "";
					$.each(rows, function(index, value) {
						var active = rows[index].jihuolv;
						var name = rows[index].username;
						name = decodeURI(name, "utf-8")
						if(name.length > 15) {
							name = name.substr(0, 15) + '...';
						}
						active = Math.ceil(active * 10000) / 100 + '%';
						htmlStr += "<li>";
						htmlStr += "<div class=\"bigbox1\">";
						htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
						htmlStr += "<span class=\"username\">" + name + "</span>";
						htmlStr += "<span class=\"account\">" + rows[index].account + "</span>";
						htmlStr += "<span class=\"activeCode\">" + rows[index].split_count + "个激活码</span>";
						htmlStr += "<span class=\"mess\">详情<b></b></span>";
						htmlStr += "</div>";
						htmlStr += "<div class=\"mess-box\">";
						htmlStr += "<p>您于" + rows[index].createtime + "给用户" + name + "，账号为" + rows[index].account + "，成功拆分" + rows[index].split_count + "个激活码。</p>";
						htmlStr += "</div>";
						htmlStr += "</li>";
					});
				} else {
					$.jBox.tip(data.info, '');
				}
				$(".split-record").html(htmlStr);
				$('#split_content').show();
				$('#split_content').siblings('.contents').hide();
				$(".bigbox1").on("click", ".mess", function() {	
	$(this).parent('.bigbox1').siblings('.mess-box').toggle().parent("li").siblings().children(".mess-box").hide();		
				})
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');
		} else {
			$('#split_content').show();
			$('#split_content').siblings('.contents').hide();
		}
		//alert($(".split-record li").length);
		if($(".split-record li").length >= 10) {
			//page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	} else if(ids == 'option_money') {
		$("#money_content").show();
		$("#money_content").siblings('.contents').hide();
		if($('#money_content .commi-record li').length == 0) {
			ajaxWebPostAsyncData(appSTeamBuyBrokerage, {
				"uid": uid,
				"page": 1
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					var rows = data.resobj.rows;
					var htmlStr = "";
					$.each(rows, function(index, value) {
						htmlStr += "<li>";
						htmlStr += "<div class=\"bigbox\">";
						htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
						htmlStr += "<span class=\"money\">" + rows[index].money + "</span>";
						htmlStr += "<span class=\"mess\">详情<b></b></span>";
						htmlStr += "</div>";
						htmlStr += "<div class=\"mess-box\">";
						htmlStr += "<p>" + rows[index].content + "</p>";
						htmlStr += "</div>";
						htmlStr += "</li>";
					});
				} else {
					$.jBox.tip(data.info, '');
				}
				$(".commi-record").html(htmlStr);
				$("#money_content").show();
				$("#money_content").siblings('.contents').hide();	
				$(".bigbox").on("click", ".mess", function() {	
	$(this).parent('.bigbox').siblings('.mess-box').toggle().parent("li").siblings().children(".mess-box").hide();
				})
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');
		} else {
			$("#money_content").show();
			$("#money_content").siblings('.contents').hide();
		}

		if($(".commi-record li").length >= 20) {
			//page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	} else if(ids == "option_gift") {
		$("#gift_content").show();
		$("#gift_content").siblings('.contents').hide();
		if($('#gift_content .gift-record li').length == 0) {
			var rows;
			var htmlStr = "";

			ajaxWebPostAsyncData(selectGiftCardByRyid, {
				"uid": uid,
				"page": page,
				"type": 0 //未使用
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					//console.log(data);
					rows = data.resobj.rows;
					ajaxWebPostAsyncData(selectGiftCardByRyid, {
						"uid": uid,
						"page": page,
						"type": 1 //已使用
					}, false, function(data){

						if(data.code == "40000"){

							var rowsUsed = data.resobj.rows;
							if(rows.length > rowsUsed.length){
								$.each(rows, function(index, value) {
									var state = rows[index].state;
									htmlStr += "<li>";
									htmlStr += "<div>";
									htmlStr += "<span class=\"noactived\">";
									if(rows[index].state == 0) {
										htmlStr += "" + rows[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									
									htmlStr += "<span class=\"actived\">";
									if(rows[index].state == 1) {
										htmlStr += "" + rows[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									htmlStr += "</div>";
									htmlStr += "</li>";
								});

								setTimeout(function(){
									for(var i =0; i<rowsUsed.length;i++){
										$('.actived').eq(i).html(rowsUsed[i].code)
									}
								},100);
							}else {
								console.log('2')
								$.each(rowsUsed, function(index, value) {
									var state = rowsUsed[index].state;
									htmlStr += "<li>";
									htmlStr += "<div>";
									htmlStr += "<span class=\"noactived\">";
									if(rowsUsed[index].state == 0) {
										htmlStr += "" + rowsUsed[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									
									htmlStr += "<span class=\"actived\">";
									if(rowsUsed[index].state == 1) {
										htmlStr += "" + rowsUsed[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									htmlStr += "</div>";
									htmlStr += "</li>";
								});

								setTimeout(function(){
									for(var i =0; i<rows.length;i++){
										$('.noactived').eq(i).html(rows[i].code)
									}
								},100);
							}
							
							
							

							
						}else {
							$.jBox.tip(data.info, '');
						}
						
					}, 'json');
					
				} else {
					$.jBox.tip(data.info, '');
				}
				
				$(".gift-record").html(htmlStr);
				$("#gift_content").show();
				$("#gift_content").siblings('.contents').hide();
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');

			
		} else {
			$("#gift_content").show();
			$("#gift_content").siblings('.contents').hide();
		}
		if($(".gift-record li").length >= 50) {
			//page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	}
//	
})

$('.pager li').live("click", function() {

	var num = $(this).children('a').attr('id');
	
	if(page=='1'){
		$('#Previous').addClass('unable');
	}
	//alert(ids_page);
	if(ids_page=='option_group'){
		if(num == "Previous") {
		page--;
		} else {
			//alert($("#indent_table_id li").length);
			if($(".group-record li").length >= 20) {
				page++;
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
		}
		ajaxWebPostAsyncData(appSTeamBuyGet, {
		"uid": uid,
		"page": page
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			var htmlStr = "";
			$.each(rows, function(index, value) {
				htmlStr += "<li>";
				htmlStr += "<div>";
				htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
				htmlStr += "<span class=\"activeCode\">" + rows[index].count + "个激活码</span>";
				htmlStr += "<span class=\"money\">" + rows[index].total + "元</span>";
				htmlStr += "<span class=\"status\">";
				if(rows[index].state == 1) {
					htmlStr += "成功团购";
				} else if(rows[index].state == -2) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 0) {
					htmlStr += "待审核";
				} else if(rows[index].state == -1) {
					htmlStr += "已拒绝";
				} else if(rows[index].state == 2) {
					htmlStr += "从他人拆分";
				}
				htmlStr += "</span>";
				htmlStr += "</div></li>";
			});
		} else {
			$.jBox.tip(data.info, '');
		}
		$("#group-record").html(htmlStr);
	}, 'json');
	window.setTimeout(function(){
		if(page <= 1) {
			page = 1;	
			$('#Previous').addClass('unable');	
		}else{
			$('#Previous').removeClass('unable');
		}
		if($("#group-record li").length >= 20) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
	}
	else if(ids_page=='option_split'){
		if(num == "Previous") {
		page--;
	} else {
		//alert($("#indent_table_id li").length);
		if($(".split-record li").length >= 10) {
			page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	}
		ajaxWebPostAsyncData(appSTeamBuySplitGet, {
				"uid": uid,
				"state": 99,
				"page": page
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					var rows = data.resobj.rows;
					var htmlStr = "";
					$.each(rows, function(index, value) {
						var active = rows[index].jihuolv;
						var name = rows[index].username;
						name = decodeURI(name, "utf-8")
						if(name.length > 15) {
							name = name.substr(0, 15) + '...';
						}
						active = Math.ceil(active * 10000) / 100 + '%';
						htmlStr += "<li>";
						htmlStr += "<div class=\"bigbox1\">";
						htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
						htmlStr += "<span class=\"username\">" + name + "</span>";
						htmlStr += "<span class=\"account\">" + rows[index].account + "</span>";
						htmlStr += "<span class=\"activeCode\">" + rows[index].split_count + "个激活码</span>";
						htmlStr += "<span class=\"mess\">详情<b></b></span>";
						htmlStr += "</div>";
						htmlStr += "<div class=\"mess-box\">";
						htmlStr += "<p>您于" + rows[index].createtime + "给用户" + name + "，账号为" + rows[index].account + "，成功拆分" + rows[index].split_count + "个激活码。</p>";
						htmlStr += "</div>";
						htmlStr += "</li>";
					});
				} else {
					$.jBox.tip(data.info, '');
				}
				$(".split-record").html(htmlStr);
				$('#split_content').show();
				$('#split_content').siblings('.contents').hide();
				$(".bigbox1").on("click", ".mess", function() {	
					$(this).parent('.bigbox1').siblings('.mess-box').toggle().parent("li").siblings().children(".mess-box").hide();
//					$(this).parent('.bigbox1').siblings('.mess-box').toggle();			
				})
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');
			//alert($('.split-record li').length);
	window.setTimeout(function(){
		if(page <= 1) {
			page = 1;	
			$('#Previous').addClass('unable');	
		}else{
			$('#Previous').removeClass('unable');
		}
		if($(".split-record li").length >= 10) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
	}
	else if(ids_page=='option_money'){
		if(num == "Previous") {
		page--;
	} else {
		//alert($("#indent_table_id li").length);
		if($(".commi-record li").length >= 20) {
			page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	}
		ajaxWebPostAsyncData(appSTeamBuyBrokerage, {
				"uid": uid,
				"page": page
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					var rows = data.resobj.rows;
					var htmlStr = "";
					$.each(rows, function(index, value) {
						htmlStr += "<li>";
						htmlStr += "<div class=\"bigbox\">";
						htmlStr += "<span class=\"time\">" + rows[index].createtime + "</span>";
						htmlStr += "<span class=\"money\">" + rows[index].money + "</span>";
						htmlStr += "<span class=\"mess\">详情<b></b></span>";
						htmlStr += "</div>";
						htmlStr += "<div class=\"mess-box\">";
						htmlStr += "<p>" + rows[index].content + "</p>";
						htmlStr += "</div>";
						htmlStr += "</li>";
					});
				} else {
					$.jBox.tip(data.info, '');
				}
				$(".commi-record").html(htmlStr);
				$("#money_content").show();
				$("#money_content").siblings('.contents').hide();	
				$(".bigbox").on("click", ".mess", function() {	
//					$(this).parent('.bigbox').siblings('.mess-box').toggle().parent("li").siblings().children(".mess-box").hide();
				})
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');
			//alert($('.split-record li').length);
	window.setTimeout(function(){
		if(page <= 1) {
			page = 1;	
			$('#Previous').addClass('unable');	
		}else{
			$('#Previous').removeClass('unable');
		}
		if($(".commi-record li").length >= 20) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
	}
	else if(ids_page=='option_gift'){
		//alert(page);
		if(num == "Previous") {
		page--;
	} else {
		//alert($("#indent_table_id li").length);
		if($(".gift-record li").length >= 50) {
			page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	}
		var rows;
			var htmlStr = "";

			ajaxWebPostAsyncData(selectGiftCardByRyid, {
				"uid": uid,
				"page": page,
				"type": 0 //未使用
			}, false, function(data) {
				if($.trim(data.code) == "40000") {
					//console.log(data);
					rows = data.resobj.rows;
					ajaxWebPostAsyncData(selectGiftCardByRyid, {
						"uid": uid,
						"page": page,
						"type": 1 //已使用
					}, false, function(data){

						if(data.code == "40000"){

							var rowsUsed = data.resobj.rows;
							if(rows.length > rowsUsed.length){
								$.each(rows, function(index, value) {
									var state = rows[index].state;
									htmlStr += "<li>";
									htmlStr += "<div>";
									htmlStr += "<span class=\"noactived\">";
									if(rows[index].state == 0) {
										htmlStr += "" + rows[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									
									htmlStr += "<span class=\"actived\">";
									if(rows[index].state == 1) {
										htmlStr += "" + rows[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									htmlStr += "</div>";
									htmlStr += "</li>";
								});

								setTimeout(function(){
									for(var i =0; i<rowsUsed.length;i++){
										$('.actived').eq(i).html(rowsUsed[i].code)
									}
								},100);
							}else {
								
								$.each(rowsUsed, function(index, value) {
									var state = rowsUsed[index].state;
									htmlStr += "<li>";
									htmlStr += "<div>";
									htmlStr += "<span class=\"noactived\">";
									if(rowsUsed[index].state == 0) {
										htmlStr += "" + rowsUsed[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									
									htmlStr += "<span class=\"actived\">";
									if(rowsUsed[index].state == 1) {
										htmlStr += "" + rowsUsed[index].code + "";
									} else {
										htmlStr += "";
									}
									htmlStr += "</span>";
									htmlStr += "</div>";
									htmlStr += "</li>";
								});

								setTimeout(function(){
									for(var i =0; i<rows.length;i++){
										$('.noactived').eq(i).html(rows[i].code)
									}
								},100);
							}
							
	
						}else {
							$.jBox.tip(data.info, '');
						}
						
					}, 'json');
					
				} else {
					$.jBox.tip(data.info, '');
				}
				
				$(".gift-record").html(htmlStr);
				$("#gift_content").show();
				$("#gift_content").siblings('.contents').hide();
				var count = getCookie("cookie_brsy_pc_teambuy_stat_splitcount");
				$("#total").html(count);
			}, 'json');

			//alert($('.split-record li').length);
	window.setTimeout(function(){
		if(page <= 1) {
			page = 1;	
			$('#Previous').addClass('unable');	
		}else{
			$('#Previous').removeClass('unable');
		}
		if($(".gift-record li").length >= 50) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
	}
	//$("#indent_table_id").html('');
//	var type = 4;
//	if(series == '全部' || series == '') {
//		type = 1;
//	}
	
	
})
loadData();