/**
 * Created by zuohq on 2016/8/29.
 *
 */
var uid = getQueryString("uid");
var childusercode = getQueryString("childusercode");
var childid = getQueryString("childid");
var series = '全部';	//默认选中
var type = 1; //默认type
var page = 1;
var number = 0;

/* modefied by 李思远 at 2017.09.04 for 为所有手机号添加a标签，实现点击拨打电话  */

function loadData() {
	number = 0;
	var getParam = function(key) {
		var lot = location.search;
		var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
		return decodeURIComponent(lot.replace(reg, "$1"));
	}

	var name = getParam("name");
	var childcount = getQueryString("childcount");

	document.title = "2级-" + name + "团队";
	$("#name").html(name);
	$("#childcount").html(childcount);
	if(childcount < 15) {
		$('#scroller-pullUp').hide();
	}

	series = '';
	ajaxPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
		"uid": uid,
		"usercode":childusercode,
		"childid": childid,
		"page": "1",
		"type": "1",
		"grade": series
	}, false, function(data) {

		var rows = data.resobj.rows;

		if($.trim(data.code) == "40000") {

			var result = data.resobj.rows;
			var _html = '';
			$.each(rows, function( index ) {
				if ( result[index].username == null || result[index].username == 'null' || result[index].username == '' ) {
					_html = '';
				}else {
					_html = result[index].username;
				};
				$("#indent_table_id tbody").append("<tr><td>" + (index + 1) + "</td><td>" + result[index].grade + "</td><td>" + _html + "</td><td>" + result[index].childcount + "</td><td><a onclick='function(e){e.stopPropagation();e.preventDefault();}' href='tel:" + result[index].phone + "'>" + result[index].phone + "</a></td></tr>");
			});
			
		} else {
			$.jBox.tip("页面初始化失败", 'error');
		}
	}, 'json');
	//iscroll
	loaded();
};

function getdataafter() {
	
	page += 1;
	var uid = getCookie("cookie_brsy_h5_uid");

	if(series == '全部' || series == ''){
		type = 1;

		ajaxPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
			"uid": uid,
			"usercode":childusercode,
			"childid": childid,
			"page": page,
			"type": type,
			"grade": series
		}, false, function(data) {
			if(data.code == '40000'){
				number += 50;
				var newNumber;
				var result = data.resobj.rows;
				var _html = '';
				$.each(result, function(index) {
					newNumber = index + number;
					if ( result[index].username == null || result[index].username == 'null' || result[index].username == '' ) {
						_html = '';
					}else {
						_html = result[index].username;
					};
					$("#indent_table_id tbody").append("<tr><td>" + (newNumber + 1) + "</td><td>" + result[index].grade + "</td><td>" + _html + "</td><td>" + result[index].childcount + "</td><td><a onclick='function(e){e.stopPropagation();e.preventDefault();}' href='tel:" + result[index].phone + "'>" + result[index].phone + "</a></td></tr>");
				});
			}else {
				$.jBox.tip(data.info, 'error');
			}
		}, 'json');
	}else {
		ajaxPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
			"uid": uid,
			"usercode":childusercode,
			"childid": childid,
			"page": page,
			"type": type,
			"grade": series
		}, false, function(data) {
			if(data.code == '40000'){
				number += 50;
				var newNumber;
				var result = data.resobj.rows;
				var _html = '';
				$.each(result, function(index) {
					newNumber = index + number;
					if ( result[index].username == null || result[index].username == 'null' || result[index].username == '' ) {
						_html = '';
					}else {
						_html = result[index].username;
					};
					$("#indent_table_id tbody").append("<tr><td>" + (newNumber + 1) + "</td><td>" + result[index].grade + "</td><td>" + _html + "</td><td>" + result[index].childcount + "</td><td><a onclick='function(e){e.stopPropagation();e.preventDefault();}' href='tel:" + result[index].phone + "'>" + result[index].phone + "</a></td></tr>");
				});
			}else {
				$.jBox.tip(data.info, 'error');
			}
		}, 'json');
	}
	
}

/* modefied by 李思远 at 2017.09.04 for 修改点击标签也可收回选择栏功能（添加时间戳解决iscroll重复点击问题） begin */
var t1 = null;
var d1 = null;
$("#price").live("click", function() {
	if (t1 == null){
		t1 = new Date().getTime();
	}else{
		var t2 = new Date().getTime();
		if(t2 - t1 < 500){
			t1 = t2;
			return;
		}else{
			t1 = t2;
		}
	}
	if ($('.option').css('display') == 'block') {
		$('#price img').css('transform', 'rotate(0deg)');
		$('.option').hide();
		$("#cover").hide();
		return false;
	} else {
		//图片旋转
		$('#price img').css('transform', 'rotate(180deg)');
		$(".option").show();
		var t = $('#price').offset().top + $('.option').outerHeight() + $('#price').outerHeight() + 10;
		//遮罩层打开
		$("#cover").show();
		//遮罩层赋值高度
		$('#cover').css('top', t + 'px');
		
	}

	//学员箭头旋转
	
	$('#student img').css('transform', 'rotate(0deg)');
	$('.student-option').hide();
	

	//遮罩层点击
	$('#cover').click(function() {
		$('.option').hide();
		$('#cover').hide();
		$('#price img').css('transform', 'rotate(0deg)');
	})
	
}); 

//点击学员
$("#student").live("click", function() {
	if (d1 == null){
		d1 = new Date().getTime();
	}else{
		var d2 = new Date().getTime();
		if(d2 - d1 < 500){
			d1 = d2;
			return;
		}else{
			d1 = d2;
		}
	}

	if ($('.student-option').css('display') == 'block') {
		//图片旋转
		$('#student img').css('transform', 'rotate(0deg)');
		$('.student-option').hide();
		$("#cover").hide();
		return false;
	}else {
		$('#student img').css('transform', 'rotate(180deg)');
		$(".student-option").show();
		var t = $('#student').offset().top + $('.student-option').outerHeight() + $('#student').outerHeight() + 10;
		//遮罩层打开
		$("#cover").show();
		//遮罩层赋值高度
		$('#cover').css('top', t + 'px');
	}

	//等级箭头旋转
	
	$('#price img').css('transform', 'rotate(0deg)');
	$('.option').hide();

	$('#cover').click(function() {
		$('.student-option').hide();
		$('#cover').hide();
		$('#student img').css('transform', 'rotate(0deg)');
	})
}); 

/* modefied by 李思远 at 2017.09.04 for 修改点击标签也可收回选择栏功能（添加时间戳解决iscroll重复点击问题） end */

//请求tree公共函数
function treeBasic(page, type) {
	number = 0;
	ajaxPostAsyncData(selectMyTuanduiBySeriesH5_Two, {
		"uid": uid,
		"usercode":childusercode,
		"childid": childid,
		"page": page,
		"type": type,
		"grade": series
	}, false, function(data) {
		if(data.code == '40000') {
			var result = data.resobj.rows;
			var _html = '';
			$("#indent_table_id tbody").html("");
			$.each(result, function( index ) {
				if ( result[index].username == null || result[index].username == 'null' || result[index].username == '' ) {
					_html = ''
				}else {
					_html = result[index].username
				};
				$("#indent_table_id tbody").append("<tr><td>" + (index + 1) + "</td><td>" + result[index].grade + "</td><td>" + _html + "</td><td>" + result[index].childcount + "</td><td><a onclick='function(e){e.stopPropagation();e.preventDefault();}' href='tel:" + result[index].phone + "'>" + result[index].phone + "</a></td></tr>");
			});
		}
	}, 'json');
	loaded();
}

///选择等级
	//立flag，防止点击事件累计叠加
var optionFlag = true;
$(".option dd").unbind('click').bind( 'click', function(e) {
	e.stopPropagation();
	if(optionFlag){
		page = 1;
		$('#price img').css('transform', 'rotate(0deg)');
		$('#cover').hide();
		$(this).children('span').addClass('team-active');
		$(this).siblings().children('span').removeClass('team-active');
		$('.option').hide();

		series = $.trim($(this).text());
		if(series == '全部') {
			type = 1;
			treeBasic(page, type)
		} else {
			type = 6;
			treeBasic(page, type)
		};
		optionFlag = false;
		setTimeout(function(){
	        optionFlag = true;
	    },1000);
	}
});


var studentFlag = true;
$(".student-option dd").live("click", function(e) {
	e.stopPropagation();
	if(studentFlag){
		page = 1;
		$('#cover').hide();
		$('#student img').css('transform', 'rotate(0deg)');

		$(this).siblings().children('span').removeClass('team-active');
		$(this).children('span').addClass('team-active');
		$('.student-option').hide();
		//如果选中的不是全部
		if ( $.trim(series) != "全部" && $.trim(series) != '' ) {
			switch ($(this).text()) {
				case '人数升序':
					type = 5;
					treeBasic(page, type);
				break;
				case '人数降序':
					type = 4;
					treeBasic(page, type);
				break;
				default:
					type = 6;
					treeBasic(page, type);
			}
		}else {
			switch ($(this).text()) {
				case '人数升序':
					type = 3;
					treeBasic(page, type);
				break;
				case '人数降序':
					type = 2;
					treeBasic(page, type);
				break;
				default:
					type = 1;
					treeBasic(page, type);
			}
		};
		studentFlag = false;
		setTimeout(function(){
	        studentFlag = true;
	    },1000);
	}
});


//iscroll 优化
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

loadData();