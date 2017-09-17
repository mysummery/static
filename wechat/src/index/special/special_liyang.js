var uid = getCookie("cookie_brsy_h5_uid");
var subid = getQueryString("id");//专栏id
var courseid;//课程id
var freestate;//是否免费
var freecourseid;//免费课程id
$(function() {
	//	var h=$('.bg').height()+$('.wid').height()+$('.mulu').height();
	//	$('#wrapper').css('top',h+'px');
	
	//获取专栏详情
	ajaxPostAsyncData_share(subjectget, {
		"id": subid
	}, false, function(data) {
		var rows = data.resobj;
		if($.trim(data.code) == "40000") {
			$('.title').html(rows.subname);
			document.title = rows.subname; //专栏title
			$('.bg').attr('src', rows.apptopimgurl);//顶部图片
			$('.special_intro p').html(rows.intro);//专栏介绍
			$('.special_take .p').html(rows.notice);//订阅须知
			$('#pay').html('订阅' + rows.price + '/年');//专栏价格
			setCookie("cookie_brsy_h5_price", rows.price);
			setCookie("cookie_brsy_h5_subid", subid);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	
	//获取专栏下的课程 

	ajaxPostAsyncData_share(subjectcourseget, {
		"subid": subid,
		"page": 1
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var rows = data.resobj.rows;
			if(rows.length!=0){
				var htmlStr = "";
				
				courseid = $.trim(rows[0].id);//课程id
				
				//freecourseid = $.trim(rows[1].id); //免费课程id
				setCookie("cookie_brsy_h5_courseid", courseid);
			
				//var freestate1 = rows[index].freestate;//是否免费，1是免费，2是收费

				
				//通过课程id获取目录
				ajaxPostAsyncData_share(subjectvideotop, {
					"subid": subid,
				}, false, function(data) {
					if($.trim(data.code) == "40000") {
						var rows = data.resobj;
						var htmlStr = "";
						$.each(rows, function(index, value) {
							var subcoursename = rows[index].name;//课程名
							var time = rows[index].updatetime.substr(0, 10);//截取年月日
							htmlStr += "<li><span class=\"date\">" + time + "</span><span class=\"lesson_title\">" + subcoursename + "</span></li>";
						});
						$(".mulu_list").append(htmlStr);
					} else {
						$.jBox.tip(data.info, '');
					}

				}, 'json');

			
			}else{
				courseid='';
			}
			
		} else {
			$.jBox.tip(data.info, '');
		}

	}, 'json');
	//如果没有登录提示去登陆
	if( uid == '' || uid == null ) {
		$('.choose.login p:first-child').html('登录后才能查看订阅内容！');
		$('.login').show();
		$('.cover').show();
		$('.notyet').show();
	} else {
		
		//获取用户权限，是否有权限查看视频（有权限：团购商或者订阅过的）
		ajaxPostAsyncData(subjectuserget, {
			"uid": uid,
			"subid": subid
		}, false, function(data) {
			var rows = data.resobj;
			if($.trim(data.code) == "40000") {
				var state = rows.state;//是否订阅状态
				if(state == 1) {
					$('.already').show();
					$('.notyet').hide();
					freestate = 2; //有权限，看收费的
				} else {
					$('.already').hide();
					$('.notyet').show();
					freestate = 1; //无权限，看免费的
				}

			} else {
				$.jBox.tip(data.info, 'error');
			}
		}, 'json');

	}

})
var page = 1;

//点击订阅
$('#pay').live('click', function(e) {
	
	//如果没有登录提示去登陆
	if(uid == '' || uid == null) {
		$('.choose.login p:first-child').html('登录后才能订阅！');
		$('.login').show();
		$('.cover').show();
		$('.notyet').show();
	} else {
		ajaxPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				var huiyuan = data.resobj.vipstate;//是否会员
				var token = data.resobj.token;
				var beicode = data.resobj.parentcode;//被邀请码
				var mycode = data.resobj.usercode;//邀请码
				window.location.href = "/static/wechat/src/service/subscribe_pay/subscribe_pay.html?token=" + token + "&uid=" + uid + "&beicode=" + beicode + "&mycode=" + mycode + "&xuliehaoType=" + subid;
			}
		}, 'json');
	}

})

//随便看看
$('.close').live('click', function(e) {
	e.preventDefault();
	$('.cover').hide();
	$('.choose').hide();
	//如果没有课程
	// if(courseid == '' || courseid == null || courseid == undefined){
	// 	$.jBox.tip('无免费视频！', '');
	// 	return false;
	// }else{
	// 	window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=1" + "&courseid=" + courseid;
	// }

	ajaxPostAsyncData_share(subjectvideoget, {
		"subCourseid": courseid,
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if(data.code == "40000") {
			if(data.resobj.rows.length <= 0) {
				$.jBox.tip('无免费视频！', '');
				return false;
			}else {
				window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=1" + "&courseid=" + courseid;
			}
		}
	}, 'json');
	// if($(this).hasClass('lookfree')) {
	// 	window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=1" + "&courseid=" + courseid;
	// }
})

//去登陆
$('.gologin').live('click', function() {
	window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?id=" + subid;
})

//免费视频
$('#free_look').live('click', function() {
	ajaxPostAsyncData_share(subjectvideoget, {
		"subCourseid": courseid,
		"uid": uid,
		"page": 1
	}, false, function(data) {
		if(data.code == "40000") {
			if(data.resobj.rows.length <= 0) {
				$.jBox.tip('无免费视频！', '');
				return false;
			}else {
				window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=1" + "&courseid=" + courseid;
			}
		}
	}, 'json');
	
	// if(courseid == '' || courseid == null || courseid == undefined){
	// 	$.jBox.tip('无免费视频！', '');
	// 	return false;
	// }else{
	// 	window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=1" + "&courseid=" + courseid;
	// }
})

//已订阅，查看详情
$('#look_details').live('click', function() {
	window.location.href = "/static/wechat/src/index/special/special_play/special_play.html?subid=" + subid + "&freestate=2" + "&courseid=" + courseid;
})