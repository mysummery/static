/**
 * 初始化页面
 */
function initEdit() {
	var mycode=getQueryString("mycode");
	$("#mycode").html(mycode);
	var xuliehaoType=getQueryString("xuliehaoType");
	/* modified by 张明月 at 2016.11.17 for 修改判断防止正常注册跳入不显示邀请码的页面 begin */
	if(xuliehaoType=='2'||xuliehaoType=='3'){
	/* test modified by 张明月 at 2016.11.17 for 增加判断防止正常注册跳入不显示邀请码的页面 end */
		$('.mycode_button').hide();
		$('.join_container').html("<p class=\"us\">加入李强365让我们一起学习 一起走向成功！</p>");
		$('.join').hide();
		$('.image_container').html("<img src=\"/static/forAPP/images/share_img.png\" style=\"width:100%;\">");
		$('.describe').css('margin-top','1rem');
		$('body').css('padding-top','3rem');
		}
}

