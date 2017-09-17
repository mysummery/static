
/**
 * 获取URL参数
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
/*
 * ajax封装 url 发送请求的地址 data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(),"state": 1} successfn 成功回调函数
 * ajax前端同步方法
 * 没tip等方法
 */
function ajaxPostAsyncData(url, data, async,successfn) {
	data = (data == null || data == "" || typeof (data) == "undefined") ? {
		"date" : new Date().getTime()
	} : data;
	$.ajax( {
		type : "post",
		data : data,
		async: async,
		url : url,
		dataType : "json",
		beforeSend : function(XMLHttpRequest) {
		},
		success : function(d) {
			if (d.code == "40002") {
				return;
			}
			successfn(d);
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		error : function(e) {
		}
	});
};

