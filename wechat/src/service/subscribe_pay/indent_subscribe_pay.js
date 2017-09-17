/* added by 张明月 at 2016.11.18 for 修改选中样式 begin */
var xuliehaoType=getQueryString('xuliehaoType');
var courseid=getCookie("cookie_brsy_h5_courseid");//课程id
var orderid=getQueryString('orderid');//订单号
var price=getQueryString("price");//价格
var subid=getCookie("cookie_brsy_h5_subid");//专栏id
var from=getQueryString("from");
var way=getQueryString("way");
var shareTag = getQueryString("shareTag");
var token = getQueryString("token");
var uid = getCookie("cookie_brsy_h5_uid");
var mycode = getCookie("cookie_brsy_h5_mycode");//邀请码
var beicode;//被邀请码
var obj;//是否会员
$('.charge').html(price);
$(function(){
	//充值或竞价
if(from=='charge'){
	$('.amount>span').html('支付金额');
	document.title="支付";
	$('#pay').html('立即支付');
	$('.yb').parents('li').hide();
	$('.wid ul.form li a.wx').css('border-bottom','none');
	//充值
	if(way!='answerpay'){
	$('.ye').parents('li').hide();
	$('.yb').parents('li').show();
	$('.wid ul.form li a.wx').css('border-bottom','1px solid #dfdfdf');
}
}
//提问
if(from=='live'){
	$('.amount>span').html('支付金额');
	document.title="支付";
	$('#pay').html('立即支付');
	$('.yb').parents('li').hide();
	$('.wid ul.form li a.wx').css('border-bottom','none');
	
}
//小微店
if(from=='myshop'){
	$('.amount>span').html('需付款');
	document.title="付款方式";
	$('#pay').html('确认付款');
}


ajaxPostAsyncData_share(slectInfoByUid, {
	"token": token,
	"uid": uid,
	"type": 1
}, true, function(data) {
	if(data.code == "40000") {
		obj = data.resobj.vipstate;
		beicode = data.resobj.parentcode;
		$('.wallet_balance').html('￥' + data.resobj.money);
	}
}, 'json')
//console.log(price);

})

function check_input(a) {
	$(a).prop('checked','true');
	$('input_check').not(a).prop('checked', 'false');
}

function label(a) {
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.prop('checked', 'true');
	$('input_check').not(b).prop('checked', 'false');
	
	
}
/* added by 张明月 at 2016.11.18 for 修改选中样式 end */

//确认
function queren() {
	

	
			
				/* modified by 张明月 at 2016.11.18 for 修改value获取方式（因为布局改变了） begin */
				var value = $("#value").val();
				//alert(value);
				/* modified by 张明月 at 2016.11.18 for 修改v	alue获取方式（因为布局改变了） end */
				if("2" == value) {
					
							var redirectUri = escape(api + "/static/wechat/src/service/tiaozhuan/subscribe_scope.html?arg=" + uid + ":" + mycode + ":" + beicode +":"+orderid+ ":1" + ":" + shareTag + ":" + token+ ":" + from);
							var action_getCodeByUserInfo = weixingz_auth + "?redirectUri=" + redirectUri + "&scope=snsapi_userinfo&courseid="+courseid;
							window.location.href = action_getCodeByUserInfo;
				} 
				/* added by 张明月 at 2016.11.18 for 增加易宝支付 begin */
				else if("4" == value) {
							ajaxPostAsyncData_share(yeepay_sign, {
								"token":token,
								"uid": uid,
								"orderId":orderid,//订单号
								"channelType": "APP"
							}, false, function(datas) {
								if(datas.code == "40000") {
									var obj = datas.resobj;
									window.location.href = obj;
								}
							}, 'json');
						

				} 
				//余额支付
				else if("5" == value) {
					
						
							ajaxPostAsyncData_share(walletpay, {
								"token":token,
								"uid": uid,
								"orderId":orderid,//订单号
								"channelType": "APP"
							}, false, function(datas) {
								if(datas.code == "40000") {
									$.jBox.tip('支付成功！', "success");
									window.setTimeout(function(){
										if(from=='charge'){
										window.location.href="/static/wechat/src/self/indent/indent.html?paystate=success";
									}else if(from=='live'){
										window.location.href="/static/wechat/live/live/show.html";
									}else if(from=='myshop'){
										window.location.href="/static/wechat/src/self/myshop/apply_shop/apply_success/apply_success.html";
									}
									else{
										window.location.href="/static/wechat/src/index/special/special_play/special_play.html?courseid="+courseid+"&freestate=2"+"&subid="+subid;
									}
									},1000)
									
									
								}else{
									$.jBox.tip(datas.info, "error");
								}
							}, 'json');
				

				}
				else {
					alert("选项有误！");
				}
			
	
}

//取消遮罩层
function close_() {
	$(".zhe_").hide();
}

//function onBridgeReady(obj) {
//
//	WeixinJSBridge.invoke(
//		'getBrandWCPayRequest', {
//			"appId": appid, //公众号ID，由商户传入  
//			"timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数
//			"nonceStr": obj.nonceStr, //支付签名随机串，不长于 32 位
//			"package": obj.package, //统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//			"signType": obj.signType, //微信签名方式：MD5
//			"paySign": obj.paySign //微信支付签名
//		},
//
//		function(res) {
//			if(res.err_msg == "get_brand_wcpay_request:ok") {
//				var beicode = $("#mycode").val();
//				setCookie('cookie_brsy_h5_huiyuan', '2', 7);
//				window.location.href = "/static/wechat/src/index/shipin_index.html"; //支付成功，跳转的页面
//			} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
//		}
//	);
//}



