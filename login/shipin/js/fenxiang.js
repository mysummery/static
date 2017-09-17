      var domain = "http://www.liqiang365.com";// 正式环境
//	var domain = "http://dev.liqiang365.com";// 测试环境
	var uid = localStorage.getItem("shipinUid");
	window._bd_share_config = {
	    	common : {
				bdText : 'liqiang365',	
				bdDesc : 'liqiang365',	
				bdUrl : domain+"/static/login/register.html?uid="+uid+"",
				//bdUrl : "http://www.liqiang365.cn/static/login/register.html?uid="+uid+"",
				bdPic : '自定义分享图片'
			},
	    	share : [{
				"bdSize" : 16
			}],
			slide : [{	   
				bdImg : 8,
				bdPos : "right",
				bdTop : 100
			}],
			selectShare : [{
				"bdselectMiniList" : ['qzone','tqq','kaixin001','bdxc','tqf']
			}]
		}
    	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
