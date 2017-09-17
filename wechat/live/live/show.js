//页面初始化为body添加高度，保证定位准确
$('body').get(0).style.width = window.innerWidth + "px";
$('body').get(0).style.height = window.innerHeight + "px";
$('.all-question-list').get(0).style.height = window.innerHeight + "px";

var WEB_XHR_POLLING = true;
var userId = getCookie('cookie_brsy_h5_uid');
var mineUserId = getCookie('cookie_brsy_h5_uid');
var _height = window.innerHeight + "px";
var watchURLStr;
var userName = getCookie('cookie_brsy_h5_name');//用户名
var userHeadImgUrl = getCookie('cookie_brsy_h5_imgurl');//用户头像
var base64; //头像转成base64
var chatRoomId; // 聊天室 Id。
var streamName; //直播流
var appName;
var liqiangPullUrl; //直播域名
var userType; //用户角色
var liveId = getQueryString('liveId'); //房间ID
var shareTitle; //分享标题
var shareBrief; //分享简介
var groupbuylevel = 0; //团购等级
var grade = 0; //用户等级
var groupbuylevelimg = ''; //团购等级图片
var gradeimg = ''; //用户等级图片
var Rgroupbuylevelimg; //收到团购等级图片
var Rgradeimg; //收到用户等级图片
var supQId; //支持问题id
var orderId; //支付id
var orderToken = getCookie('cookie_brsy_h5_token'); //支付token

	//获取直播ID,流名
		//如果没有liveId

if(liveId == '' || liveId == 'null' || liveId == 'undefined' || liveId == null){
	ajaxPostAsyncData_share(https_domain + '/live/list', {}, false, function(data) {
		if (data.code == '40000'){
			//如果直播不存在
			if ( data.resobj[0] == undefined ) {
				alert('直播已结束!');
				window.location.href = '/static/wechat/src/index/shipin_index.html';
			}
			liveId = data.resobj[0].id;
			//获取直播房间号
			ajaxPostAsyncData_share(https_domain + '/live/get', {
				"id": liveId,
				"uid": userId
			}, false, function(data) {
				if (data.code == '40000'){
					chatRoomId = data.resobj.roomid;
					appName = data.resobj.appname;
					liqiangPullUrl = "http://" + data.resobj.livedomain;
					streamName = data.resobj.streamname;
					//老师信息
					$('.chatroom-num p:eq(0)').html(data.resobj.username);
					//直播名称
					shareTitle = data.resobj.livename;
					document.title = data.resobj.livename;
					//分享简介
					shareBrief = data.resobj.intro;
					//老师头像
					$('.teacher-img img').attr('src', data.resobj.headimgurl);
					creatWatchURLStr();
				}else {
					console.log(data.info)
				}
			}, 'json');

		}else {
			console.log(data.info)
		}
	}, 'json'); 
}else {
	//获取直播房间号
	ajaxPostAsyncData_share(https_domain + '/live/get', {
		"id": liveId,
		"uid": userId
	}, false, function(data) {
		if (data.code == '40000'){
			chatRoomId = data.resobj.roomid;
			appName = data.resobj.appname;
			liqiangPullUrl = "http://" +  data.resobj.livedomain;
			streamName = data.resobj.streamname;
			//老师信息
			$('.chatroom-num p:eq(0)').html(data.resobj.username);
			//直播名称
			shareTitle = data.resobj.livename;
			document.title = data.resobj.livename;
			//分享简介
			shareBrief = data.resobj.intro;
			//老师头像
			$('.teacher-img img').attr('src', data.resobj.headimgurl);
			creatWatchURLStr();
		}else {
			console.log(data.info)
		}
	}, 'json');
}

//鉴权
function creatWatchURLStr(){
	var privateKey = "liqiang365";
	var rand = "0";
	var uid = "0";
	var curTimeString = Date.parse(new Date()) + 7200000;
	curTimeString = curTimeString / 1000;
	var liveUrl =  "/" + appName + "/" + streamName + ".m3u8-" + curTimeString + "-" + rand + "-" + uid + "-" + privateKey;
	var md5URL = hex_md5(liveUrl);
	var auth_key = curTimeString + "-" + rand + "-" + uid + "-" + md5URL;
	watchURLStr = liqiangPullUrl + "/" + appName + "/" + streamName + ".m3u8?auth_key=" + auth_key;
	return watchURLStr;
}

var creatPlayer = null;
	//判断流是否连通
function ajaxStatus(){
	$.ajax({
	    url: watchURLStr,
	    type: "GET",
	    data: {
	        //Set an empty response to see the error
	        xml: "<response></response>"   
	    },
	    aysns: true, //异步请求，不影响进入聊天室
	    dataType:"jsonp",
	    success: function(xml, textStatus, xhr) {
	    },
	    complete: function(xhr, textStatus) {
	        if(xhr.status == '200') {
	        	var player = new prismplayer({
				    id: "J_prismPlayer", // 容器id
				    source: watchURLStr,// 视频地址
				    autoplay: true,    //自动播放：是
				    width: "100%",    // 播放器宽度
				    height: _height,
				    preload: true,	//播放器自动加载
				    isLive: true,
				    cover: "/static/wechat/assets/images/live_bg.png",
				    notShowTips: true,
				    showBarTime: '0',
				    extraInfo: {
				    	"liveRetry": 1
				    }
				});

				//设置播放器属性
				$('video').attr("x5-video-player-type","h5");
				$('video').attr("x5-video-orientation","portrait");
				$('video').attr("x-webkit-playsinline",false);
				$('video').attr("playsinline",false);
				$('video').attr("autoplay",false);
				$('#test').css({'width': '0', 'height': '0'});
				//删除控制条
				$('.prism-controlbar').remove();
				// 播放按钮
				$('.prism-big-play-btn').css({left:'50%',top:'50%',marginLeft:'-2.4rem',marginTop:'-2.4rem'})
				clearInterval(creatPlayer);
				creatPlayer = null;
				//loadByUrl(watchURLStr, 0)
	        }
	    }
	});
}
// ajaxStatus();

 creatPlayer = setInterval(function(){

 	ajaxStatus();
 	creatWatchURLStr()

 }, 5000)
	
/*
*
*聊天室
*
*/
	//未有问题列表时，禁止滑动屏幕
//$("body").on('touchmove',function(event) { event.preventDefault(); }, false);

	//字符串倒序方法
function reverseStr(str) {
    userId = str.split('').reverse().join('');
};

	//获取30位随机字符串
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
};

	//图片转换base64
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}


	//获取token
var token ;
	//如果用户未登录,禁止聊天
if ( userId == '' || userId == 'undefined' || userId == null ) {
	userId = randomWord(false, 30);
	userName = '匿名用户';
	userHeadImgUrl = '/static/wechat/assets/images/default_headimg.png';
	$('#send-msg').attr('readonly', true);
	$('#send-btn').hide();
	$('#manager-btn').hide();
	$('#login-btn').show();
}else {
	//获取用户角色

	ajaxPostAsyncData_share(https_domain + '/live/user/role/get', {
		"uid": userId,
		"liveid": liveId
	}, false, function(data) {
		if (data.code == '40000'){
			userType = data.resobj.type;
		}else {
			console.log(data.info)
		}
	}, 'json');
	//如果是管理员
	if ( userType == '2' || userType == '3' ) {
		$('#manager-btn').show();
	}else {
		$('#send-btn').show();
		//获取用户等级&团购等级
		var userToken = getCookie('cookie_brsy_h5_token');
		ajaxPostAsyncData_share(https_domain + '/user/get', {
			"token": userToken,
			"uid": userId,
			"type": "1"
		}, false, function(data) {
			if (data.code == '40000'){
				groupbuylevel = data.resobj.groupbuylevel;
				grade = data.resobj.grade;
				//团购等级
				switch (groupbuylevel) {
					//钻石vip
					case 1:
						groupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_4500.png" alt="" />'
					break;
					//联合发起人
					case 2:
						groupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_25000.png" alt="" />'
					break;
					//高级合伙人
					case 3:
						groupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_65000.png" alt="" />'
					break;
					//创始股东
					case 4:
						groupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_180000.png" alt="" />'
					break;
					default:
						groupbuylevelimg = '';
				};
				//用户等级
				switch (grade) {
					//vip学员
					case 'vip学员':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_vip.png" alt="" />';
						grade = 1;
					break;
					//创客
					case '创客':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_maker.png" alt="" />';
						grade = 2;
					break;
					//助理讲师
					case '助理讲师':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_earynx.png" alt="" />';
						grade = 3;
					break;
					//讲师
					case '讲师':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_lecturer.png" alt="" />';
						grade = 4;
					break;
					//国内游
					case '国内游':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_domestic.png" alt="" />';
						grade =5;
					break;
					//海外游
					case '海外游':
						gradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_overseas.png" alt="" />';
						grade =6;
					break;
					default:
						gradeimg = '';
						grade = 0;
				};
			}else {
				console.log(data.info)
			}
		}, 'json');
	}

	
	//倒序
	reverseStr(userId);
	//隐藏登录
	$('#login-btn').hide();
	//登录后如果用户名为空or头像为空
	if ( userName == '' || userName == 'undefined' || userName == 'null' || userName == null){
		userName = '未命名用户'
	}else {
		userName = decodeURI(userName, 'utf-8');
	}
	if ( userHeadImgUrl == '' || userHeadImgUrl == 'undefined' || userHeadImgUrl == 'null' || userHeadImgUrl == null ){
		userHeadImgUrl = '/static/wechat/assets/images/default_headimg.png'
	}
}

//判断用户是否为被T用户
ajaxPostAsyncData_share(https_domain + '/chat/chatroom/user/block/list', {
	chatroomId: chatRoomId
}, false, function(data) {
	var kickWord = data.resobj.users;
	if(data.code == '40000'){
		if(kickWord.indexOf("userId=" + userId) != '-1'){
			$.jBox.tip('您被踢出直播间', "info");
			setTimeout( function(){
				window.location.href = '/static/wechat/src/index/shipin_index.html'
			}, 1000);
		}
	}else {
		console.log(data.info)
	}
}, 'json');

	//获取token
ajaxPostAsyncData_share(https_domain + '/chat/user/getToken', {
	"userId": userId,
	"name": userName,
	"portrait": userHeadImgUrl
}, false, function(data) {
	if (data.code == '40000'){
		token = data.resobj.token;
		$('.chatroom-img').prepend("<img src=" + userHeadImgUrl + ">");
	}else {
		console.log(data.info)
	}
}, 'json');

	//初始化
RongIMClient.init("6tnym1br6j1t7");
	//emoji
RongIMLib.RongIMEmoji.init();
var emojis = RongIMLib.RongIMEmoji.emojis;
$.each(emojis, function(index, value) {
	$('.emojis').prepend(emojis[index].innerHTML);
})

$(document).on('click', '#emoji-btn', function(){
	$('.emojis').toggle();
})

$(document).on('click', '.emojis span', function(){
	var emoji=$(this).html();
	$('#send-msg').val($('#send-msg').val() + emoji);
	$('.emojis').hide();
})

var count = 0;// 拉取最近聊天最多 50 条。
var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
var conversationtype = RongIMLib.ConversationType.CHATROOM;//聊天室
var targetId = chatRoomId; // 聊天室Id
var _html = '';	//拼接问题列表
var j = 0; //问题列表序号
var userInfo = {
	id: userId,
	name: userName,
	portrait: userHeadImgUrl
};
	//注册自定义消息
// var messageName = "ManageMsg"; // 消息名称。
// var objectName = "s:ManageMsg"; // 消息内置名称，请按照此格式命名。
// var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
// var propertys = ["_msg"]; // 消息类中的属性名。
	//管理员消息
RongIMClient.registerMessageType("ManageMsg","app:ManageMsg",new RongIMLib.MessageTag(true,true),["content"]);
	//T人消息
RongIMClient.registerMessageType("KickMsg","app:KickMsg",new RongIMLib.MessageTag(true,true),["content","kickUserID", "kickUserName"]);
	//禁言消息
RongIMClient.registerMessageType("BanMsg","app:BanMsg",new RongIMLib.MessageTag(true,true),["content","banUserID","bandUserName"]);
	//开始竞价
RongIMClient.registerMessageType("StartBiddingMsg","app:StartBiddingMsg",new RongIMLib.MessageTag(true,true),["content"]);
	//结束竞价
RongIMClient.registerMessageType("StopBiddingMsg","app:StopBiddingMsg",new RongIMLib.MessageTag(true,true),["content"]);
	//直播结束
RongIMClient.registerMessageType("LiveEndMsg","app:LiveEndMsg",new RongIMLib.MessageTag(true,true),["content"]);
	//支付成功返回消息
var newPayArr = [];
RongIMClient.RegisterMessage.PayMsg = function(message){
		newPayArr = [];
		newPayArr.push(message);
		this.messageName = "PayMsg";
		this.encode = function(){}
		this.decode = function(message){}
   }
RongIMClient.RegisterMessage.PayMsg();
RongIMClient.registerMessageType('PayMsg','app:PayMsg',new RongIMLib.MessageTag(true,true),new RongIMClient.RegisterMessage.PayMsg());
	//问题列表
var newQuestionArr = [];
RongIMClient.RegisterMessage.QuestionMsg = function(message){
		newQuestionArr = [];
		newQuestionArr.push(message);
		this.messageName = "QuestionMsg";
		this.encode = function(){}
		this.decode = function(message){}
   }
RongIMClient.RegisterMessage.QuestionMsg();
RongIMClient.registerMessageType('QuestionMsg','app:QuestionMsg',new RongIMLib.MessageTag(true,true),new RongIMClient.RegisterMessage.QuestionMsg());

	// 设置连接监听状态 （ status 标识当前连接状态）
	// 连接状态监听器
RongIMClient.setConnectionStatusListener({
	onChanged: function (status) {
		switch (status) {
		//链接成功
			case RongIMLib.ConnectionStatus.CONNECTED:
				console.log('链接成功'); 
			break;
			//正在链接
			case RongIMLib.ConnectionStatus.CONNECTING:
				console.log('正在链接');
			break;
			//重新链接
			case RongIMLib.ConnectionStatus.DISCONNECTED:
				console.log('断开连接');
			break;
			//其他设备登录
			case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
				console.log('其他设备登录');
			break;
			//网络不可用
			case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
				console.log('网络不可用');
			break;
		}
	}
});
var swiperFlag = true;

// 消息监听器
RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                // 发送的消息内容将会被打印
                //团购等级
                //需要将json字符串转为json对象
                message.content.extra = JSON.parse( message.content.extra );
                //团购等级
				switch (message.content.extra.groupbuylevel) {
					//钻石vip
					case 1:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_4500.png" alt="" />'
					break;
					//联合发起人
					case 2:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_25000.png" alt="" />'
					break;
					//高级合伙人
					case 3:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_65000.png" alt="" />'
					break;
					//创始股东
					case 4:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_180000.png" alt="" />'
					break;
					default:
						Rgroupbuylevelimg = '';
				};
				//用户等级
				switch (message.content.extra.grade) {
					//vip学员
					case 1:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_vip.png" alt="" />'
					break;
					//创客
					case 2:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_maker.png" alt="" />'
					break;
					//助理讲师
					case 3:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_earynx.png" alt="" />'
					break;
					//讲师
					case 4:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_lecturer.png" alt="" />'
					break;
					//国内游
					case 5:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_domestic.png" alt="" />'
					break;
					//海外游
					case 6:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_overseas.png" alt="" />'
					break;
					default:
						Rgradeimg = '';
				};
               	$('.msg-content').get(0).innerHTML += ('<p>' + Rgradeimg + Rgroupbuylevelimg + message.content.user.name + '：<span>' + message.content.content + '</span></p>');
               	//跟随滚动条
               	$('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
                break;
            case RongIMClient.MessageType.VoiceMessage:
                // 对声音进行预加载                
                // message.content.content 格式为 AMR 格式的 base64 码
                RongIMLib.RongIMVoice.preLoaded(message.content.content);
                break;
            case RongIMClient.MessageType.ImageMessage:
                // do something...
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.LocationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.RichContentMessage:
                // do something...
                break;
            case RongIMClient.MessageType.DiscussionNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.InformationNotificationMessage:
           
            	message.content.extra = JSON.parse( message.content.extra );

            	//团购等级
				switch (message.content.extra.groupbuylevel) {
					//钻石vip
					case 1:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_4500.png" alt="" />'
					break;
					//联合发起人
					case 2:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_25000.png" alt="" />'
					break;
					//高级合伙人
					case 3:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_65000.png" alt="" />'
					break;
					//创始股东
					case 4:
						Rgroupbuylevelimg = '<img class="groupbuylevelimg" src="/static/wechat/assets/images/live_user_180000.png" alt="" />'
					break;
					default:
						Rgroupbuylevelimg = '';
				};
				//用户等级
				switch (message.content.extra.grade) {
					//vip学员
					case 1:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_vip.png" alt="" />'
					break;
					//创客
					case 2:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_maker.png" alt="" />'
					break;
					//助理讲师
					case 3:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_earynx.png" alt="" />'
					break;
					//讲师
					case 4:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_lecturer.png" alt="" />'
					break;
					//国内游
					case 5:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_domestic.png" alt="" />'
					break;
					//海外游
					case 6:
						Rgradeimg = '<img class="gradeimg" src="/static/wechat/assets/images/live_user_overseas.png" alt="" />'
					break;
					default:
						Rgradeimg = '';
				};
                // do something...
                $('.msg-content').get(0).innerHTML += ('<p class="entry-hint">' + Rgradeimg + Rgroupbuylevelimg + message.content.user.name + '<span>' + message.content.message + '</span></p>');
                //android
                if(message.content.user.portrait == '' || message.content.user.portrait == 'undefined' || message.content.user.portrait == 'null' || message.content.user.portrait == null){
                	//ios
                	if(message.content.user.icon == '' || message.content.user.icon == 'undefined' || message.content.user.icon == 'null' || message.content.user.icon == null){
                		message.content.user.portrait = '/static/wechat/assets/images/default_headimg.png';
                	}else {
                		message.content.user.portrait = message.content.user.icon;
                	}
                	
                }
                $('.chatroom-img').prepend("<img src='" + message.content.user.portrait + "'/>");
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
                break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something...
                break;
            case RongIMClient.MessageType.CommandMessage:
                // do something...
                break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something...
                break;
            case RongIMClient.MessageType.ManageMsg:
            	//管理员消息
                // do something...
                $('.msg-content').get(0).innerHTML += ('<p class="warden-msg"><img src="/static/wechat/assets/images/live_user_manager.png" alt="" />' + message.content.content + '</p>');
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
                break;
            case RongIMClient.MessageType.BanMsg:
            	//禁言消息
            	$('.msg-content').get(0).innerHTML += ('<p class="ban-msg">' + '<span>' + message.content.bandUserName + '</span>' + message.content.content + '</p>');
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
            	break;
            case RongIMClient.MessageType.KickMsg:
            	//T人消息
            	if ( message.content.kickUserID == userId ) {
            		$.jBox.tip('您被踢出直播间', "error");
					setTimeout( function(){
						window.location.href = '/static/wechat/src/index/shipin_index.html'
					}, 1000);
            	}

            	$('.msg-content').get(0).innerHTML += ('<p class="kick-msg">' + '<span>' + message.content.kickUserName + '</span>' + message.content.content + '</p>');
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
            	break;
            case RongIMClient.MessageType.StartBiddingMsg:
            	//开始竞价
            	console.log('开始竞价');
            	$('.question-bid').show();
            	break;
            case RongIMClient.MessageType.StopBiddingMsg:
            	//结束竞价
            	console.log('结束竞价')
            	$('.question-bid').hide();
            	break;
            	//支付成功返回消息
            case RongIMClient.MessageType.PayMsg:
            	$('.msg-content').get(0).innerHTML += ('<p class="pay-msg">' + newPayArr[0] + '</p>');
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
            	break;

            case RongIMClient.MessageType.LiveEndMsg:
            	//直播结束
            	$('.msg-content').get(0).innerHTML += ('<p class="end-msg">直播结束</p>');
                $('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
                $.jBox.tip('直播结束！', 'alert');                
                setTimeout(function() {
                	window.location.href = '/static/wechat/src/index/shipin_index.html'
                }, 2000);
            	break;
            case RongIMClient.MessageType.QuestionMsg:
            	console.log('问题列表')
            	//问题列表
            	if ( $('.question-list').css('display') != 'none' ){
            		_html = '';
	            	j = 0;
	            	$('.question-list-content').html('');
	            	_html += '<div class="question-list">';
	            	$.each(newQuestionArr[0], function(i){
	            		if( i < 5 ) {
	            			j = i + 1;
	            			_html += '<div class="question-sublist" data-id=' + newQuestionArr[0][i].questionid + '><div class="question-information">';
	            			_html += '<strong>' + newQuestionArr[0][i].createName + '</strong>';
	            			_html += '<i>' + j + '</i>';
	            			_html += '<p><span><marquee loop="-1" behavior="alternate" scrollamount="3">';
	            			_html += newQuestionArr[0][i].question;
	            			_html += '</marquee></span></p></div>';
	            			_html += '<div class="question-operate clearfix">';
	            			_html += '<div class="question-support fr"><i></i><span>' + newQuestionArr[0][i].appiontNum + '</span></div>';
	            			_html += '<div class="question-money fr"><i></i><span>' + newQuestionArr[0][i].payMoney + '</span></div>';
	            			_html += '</div>';
	            			_html += '</div>';
	            		}
	            	});
	            	_html += '</div>';
	            	_html += '<div class="question-slide">';
					_html += '<i id="question-slide-btn"></i>';
					_html += '<p>左滑查看更多</p></div>';
	            	
	            	$('.question-list-content').append(_html);
            	}

            	//立Flag，swiper只调用一次
            	if ( swiperFlag ) {
            		var tabsSwiper = new Swiper('#tabs-container',{
					    speed:500,
					    resistanceRatio: 0,
					    iOSEdgeSwipeDetection : true,
					    iOSEdgeSwipeThreshold : 0,
					    //滑动开始
					    onSlideChangeStart: function(){
							$(".tabs .current").removeClass('current')
							$(".tabs a").eq(tabsSwiper.activeIndex).addClass('current') 
					    },
					    //滑动结束
					    onSlideChangeEnd: function(){
					    	if(tabsSwiper.activeIndex == 1){
					    		$('.chatroom-input').hide();
					    		$('.all-question-go-back').show();
					    		var supportUserId = getCookie('cookie_brsy_h5_uid');
					    		ajaxPostAsyncData_share(https_domain + '/livequestion/list', {
									"liveid": liveId,
									"uid": supportUserId
								}, false, function(data) {
									if (data.code == '40000'){
										var htmlQ = '';
										var j = 0;
										$('.all-question-list').html('');
										$.each(data.resobj, function(i) {
											j = i + 1;
											htmlQ += '<div class="all-question-sublist" data-id='+ data.resobj[i].id +'><div class="all-question-sublist-head">';
											htmlQ += '<i>' + j + '</i><span>' + data.resobj[i].username + '</span>';
											htmlQ += '<p>￥<span>' + data.resobj[i].money + '</span></p>';
											htmlQ += '</div>';
											htmlQ += '<div class="all-question-sublist-body">';
											htmlQ += '<h6>' + data.resobj[i].question + '</h6>';
											htmlQ += '</div>';
											htmlQ += '<div class="all-question-sublist-foot clearfix">';
											if ( data.resobj[i].support == '0' ) {
												htmlQ += '';
											}else {
												htmlQ += '<strong>已支持￥' + data.resobj[i].support + '</strong>';
											}
											if ( data.resobj[i].isLike == '1' ){
												htmlQ += '<span class="support-num active fr"><i></i><b>' + data.resobj[i].likeCount + '</b></span>';
											}else {
												htmlQ += '<span class="support-num fr"><i></i><b>' + data.resobj[i].likeCount + '</b></span>';
											}
											htmlQ += '<span class="fr active-color">支持</span>';
											htmlQ += '</div></div>';
										});
										$('.all-question-list').append(htmlQ);
									}else {
										console.log(data.info)
									}
								}, 'json');
					    	}else {
					    		$('.all-question-go-back').hide();
					    		$('.chatroom-input').show();
					    		//$('body').get(0).style.height = window.innerHeight + "px";
					    	}
					    }
					});
					swiperFlag = false;
            	}
            	break;
            default:
                // 自定义消息
                // do something... 
        }
    }
});

//连接服务器
RongIMClient.connect(token, {
	onSuccess: function(userId) {
		console.log("Login successfully." + userId);
	},
	onTokenIncorrect: function() {
		console.log('token无效');
	},
	onError:function(errorCode){
		var info = '';
		switch (errorCode) {
			case RongIMLib.ErrorCode.TIMEOUT:
				info = '超时';
			break;
			case RongIMLib.ErrorCode.UNKNOWN_ERROR:
				info = '未知错误';
			break;
			case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
				info = '不可接受的协议版本';
			break;
			case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
				info = 'appkey不正确';
			break;
			case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
				info = '服务器不可用';
			break;
		}
	}
});


//加入&退出聊天室，发送消息
var chatRoomObj = {
	//加入聊天室
	joinChatRoom: function() {
		RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
			onSuccess: function() {
				// 加入聊天室成功。
				console.log('加入聊天室成功。');
			},
			onError: function(error) {
				// 加入聊天室失败
			}
		});
			//获取聊天室信息
		RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count, order, {
			onSuccess: function(chatRoom) {
				$('.chatroom-num p:last span').html(chatRoom.userTotalNums);
			},
			onError: function(error) {
				// 获取聊天室信息失败。
			}
		});
	},
	//退出聊天室
	quitChatRoom: function() {
		RongIMClient.getInstance().quitChatRoom(chatRoomId, {
			onSuccess: function() {
			// 退出聊天室成功。
				
			},
			onError: function(error) {
			// 退出聊天室失败。
			}
		});
	},
	//发送消息
	sendMsg: function() {
		var _html = document.getElementById('send-msg').value;
		var msg = new RongIMLib.TextMessage({content:_html,extra: '{"groupbuylevel": ' + groupbuylevel + ',"grade":' + grade + '}',user: userInfo});
		RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
			// 发送消息成功
			onSuccess: function (message) {

				//message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				$('.msg-content').get(0).innerHTML += ('<p class="mine-msg">' + gradeimg + groupbuylevelimg + message.content.user.name + '：<span>' + message.content.content + '</span></p>');
				$('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
			},
			onError: function (errorCode,message) {
				var info = '';
				switch (errorCode) {
				case RongIMLib.ErrorCode.TIMEOUT:
					info = '超时';
				break;
				case RongIMLib.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
				break;
				case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
					info = '在黑名单中，无法向对方发送消息';
				break;
				case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
					info = '不在讨论组中';
				break;
				case RongIMLib.ErrorCode.NOT_IN_GROUP:
					info = '不在群组中';
				break;
				case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
					info = '不在聊天室中';
				break;
				default :
					info = x;
				break;
				}
				console.log('发送失败:' + info);
			}
		});
	},
	//发送图片消息
	sendImgMsg: function(base64) {
		var base64Str = base64;
		var imageUri = userHeadImgUrl; // 上传到自己服务器的 URL。
		var msg = new RongIMLib.ImageMessage({content:base64Str,imageUri:imageUri});
		RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    
                },
                onError: function (errorCode,message) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                            info = '在黑名单中，无法向对方发送消息';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                            info = '不在讨论组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_GROUP:
                            info = '不在群组中';
                            break;
                        case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                            info = '不在聊天室中';
                            break;
                        default :
                            info = '1';
                            break;
                    }
                    console.log('发送失败:' + info);
                }
            }
        );
	},
	//发送information
	sendInfo: function() {
		//发送XXX进入直播间
		var msg = new RongIMLib.InformationNotificationMessage({"message": "进入直播间", extra: '{"groupbuylevel": ' + groupbuylevel + ',"grade":' + grade + '}',"user": userInfo});
		RongIMClient.getInstance().sendMessage(conversationtype,targetId, msg, {
		    onSuccess: function (message) {
		        // do something...
		        //发送小灰条
		        
		        
		    },
		    onError: function (errorCode) {
		　　　　 // do something...
				
		    }
		})
	},
	//管理员发送消息
	sendWarden: function() {
		var _html = document.getElementById('send-msg').value;
		var msg = new RongIMClient.RegisterMessage.ManageMsg({content:_html});
	    RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
	        onSuccess: function (message) {
	        	$('.msg-content').get(0).innerHTML += ('<p class="warden-msg"><img src="/static/wechat/assets/images/live_user_manager.png" alt="" />' + message.content.content + '</p>');
				$('.msg-content').get(0).scrollTop = $('.msg-content').get(0).scrollHeight;
	        },
	        onError: function (errorCode) {
	        }
	    })
	}
}


//定时获取聊天室人数
setInterval(function(){
	RongIMClient.getInstance().getChatRoomInfo(chatRoomId, count, order, {
		onSuccess: function(chatRoom) {
			$('.chatroom-num p:last span').html(chatRoom.userTotalNums);
		},
		onError: function(error) {
			// 获取聊天室信息失败。
		}
	});
}, 5000);

	//弹出登录modal
$(document).on('click', '#login-btn', function() {
	
	$('.chatroom-login').show();
});
	//确认登录
$('.chatroom-login-box a').eq(0).click(function() {
	window.location.href = '/static/wechat/src/admin/login/upgrade_login.html';
});
	//取消登录
$('.chatroom-login-box a').eq(1).click(function() {
	$('.chatroom-login').hide();
});

	//前往下载APP
$('.user-control i').click(function() {
	window.location.href = '/static/wechat/src/admin/download.html';
});
	//点击 钱数or支持
$(document).on('click', '.active-color', function() {
	supQId = $(this).parents('.all-question-sublist').attr('data-id');
	$('.ask-question-content').show('fast');
	$('.ask-question-content').css({'transform': 'translateY(0)'});
	//钱数
	$('.ask-question-entry').hide();
	$('.support-question').show();
	$('.ask-question-btn').hide();
	$('.support-question-btn').show();
	
	$('.support-question span:eq(0)').html($(this).parents('.all-question-sublist').find('.all-question-sublist-head > span').html());
	$('.support-question span:eq(1)').html($(this).parents('.all-question-sublist').find('.all-question-sublist-body h6').html());
});

$(document).on('click', '.question-money', function() {
	supQId = $(this).parents('.question-sublist').attr('data-id');
	$('.ask-question-content').show('fast');
	$('.ask-question-content').css({'transform': 'translateY(0)'});
	//赞助
	$('.ask-question-entry').hide();
	$('.support-question').show();
	$('.ask-question-btn').hide();
	$('.support-question-btn').show();

	$('.support-question span:eq(0)').html($(this).parents('.question-sublist').find('strong').html());
	$('.support-question span:eq(1)').html($(this).parents('.question-sublist').find('marquee').html());
});

	//点赞
$(document).on('click', '.support-num', function() {
	if ( $(this).hasClass('active') ){
		$.jBox.tip("您已经点过赞了!", "info");
		return false;
	}else {
		var that = this;
		var supportId = $(this).parents('.all-question-sublist').attr('data-id');
		var supportUserId = getCookie('cookie_brsy_h5_uid');
		var supportToken = getCookie('cookie_brsy_h5_token');
		//如果用户未登录
		if(supportUserId == '' || supportUserId == 'undefined' || supportUserId == null) {
			$.jBox.tip("登录后才可以点赞!", "info");
			return false;
		}else {
			ajaxPostAsyncData_share(https_domain + '/livequestion/like', {
				"token": supportToken,
				"id": supportId,
				"uid": supportUserId
			}, false, function(data) {
				if (data.code == '40000'){
					$(that).addClass('active');
					$(that).find('b').html(parseInt($(that).find('b').html()) + 1);
					$.jBox.tip("点赞成功!", "success");
				}else if (data.code == '40007') {
					$.jBox.tip("登录后才可以点赞!", "info");
				}else if (data.code == '40003') {
					$.jBox.tip("数据有误，请重新登录！", "info");
				}else {
					$.jBox.tip(data.info, "info");
				}
			}, 'json');
		}
	}
});

$(document).on('click', ' .question-support', function() {
	if ( $(this).hasClass('active') ){
		$.jBox.tip("您已经点过赞了!", "info");
		return false;
	}else {
		var that = this;
		var supportId = $(this).parents('.question-sublist').attr('data-id');
		var supportUserId = getCookie('cookie_brsy_h5_uid');
		var supportToken = getCookie('cookie_brsy_h5_token');
		if(supportUserId == '' || supportUserId == 'undefined' || supportUserId == null) {
			$.jBox.tip("登录后才可以点赞!", "info");
			return false;
		}else {
			ajaxPostAsyncData_share(https_domain + '/livequestion/like', {
				"token": supportToken,
				"id": supportId,
				"uid": supportUserId
			}, false, function(data) {
				if (data.code == '40000'){
					$(that).addClass('active');
					$(that).find('span').html(parseInt($(that).find('span').html()) + 1);
					$.jBox.tip("点赞成功!", "success");
				}else if (data.code == '40007') {
					$.jBox.tip("登录后才可以点赞!", "info");
				}else if (data.code == '40003') {
					$.jBox.tip("数据有误，请重新登录！", "info");
				}else {
					$.jBox.tip(data.info, "info");
				}
			}, 'json');
		}
		
	}
});

//聚焦后列表隐藏，失焦后列表打开

$(document).on('focus', '#send-msg', function() {
	//键盘挡住输入框
	var target = this;
	setTimeout(function(){
		target.scrollIntoViewIfNeeded();
	},400);
	
	if ( $('.question-list').css('display') == 'none' ){
		
	}else {
		$('#question-slide-btn').css({ transform: 'rotateX(180deg)' });
		$('.question-list').slideUp();
	}		
})

$(document).on('blur', '#send-msg', function() {
	$('#question-slide-btn').css({ transform: 'rotateX(0deg)' });
	$('.question-list').slideDown();
});

// document.getElementById('send-msg').scrollIntoView(false);
 

//点击发送信息
	//普通用户发送消息
document.getElementById('send-btn').onclick = function() {
	
	if(document.getElementById('send-msg').value != ''){

		ajaxPostAsyncData_share(https_domain + '/chat/chatroom/user/gag/list', {
			chatroomId: chatRoomId
		}, false, function(data) {
			var MyWord = data.resobj.users;
			if(data.code == '40000'){
				if(MyWord.indexOf("userId=" + userId) != '-1'){
					$.jBox.tip('您已被禁言', "error");
					return false;
				}
			}else {
				console.log(data.info)
			}
		}, 'json');
		chatRoomObj.sendMsg()
	}
	//清空输入框值
	document.getElementById('send-msg').value = '';
}

	//管理员发送消息
document.getElementById('manager-btn').onclick = function() {
	
	if(document.getElementById('send-msg').value != ''){
		chatRoomObj.sendWarden()
	}
	//清空输入框值
	document.getElementById('send-msg').value = '';
}

//点击问题列表显隐
$(document).on('click', '#question-slide-btn', function(){
	$(this).toggle(
		function() {
			$(this).css({ transform: 'rotateX(180deg)' })
			$('.question-list').slideUp();
		}, function() {
			$(this).css({ transform: 'rotateX(0deg)' })
			$('.question-list').slideDown();
		}
	);
});

//问题竞价
$(document).on('click', '.question-bid img', function() {
	$('.ask-question-content').show('fast');
	$('.ask-question-content').css({'transform': 'translateY(0)'});
	$('.ask-question-entry').show();
	$('.ask-question-btn').show();
	$('.support-question-btn').hide();
	$('.support-question').hide();
});

//关闭问题竞价
$(document).on('click', '.ask-qusetion-close img', function() {
	$('.ask-question-content').css({'transform': 'translateY(100%)'})
	$('.ask-question-content').hide(1000);
});

//选择钱数
$(document).on('click', '.change-money li', function() {
	$('.custom-money').hide();
	$('.change-money li').removeClass('checked-money');
	$(this).addClass('checked-money');
})

//选择自定义时
$(document).on('click', '.change-money li:eq(-1)', function() {
	$('.custom-money').show();
})

//提问&赞助
$(document).on('click', '.ask-question-btn button', function() {

	if ( mineUserId == null || mineUserId == 'null' || mineUserId == undefined || mineUserId == '' ) {
		$.jBox.tip('登录后才可以提问！', "info");
		return false;
	} 

	if ( !$('.change-money li').hasClass('checked-money') ) {
		$.jBox.tip('请选择提问金额！', "error");
		return false;
	}

	//问题内容
	var questionContent = $('.ask-question-textarea textarea').val();
	if( $.trim(questionContent) == '' ) {
		$.jBox.tip('请输入您的问题', 'info');
		return false;
	};
	var _money;
	//如果选中的是自定义
	if( $('.change-money li:eq(-1)').hasClass('checked-money') ){
		_money = parseInt($('.custom-money input').val());

		//输入值必须是大于0的整数
		if ( _money <= 0 ) {
			$.jBox.tip("最小金额为1元", 'info'); 
			return false;
		}else if ( _money > 8888 ) {
			$.jBox.tip("最大金额为8888元", 'info'); 
			return false;
		}else if ( isNaN(_money) ) {
			$.jBox.tip("请输入金额", 'info'); 
			return false;
		}else {
			//type 提问4， 支持5
			//todo 向后台提交数据，生成问题
			ajaxPostAsyncData_share(https_domain + '/order/save', {
				"token": orderToken,
				"uid": mineUserId,
				"total": _money,
				"type": 4,
				"liveid": liveId,
				"question": questionContent
			}, false, function(data) {

				if ( data.code == '40000' ) {
					//清空输入金钱
					$('.custom-money input').val('');
					orderId = data.resobj.id;
					window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + orderToken + "&from=live"+"&orderid=" + orderId + "&price=" + _money;
				}else if (data.code == '40003') {
					$.jBox.tip("数据有误，请重新登录！", "info");
				}

			}, 'json')
		}
	}else {
		_money = parseInt($('.checked-money').children('span').html());
		ajaxPostAsyncData_share(https_domain + '/order/save', {
			"token": orderToken,
			"uid": mineUserId,
			"total": _money,
			"liveid": liveId,
			"type": 4,
			"question": questionContent
		}, false, function(data) {

			if ( data.code == '40000' ) {
				orderId = data.resobj.id;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + orderToken + "&from=live"+"&orderid=" + orderId + "&price=" + _money;
			}else if (data.code == '40003') {
				$.jBox.tip("数据有误，请重新登录！", "info");
			}

		}, 'json')
	}
});

$(document).on('click', '.support-question-btn button', function() {
	var _money;
	if ( mineUserId == null || mineUserId == 'null' || mineUserId == undefined || mineUserId == '' ) {
		$.jBox.tip('登录后才可以赞助！', "info");
		return false;
	} 

	if ( !$('.change-money li').hasClass('checked-money') ) {
		$.jBox.tip('请选择赞助金额！', "info");
		return false;
	}

	//如果选中的是自定义
	if( $('.change-money li:eq(-1)').hasClass('checked-money') ){
		_money = parseInt($('.custom-money input').val());
		//输入值必须是大于0的整数
		if ( _money <= 0 ) {
			$.jBox.tip("最小金额为1元",'info'); 
		}else if ( _money > 8888 ) {
			$.jBox.tip("最大金额为8888元", 'info'); 
			return false;
		}else if ( isNaN(_money) ) {
			$.jBox.tip("请输入金额", 'info'); 
			return false;
		}else {
			//type 提问4， 支持5
			//todo 向后台提交数据，生成问题
			ajaxPostAsyncData_share(https_domain + '/order/save', {
				"token": orderToken,
				"uid": mineUserId,
				"total": _money,
				"type": 5,
				"liveid": liveId,
				"questionid": supQId 
			}, false, function(data) {

				if ( data.code == '40000' ) {
					//清空输入金钱
					$('.custom-money input').val('');
					orderId = data.resobj.id;
					window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + orderToken + "&from=live"+"&orderid=" + orderId + "&price=" + _money;
				}else if (data.code == '40003') {
					$.jBox.tip("数据有误，请重新登录！", "info");
				}

			}, 'json')
		}
	}else {

		_money = parseInt($('.checked-money').children('span').html());
		ajaxPostAsyncData_share(https_domain + '/order/save', {
			"token": orderToken,
			"uid": mineUserId,
			"total": _money,
			"type": 5,
			"liveid": liveId,
			"questionid": supQId 
		}, false, function(data) {

			if ( data.code == '40000' ) {
				orderId = data.resobj.id;
				window.location.href = "/static/wechat/src/service/subscribe_pay/indent_subscribe_pay.html?token=" + orderToken + "&from=live"+"&orderid=" + orderId + "&price=" + _money;
			}else if (data.code == '40003') {
				$.jBox.tip("数据有误，请重新登录！", "info");
			}

		}, 'json')
	}
});



//等待初始化完毕，自动进入聊天室
window.onload = function() {

	chatRoomObj.joinChatRoom();
	//确保在进入聊天室后在发送info
	setTimeout(function(){
		chatRoomObj.sendInfo();
	},3000)
}


//wx分享

$(document).ready(function() {
	var action_jsapi_config = weixingz_jsapi + "?url=" + encodeURIComponent(location.href.split('#')[0]);
	$.getJSON(action_jsapi_config, null, function(json) {

		var ret = json.resobj;
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: appid, // 必填，公众号的唯一标识
			timestamp: ret.timestamp, // 必填，生成签名的时间戳
			nonceStr: ret.nonceStr, // 必填，生成签名的随机串
			signature: ret.signature, // 必填，签名，见附录1
			jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	});

});

    // 分享给朋友
    
	
wx.ready(function() {
	var href=window.location.href;
	wx.onMenuShareAppMessage({
		    title: shareTitle, // 分享标题
		    desc: shareBrief, // 分享描述
		    link: href, // 分享链接
		    imgUrl: 'http://dev.liqiang365.com/static/wechat/assets/images/share_logo.png', // 分享图标
	      	dataUrl: '',
	      	success: function () { 
			// 用户确认分享后执行的回调函数 
			$.jBox.tip("分享成功.",'success'); 
			}, 
	      fail: function (res) {
	        alert(JSON.stringify(res));
	      }
	    });	
	    wx.onMenuShareTimeline({
	    title: shareTitle, // 分享标题
	    link: href, // 分享链接
	    desc: shareBrief, // 分享描述
	    imgUrl: 'http://dev.liqiang365.com/static/wechat/assets/images/share_logo.png', // 分享图标
	    success: function () { 
	    	$.jBox.tip("分享成功.",'success'); 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
})

