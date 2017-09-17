var zjid = getQueryString("zjid");
    var ryid = getCookie('cookie_brsy_h5_uid');
    var type = getQueryString("type");
    
window.onload = function() {
	if(ryid==''||ryid==null){
    	$('.scstate').hide();
    	$('#download_').show();
    	$('.company').css('margin-bottom','4rem');
    }else{
    	ajaxPostAsyncData(videocollect_get, {
			"videoid": zjid,
			"uid": ryid
		}, false, function(data) {
			//alert(sczjid);
			if(data.code == "40000") {
				if(data.resobj.state==1){
					$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png');
				}else{
					$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png');
				}
				
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');
    }
	
   
    if (type == '1') {
    	if(ryid == "" || ryid == null || ryid == "undefined") {
			$.jBox.tip("该视频先登录才能正常观看,请返回并登录!", "error");
			return false;
		}
    } 

	//请求数据课程主键
	ajaxPostAsyncData_share(selectByzjid, {"id":zjid},false,  function(data) {
		if(data.code == "40000") {
			var shipin_info = data.resobj.introduce;
			window.videoid=data.resobj.id;
			$('#courseinfo').html(shipin_info);
			
			if(data.resobj.freestate == "2") {

				var uid=getCookie('cookie_brsy_h5_uid');
				if(uid==''||uid==null){
					$.jBox.tip("该视频先登录才能观看,请返回并登录!", "error");
					return false;
				}else{
					ajaxPostAsyncData(slectInfoByUid, {
					"uid": uid,
					"type":"1"
				}, false, function(data) {
					var rows = data.resobj;
					if(data.code == "40000") {
						window.huiyuan = rows.vipstate;
						if(huiyuan != "2") {
							$.jBox.tip("该视频需要升级为会员才能观看!", "error");
							return false;
						}
					}

				}, 'json');
			}
				
				
				//var huiyuan = getCookie('cookie_brsy_h5_huiyuan');
				
			}
			//初始化
				/* modefied by 李思远 at 2017.08.28 for 修改获取视频顺序及方法（2->1->3） begin */
			var shipin_url;
			if (data.resobj.url2 == '' || data.resobj.url2 == undefined) {
				if (data.resobj.url1 == '' || data.resobj.url1 == undefined) {
					shipin_url = data.resobj.url3;
				}else {
					shipin_url = data.resobj.url1;
				}
			}else {
				shipin_url = data.resobj.url2;
			}


			var shipin_img = data.resobj.imgappurl;
			$("video").attr("src", shipin_url);

		} else {
			$.jBox.tip("视频资源错误!", "error");
		}
	}, "json")

}

function down() {
	window.location.href = "/static/wechat/src/admin/download.html";
}
function sc(sc) {
	if(ryid == "" || ryid == null || ryid == "undefined") {
			$.jBox.tip("该视频先登录才能收藏,请返回并登录!", "error");
			return false;
		}
	//var sczjid = "";
	if($('.scstate').attr('src') == "/static/wechat/assets/images/star_yes.png") {
		var type=2;
		$('.scstate').attr('src', '/static/wechat/assets/images/star_no.png'); //收藏状态
	} else {
		$('.scstate').attr('src', '/static/wechat/assets/images/star_yes.png'); //收藏状态
		var type=1;
	}
		
		ajaxPostAsyncData(videocollect_update, {
			"videoid": videoid,
			"type":type,
			"uid": ryid
		}, false, function(data) {
			//alert(sczjid);
			if(data.code == "40000") {
				if(type==2){
					$.jBox.tip('删除收藏成功', 'success');
				}else{
					$.jBox.tip('收藏成功', 'success');
				}
				
			} else {
				$.jBox.tip(data.info, '');
			}
		}, 'json');

}