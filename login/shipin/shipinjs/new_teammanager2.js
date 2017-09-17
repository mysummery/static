$(function () {

	$(".teammanager").addClass("current");
})

var uid = getQueryString("uid");
var childusercode = getQueryString("childusercode");
var childid = getQueryString("childid");
function loadData() {
	window.series = '';
	window.page = 1;
	$("#search_input").val('');
	window.number = 0;
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
		"usercode":childusercode,
		"page": "1",
		"childid": childid,
		"type": "2",
		"grade": ""
	}, false, function(data) {
		//		console.log(data);
		var rows = data.resobj.rows;
		window.arr = rows;
		//$("#indent_table_id").html("<tr><td>序号</td><td><div class=\"clearfix li\"><div class=\"select\"> <span id=\"price\">等级</span><dl class=\"option clearfix\"><dd><span class=\"all\">全部</span></dd><dd><span>普通学员</span></dd><dd><span>VIP学员</span></dd><dd><span>创客</span></dd><dd><span>助理讲师</span></dd><dd><span>讲师</span></dd><dd><span>国内游</span></dd><dd><span>海外游</span></dd></dl></div></div></td><td>姓名</td><td id=\"show\"style=\"position:relative;\">学员人数<img src=\"/static/wechat/assets/images/asc.png\" id=\"asc\" class=\"gray\"><img src=\"/static/wechat/assets/images/desc.png\" id=\"desc\"></td><td>手机号</td></tr>");
		listSortBy(arr, 'childcount', 'desc');
		$('#asc').click(function() {
			listSortBy(arr, 'childcount', 'asc');
		})
		$('#desc').click(function() {
				listSortBy(arr, 'childcount', 'desc');
			})
			//var uid=rows[index].uid;
		if($.trim(data.code) == "40000") {

		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	if($("#indent_table_id li").length >= 50) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}

};

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
			"usercode":childusercode,
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
				htmlstr += "</div>";
				htmlstr += "</li>";
				$("#indent_table_id").html(htmlstr);
				//$("#indent_table_id").html("<tr onclick=\"team2('" + uid + "','"  + rows.usercode + "','" + rows.id + "','" + rows.username + "','" + rows.childcount + "')\"><td>" + "1" + "</td><td>" + rows.grade + "</td><td>" + rows.username + "</td><td>" + rows.childcount + "</td><td>" + rows.phone + "</td></tr>");
			} else {
				$.jBox.tip("手机号不正确", 'error');
			}
		}, 'json')
	} 
}

function listSortBy(arr, field, order) {
	var refer = [],
		result = [],
		order = order == 'asc' ? 'asc' : 'desc',
		index;
	for(i = 0; i < arr.length; i++) {
		refer[i] = arr[i][field] + ':' + i;
	}
	refer = refer.sort(function(a, b) {
		return parseInt(a) > parseInt(b) ? 1 : -1
	});
	//console.log(refer);
	if(order == 'desc') refer.reverse();
	for(i = 0; i < refer.length; i++) {
		index = refer[i].split(':')[1];
		result[i] = arr[index];
	}

	$("#indent_table_id").html('');
	$('#asc').click(function() {
		listSortBy(arr, 'childcount', 'asc');
		$('#desc').addClass('changetrans1').removeClass('changewhite1');
		$('#asc').addClass('changewhite').removeClass('changetrans');
	})
	$('#desc').click(function() {
		listSortBy(arr, 'childcount', 'desc');
		$('#asc').addClass('changetrans').removeClass('changewhite');
		$('#desc').addClass('changewhite1').removeClass('changetrans1');

	})
	$.each(result, function(index, value) {
		if(result[index].username == null) {
			result[index].username = '';
		}

		if(result[index].childcount == null) {
			result[index].childcount = 0;
		}
		//$("#indent_table_id").append("<tr onclick=\"team2('" + uid + "','"  + result[index].usercode + "','" + result[index].id + "','" + result[index].username + "','" + result[index].childcount + "')\"><td>" + (index + 1) + "</td><td>" + result[index].grade + "</td><td>" + result[index].username + "</td><td>" + result[index].childcount+ "</td><td>" + result[index].phone + "</td></tr>");
		var htmlstr = "<li>";
		htmlstr += "<span class=\"serialnum\">" + (index + 1) + "</span>";
		htmlstr += "<span class=\"rank\">" + result[index].grade + "</span>";
		htmlstr += "<span class=\"name\">" + result[index].username + "</span>";
		htmlstr += "<span class=\"peonum\">" + result[index].childcount + "</span>";
		htmlstr += "<span class=\"phone\">" + result[index].phone + "</span>";
		htmlstr += "</div>";
		htmlstr += "</li>";
		$("#indent_table_id").append(htmlstr);
	});
	

}
$(".option").live("click", function() {
	$(this).addClass('hover');
	$(this).siblings('.option').removeClass('hover');
	var usercode = getCookie("cookie_brsy_pc_mycode");
	window.page = 1;
	window.series = $(this).text();
	if($(this).text() == '全部') {
		loadData();
	} else {
		ajaxWebPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
			"uid": uid,
			"usercode": usercode,
			"page": page,
			"childid":childid,
			"phone": "",
			"type": "4",
			"grade": series
		}, false, function(data) {
			//console.log(data);
			var rows = data.resobj.rows;
			arr = rows;
			var fil = $('.changetrans').attr('id');
			if(fil == 'desc') {
				listSortBy(arr, 'childcount', 'asc');
			} else {
				listSortBy(arr, 'childcount', 'desc');
			}
			$('#asc').click(function() {
				listSortBy(arr, 'childcount', 'asc');
			})
			$('#desc').click(function() {
					listSortBy(arr, 'childcount', 'desc');
				})
				//var uid=rows[index].uid;
				/* if ($.trim(data.code) == "40000") {
    		 $.each(rows,function(index, value) {
				if(rows[index].username==null){rows[index].username='';}
				if(rows[index].childcount == null) {
					rows[index].childcount = 0;
				}
				
				var htmlstr = "<li>";
				htmlstr += "<span class=\"serialnum\">" + (index + 1) + "</span>";
				htmlstr += "<span class=\"rank\">" + rows[index].grade + "</span>";
				htmlstr += "<span class=\"name\">" + rows[index].username + "</span>";
				htmlstr += "<span class=\"peonum\">" + rows[index].childcount + "</span>";
				htmlstr += "<span class=\"phone\">" + rows[index].phone + "</span>";
				htmlstr += "</div>";
				htmlstr += "</li>";
				$("#indent_table_id").append(htmlstr);

    		 });
         }else{
             $.jBox.tip("页面初始化失败",'error');
         }*/
		}, 'json');
	}
	window.setTimeout(function(){
		if($("#indent_table_id li").length >= 50) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
})
$('.pager li').live("click", function() {
	
	
	var num = $(this).children('a').attr('id');
	if(num == "Previous") {
		page--;
	} else {
		//alert($("#indent_table_id li").length);
		if($("#indent_table_id li").length >= 50) {
			page++;
			$('#next').removeClass('unable');
			//alert(page);
		}else{
			$('#next').addClass('unable');
		}
	}
	$("#indent_table_id").html('');
	var type = 4;
	if(series == '全部' || series == '') {
		type = 1;
	}
	ajaxWebPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
		"uid": uid,
		"usercode":childusercode,
		"page": page,
		"childid": childid,
		"type": "2",
		"grade": ""
	}, false, function(data) {
		var rows = data.resobj.rows;
		if(rows.length == 0) {
			return false;
		} else {
			arr = rows;
			var fil = $('.changewhite').attr('id');
			if(fil == undefined) {
				fil = 'asc';
			}
			if(fil == 'desc') {
				listSortBy(arr, 'childcount', 'asc');
			} else {
				listSortBy(arr, 'childcount', 'desc');
			}
			$('#asc').click(function() {

				listSortBy(arr, 'childcount', 'asc');
			})
			$('#desc').click(function() {

				listSortBy(arr, 'childcount', 'desc');
			})
		}

	}, 'json');
	window.setTimeout(function(){
		if(page <= 1) {
			page = 1;	
			$('#Previous').addClass('unable');	
		}else{
			$('#Previous').removeClass('unable');
		}
		if($("#indent_table_id li").length >= 50) {
				$('#next').removeClass('unable');
				//alert(page);
			}else{
				$('#next').addClass('unable');
			}
	},100)
})
loadData();