//输入框聚焦，失焦时样式改变
$('.user-name input').focus(function(){
	$('.user-name').css('borderColor','#00a0e9');
});
$('.user-tel input').focus(function(){
	$('.user-tel').css('borderColor','#00a0e9');
});
$('.user-name input').blur(function(){
	$('.user-name').css('borderColor','#eaeaea');
});
$('.user-tel input').blur(function(){
	$('.user-tel').css('borderColor','#eaeaea');
});
//减号操作
$('.choose-seat-num a:even').click(function() {
	var num = parseInt($(this).next().val());
	if(num > 0) {
		num = num - 1;
		$(this).next().val(num);
	}else {
		return false;
	}
});
//加号操作
$('.choose-seat-num a:odd').click(function() {
	var num = parseInt($(this).prev().val());
	num = num + 1;
	$(this).prev().val(num);
});

var regu = /^1[3|4|5|8|6|7][0-9]\d{4,8}$/;
function trims(str){  
	return str.replace(/[ ]/g,""); //去除字符算中的空格  
}  
//提交按钮
$('.choose-seat-submit button').click(function(){
	var username = $('.user-name input').val();
	var phone = $('.user-tel input').val();
	var seattype1 = $('#crown-num').val();
	var seattype2 = $('#diamond-num').val();
	var seattype3 = $('#vip-num').val();
	var re = new RegExp(regu);
	if( username == '' || username == null ){
		$.jBox.tip("请输入姓名!", "error");
		return false;
	}else if ( phone == '' || phone == null ||  trims(phone).length != 11 || !re.test(phone)){
		$.jBox.tip("请输入正确的电话号码!", "error");
		return false;
	}else if ( seattype1 == 0 && seattype2 == 0 && seattype3 == 0) {
		$.jBox.tip("请至少选择一种席位!", "error");
	}else {
		ajaxPostAsyncData('http://dev-api2.liqiang365.com/booking/insert', {
			"username": username,
			"phone": phone,
			"count1": seattype3,
			"count2": seattype2,
			"count3": seattype1
		}, false, function(data){
			if(data.code == '40000'){
				$.jBox.tip("订购成功!", "success");
				$('.user-name input').val('');
				$('.user-tel input').val('');
				$('#crown-num').val('0');
				$('#diamond-num').val('0');
				$('#vip-num').val('0');
			}
		}, 'json')
	}
	
});
