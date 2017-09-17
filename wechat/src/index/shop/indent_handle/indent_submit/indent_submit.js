//localStorage.clear();
//var https_domain = "http://10.1.1.120:8080"; //测试
//console.log(document.referrer);
setCookie('from', 'shop', 7);

var uid = getCookie('cookie_brsy_h5_uid');
var addressless = '';//地址标记
var money = 0;
var price = 0;
var goodsid = '';//商品id
var prices = 0;
var pricesingle = 0;
var m = 0;
var n = 0;
var gsId;
var commissionprice;//总佣金
var commissionprice_hide;//单佣金
var repeatFlag = true; //防止重复提交订单
var fromShop=getQueryString("fromShop");

function check_input(a) {
	$(a).prop('checked', 'true');
	$('input_check').not(a).prop('checked', 'false');
}

function label(a) {
	$(a).addClass('hover');
	$(a).siblings('.chooses').removeClass('hover');
	var label = $(a).find('label');
	$(label).addClass('checked');
	$('#value').val($(label).attr('value'));
	$('label').not($(label)).removeClass('checked');
	var b = $(label).siblings('input');
	b.prop('checked', 'true');
	$('input_check').not(b).prop('checked', 'false');

}
//关闭弹出层
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
			//去掉10的限制
			//if(parseInt(numInput.value) < 10) {
			numInput.value = parseInt(numInput.value) + 1;
			//}

			$('.goods_num').html(numInput.value);
			var price_ = Number($('.price').html());
			$('.total_money').html((numInput.value * price_).toFixed(2));
			var commissionprice_hide= Number($('.commissionprice_hide').html());
			$('.commissionprice').html(numInput.value * commissionprice_hide.toFixed(2));
		},
		//减少 1
		minusHandle: function() {
			//当数值大于1
			if(parseInt(numInput.value) > 1) {
				numInput.value = parseInt(numInput.value) - 1;

				$('.goods_num').html(numInput.value);
				var price_ = Number($('.price').html());
				$('.total_money').html((numInput.value * price_).toFixed(2));
				var commissionprice_hide= Number($('.commissionprice_hide').html());
				$('.commissionprice').html(numInput.value * commissionprice_hide.toFixed(2));

			} else {
				return false;
			}
		}
	}
	//点击 +
numAdd.onclick = () => {
		numHandle.addHandle();
	}
	//点击 -
numMinus.onclick = () => {
	numHandle.minusHandle();
}

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

		if(document.referrer.indexOf('address') != -1) {
			goodsid = localStorage.goodsid;
			price = Number(localStorage.pricesingle);
			pricesingle = Number(localStorage.pricesingle);
			prices = Number(localStorage.price);
			ids = localStorage.ids;

		} else {
			goodsid = getQueryString("id");
			price = getQueryString("price");
			pricesingle = getQueryString("price");
			ids = getQueryString("ids");
		}
		var uid = getCookie("cookie_brsy_h5_uid");
		if(document.referrer.indexOf('address.html') != -1) {
			var getParam = function(key) {
				var lot = location.search;
				var reg = new RegExp(".*" + key + "\\s*=([^=&#]*)(?=&|#|).*", "g");
				return decodeURIComponent(lot.replace(reg, "$1"));
			}

			window.id = getQueryString("addressid");
			window.addressid = getQueryString("addressid");
			$('.name').html(getParam("name"));
			$('.phone').html(getQueryString("phone"));
			$('.address_bottom').html(getParam("address"));
		} else {
			//获取地址
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
					$.jBox.tip(data.info, 'error');
				}
			}, 'json');
		}
		if(document.referrer.indexOf('address.html') != -1) {
			$('.price').html(localStorage.pricesingle);
		}
		//获取商品规格
		var orderPreInfo = https_domain + "/cfcrowfund/orderPreInfo";
		ajaxPostAsyncData(orderPreInfo, {
				"gid": goodsid,
			}, false, function(data) {
				if(data.code == "40000") {
					var colorstr = '';
					var typestr = '';
					var divindex = 0;
					$.each(data.resobj, function(index, value) {
						var value1 = value;
						if(index == "无规格") {
							$(".indent-sub-change-color").hide(); //隐藏颜色

						} else if(index == "无型号") { //全部隐藏
							$(".indent-sub-change-model").hide();
							$.each(value1, function(index, value) {
								//								console.log(value.gsId);
								gsId = value.gsId;

							});
						}

						colorstr += "<li>" + [index] + "</li>";
						divindex++;
						$.each(value1, function(index, value) {
							if(value.type == "") {
								//$(".indent-sub-change-model ").hide(); //如果类型为空隐藏型号
								gsId = value.gsId;
								//								console.log(value.gsId);
							} else {
								//console.log(value);
								if(value.flag == '1') {
									typestr += "<li data-gsId=" + value.gsId + " data-add=" + value.addprice + " class=\"div" + divindex + " light\">" + value.type + "</li>";
								} else {
									typestr += "<li data-gsId=" + value.gsId + " data-add=" + value.addprice + " class=\"div" + divindex + " gray\">" + value.type + "</li>";
								}
							}

						});
						$('.types').html(typestr);
					});
					$('.colors').html(colorstr);
					if(document.referrer.indexOf('address.html') != -1) {
						for(var i = 0; i < $('.colors li').length; i++) {
							if($('.colors li').eq(i).html() == localStorage.colors) {
								//console.log($('.colors li').eq(i).html());
								$('.colors li').eq(i).trigger('click'); //颜色
								n = i;
							}
						}

						var divname = 'div' + (n + 1);
						//console.log(divname);

						for(var j = 0; j < $('.types li.' + divname).length; j++) {
							//							switch($('.types li').eq(j).html()){
							//								case localStorage.types:
							//								$('.types li').eq(j).trigger('click');
							//								break;
							//							}
							//console.log($('.types li').eq(j).html());

							if($('.types li.' + divname).eq(j).html() == localStorage.types) {
								//console.log($('.types li').eq(j).html());
								m = j;
								//console.log(m);
								//规格
							}

						}
						//console.log(divname);
						$('.types li.' + divname).eq(m).trigger('click');
						//console.log($('.types li.'+divname).eq(m).html());
					} else {
						$('.types li.light').eq(0).addClass('current');
						$('.colors li:first-child').addClass('current');
					}

				} else {
					$.jBox.tip(data.info, "error");
				}
			}, 'json')
			//alert(document.referrer);
			//alert(document.referrer.indexOf('address.html'));
			//是从address跳转
		if(document.referrer.indexOf('address.html') != -1) {
			//$('.price').html(localStorage.pricesingle); //价格
			//$('b.price').html(localStorage.price);
			$('.total_money').html(localStorage.price);
			$('.commissionprice').html(localStorage.commissionprice);
			//var vals = localStorage.price;
			//var valsstr = vals.toString();
			//$('.total_money').css('width', valsstr.length / 2 + 1 + 'rem');
			$('#indent-sub-num-input').val(localStorage.num); //个数
			$('.goods_num').html(localStorage.num); //数量
			$('.company_name').val(localStorage.tittle); //发票抬头
			$('.invoice-information-change a').eq(localStorage.change).trigger('click'); //个人还是单位
			$('.company_name').val(localStorage.company_name); //单位名称
			$('.contents_choose li').eq(localStorage.contents_choose).trigger('click'); //发票内容
			$('.tips textarea').val(localStorage.liuyan); //留言内容
			$('.xy_number').val(localStorage.xy_number); //纳税人序列号
			if(localStorage.information == 'block') {
				$('.invoice-information-all').css('display', 'block');
				$('.label-switch input').attr('checked', 'checked');
			} else {
				$('.invoice-information-all').css('display', 'none');
				$('.label-switch input').attr('checked', false);

			}

		} else {

			$('.price').html(price);
			var pr = Number(price).toFixed(2);
			$('.total_money').html(pr);
			$('.commissionprice').html(commissionprice);
			//var valsstr = price.toString();
			//$('.total_money').css('width', valsstr.length / 2 + 1 + 'rem');

		}
		ajaxPostAsyncData(cfcrowfundinfo, {
			"id": ids,
		}, false, function(data) {
			if(data.code == "40000") {
				var zc_appimgurl1 = data.resobj.crowFund.appimgurl3; //图片介绍
				var zc_title = data.resobj.crowFund.name; //众筹名
				$('.goods_name').html(zc_title);
				if(document.referrer.indexOf('address') != -1) {
					$('.commissionprice').html(localStorage.commissionprice);
				} else {
					$('.commissionprice').html(data.resobj.crowFund.commission);
				}
				commissionprice_hide=data.resobj.crowFund.commission;//单佣金
				$('.commissionprice_hide').html(data.resobj.crowFund.commission);
				var token=getCookie("cookie_brsy_h5_token");
				/*ajaxPostAsyncData_share(slectInfoByUid, {
					"token": token,
					"uid": uid,
					"type": 1
				}, true, function(data) {
					if(data.code == "40000") {
						if(data.resobj.ismicro==1){
							//不是店主不显示佣金*/
							$('.commission').hide();
						/*}
					}
				}, 'json')*/
				$('.goods_img').attr('src', zc_appimgurl1)
			} else {
				$.jBox.tip(data.info, "error");
			}
		}, 'json');

	})
	//根据颜色换规格
$(document).on('click', '.colors li', function(e) {
		$('.types li').removeClass('current');
		var index = $(this).index() + 1;
		$(this).addClass('current');
		$(this).siblings('li').removeClass('current');
		//console.log(index);
		var class_ = '.div' + index;
		var classes = '.div' + index + '.light';
		$('.types li').not(class_).hide();
		//$(classes).siblings('li').addClass('gray');
		$(classes).eq(0).addClass('current');
		$(class_).show();
		$(classes).eq(0).trigger('click');
	})
	//不同规格切换
$(document).on('click', '.types li.light', function(e) {

	if(document.referrer.indexOf('address') != -1) {
		price = Number(localStorage.pricesingle);
		prices = Number(localStorage.price);

	} else {
		price = getQueryString("price");
	}
	price = Number(price);
	prices = Number(prices);
	//alert(typeof(price));
	$(this).addClass('current');
	$(this).siblings('li').removeClass('current');
	var type = $(this).html();
	var color = $('.colors li.current').html();
	var addprice = $(this).attr('data-add');
	if(addprice != '') {
		var vals = (Number(price) + Number(addprice)) * $('#indent-sub-num-input').val();
		vals = Number(vals).toFixed(2);
		$('.total_money').html(vals);
		//var vals=$('.total_money').val();
		//alert(typeof(vals));
		//valsstr = vals.toString();
		//$('.total_money').css('width', valsstr.length / 2 + 1 + 'rem');
		if($('#indent-sub-num-input').val() != '1') {
			//price=Number(localStorage.single).toFixed(2);
			//price=
			$('.price').html((Number(price) + Number(addprice)).toFixed(2));
		} else {
			price = $('.total_money').html();
			$('.price').html(price);

		}

	}
	gsId = $('.types li.current').attr('data-gsId'); //商品规格id
	//$(this).attr('data-add','');
	//var goodsColor="http://10.1.1.120:8080/cfcrowfund/goodsColor";
	//	ajaxPostAsyncData(goodsColor, {
	//		"type":type,
	//		"gid": goodsid,
	//	}, false, function(data) {
	//		if(data.code == "40000") {
	//			var colorstr='';
	//			$.each(data.resobj, function(index, value) {
	//				var value1=value;
	//				$.each(value1, function(index, value) {
	//					//console.log(value);
	//				
	//				if(value.color==color&&value.flag=='1'){
	//					colorstr += "<li class=\"current\">"+value.color+"</li>";
	//				}else if(value.color!=color&&value.flag=='1'){
	//					colorstr += "<li>"+value.color+"</li>";
	//				}	
	//				
	//				});
	//							
	//			});
	//			$('.colors').html(colorstr);
	//			if($('.colors li').hasClass('current')){
	//			}else{
	//				$('.colors li:first-child').addClass('current');
	//			}
	//			
	//			
	//		} else {
	//			$.jBox.tip(data.info, "error");
	//		}
	//	}, 'json')
})

$(document).on('click', '.addresses', function(e) {
	localStorage.goodsid = goodsid; //商品id
	localStorage.ids = ids; //众筹ID
	localStorage.price = $('.total_money').html(); //价格
	localStorage.commissionprice = $('.commissionprice').html(); //总佣金
	localStorage.commissionprice_hide = $('.commissionprice_hide').html(); //单佣金
	localStorage.price_ = $('.price').val(); //当前价格
	localStorage.pricesingle = pricesingle; //底价
	localStorage.num = $('#indent-sub-num-input').val(); //个数
	localStorage.colors = $('.colors li.current').html(); //颜色
	localStorage.types = $('.types li.current').html(); //规格
	localStorage.information = $('.invoice-information-all').css('display'); //是否开发票
	localStorage.change = $('.invoice-information-change a.current').index(); //个人还是单位
	localStorage.tittle = $('.company_name').val(); //发票抬头
	localStorage.company_name = $('.company_name').val(); //单位名称
	localStorage.contents_choose = $('.contents_choose li.current').index(); //发票内容
	localStorage.liuyan = $('.tips textarea').val(); //留言内容
	localStorage.xy_number = $('.xy_number').val(); //纳税人序列号
	//localStorage.gid = $('.tips textarea').val(); //留言内容

	if($('.address_bottom').css('display') == 'none') {
		if (fromShop == 'shoplogin') {
			window.location.href = "/static/wechat/src/index/shop/address/add_address/add_address.html?fromShop=" + fromShop;
		}else {
			window.location.href = "/static/wechat/src/index/shop/address/add_address/add_address.html";
		}
	} else {
		if (fromShop == 'shoplogin') {
			window.location.href = "/static/wechat/src/index/shop/address/address.html?fromShop=" + fromShop;
		}else {
			window.location.href = "/static/wechat/src/index/shop/address/address.html";
		}
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
		//var gsId = $('.types li.current').attr('data-gsId'); //商品规格id
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
			//var subOrder = "http://10.1.1.120:8080/spOrder/subOrder"; //测试
			if (repeatFlag) {
				repeatFlag = false;
				ajaxPostAsyncData(subOrder, {
					"id": ids,
					"count": count,
					"gId": goodsid,
					"gsId": gsId,
					"uid": uid,
					"tittle": "1",
					"spec": spec,
					"addressId": addressid,
					"remark": remark,
					"type": '2'
				}, false, function(data) {
					if(data.code == "40000") {
						window.orderid = data.resobj.order.id;
						//console.log(orderid);
						var price = $('.total_money').html();
						ajaxPostAsyncData(slectInfoByUid, {
							"uid": uid,
							"type": "1"
						}, false, function(data) {
							if(data.code == "40000") {
								window.token = data.resobj.token;
								window.beicode = data.resobj.parentcode;
								window.mycode = data.resobj.usercode;
								//localStorage.clear();
								if (fromShop == 'shoplogin') {
									window.location.href = "/static/wechat/src/index/shop/indent_handle/indent_pay/indent_pay.html?orderid=" + orderid + "&price=" + price + "&token=" + token+"&from=zc"+'&fromShop='+fromShop;
								}else {
									window.location.href = "/static/wechat/src/index/shop/indent_handle/indent_pay/indent_pay.html?orderid=" + orderid + "&price=" + price + "&token=" + token+"&from=zc";
								}
								
							}
						}, 'json');

					} else {
						$.jBox.tip(data.info, "error");
						repeatFlag = true;
					}
				}, 'json');
			}
		}

	}

})

function checkinput_zzjs(event) {
	if((event.srcElement.value.toString()).indexOf(".") != -1) {
		var index_of = event.srcElement.value.toString().indexOf(".");
		//if(event.srcElement.value.toString().indexOf(".")==2){
		//event.srcElement.value=10;
		event.srcElement.value = event.srcElement.value.toString().substr(0, index_of);
		//		}else{
		//			event.srcElement.value = event.srcElement.value.toString().substr(0,1);
		//		}

		event.srcElement.select();
	}
	if(Math.floor(event.srcElement.value) != event.srcElement.value) {
		event.srcElement.value = "1";
		event.srcElement.select();
	}
	//去掉10的限制
	//if(event.srcElement.value > 10) {
	//	event.srcElement.value = "10";
	//	event.srcElement.select();
	//} 
	else if(event.srcElement.value <= 0) {
		event.srcElement.value = "1";
		event.srcElement.select();
	}
	//$('b.price').html(numInput.value * price);
	$('.goods_num').html(numInput.value);
	//var totals=(numInput.value * price).toFixed(2);
	$('.total_money').html((numInput.value * price).toFixed(2));
	var commissionprice_hide= Number($('.commissionprice_hide').html());
	$('.commissionprice').html(numInput.value * commissionprice_hide.toFixed(2));
	//var vals = (numInput.value * price).toFixed(2);
	//var valsstr = vals.toString();
	//$('.total_money').css('width', valsstr.length / 2 + 1 + 'rem');
}

function clear() {
	if(document.referrer.indexOf('address') == -1) {
		$('.div1.light').eq(0).trigger('click');
	}

	//localStorage.clear();
}