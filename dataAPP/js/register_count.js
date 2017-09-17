var font=$('html').css('font-size');
		var len=font.length-2;
		font=font.substring(0,len);
		fontcommon=font*1.2;
		//公用字体大小，1.2rem
		var legendleft=font*6;//lengend的左间距
		
		var myChart = echarts.init(document.getElementById('main'));
		option = {
			
			 tooltip : {
            trigger: 'item'
        	},
			dataZoom: [
            {
                type: 'inside',
                textStyle:{
	        	color:'#ffffff',
	        	fontSize:font*1.1,
	        	fontWeight:'normal'
	        	
	        },
                show: true,
                top:24*font,
                start: 0,
                end: 45,
                handleSize: 8
            },
//          {
//              type: 'inside',
//              start: 0,
//              end: 50
//          },
            
        ],
	    title : {
	        text: '一  时间',
	        subtext: '丨  数据',
	        padding:[0,font],
	        textStyle:{
	        	color:'#ffffff',
	        	fontSize:font*1.1,
	        	fontWeight:'normal'
	        	
	        },
	        subtextStyle:{
	        	color:'#ffffff',
	        	fontSize:font*1.1,
	        	fontWeight:'normal'
	        }
	    },
	   
	    legend: {
	    	left:legendleft,
	    	icon:'cricle',
	    	orient:'vertical',
       		textStyle:{
	        	color:'#ffffff',
	        	fontSize:font*1.1,
	        	fontWeight:'normal'
	        	
	        },
	        data:['VIP数量','注册量']
	    },
	    
	    calculable : true,
	    xAxis : [
	        {
	        	//max:7,
	            type : 'category',
	            boundaryGap : false,
	            axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize:font
                            }
                       },
	            data : ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周日',]
	        }
	    ],
	    yAxis : [
	        {	
	        	interval:2000,
	        	position:'right',
	            type : 'value',
	            axisLabel: {
                          show: true,
                          textStyle: {
                              color: '#fff',
                              fontSize:font
                          }
                     },
	            max:14000
	        }
	    ],
	    series : [
	        {
	            name:'注册量',
	            type:'line',
	            smooth:true,
	            itemStyle: {
	            	normal: {
	            		areaStyle: {type: 'default'},
	            		color:'#fdf35e'
	            		}
	            	},
	            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle:{
                    	color:'#ffffff',
                    	fontSize:font*0.9
                    }
                }
            },
	            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#fdf35e'
                    },
                    {
                        offset: 0.7,
                        color: '#fff45c'
                    },{
                        offset: 1,
                        color: 'rgba(255,255,255,0.2)'
                    }])
                }
            },
	            data:[1000, 1200, 2100, 5400, 2600, 8300, 7100,1000, 1200, 2100, 5400, 2600, 8300, 7100]
	           
	        },
	        {
	            name:'VIP数量',
	            type:'line',
	            smooth:true,
	            itemStyle: {
	            	normal: {
	            		areaStyle: {type: 'default'},
	            		color:'#ffffff'
	            		}
	            	},
	            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle:{
                    	color:'#324a95',
                    	fontSize:font*0.9
                    }
                }
            },
	            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#ffffff'
                    }, {
                        offset: 1,
                        color: 'rgba(255,255,255,0.2)'
                    }])
                }
            },
	            data:[300, 182, 434, 791, 390, 300, 100,300, 182, 434, 791, 390, 300, 100]
	            
	        },
        
    ]
};
                    
			
 		myChart.setOption(option);
 		$('#main canvas').css('top',font+'px');
 		$('#main div').css({overflow:'auto',height:font*27+'px'});
 		
var myChart = echarts.init(document.getElementById('main1')); 		
var labelTop = {
    normal : {
    	color:'#b9c4fd',
        label : {
            show : true,
            position : 'bottom',
            formatter : '{b}',
            textStyle: {
                baseline : 'center',
                 fontSize:font
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'center',
                fontSize:font
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#4c70e5',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
var radius = [64, 88];
option = {
       
    series : [
        {
            type : 'pie',
            center : ['25%', '55%'],
            radius : radius,
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'15%', value:15, itemStyle : labelBottom},
                {name:'', value:85,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['50%', '55%'],
            radius : radius,
            x:'33%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'50%', value:50, itemStyle : labelBottom},
                {name:'', value:50,itemStyle : labelTop}
            ]
        },
        {
            type : 'pie',
            center : ['75%', '55%'],
            radius : radius,
            x:'66%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'35%', value:35, itemStyle : labelBottom},
                {name:'', value:65,itemStyle : labelTop}
            ]
        },
        
    ]
};
myChart.setOption(option);
$('#main1').css('background','#ffffff');