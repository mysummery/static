/**
 * Created by gaocl on 2016/8/24.
 */

function loadData() {
	var uid = getCookie("cookie_brsy_h5_uid");
	ajaxPostAsyncData(groupbuystat_get, {
		"uid": uid
	}, false, function(data) {
		if($.trim(data.code) == "40000") {
			var count = 0;
			var cancount = 0;
			var splitcount = 0;
			var salecount = 0;
			if(data.resobj != null) {
				count = data.resobj.count;
				cancount = data.resobj.cancount;
				splitcount = data.resobj.splitcount;
				salecount = data.resobj.salecount;
				jihuocount = data.resobj.jihuocount;
//				jihuolv = Math.ceil(jihuolv * 10000) / 100 + '%';
				studycount = data.resobj.studycount;
				giftcount = data.resobj.giftcount;
				studytotal = data.resobj.studytotal;
				gifttotal = data.resobj.gifttotal;
				if(studytotal == '0' && gifttotal == '0') {
					$('.card_count').hide();
				}
				if(studytotal == '0' && gifttotal != '0') {
					$('.study_all').hide();
					$('.gift_all').removeClass('all');
					$('.gift_all').removeClass('bgl');
					$('.gift_card').addClass('big');
					$('.gift_card').addClass('bgl');
					$('.gift').addClass('bgr');
					$('.gift').addClass('small');

				}
				if(studytotal != '0' && gifttotal == '0') {
					$('.gift_all').hide();
					$('.study_all').removeClass('all');
					$('.study_all').removeClass('bgr');
					$('.study_card').addClass('big');
					$('.study_card').addClass('bgl');
					$('.study').addClass('bgr');
					$('.study').addClass('small');
				}
			}
			$("#teamBuyCanCount").html(cancount);
			$("#card_count1").html(splitcount);
			$("#card_count2").html(salecount);
			$('#split_count').html(splitcount);
			$("#jihuocount").html(jihuocount);
			$('#groupbuy_count').html(count);
			$('.gift_total').html(gifttotal);
			$('.study_total').html(studytotal);
			$('.gift_surplus').html(giftcount);
			$('.study_surplus').html(studycount);
			setCookie("cookie_brsy_h5_teambuy_stat_count", count);
			setCookie("cookie_brsy_h5_teambuy_stat_cancount", cancount);
			setCookie("cookie_brsy_h5_teambuy_stat_splitcount", splitcount);
			setCookie("cookie_brsy_h5_teambuy_stat_salecount", salecount);
			setCookie("cookie_brsy_h5_teambuy_stat_jihuocount", jihuocount);
		} else {
			$.jBox.tip(data.info, '');
		}
	}, 'json')

}

function toTeamBuy() {
	window.location.href = '/static/wechat/src/self/wantgroup/iwantto_groupbuying.html';
}

function toSplit() {
	window.location.href = '/static/wechat/src/self/wantsplit/iwantto_split.html';
}

function toTurn() {
	var count = $("#groupbuy_count").html();
	var cancount = $("#teamBuyCanCount").html();
	var gifttotal = $(".gift_total").html();
	var studytotal = $(".study_total").html();
	window.location.href = '/static/wechat/src/self/zhuancard/zhuan_card.html?count=' + count + "&cancount=" + cancount + "&gifttotal=" + gifttotal + "&studytotal=" + studycount;
}
loadData();