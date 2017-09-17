/**** 
*** author：李思远
*** date：2017-04-21
***/
var uid = getCookie('cookie_brsy_pc_uid');
var username = getCookie('cookie_brsy_pc_name');
var phone = getCookie('cookie_brsy_pc_account');

$(function () {
  'use strict';
  var newHeadImgUrl = null;
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector('.img-container');
  var image = container.getElementsByTagName('img').item(0);
  var download = document.getElementById('download');
  var actions = document.getElementById('actions');
  var dataX = document.getElementById('dataX');
  var dataY = document.getElementById('dataY');
  var dataHeight = document.getElementById('dataHeight');
  var dataWidth = document.getElementById('dataWidth');
  var dataRotate = document.getElementById('dataRotate');
  var dataScaleX = document.getElementById('dataScaleX');
  var dataScaleY = document.getElementById('dataScaleY');
  var options = {
        aspectRatio: 1 / 1,
        //预览模式
        viewMode: 1,
        //跨域图片
        checkImageOrigin: true,
        //深度操作
        zoomable: false,
        //滚轮操作
        mouseWheelZoom: false,
        //移动图片
        movable: false,
        preview: '.img-preview',
        ready: function (e) {
          console.log(e.type);
        }
      };
  //创建cropper对象
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageURL;

  // Buttons
  //未创建canvas时禁止按钮
  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }
      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option'),
      secondOption: target.getAttribute('data-second-option')
    };

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }

      }

      if (data.method === 'getCroppedCanvas') {
        
        data.option = JSON.parse(data.option);
      }

      result = cropper[data.method](data.option, data.secondOption);

      //判断方法名，执行操作
      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
            //提交base64
            //将canvas转换成base64
            var resultImg = result.toDataURL('image/jpeg');
            //base64转成blob
            var blobImg = convertBase64UrlToBlob(resultImg);
            //创建formdata对象
            var formData = new FormData();
            //获取当前时间，并编为文件名
            var nameImg = new Date().getTime() + '.png';
            //添加数据进入formdata
            formData.append('uploadFile', blobImg, nameImg);
            formData.append('type', 1);
            $.ajax({
                url: 'https://dev-api.liqiang365.com/upload/image',
                type: 'POST',
                data: formData,
                //dataType: 'text',
                // 告诉jQuery不要去处理发送的数据
                processData : false, 
                // 告诉jQuery不要去设置Content-Type请求头
                contentType : false,
                // 发送内容前
                //beforeSend: function(){
                  //showLoading(true, '正在上传文件,请稍后...')
                //},
                success: function (data) {
                  if (data.code == '40000') {
                    var resdata = data.resobj;
                    //赋值上传的图片地址
                    newHeadImgUrl = resdata.fileUrl;
                    //更新数据
                    ajaxWebPostAsyncData(updateInfoByUid, {
                      "uid": uid,
                      "username":username,
                      "phone":phone,
                      "sex":"",
                      "email":"",
                      "age":"",
                      "address":"",
                      "headimgurl":newHeadImgUrl
                    }, false, function(data) {
                      if(data.code == "40000") {
                        $.jBox.tip("上传成功！", "success");
                        setTimeout(function(){
                          window.location.href= 'http://dev.liqiang365.com/static/login/shipin/new_usercenter.html'
                        },1500);
                      }
                    }, 'json');

                  } else {
                    $.jBox.tip("操作失败！" + data.info, "error");
                  }
                }
            });
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  // Import image
  var inputImage = document.getElementById('inputImage');

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        file = files[0];

        if (/^image\/\w+/.test(file.type)) {
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          image.src = uploadedImageURL = URL.createObjectURL(file);
          cropper.destroy();
          cropper = new Cropper(image, options);
          inputImage.value = null;
        } else {
          $.jBox.tip("请选择一张符合规则的图片!", "error");
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  }
  //base64转成blob的方法
  function convertBase64UrlToBlob(urlData){  
      
   var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    //blob转为file(此方法不兼容ie，哪怕是edge，慎用)
    //var file = new File([u8arr], 'imageFileName.png');
    //return file;
    return new Blob([u8arr], {type:'image/png'});

    
  } 
    
});
