
$(document).ready(function($) {
    // 二级导航
    $('.nav li').hover(function(){
        $(this).find('dl').stop().fadeToggle();
    });
    // 主页浮动窗
    $('.index-float-close').click(function() {
        $('.index-float').hide();
    });
    // 课程介绍浮动窗口
   /* $('.float-close').click(function() {
        $('.m-float2').hide();
        $('.bg-black').hide();
    });*/

    // 课程详情-评论
//    $('.m-float3 .btn1').click(function() {
//        $('.m-float3').hide();
//        $('.bg-black').hide();
//    });


    // 轮播图
    jQuery(".bj").slide({titCell:".hd ul",mainCell:".bd ul",effect:"fold",autoPage:"<li><a></a></li>",autoPlay:true,startFun:function(i,c){ 
                $('.bj li.on').removeClass('on');
        },endFun:function(i,c){ 
                $('.bj li').eq(i).addClass('on');
        }});
    jQuery(".box-bj1").slide({titCell:".hd ul",mainCell:".bd ul",effect:"fold",autoPage:"<li><a></a></li>",autoPlay:true,startFun:function(i,c){ 
                $('.box-bj1 li.on').removeClass('on');
        },endFun:function(i,c){ 
                $('.box-bj1 li').eq(i).addClass('on');
        }});
    jQuery(".box-bj2").slide({titCell:".hd ul",mainCell:".bd ul",effect:"fold",autoPage:"<li><a></a></li>",autoPlay:true,startFun:function(i,c){ 
                $('.box-bj2 li.on').removeClass('on');
        },endFun:function(i,c){ 
                $('.box-bj2 li').eq(i).addClass('on');
        }});

    jQuery(".banner-list").slide({titCell:".banner-list-tab ul li",mainCell:".list-vedio",effect:"leftLoop",autoPlay:false})

});