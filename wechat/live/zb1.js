// 初始化
// RongIMClient.init(appkey, [dataAccessProvider],[options]);
// appkey:官网注册的appkey。
// dataAccessProvider:自定义本地存储方案的实例，不传默认为内存存储，自定义需要实现WebSQLDataProvider所有的方法，此参数必须是传入实例后的对象。
RongIMClient.init("c9kqb3rdcv39j");
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
    }});

 // 消息监听器
 RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                   // 发送的消息内容将会被打印
                //console.log(message.content.content);
                 $('.list').prepend('<li>'+message.content.content+'</li>');
                 console.log('收到信息')
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
                // do something...
                
                console.log('收到小灰条')
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
            case RongIMClient.MessageType.PersonMessage:
                // do something...
                console.log('自定义消息')
                break;
            default:
                // 自定义消息
                console.log('自定义消息1')
                // do something...
        }
    }
});
// 初始化。

var token = "cDOQnOdIuKjSIvD4Shkmiy/aHjUnCAdSqhmrKuMWPDUNcbk3K5hWM46RDgtfC19AjC73uVFQMz8iD2+sCfbSSg==";

// 连接融云服务器。
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
              console.log(errorCode);
            }
      });
function send(){
	 // 定义消息类型,文字消息使用 RongIMLib.TextMessage
	 var content=$('#notice').val();
 var msg = new RongIMLib.TextMessage({content:content,extra:"附加信息"});
 //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
 //var msg = RongIMLib.TextMessage.obtain("hello");
 //var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊
 var conversationtype = RongIMLib.ConversationType.CHATROOM;//聊天室
 var targetId = "365"; // 聊天室Id
 RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                // 发送消息成功
                onSuccess: function (message) {
                    //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                    $('.list').prepend('<li>'+content+'</li>');
                    console.log("Send successfully");
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
            }
        );
}
//getConversationList示例
//同步消息列表
// RongIMClient.getInstance().getConversationList({
//    onSuccess: function(list) {
//      console.log(list);
//    },
//    onError: function(error) {
//       // do something...
//    }
//  },null);
RongIMLib.RongIMEmoji.init();
var emojis = RongIMLib.RongIMEmoji.emojis;
console.log(emojis[0].innerHTML);
//$('.list').prepend(emojis[0].innerHTML);
$.each(emojis, function(index, value) {
	$('.emojis').prepend(emojis[index].innerHTML);
})
var chatRoomId = "365"; // 聊天室 Id。
var count = 1;// 拉取最近聊天最多 50 条。
var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
function join(){
	RongIMClient.getInstance().joinChatRoom(chatRoomId, count, {
  onSuccess: function() {
       // 加入聊天室成功。
       console.log('加入聊天室成功。');
  },
  onError: function(error) {
    // 加入聊天室失败
  }
});
}
function showemoji(){
	$('.emojis').show();
}
$('.emojis span').live('click',function(){
	var emoji=$(this).html();
	//console.log(emoji);
	$('.list').prepend('<li>'+emoji+'</li>');
	$('.emojis').hide();
})
// 初始化播放器
    var player = new prismplayer({
        id: "J_prismPlayer", // 容器id
        source: "http://cloud.video.taobao.com/play/u/2554695624/p/1/e/6/t/1/fv/102/28552077.mp4",// 视频地址
        autoplay: false,    //自动播放：否
        width: "100%",       // 播放器宽度
        height: "300px",
        isLive:true,
        cover: "http://dev.liqiang365.com/static/wechat/assets/images/letter_top.png",

    });
   $('.prism-controlbar').remove();
    $('.prism-big-play-btn').css({left:'50%',top:'50%',marginLeft:'-45px',marginTop:'-45px'})
    // 监听播放器的pause事件
    // player.on("pause", function() {
    //     alert("播放器暂停啦！");
    // });
    
    $('video').attr("x5-video-player-type","h5");
    //$('video').attr("autoplay","true");
    //$('video').attr("x5-video-orientation","portrait");
    $('video').attr("x-webkit-playsinline","true");
    $('video').attr("playsinline","true");
    $('video').attr("x5-video-player-fullscreen","true");
    

    $('video').get(0).addEventListener("x5videoenterfullscreen", function(){
 
      window.onresize = function(){
 
      $('video').get(0).style.width = window.innerWidth + "px";
     
      $('video').get(0).style.height = window.innerHeight + "px";
     
    }
    $('.prism-controlbar').remove();
     
    })

   
    
    $('video').get(0).addEventListener("x5videoexitfullscreen", function(){

      window.onresize = function(){
 
          $('video').get(0).style.width = window.innerWidth + "px";
         
          $('video').get(0).style.height = 300 + "px";
         
        }
     
    })

   //创建消息
var messageName = "PersonMessage"; // 消息名称。
var objectName = "s:person"; // 消息内置名称，请按照此格式命名。
var mesasgeTag = new RongIMLib.MessageTag(true,true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
var propertys = ["name","age"]; // 消息类中的属性名。
RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,propertys);

    $("#J_prismPlayer").toggle(
      function () {
       player.play()
      },
      function () {
        player.pause()
      }
    );