//inputid，传入的input file的ID属性值。inputimg为图片回显。inputtext若有值，则进行页面的地址传递,传回的是相对路径.
function initInputfile(inputid,inputimg, inputtext,index) {
		
        lrz(document.getElementById(inputid).files[0], {width: 600}, function (results) {
            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
            console.log(results);
            // 以下为演示用内容
            //demo_report('原始图片', results.blob, results.origin.size);
            setTimeout(function () {
                demo_report(results.base64, results.base64.length * 1);
                // 发送到后端
                var data={
        				base64String:results.base64,
        				name:results.origin.name,
        				fileLength:results.base64.length
        			};

            	ajaxPostData("/appimg/uploadPhone.ph", data, function(data) {
            		var code = data.code;
            		alert(code);
            		if(code=="40000"){
            			if(inputtext.length>0){
            				$("#"+inputtext+"").val(data.fileUrl);
            			}
            		}
            	}, 'json');
            }, 1000);
        });

    /**
     * 演示报告
     * @param title
     * @param src
     * @param size
     */
    function demo_report(src, size) {
    	$("#shangchuan_"+index+"").hide();
    	$("#li_1").remove();
        var img = new Image(),
            li = document.createElement('li'),
            size = (size / 1024).toFixed(2) + 'KB';
        img.onload = function () {
            var content = '';
            li.className = 'li_1';
            li.innerHTML = content;
            li.appendChild(img);
            $('#'+inputimg).html(li);
        };
        img.src = src;
        img.className="bg_image";
    }

    // 演示用服务器太慢，做个延缓加载
    window.onload = function () {
        input.style.display = 'block';
    }
}