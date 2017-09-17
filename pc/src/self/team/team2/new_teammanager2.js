$(function() {
	//左侧导航栏，团队管理选中
	$(".teammanager").addClass("current");
		//默认等级选中全部
	$(".rank-tittle li").eq(1).addClass("hover");
})

var uid = getQueryString("uid");
var childusercode = getQueryString("childusercode");
var childid = getQueryString("childid");
var series = '全部'; //默认选中
var type = 1; //默认type
var page = 1;

function loadData() {
	//清空输入框的值
	$("#search_input").val('');
	//获取学员积分和收益
	var getParam = function(key) {
		var lot = location.search;
		var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
		return decodeURIComponent(lot.replace(reg, "$1"));
	}

	var name = getParam("name");
	var childcount = getQueryString("childcount");

	$("#title").html("2级-" + name + "团队");
	ajaxWebPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
		"uid": uid,
		"usercode": childusercode,
		"page": "1",
		"childid": childid,
		"type": "1",
		"grade": ""
	}, false, function(data) {
		var rows = data.resobj.rows;
		$("#indent_table_id").html("");
		//根据注册时间排序
		$.each(rows, function(index, value) {
			if(rows[index].username == null) {
				rows[index].username = '';
			}

			if(rows[index].childcount == null) {
				rows[index].childcount = 0;
			}

			var htmlstr = "<li onclick=\"team2('" + uid + "','" + rows[index].usercode + "','" + rows[index].id + "','" + rows[index].username + "','" + rows[index].childcount + "')\">";
			htmlstr += "<div>";
			htmlstr += "<span class=\"serialnum\">" + (index + 1) + "</span>";
			htmlstr += "<span class=\"rank\">" + rows[index].grade + "</span>";
			htmlstr += "<span class=\"name\">" + rows[index].username + "</span>";
			htmlstr += "<span class=\"peonum\">" + rows[index].childcount + "</span>";
			htmlstr += "<span class=\"phone\">" + rows[index].phone + "</span>";
			htmlstr += "<span class=\"regTime\">" + rows[index].createtime + "</span>";
			htmlstr += "</div>";
			htmlstr += "</li>";
			$("#indent_table_id").append(htmlstr);
		});
	}, 'json');
	//如果 数据超过50条，下一页可点击，不超过，则不可点击
	if($("#indent_table_id li").length >= 50) {
		$('#next').removeClass('unable');
		//alert(page);
	} else {
		$('#next').addClass('unable');
	}

};

loadData();
//根据注册时间查询
$(".regTime").click(function() {
		$("#indent_table_id").html('');
		if($.trim(series) != "全部" && $.trim(series) != '') {
			type = "6";
			treeBasic(page, type);

		} else {
			loadData();
		}
		$("#reg").removeClass('changetrans1');
	$('#asc').removeClass('changewhite');
	$('#desc').removeClass('changewhite1');
	})
	//请求团队接口tree公共函数,
function treeBasic(page, type) {

	ajaxWebPostAsyncData(selectMyTuanduiBySeriesH5, {
		"uid": uid,
		"usercode": childusercode,
		"page": page,
		"childid": childid,
		"type": type,
		"grade": series
	}, false, function(data) {
		if(data.code == '40000') {
			var rows = data.resobj.rows;
			$("#indent_table_id").html("");
			//根据注册时间排序
			$.each(rows, function(index, value) {
				if(rows[index].username == null) {
					rows[index].username = '';
				}

				if(rows[index].childcount == null) {
					rows[index].childcount = 0;
				}

				var htmlstr = "<li>";
				htmlstr += "<div>";
				htmlstr += "<span class=\"serialnum\">" + (index + 1) + "</span>";
				htmlstr += "<span class=\"rank\">" + rows[index].grade + "</span>";
				htmlstr += "<span class=\"name\">" + rows[index].username + "</span>";
				htmlstr += "<span class=\"peonum\">" + rows[index].childcount + "</span>";
				htmlstr += "<span class=\"phone\">" + rows[index].phone + "</span>";
				htmlstr += "<span class=\"regTime\">" + rows[index].createtime + "</span>";
				htmlstr += "</div>";
				htmlstr += "</li>";
				$("#indent_table_id").append(htmlstr);
			});
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
}

//查询各个等级
$(".option").live("click", function() {
	//切换icon的状态
	$("#reg").removeClass('changetrans1');
	$('#asc').removeClass('changewhite');
	$('#desc').removeClass('changewhite1');
	//清空输入框的值
	$("#search_input").val('');
		$(this).addClass('hover');
		$(this).siblings('.option').removeClass('hover');
		//获取等级的内容
		series = $.trim($(this).text());
		page = 1;
		if(series == '全部') {
			type = 1;
			treeBasic(page, type);
		} else {
			//其他默认type为6,后台按各个等级的注册时间排序
			type = 6;
			treeBasic(page, type);
		}

		//如果page为1,上一页不可点击
		if(page <= 1) {
			page = 1;
			$('#Previous').addClass('unable');
		} else {
			$('#Previous').removeClass('unable');
		}

		//如果当前条数超过50,则下一页可点击,反之,不可点击
		if($("#indent_table_id li").length >= 50) {
			$('#next').removeClass('unable');
			//alert(page);
		} else {
			$('#next').addClass('unable');
		}
	})
	//升序
$('#asc').click(function() {

	//如果选中的不是全部,type为5是升序,
	//如果是全部,type为3是升序
	if($.trim(series) != "全部" && $.trim(series) != '') {
		type = "5";
		treeBasic(page, type);

	} else {
		type = "3";
		treeBasic(page, type);
	}
	$('#desc').addClass('changetrans1').removeClass('changewhite1');
	$('#asc').addClass('changewhite').removeClass('changetrans');
	$("#reg").addClass('changetrans1');

})

//降序
$('#desc').click(function() {
		//如果选中的不是全部,type为4是降序,
		// 如果是全部,type为2是降序
		if($.trim(series) != "全部" && $.trim(series) != '') {
			type = "4";
			treeBasic(page, type);

		} else {
			type = "2";
			treeBasic(page, type);
		}
		$('#asc').addClass('changetrans').removeClass('changewhite');
		$('#desc').addClass('changewhite1').removeClass('changetrans1');
		$("#reg").addClass('changetrans1');

	})
	//如果 数据超过50条，下一页可点击，不超过，则不可点击
if($("#indent_table_id li").length >= 50) {
	$('#next').removeClass('unable');
} else {
	$('#next').addClass('unable');
}

//分页
$('.pager li').live("click", function() {

	var num = $(this).children('a').attr('id');

	//当按钮置灰时,当前页为第一页,或最后一页时,不调接口
	if(num == "Previous") {
		if(page <= 1) {
			page = 1;
			$('#Previous').addClass('unable');
			return false;
		}
		page--;

	} else {
		//如果点击最后一页,当前条目超过50,下页可点击,反之不可点击
		if($("#indent_table_id li").length >= 50) {
			page++;
			$('#next').removeClass('unable');
		}
	}
	$("#indent_table_id").html('');;
	treeBasic(page, type);

	//加定时器,准确获取当前页的数据
	window.setTimeout(function() {
		if(page <= 1) {
			page = 1;
			$('#Previous').addClass('unable');
			return false;
		} else {
			$('#Previous').removeClass('unable');
		}
		if($("#indent_table_id li").length >= 50) {
			$('#next').removeClass('unable');
		} else {
			$('#next').addClass('unable');
			return false;
		}
	}, 100)
})

//电话搜索
function search_() {
	var phoneNum = $("#search_input").val();
	//alert(phoneNum);
	var regu = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
	var re = new RegExp(regu);
	if(!re.test(phoneNum)) {
		$.jBox.tip("手机号格式不正确", "error");
		return;
	} else {
		var uid = getCookie("cookie_brsy_pc_uid");
		ajaxWebPostAsyncData(selectMyTuanduiByPhone2, {
			"uid": uid,
			"phone": phoneNum,
			"usercode": childusercode,
		}, false, function(data) {
			if($.trim(data.code) == "40000") {
				var rows = data.resobj;

				if(rows.username == null) {
					rows.username = '';
				}

				if(rows.childcount == null) {
					rows.childcount = 0;
				}
				var htmlstr = "<li>";
				htmlstr += "<div>";
				htmlstr += "<span class=\"serialnum\">1</span>";
				htmlstr += "<span class=\"rank\">" + rows.grade + "</span>";
				htmlstr += "<span class=\"name\">" + rows.username + "</span>";
				htmlstr += "<span class=\"peonum\">" + rows.childcount + "</span>";
				htmlstr += "<span class=\"phone\">" + rows.phone + "</span>";
				htmlstr += "<span class=\"regTime\">" + rows.createtime + "</span>";
				htmlstr += "</div>";
				htmlstr += "</li>";
				$("#indent_table_id").html(htmlstr);
			} else {
				$.jBox.tip("手机号不正确", 'error');
			}
		}, 'json')
	} 
}

//搜索框绑定回车键

$('#search_input').on('keypress', function(event) {
	if(event.keyCode == "13") {
		search_();
	}
});