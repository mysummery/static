window.ryid = getCookie("cookie_brsy_h5_uid");
window.token = getCookie("cookie_brsy_h5_token");
var light_id='';
var t=0;//闪电购倒计时秒数
var live_t=0;//直播倒计时秒数
var liveid='';
var chatroomid;
sessionStorage.removeItem('shopurl');
function loading() {
	var code = getQueryString("code");
	if(ryid != null && token != null) { //$('#self').html("<img src=\"images/self.png\" style=\"width:25%;\">");
		$('#self').html("个人中心");
		$('#self').click(function() {
			var rurl = encodeURIComponent(api + "/static/wechat/src/self/self_center.html");
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
				appid +
				"&redirect_uri=" +
				rurl +
				"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
		})
		/* add by 李思远 at 2017.09.12 for 增加排行榜进入地址 begin */
		$('#ranking-list').click(function() {
			window.location.href = "/static/wechat/src/self/rankandhonor/rankinglist/rankinglist.html";
		});
		/* add by 李思远 at 2017.09.12 for 增加排行榜进入地址 end */
	} else {
		$('#self').html("登录");
		$('#self').click(function() {
			//alert("11");
			window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
		})
		/* add by 李思远 at 2017.09.12 for 增加未登录排行榜进入地址 begin */
		$('#ranking-list').click(function() {
			window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
		});
		/* add by 李思远 at 2017.09.12 for 增加未登录排行榜进入地址 end */

	}
	//专栏
	ajaxPostAsyncData(subjectlist, {}, false, function(data) {
		var rows = data.resobj;
		if($.trim(data.code) == "40000") {
			if(rows==''||rows==null){
				$('.ly_banner').hide();
			}else{
				var str = ''
				$.each(rows, function(index, value) { //课程列表
					if(rows[index].lecturer=='李阳'){
						window.id = rows[index].id;
						$('.ly_banner').attr('src',rows[index].pctopimgurl);
					}
					
				});
			}
			
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');

	//各项入口
	ajaxPostAsyncData(livecombination, {
		"token":token
	}, false, function(data) {
		if(data.code = "40000") {
			if(JSON.stringify(data.resobj)!='{}'){
				//闪电购
			light_id=data.resobj.pruid;//闪电购id
			var small=data.resobj.pruappimgurl;//闪电购图片
			/* modefied by 李思远 at 2017.09.04 for 修改无图片时占位图 begin   */
			if(small == '' || small == undefined) {
				$('.light_banner').attr('src','/static/wechat/assets/images/indexBg.png');
			}else {
				$('.light_banner').attr('src',small);
			}
			/* modefied by 李思远 at 2017.09.04 for 修改无图片时占位图 end   */
			var intDiff=data.resobj.pruendtime;//闪电购倒计时
			
				
			
			if(intDiff!=''&&intDiff!=undefined){
				
				intDiff=intDiff.replace(/-/g,'/');
				var EndTime=new Date(intDiff);
				var NowTime = new Date();
				
				var t =EndTime.getTime() - NowTime.getTime();
				//t=data.resobj.pruendtime;
				t=Math.round(t/1000);
				times(t,'light');
				
			}
			//var intDiff='2017-06-01 12:05:03';
			//众筹
				var shop_img=data.resobj.cfappimgurl;
				$('.shop_banner').attr('src',shop_img);
			//直播
			
			liveid=data.resobj.liveid;
			if(liveid!=undefined&&liveid!=null&&liveid!=''){
				var livephoto=data.resobj.liveappimageurl1;//直播图片
			$('.livephoto').attr('src',livephoto);
			var intDiff_live=data.resobj.livebegintime;
			//var intDiff='2017-06-01 12:05:03';
			intDiff_live=intDiff_live.replace(/-/g,'/');
			var EndTime=new Date(intDiff_live);
			var NowTime = new Date();
			live_t =EndTime.getTime() - NowTime.getTime();
			live_t=Math.round(live_t/1000);
			times(live_t,'live');
			
			
			appointnum=data.resobj.liveappointnum;//预约人数
			$('.appointment-num').html(appointnum+'人已预约');
			if(ryid!=''&&ryid!=null&&ryid!=undefined){
				ajaxPostAsyncData(liveget, {//判断是否已预约
				"id": liveid,
				"uid": ryid
			}, false, function(data) {
				if (data.code == '40000'){
					chatroomid=data.resobj.roomid;//聊天室id
					appointstatu=data.resobj.statu;//是否已预约
					if(appointstatu=='1'){
						$('.appointment-btn').hide();
						
					}
				}else {
					console.log(data.info)
				}
			}, 'json');
			}
			if(live_t<=0){//直播开始显示播放按钮，隐藏倒计时
//				$('.live .count-down-box').hide();
//				$('.live_playbtn').show();
//				$('.live_cover').show();
			$('.appointment-num').html('进入直播');
		}
			}else{
				$('.live').hide();
			}
			}else{
				$('.live').hide();
			}
			
		} else {
			$.jBox.tip(data.info, "error");
		}
	}, "json");
	//专栏列表
	ajaxPostAsyncData(newsubjectlist, {
		"uid":ryid,
		"page":'1'
	}, false, function(data) {
		var rows = data.resobj.rows;
		if(data.code == "40000") {
			if(rows!=''||rows!=null){
				var subjectstr = '';
				//如果专栏列表的内容小于4条，隐去更多按钮
				if(rows.length < 5 ) {
					$('.special_more').hide();
				}
				$.each(rows, function(index, value) { //课程列表
					if(index <= 3){
						subjectstr+='<li class="clearfix" id="'+rows[index].id+'">';
						subjectstr+='<img src="'+rows[index].pctopimgurl+'" class="special_listimg fl">';
						subjectstr+='<div class="special_listcontent fl">';
						subjectstr+='<p class="special_listtop"><span class="special_listname">'+rows[index].subname+'</span>';
						if (rows[index].state == '1') {
							subjectstr+='<span class="special_listprice fr">已订阅</span></p>';
						}else {
							subjectstr+='<span class="special_listprice fr">￥'+rows[index].price+'/年</span></p>';
						}
						subjectstr+='<p class="special_listintro">'+rows[index].intro+'</p>';
						subjectstr+='<p class="special_listupdatetime">'+rows[index].updatetime.substr(0, 10)+'&nbsp;更新</p>';
						subjectstr+='</div>';
						subjectstr+='</li>';
					}
					
				});
				$('#special_list ul').append(subjectstr);
			}
			
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json');
	//闪电购图片及倒计时
	//var fcPurchaselist="http://10.1.1.144:8080/fcPurchase/list";
//	ajaxPostAsyncData(fcPurchaselist, {page:1}, false, function(data) {
//		var rows = data.resobj.rows;
//		if(rows!=''){
//				if($.trim(data.code) == "40000") {
//				var small=rows[0].appimgurl1;
//				//var small="/static/wechat/assets/images/light_banner.jpg";
//				light_id=rows[0].id;
//				$('.light_banner').attr('src',small);
//	//			var intDiff=rows[0].endtime;
//	//			//var intDiff='2017-06-01 12:05:03';
//	//			intDiff=intDiff.replace(new RegExp(/(-)/,'g'),'/');
//	//			EndTime=new Date(intDiff);
//	//			var NowTime = new Date();
//	//			var t =EndTime.getTime() - NowTime.getTime();
//				t=rows[0].diffmillis;
//				t=Math.round(t/1000);
//				times(t,'light');
//			} else {
//				$.jBox.tip(data.info, '');
//			}
//		}
//		
//	}, 'json');
	//众筹图片，使用今日推荐的第一个图
//	ajaxPostAsyncData(todayRecommend, {
//		"page": '1'
//	}, false, function(data) {
//		if(data.code = "40000") {
//			var shop_img=data.resobj.rows[0].big;
//			$('.shop_banner').attr('src',shop_img)
//			
//		} else {
//			$.jBox.tip(data.info, "error");
//		}
//	}, "json");
	//直播
//	var livelist="http://10.1.1.210:8080/live/list";
//	ajaxPostAsyncData(livelist, {
//	}, false, function(data) {
//		if(data.resobj==''){
//			$('.live').hide();
//		}else{
//			if(data.code = "40000") {
//			var livephoto=data.resobj[0].appimageurl1;
//			liveid=data.resobj[0].id;
//			$('.livephoto').attr('src',livephoto);
//			var intDiff_live=data.resobj[0].begintime;
//			//var intDiff='2017-06-01 12:05:03';
//			intDiff_live=intDiff_live.replace(new RegExp(/(-)/,'g'),'/');
//			EndTime=new Date(intDiff_live);
//			var NowTime = new Date();
//			live_t =EndTime.getTime() - NowTime.getTime();
//			live_t=Math.round(live_t/1000);
//			times(live_t,'live');
//			if(live_t<=0){//直播开始显示播放按钮，隐藏倒计时
//				$('.live .count-down-box').hide();
//				$('.live_playbtn').show();
//				$('.live_cover').show();
//			}
//			
//			appointnum=data.resobj[0].appointnum;//预约人数
//			$('.appointment-num').html(appointnum+'人已预约');
//			if(ryid!=''&&ryid!=null&&ryid!=undefined){
//				ajaxPostAsyncData(liveget, {//判断是否已预约
//				"id": liveid,
//				"uid": ryid
//			}, false, function(data) {
//				if (data.code == '40000'){
//					
//					appointstatu=data.resobj.statu;//是否已预约
//					if(appointstatu=='1'){
//						$('.appointment-btn').hide();
//						
//					}
//				}else {
//					console.log(data.info)
//				}
//			}, 'json');
//			}
//			
//		} else {
//			$.jBox.tip(data.info, "error");
//		}
//		}
//		
//	}, "json");
}

function go() {
	var ryid = getCookie('cookie_brsy_h5_uid');
	if(ryid != null) {
		var huiyuan = getCookie("cookie_brsy_h5_huiyuan");
		if(huiyuan == "2") {
			window.location.href = "/static/wechat/src/self/wantgroup/iwantto_groupbuying.html";
		} else {

			$.jBox.tip("您还不是会员，无法团购，请先升级会员！", "error");
		}
	} else {

		window.location.href = "/static/wechat/src/admin/login/upgrade_login.html?code=" + code;
	}
}

function down() {
	window.location.href = "/static/wechat/src/admin/download.html";
}

function loadData() {
	// 判断是否已经登录

	loading();
	//请求数据
	ajaxPostAsyncData(slide, {
		"type":'1'
	}, false, function(data) {
		if(data.code = "40000") {
		 for(var i = 0; i < data.resobj.length; i++){
		 	$(".swiper-container .swiper-wrapper").append('<div class="swiper-slide"><a href="' + data.resobj[i].applinkurl + '"><img class="swiper-img" src=' + data.resobj[i].appimgurl + '></a></div>')
		 }
		} else {
			$.jBox.tip("轮播图查询失败!" + data.info, "error");
		}
	}, "json");
	
	/* 查询八大板块 */
	ajaxPostAsyncData(sfEnlei, {
	}, false, function(data) {
		if(data.code = "40000") {
			//初始化
			var resdata = data.resobj;
			$.each(resdata, function(index,value) {
				switch (resdata[index].id){
					case '1':
/*						var image_1 = document.getElementById('image_1');
						image_1.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_one').html(resdata[index].name);
						break;
					case '2':
/*						var image_2 = document.getElementById('image_2');
						image_2.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_two').html(resdata[index].name);
						break;
					case '3':
/*						var image_3 = document.getElementById('image_3');
						image_3.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_three').html(resdata[index].name);
						break;
					case '4':
/*						var image_4 = document.getElementById('image_4');
						image_4.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_four').html(resdata[index].name);
						break;
					case '5':
/*						var image_5 = document.getElementById('image_5');
						image_5.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_five').html(resdata[index].name);
						break;
					case '6':
/*						var image_6 = document.getElementById('image_6');
						image_6.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_six').html(resdata[index].name);
						break;
					case '7':
/*						var image_7 = document.getElementById('image_7');
						image_7.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_seven').html(resdata[index].name);
						break;
					case '8':
/*						var image_8 = document.getElementById('image_8');
						image_8.style.background = "url(" + resdata[index].appimgurl3 +") no-repeat center ";*/
						$('#fenlei_eight').html(resdata[index].name);
						break;
					default:
						break;
				}
				
			});
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
	var options = document.getElementsByClassName('option');
	for(var i = 0; i < options.length; i++) {
		options[i].onclick = function() {
			var zjid = $(this).attr("name")
			window.location.href = "/static/wechat/src/index/lessons/lessons.html?zjid=" + zjid
		}
	}
	
	//热门
	ajaxPostAsyncData(selectBykcid, {
		"page":page,
		"courseid" : "",
		"type" : "2"
	}, false, function(data) {
		if(data.code == "40000") {
			var tempimg = data.resobj.rows;
			var totalpage = data.resobj.total;
			if(totalpage == 1) {
				$('#scroller-pullUp').hide();
			} else {
				$('#scroller-pullUp').show();
			}
			for(var temp in tempimg) {
//				if(tempimg[temp].kcname.length > 10) {
//					tempimg[temp].kcname = tempimg[temp].kcname.substr(0, 9) + "...";
//				}
				$("#hot .module-context").append('<div class="module-img hot-img "><div class="img"  onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].kcname + '</p></div>')
					// 简单版
				if(tempimg[temp].free == '1') {
					$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"  style="position:relative;" onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '><img src="/static/wechat/assets/images/icon_free.png" style="position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;"></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
				} else {
					$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"   onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
				}

			}
		} else {
			$.jBox.tip("加载热门推荐失败!" + data.info, "error");
		}
	}, "json");
	/* 精选
	 var  recommend = "/appSShipin/selectBytuijian.ph"
	 ajaxPostAsyncData(recommend,{page:1},true, function (data) {
	 if (data.code == "40000") {
	 var tempimg =  data.resobj.rows;
	 for(var temp of tempimg) {
	 $("#splendid .module-context").append('<div class="module-img hot-img "><div class="img"><img src='+temp.imgappurl+'></div><p class="module-p">'+temp.kcname+'</p></div>')
	 }
	 }else{
	 $.jBox.tip("登录失败!" + data.info, "error");
	 }
	 },"json")
	 // vip
	 var vip = "/appSShipin/selectBytuijian.ph?page=1";
	 ajaxPostAsyncData(vip,null,true, function (data) {
	 if(data.code == "40000") {
	 var tempimg =  data.resobj.rows;
	 for(var temp of tempimg) {
	 $("#VIP .module-context").append('<div class="module-img hot-img "><div class="img"><img src='+temp.imgappurl+'></div><p class="module-p">'+temp.kcname+'</p></div>')
	 }
	 }else{
	 $.jBox.tip("登录失败!" + data.info, "error");
	 }
	 },"json");*/

	// 轮播
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'horizontal',
		autoplay: 1000,
		speed: 1000,
		loop: true,
		autoplayDisableOnInteraction: false,
	})
	$('#btn').click(function() {
		mySwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒
	})

}

var page = 1;

function getdataafter() {
	page = page + 1;
	ajaxPostAsyncData(selectBykcid, {
		"page":page,
		"courseid" : "",
		"type" : "2"
	}, false, function(data) {
		if(data.code == "40000") {
			var tempimg = data.resobj.rows;
			var totalpage = data.resobj.total;
//			if(page > totalpage) {
//				return false;
//			} else {
				for(var temp in tempimg) {
//					if(tempimg[temp].kcname.length > 10) {
//						tempimg[temp].kcname = tempimg[temp].kcname.substr(0, 9) + "...";
//					}
					// 简单版
					if(tempimg[temp].free == '1') {
						$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"  style="position:relative;" onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '><img src="/static/wechat/assets/images/icon_free.png" style="position:absolute;width:4.5rem;height:4.5rem;left:0px;top:0px;"></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
					} else {
						$("#hot .module-contexts").append('<div class="module-imgs hot-imgs swiper-slide "><div class="imgs"   onclick="player(\'' + tempimg[temp].id + '\')"><img src=' + tempimg[temp].appimgurl + '></div><p class="module-p">' + tempimg[temp].name + '</p></div>');
					}
				}
//			}
		} else {
			$.jBox.tip("查询失败!" + data.info, "error");
		}
	}, "json");
}

function player(zjid) {
	window.location.href = "/static/wechat/src/service/play/play.html?zjid=" + zjid + "&ryid=" + ryid + "&type=1";
}

$('.ly_banner').live('click',function(){
	window.location.href="/static/wechat/src/index/special/special_liyang.html?id="+id;
})
$('.live').live('click',function(){
	if(ryid==''||ryid==null||ryid==undefined){
		window.location.href="/static/wechat/live/live/live.html";
	}else{
		ajaxPostAsyncData(blocklist, {
		chatroomId:chatroomid
	}, false, function(data) {
		if(data.resobj!=''){
			var rows = data.resobj.users;
		
			//console.log(rows.indexOf(ryid));
			ryid=ryid.split('').reverse().join('');
			if(rows.indexOf(ryid)!=-1){
						$.jBox.tip('您已被踢出当前直播间！', '');
					}else{
						window.location.href="/static/wechat/live/live/live.html";
					}
		}else if(data.code=='40005'){
			window.location.href="/static/wechat/live/live/live.html";
		}
		else{
			window.location.href="/static/wechat/live/live/live.html";
		}
				
		
	}, 'json');
	}
	ryid=ryid.split('').reverse().join('');
	//console.log(live_t);
	//if((live_t<0)||(live_t==0)){
	//	window.location.href="/static/wechat/live/live/show.html";
	//}else{
		
	//}
	
})

//$(document).on('click','.appointment-btn',function(e){//预约
//	e.stopPropagation();
//	//var liveappointsave="http://10.1.1.210:8080/liveappoint/save";
//	if(ryid==''||ryid==null||ryid==undefined){
//			$.jBox.tip('请先登录再进行预约！', "error");
//		}else{
//			ajaxPostAsyncData(liveappointsave, {
//				"uid": ryid,
//				"liveid":liveid
//			}, false, function(data) {
//				
//					if(data.code =="40000") {
//					$.jBox.tip('预约成功！', "success");
//					} else {
//						$.jBox.tip(data.info, "error");
//					}
//				
//				
//			}, "json");
//		}
//})

$(document).on('click','.shop_banner',function(e){
	window.location.href="/static/wechat/src/index/shop/shop_index/shop_index.html";
})
$(document).on('click','.light_banner',function(e){
	if(light_id!=''&&light_id!=undefined){
		window.location.href="/static/wechat/src/index/shop/lightingBuy/lightning_detail.html?id="+light_id;
	}else{
		$.jBox.tip('暂无闪电购！', "error");
	}
	
})
//专栏跳转
$(document).on('click','#special_list li',function(e){
	var id=$(this).attr('id');//专栏id
	window.location.href="/static/wechat/src/index/special/special_liyang.html?id="+id;
})
//跳转专栏列表
$(document).on('click','.special_more',function(e){
	window.location.href="/static/wechat/src/index/special/special_list/special_list.html";
})
//var intDiff = parseInt(120000);//闪电购倒计时总秒数量
//var lives = parseInt(150000);//直播倒计时总秒数量
var timer = null;
//var type='light';//闪电购
//var livetime='live';//直播
//times(lives,livetime);
//times(intDiff,type);
function times(intDiff,type){
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
	if(type=='live'){
		$('#live_day_show').html(day+"天");

		$('#live_hour_show').html(hour);
	
		$('#live_minute_show').html(minute);
	
		$('#live_second_show').html(second);
	}else{
		$('#day_show').html(day+"天");

		$('#hour_show').html(hour);
	
		$('#minute_show').html(minute);
	
		$('#second_show').html(second);
	}

	

	intDiff--;

}, 1000);
}


loadData();