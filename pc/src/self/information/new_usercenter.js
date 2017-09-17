
$(function() {
	var uid=getCookie('cookie_brsy_pc_uid');

//编辑信息
	function editInfo() {
		ajaxWebPostAsyncData(slectInfoByUid, {
			"uid": uid,
			"type": "1"
		}, false, function(data) {
			if(data.code == "40000") {
				var resdata = data.resobj;
				var uid = resdata.id;
				var headimg = resdata.headimgurl;
				var groupbuylevel = resdata.groupbuylevel;
                var chikaren = resdata.idcardname;
                
             setCookie('cookie_brsy_pc_chikaren', encodeURI(chikaren,"utf-8"), 7);
             setCookie('cookie_brsy_pc_groupbuylevel', encodeURI(groupbuylevel,"utf-8"), 7);
       
	//			回显信息
			    $("#username").val(resdata.username);
				    $("#account").val(resdata.account);
				    $("#phone").val(resdata.phone);
				    $("#address").val(resdata.address);
				    $("#idcardname").val(resdata.idcardname);
				    $(".photo .photoname").html(resdata.username);
				    $(".photo .levelname").html(resdata.grade);
			    $("input[type='radio'][value='"+resdata.sex+"']").prop("checked",true); 
			    $(".idcardname").html(chikaren);
//         设置头像
			    if (headimg!="") {
			    	 $(".moren").attr("src",headimg).css({
			    		"width":"114px",
			    		"height":"114px"
			    	});
			    }
//			    设置默认头像
			    if (headimg == null){
               	var headimg = "./images/morenphoto.png";
			    	$(".moren").attr("src",headimg).css({
			    		"width":"67px",
			    		"height":"76px",
			    		"position":"relative",
			    		"top":"12px",
			    		"left":"24px"
			    	});
               }
//			    设置王冠
			    if (groupbuylevel== "0") {
			    	$(".levelpic").attr("src","./images/grouplevel1.png");
			    }else if (groupbuylevel== "1") {
			    	$(".levelpic").attr("src","./images/grouplevel2.png");
			    }else if (groupbuylevel== "2") {
			    	$(".levelpic").attr("src","./images/grouplevel3.png");
			    }else if (groupbuylevel== "3") {
			    	$(".levelpic").attr("src","./images/grouplevel4.png");
			    }else if (groupbuylevel== "4") {
			    	$(".levelpic").attr("src","./images/grouplevel5.png");
			    }else if (groupbuylevel== "5") {
			    	$(".levelpic").attr("src","./images/grouplevel6.png");
			    }
		      
			}
		},'json')

	}
	editInfo();
//   保存信息
$("#reserve").click (function () {
	var username = $("#username").val();
	console.log(username);
	var phone = $("#phone").val();
	var  address = $("#address").val();
	console.log(address);
			ajaxWebPostAsyncData(updateInfoByUid, {
			"uid": uid,
			"username":username,
			"phone":phone,
			"sex":"",
			"email":"",
			"age":"",
			"address":address,
			"headimgurl":""

		}, false, function(data) {
			if(data.code == "40000") {
			alert(data.code);
			}
		}, 'json')
})
})