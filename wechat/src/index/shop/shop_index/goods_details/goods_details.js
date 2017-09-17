
var id=getQueryString('id');
var gid='';
var price=0;
var uid = getCookie('cookie_brsy_h5_uid');
//var id='7e138b409f9100';
var type = getQueryString('type');//如果type为shoplink,则是从app分享的页面
if(type!='shoplink'){
	$('.shopMark').hide();
}else{
	$('.shopMark').show();
	var shopurl = document.location.href;//获取当前页面地址
	sessionStorage.shopurl=shopurl;//存入localStorage
}
$('.shopMark i').click(function() {
	$('.shopMark').hide();
});

ajaxPostAsyncData_share(cfcrowfundinfo, {
		"id": id,		
	}, false, function(data) {
		if(data.code == "40000") {
			var amount=data.resobj.crowFund.amount;//众筹总钱数
			var money=data.resobj.crowFund.money;//众筹已筹钱数
			var percent=Number(money)/Number(amount);//已筹百分比
			var initiator=data.resobj.crowFund.initiator;//项目发起人
			var state=data.resobj.crowFund.state;//众筹状态
			//percent=Math.floor(percent);
			percent=Math.round(percent*100);
			var numbers=data.resobj.crowFund.numbers;//参与人数
			var startDay=data.resobj.startDay;//已进行时间
			var endDay=data.resobj.endDay;//剩余时间
			var endTime = data.resobj.crowFund.endtime;//众筹剩余毫秒数
			var currentTime = data.resobj.currentTime;//当期系统时间

			//转换时间格式
			endTime = endTime.replace(new RegExp("-","gm"),"/");
			//结束毫秒数
			endTime = (new Date(endTime)).getTime();

			//判断是否结束
			if (endTime - currentTime <= 0) {
				$('.join').html('众筹已结束');
				$('.join').css('background','rgba(153,153,153,0.5)');
			}else{
				$('.join').addClass('stilljoin');
			}

			// if(endDay<0){
			// 	$('.join').html('众筹已结束');
			// 	$('.join').css('background','rgba(153,153,153,0.5)');
			// }else{
			// 	$('.join').addClass('stilljoin');
			// }


			var appimgurl1=data.resobj.crowFund.appimgurl;//图片介绍
			var videourl=data.resobj.crowFund.videourl;//视频介绍
			var intro=data.resobj.crowFund.intro;//文字介绍
			gid=data.resobj.crowFund.gid;//
			var title=data.resobj.crowFund.name;//众筹名
			
			price=data.resobj.crowFund.price;//商品价格
			var descrip=data.resobj.crowFund.descrip;//详情介绍
			if(price.toString().indexOf('.')==-1){
				price=price+'.00';
			}

			if(state=='-1'){
				state='众筹失败';
			}else if(state=='0'){
				state='众筹未开始';
			}else if(state=='1'){
				state='众筹中';
			}else if(state=='2'){
				state='众筹成功';
			}

			$('.zc_start').html(initiator);
			$('.zc_state').html(state);
			$('.zc_name').html(title);
			$('.zc_intro').html(intro);
			//$('.details_img').attr('src',appimgurl1);
			$('.goods_introduce').html(descrip);
			$('#video').attr('src',videourl);
			$('.day').html(startDay+'天');
			$('.deadline').html(endDay+'天');
			$('.personnum').html(numbers+'人');
			$('.target').html('￥'+amount);
			$('.money').html(money+'元');
			$('.percent').html(percent+'%');
			if(percent>100){
				percent=100;
			}else if(percent<0){
				percent=0;
			}
			
			
			var left=percent-7.6;
			if(left<0){
				left=0;
			}else if(left>84.8){
				left=84.8;
			}
			$('.left').css('width',percent+'%');
			$('.right').css('width',100-percent+'%');
			$('.percent').css('left',left+'%');
		}else{
			$.jBox.tip(data.info, "error");
		}
	}, 'json');

$('#lab').on('click',function(){
	if($(this).hasClass('label_checked')){
		$(this).removeClass('label_checked');
		$("#checkbox-1").prop("checked",true);
	}else{
		$(this).addClass('label_checked');
		$("#checkbox-1").removeAttr('checked');
	}
	
})
$('.stilljoin').on('click',function(){
	if($('#checkbox-1').prop('checked')!=true){
		//alert();
		$.jBox.tip('请先同意协议！', "error");
	}else{
		if (type == "shoplink") {
			window.location.href = '/static/wechat/src/admin/login/upgrade_login.html?from=shoplogin';
		}else {
			window.location.href="/static/wechat/src/index/shop/indent_handle/indent_submit/indent_submit.html?id="+gid+"&price="+price+"&ids="+id;
		}
		
	}
	
})
