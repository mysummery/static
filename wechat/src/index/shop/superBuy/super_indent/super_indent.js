//localStorage.clear();
"use strict";
var uid = getCookie('cookie_brsy_h5_uid');
setCookie('from', 'market', 7);

//console.log(uid);
var addressless = '';
var money = 0;
var price = 0; //商品单价。
var goodsid; //商品id
var valstotal; //商品总价格
var oldprice; //商品原价
var ids; //超市活动id
var gsId; //规格id
var num; //个数
var colors; //规格
var types; //型号
var vipprice;//vip价格
var addprice; //浮动价
var oldprice;//普通会员价格
var vipstate; //会员状态
var repeatFlag = true; //防止重复提交订单
var getParam = function(key) {
	var lot = location.search;
	var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
	return decodeURIComponent(lot.replace(reg, "$1"));
}

if(document.referrer.indexOf('address') != -1) {
	goodsid = localStorage.goodsid;
	price = localStorage.price;
	valstotal = localStorage.valstotal;
	price = localStorage.price;
	ids = localStorage.ids;
	num = localStorage.num;
	gsId = localStorage.gsId;
	colors = localStorage.colors;
	types = localStorage.types;
	vipprice=localStorage.vipprice;
	addprice = localStorage.addprice;
	vipstate = localStorage.vipstate;
	oldprice = localStorage.oldprice;
} else {
	goodsid = getQueryString("id");
	ids = getQueryString("ids");
	price = getQueryString("price");
	num = getQueryString("num");
	gsId = getQueryString("gsId");
	colors = getParam("color");
	types = getParam("type");
	valstotal = getQueryString("price");
	addprice = getQueryString('addprice'); 
	vipstate = getQueryString('vipstate'); //会员状态


}
if(addprice=="undefined"){
	addprice=0;
}
$('#indent-sub-num-input').val(num);
$('.goods_num').html(num);

//如果全都没有 
if(colors == "无规格") {
	$(".type").hide();
	$(".color").hide();
	//如果有型号无颜色
} else if(colors == "无颜色" || colors == "" || colors == "undefined") {
	$(".color").hide();
	if(types == "undefined") {
		$(".type").hide();
	} else if(types != "undefined" || types != "") {
		$(".type").show();
		$('.querytype').html(types);
	}
} else if(colors != "") {
	//有颜色无型号
	if(types == "undefined" || types == "") {
		$(".color").show();
		$('.querycolor').html(colors);
		//全都有
	} else {
		$(".type").show();
		$('.querytype').html(types);
		$(".color").show();
		$('.querycolor').html(colors);
	}
}

//总价
$('.total_money').html(valstotal);
/* added by 张明月 at 2017.08.23 for 判断是否会员，显示价格的不同样式 begin */
//	超市活动详情 超市活动id查询图片
ajaxPostAsyncData(spMarketget, {
	"id": ids
}, false, function(data) {
	if(data.code = "40000") {
		var appimgurl3 = data.resobj.appimgurl3; //小图
		$(".goods_img").attr("src", appimgurl3);
		vipprice=data.resobj.vipprice;
		if(document.referrer.indexOf('address.html') != -1) {
			oldprice = localStorage.oldprice;
		}else{
			
			oldprice = data.resobj.price;
			oldprice = Number(addprice) + Number(oldprice);
		}
		
		$(".price").html(price);
		$(".invoice .invoice_price").html(oldprice);
		$(".vipprice").html(vipprice);
		
		//判断是否会员，显示价格的不同样式
		if(vipstate == "1") {

			$(".vipprice").addClass('del');
			$(".vipprice").html(Number(vipprice)+Number(addprice));
			$('.huiyuan .blue').css('color','#999');
		} else {
			//如果是会员
			$('.invoice .blue').css('color','#999');
			$('.huiyuan .fr').css('color','#00a0e9');
			$(".invoice .invoice_price").addClass('del');
			$(".vipprice").html(price);
			$(".invoice .invoice_price").html(oldprice);
		}
		
	} else {
		$.jBox.tip("查询失败" + data.info, "error");
	}
}, "json");
/* added by 张明月 at 2017.08.23 for 判断是否会员，显示价格的不同样式 end */
//超市详情，商品id查询名称
ajaxPostAsyncData(superlightningDetail, {
	"id": goodsid,
}, false, function(data) {
	if(data.code == "40000") {
		var zc_title = data.resobj.name; //商品名
		$('.goods_name').html(zc_title);
	} else {
		$.jBox.tip(data.info, "error");
	}
}, 'json');

$('.close').live('click', function() {
		$(this).parents('.cancel_tc').hide();
		$('.cover').hide();
	})


var numAdd = document.getElementById('indent-sub-num-add');
var numMinus = document.getElementById('indent-sub-num-minus');
var numInput = document.getElementById('indent-sub-num-input');
//创建方法
const numHandle = {
	//增加 1
	addHandle: function() {

		numInput.value = parseInt(numInput.value) + 1;
		if(numInput.value > 99) {
			numInput.value = 99;
			$.jBox.tip("单笔订单最多购买99件", "error");
		}
		$('.goods_num').html(numInput.value);
		valstotal = parseFloat(numInput.value) * parseFloat(price);
		valstotal = Number(valstotal).toFixed(2);
		$('.total_money').html(valstotal);
	},
	//减少 1
	minusHandle: function() {
		//当数值大于1
		if(parseInt(numInput.value) > 1) {
			numInput.value = parseInt(numInput.value) - 1;
			$('.goods_num').html(numInput.value);
			valstotal = parseFloat(numInput.value) * parseFloat(price);
			valstotal = Number(valstotal).toFixed(2);
			$('.total_money').html(valstotal);

		} else {
			return false;
		}
	}
};
//点击 +
numAdd.onclick = () => {
	numHandle.addHandle();
};
//点击 -
numMinus.onclick = () => {
	numHandle.minusHandle();
};

//切换type
$('.indent-sub-type ul li, .indent-sub-invoice-content ul li').click(function() {
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
});

//发票显示
$('.label-switch input').click(function() {
	$('.invoice-information-all').slideToggle(300);
});
//选择个人发票
$('.invoice-information-change a:eq(0)').click(function() {
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	$('.edit-corporate-name').slideUp();
});
//选择公司发票
$('.invoice-information-change a:eq(1)').click(function() {
	$(this).siblings().removeClass('current');
	$(this).addClass('current');
	$('.edit-corporate-name').slideDown();
});
//获取商品规格详情
$(function() {
	var uid = getCookie("cookie_brsy_h5_uid");
	if(document.referrer.indexOf('address.html') != -1) {
		window.id = getQueryString("addressid");
		window.addressid = getQueryString("addressid");
		$('.name').html(getParam("name"));
		$('.phone').html(getQueryString("phone"));
		$('.address_bottom').html(getParam("address"));
	} else {
		ajaxPostAsyncData(https_domain + '/useraddress/list', {
			"uid": uid
		}, false, function(data) {
			if(data.code == '40000') {
				var resobj = data.resobj;
				if(data.resobj.length != 0) {
					$.each(resobj, function(i) {
						//默认地址
						if(resobj[i].first == 1) {
							$('.name').html(resobj[i].username);
							$('.phone').html(resobj[i].phone);
							$('.address_bottom').html(resobj[i].province + resobj[i].city + resobj[i].street);
							window.addressid = resobj[i].id;
						}

					});
				} else {
					$('.address_bottom').hide();
					$('.phone').hide();
					$('.name').html('请添加收货地址');
					addressless = 'less';
				}

			} else {
				//					$.jBox.tip(data.info, 'error');
			}
		}, 'json');
	}

	//是从address跳转
	if(document.referrer.indexOf('address.html') != -1) {
		//			商品原价

		$('#indent-sub-num-input').val(localStorage.num); //个数
		$('.goods_num').html(localStorage.num); //数量
		$('.company_name').val(localStorage.tittle); //发票抬头
		$('.invoice-information-change a').eq(localStorage.change).trigger('click'); //个人还是单位
		$('.company_name').val(localStorage.company_name); //单位名称
		$('.contents_choose li').eq(localStorage.contents_choose).trigger('click'); //发票内容
		$('.xy_number').val(localStorage.xy_number); //纳税人序列号
		$('.tips textarea').val(localStorage.liuyan); //留言内容
		$(".price").html(localStorage.price); //单价
		$('.total_money').html(localStorage.valstotal); //总价

	}

})

$(document).on('click', '.addresses', function(e) {
	localStorage.goodsid = goodsid; //商品id
	localStorage.price = price; //单价
	localStorage.gsId = gsId; //单价
	localStorage.ids = ids; //超市活动id
	localStorage.valstotal = valstotal; //总价
	localStorage.num = $('#indent-sub-num-input').val(); //个数
	localStorage.colors = $('.querycolor').html(); //规格
	localStorage.vipprice = vipprice; //会员价
	localStorage.addprice = addprice; //浮动价
	localStorage.vipstate = vipstate; //会员标志
	localStorage.oldprice = oldprice; //普通会员价格
	//颜色
	localStorage.types = $('.querytype').html(); //颜色
	localStorage.information = $('.invoice-information-all').css('display'); //是否开发票
	localStorage.change = $('.invoice-information-change a.current').index(); //个人还是单位
	localStorage.tittle = $('.company_name').val(); //发票抬头
	localStorage.company_name = $('.company_name').val(); //单位名称
	localStorage.contents_choose = $('.contents_choose li.current').index(); //发票内容
	localStorage.xy_number = $('.xy_number').val(); //纳税人序列号
	localStorage.liuyan = $('.tips textarea').val(); //留言内容

	if($('.address_bottom').css('display') == 'none') {
		window.location.href = "/static/wechat/src/index/shop/address/add_address/add_address.html";
	} else {
		window.location.href = "/static/wechat/src/index/shop/address/address.html";
	}

})

$('.pay_go').live('click', function() {
	//$('.cover').show();
	//$('.pay_tc').show();
	localStorage.information = $('.invoice-information-all').css('display'); //是否开发票
	if(addressless == 'less') {
		$.jBox.tip('请选择收货地址', "error");
	} else {
		var count = $('#indent-sub-num-input').val(); //商品数量,商品id已定义.goodsid.

		var tittle = $('.company_name').val() + ',' + $('.xy_number').val(); //发票抬头

		if($('.invoice-information-all').css('display') == 'none') { //不开发票
			tittle = '1';
		}
		if($('.invoice-information-all').css('display') == 'block' && $('.invoice-information-change a.current').index() == '1' && $('.company_name').val() == '') {
			//alert($('.invoice-information-all').css('display'));
			//alert($('.invoice-information-change a.current').index());
			//+alert($('.company_name').val());
			$.jBox.tip('请填写发票抬头', "error");
		} else if($('.invoice-information-all').css('display') == 'block' && $('.invoice-information-change a.current').index() == '1' && $('.xy_number').val() == '') {
			$.jBox.tip('请填写纳税人识别码', "error");
		} else if($('.invoice-information-all').css('display') == 'block' && $('.invoice-information-change a.current').index() == '1' && ($('.xy_number').val().length > 20 || $('.xy_number').val().length < 15)) {
			$.jBox.tip('纳税人识别码为15~20位数字与字母组合', "error");
		} else {
			var spec = '';
			if(tittle == '1' && $('.invoice-information-all').css('display') == 'none') { //个人发票
				spec = '0';
			} else {
				spec = $('.contents_choose li.current').index() + 1; //发票类型,addressid已定义，addressid
			}
			var remark = $('.tips textarea').val(); //订单备注
			//var spPurchaseOrder = "http://10.1.1.153:8080/spOrder/subOrder"; //测试
			var spPurchaseOrder = https_domain + "/spOrder/subOrder";
			if(repeatFlag) {
				repeatFlag = false;
				ajaxPostAsyncData(spPurchaseOrder, {
					"id": ids,
					"count": count,
					"gId": goodsid,
					"gsId": gsId,
					"uid": uid,
					"tittle": "1",
					"spec": spec,
					"addressId": addressid,
					"remark": remark,
					"type": "3"
				}, false, function(data) {
					//				alert(data.code);
					if(data.code == "40000") {

						window.orderid = data.resobj.order.id;
						//console.log(orderid);
						var totalprice = $('.totalprice ').html();
						ajaxPostAsyncData(slectInfoByUid, {
							"uid": uid,
							"type": "1"
						}, false, function(data) {
							if(data.code == "40000") {
								window.token = data.resobj.token;
								window.beicode = data.resobj.parentcode;
								window.mycode = data.resobj.usercode;

								window.location.href = "/static/wechat/src/index/shop/indent_handle/indent_pay/indent_pay.html?orderid=" + orderid + "&price=" + totalprice + "&token=" + token;
							}
						}, 'json');

					} else {
						$.jBox.tip(data.info, "error");
						repeatFlag = true;
					}
				}, 'json')
			}
		}

	}

})

function checkinput_zzjs(event) {
	if((event.srcElement.value.toString()).indexOf(".") != -1) {
		if(event.srcElement.value.toString().indexOf(".") == 2) {
			event.srcElement.value = event.srcElement.value.toString().substr(0, 2);
		} else {
			event.srcElement.value = event.srcElement.value.toString().substr(0, 1);
		}
		event.srcElement.select();
	}
	if(Math.floor(event.srcElement.value) != event.srcElement.value) {
		event.srcElement.value = "1";
		event.srcElement.select();
	}
	if(event.srcElement.value > 99) {
		event.srcElement.value = "99";
		event.srcElement.select();
		$.jBox.tip("单笔订单最多购买99件", "error");
	} else if(event.srcElement.value <= 0) {
		event.srcElement.value = "1";
		event.srcElement.select();
	}
	$('.goods_num').html(numInput.value);
	valstotal = Number(price) * $('#indent-sub-num-input').val(); //总价格
	valstotal = Number(valstotal).toFixed(2);
	$('.total_money').html(valstotal);

}