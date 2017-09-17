//swiper
var from=getQueryString('from');
if(from=='app'){
	var uid = getQueryString('uid');
	var liveid=getQueryString('liveId');//直播id
}else{
	var uid = getCookie('cookie_brsy_h5_uid');
	var liveid='';//直播id
}

var username='';//用户名
var page=1;
var userheadphoto='';
var usertype='';//用户类型
var icon=0;//管理员标记
var appointnum;//预约人数
var appointstatu;//是否预约了
var comment_type=0;
var totalpage='1';
var tabsSwiper = new Swiper('#tabs-container',{
	    speed:500,
	    resistanceRatio: 0,
	    onSlideChangeStart: function(){
			$(".tabs .current").removeClass('current')
			$(".tabs a").eq(tabsSwiper.activeIndex).addClass('current') 
			
	    },
	    onSlideChangeEnd: function(){
	    	if(tabsSwiper.activeIndex == 0){
				$('.comment-btn').hide();
				if(appointstatu!='1'){
					$('.appointment-btn').show();	
				}
				
				$('.comments-btn').hide();
			}else {
				$('.appointment-btn').hide();
				$('.comment-btn').show();
				if(appointstatu!='1'){
					$('.appointment-btn').show();	
				}
				
				if($('.send_contents').val()!=''){
					$('.comments-btn').show();
				}		
			}
	    }
	})
$(".tabs a").on('touchstart mousedown',function(e){
	e.preventDefault()
	$(".tabs .current").removeClass('current')
	$(this).addClass('current')
	tabsSwiper.slideTo( $(this).index() )
	if($(this).index() == 0){
		$('.comment-btn').hide();
		if(appointstatu!='1'){
					$('.appointment-btn').show();	
				}
		$('.comments-btn').hide();
	}else {
		$('.appointment-btn').hide();
		$('.comment-btn').show();
		//get_comments();
		//loaded();
		if($('.send_contents').val()!=''){
			$('.comments-btn').show();
		}
		
	}
	console.log($(this).index());
	
})
$(".tabs a").click(function(e){
    e.preventDefault()
})
var intDiff = 0;//倒计时总秒数量
var t='';
//倒计时

	ajaxPostAsyncData_share(livelist, {
	}, false, function(data) {
		if(data.code = "40000") {
			if(from!='app'){
				liveid=data.resobj[0].id;
			}//直播id
			var intDiff_live=data.resobj[0].begintime;
				//var intDiff='2017-06-01 12:05:03';
				intDiff_live=intDiff_live.replace(new RegExp(/(-)/,'g'),'/');
				EndTime=new Date(intDiff_live);
				var NowTime = new Date();
				live_t =EndTime.getTime() - NowTime.getTime();
				live_t=Math.round(live_t/1000);
				times(live_t);
				if(live_t<=0){
					$('.live .count-down-box').hide();
					$('.live_playbtn').show();
					$('.top_cover').show();
				}
				if(uid!=''&&uid!=null&&uid!=undefined){
						ajaxPostAsyncData_share(liveget, {
						"id": liveid,
						"uid": uid
					}, false, function(data) {
						if (data.code == '40000'){
							
							appointstatu=data.resobj.statu;//是否已预约
							if(appointstatu=='1'){
								$('.appointment-btn').hide();
								
							}
						}else {
							console.log(data.info)
						}
					}, 'json');
				}
			var topimg=data.resobj[0].appimageurl2;
			if(topimg==null||topimg==undefined||topimg==''){
				topimg='/static/wechat/assets/images/logo.png';
				$('.top_img_bac').css({width: '70%',padding:'15% 0 15% 15%'});
			}
			$('.top_img_bac').attr('src',topimg);//背景图
			t=data.resobj[0].begintime;//开始时间
			//var intDiff='2017-06-01 12:05:03';
			t=t.replace(new RegExp(/(-)/,'g'),'/');
			EndTime=new Date(t);
			var NowTime = new Date();
			var intDiff =EndTime.getTime() - NowTime.getTime();
			intDiff=Math.round(intDiff/1000);
			
			//times(t,'live');
			var rows=data.resobj[0];
			appointnum=rows.appointnum;//预约人数
			$('.appointnum').html(appointnum);
			$('.teachername').html(rows.username);	//讲师姓名
			$('.teacherphoto').attr('src',rows.headimgurl);//讲师头像图		
			$('.live_intro').html(rows.brief);//直播人介绍
			$('.class-information p').html(rows.intro);//直播介绍
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, "json");

var timer = null;


function times(intDiff){
	timer = setInterval(function(){

	var day=0,

		hour=0,

		minute=0,

		second=0;//时间默认值		

	if(intDiff > 0){

		day = Math.floor(intDiff / (60 * 60 * 24));
	
		hour = Math.floor(intDiff / (60 * 60)) - (day * 24);

		minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);

		second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	}

	if (hour <= 9) hour = '0' + hour;

	if (minute <= 9) minute = '0' + minute;

	if (second <= 9) second = '0' + second;
		$('#day_show').html(day+"天");

		$('#hour_show').html(hour);
	
		$('#minute_show').html(minute);
	
		$('#second_show').html(second);

	

	intDiff--;
	if((intDiff<0)||(intDiff==0)){
		window.location.href="/static/wechat/live/live/show.html";
	}

}, 1000);
}

$('.comment-btn').on('click',function(){
	if(appointstatu!='0'){
		$(this).hide();
		$('.comments-btn').show();
	}else{
		
				$.jBox.tip('您还没有预约,不能评论!', "error");
		
	}
	
})
//评论
function addcomment(contents,usertype){
		var token=getCookie("cookie_brsy_h5_token")
		ajaxPostAsyncData_share(slectInfoByUid, {
		"uid": uid,
		"type":'1',
		"token":token
	}, false, function(data) {
		if(data.code == "40000") {
			username=data.resobj.username;
			headimg=data.resobj.headimgurl;
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
		
//	var html='';
//	var d = new Date()
//	var vYear = d.getFullYear()
//	var vMon = d.getMonth() + 1
//	var vDay = d.getDate()
//	var h = d.getHours(); 
//	var m = d.getMinutes(); 
//	var se = d.getSeconds(); 
//	var timestap=vYear+'-'+(vMon<10 ? "0" + vMon : vMon)+'-'+(vDay<10 ? "0"+ vDay : vDay)+'&nbsp'+(h<10 ? "0"+ h : h)+':'+(m<10 ? "0" + m : m)+':'+(se<10 ? "0" +se : se);
	if(usertype=='0'){//用户
//		html+="<li>";
//		html+="<p class=\"comment_top clearfix\">";
//		html+="<span class=\"headphoto_container\">";
//		html+="<img class=\"comment_headephoto\" src="+headimg+">";
//		html+="</span>";
//		html+="<span class=\"comment_username\">"+username+"</span>";
//		html+="<span class=\"comment_time\">"+timestap+"</span>";		
//		html+="</p>";	
//		html+="<p class=\"comment_bottom\">"+contents+"</p>";
//		html+="</li>";
//		$('.users').prepend(html);
		comment_type='0';
		
	}else if(usertype=='2'){//管理员
//		html+="<li>";
//		html+="<p class=\"comment_top clearfix\">";
//		html+="<span class=\"headphoto_container\">";
//		html+="<img class=\"comment_headephoto\" src="+headimg+">";
//		html+="<img src=\"/static/wechat/assets/images/communication_icon.png\" class=\"communication_icon\">";
//		html+="</span>";
//		html+="<span class=\"comment_username\">"+username+"</span>";
//		html+="<span class=\"comment_time\">"+timestap+"</span>";		
//		html+="</p>";	
//		html+="<p class=\"comment_bottom communication_comments\">"+contents+"</p>";
//		html+="</li>";
//		$('.communications').prepend(html);
		comment_type='1';
	}
	
	ajaxPostAsyncData_share(livecommentadd, {
		"uid": uid,
		"liveid":liveid,
		"comment": contents,
		"username":username,
		"headimg":headimg,
		"type":comment_type,
		"token":token
	}, false, function(data) {
		if(data.code == "40000") {
			$.jBox.tip('评论成功', "success");
			$('.send_contents').val('');
			page=1;
			get_comments();
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
	
}


$('.send_comment').on('click',function(){
	if(uid!=''&&uid!=null&&from!='app'){
	var contents=$('.send_contents').val();
	
		ajaxPostAsyncData_share(liveroleget, {
		"uid": uid,
		"liveid":liveid,
		
	}, false, function(data) {
		if(data.code == "40000") {
			usertype=data.resobj.type;
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
	addcomment(contents,usertype);
	$('.comment-btn').show();
	$('.comments-btn').hide();
	}else{
		$.jBox.tip("请先登录再进行评论！", "error");
		window.setTimeout(function(){
			window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?from=live";
		},1000)
	}
})

//获取评论列表
function get_comments(){
//	if(page>totalpage){
//		return false;
//	}else{
	ajaxPostAsyncData_share(livecommentlist, {
		"page": page,
		"liveid":liveid
	}, false, function(data) {
		if(data.code == "40000") {
			var html='';
			var html1='';
			var rows=data.resobj.rows;
			totalpage=data.resobj.total;
			$.each(rows, function(index, value) {
				var type=rows[index].type;
				if(type=='0'){//用户
				html+="<li>";
				html+="<p class=\"comment_top clearfix\">";
				html+="<span class=\"headphoto_container\">";
				html+="<img class=\"comment_headephoto\" src="+rows[index].headimg+">";
				html+="</span>";
				html+="<span class=\"comment_username\">"+rows[index].username+"</span>";
				html+="<span class=\"comment_time\">"+rows[index].createtime+"</span>";		
				html+="</p>";	
				html+="<p class=\"comment_bottom\">"+rows[index].comment+"</p>";
				html+="</li>";
				
				
			}else{//管理员
				
					
					html+="<li>";
					html+="<p class=\"comment_top clearfix\">";
					html+="<span class=\"headphoto_container\">";
					html+="<img class=\"comment_headephoto\" src="+rows[index].headimg+">";
					html+="<img src=\"/static/wechat/assets/images/communication_icon.png\" class=\"communication_icon\">";
					html+="</span>";
					html+="<span class=\"comment_username\">"+rows[index].username+"</span>";
					html+="<span class=\"comment_time\">"+rows[index].createtime+"</span>";		
					html+="</p>";	
					html+="<p class=\"comment_bottom communication_comments\">"+rows[index].comment+"</p>";
					html+="</li>";
					//icon='1';
					
				
				
			
			}
		})
			if(page=='1'){
				$('.users').html(html);
				//$('.communications').html(html1);
			}else{
				$('.users').append(html);
				//$('.communications').append(html1);
			}
			
			
			
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, 'json')
	//}
	//loaded();
}
$(function(){
	get_comments();
})
//loaded();
var timer2;
$(window).scroll(function(){
	if(page>totalpage){
		return false;
	}else{
	 clearTimeout(timer2);
          timer2 = setTimeout(function() {
            var scrollTop = $(document.body).scrollTop();　　
            var scrollHeight = $('body').height();　　
            var windowHeight = innerHeight;
            var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
//          console.log('滑动高度:'+scrollTop,'窗口高度:'+windowHeight,'整体高度:'+scrollHeight);
           	if(scrollTop==scrollHeight-windowHeight){
           		page++;
           		get_comments();
           	}
          },1000)
          }
})
$(document).on('click','.appointment-btn',function(e){//预约
	e.stopPropagation();
	if(uid!=''&&uid!=null&&uid!=undefined){
			
				ajaxPostAsyncData(liveappointsave, {
				"uid": uid,
				"liveid":liveid
			}, false, function(data) {
				if(data.code == "40000") {
					$.jBox.tip('预约成功！', "success");
					appointstatu='1';
					var appointnum_add=Number($('.appointnum').html())+1;
					$('.appointnum').html(appointnum_add);
					$('.appointment-btn').hide();
				} else {
					$.jBox.tip(data.info, "error");
				}
			}, "json");
			
		
	}else{
		$.jBox.tip('请先登录再进行预约!', "error");
		setTimeout(function(){
					window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?from=live";
				},2000)
	}
})

$(document).on('click','.live_playbtn',function(e){
	window.location.href="/static/wechat/live/live/show.html";
})