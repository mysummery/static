var font = $('html').css('font-size');
var len = font.length - 2;
font = font.substring(0, len);
fontcommon = font * 1.2;
//公用字体大小，1.2rem
var legendleft = font * 6; //lengend的左间距

var myChart = echarts.init(document.getElementById('main'));
option = {

	tooltip: {
		trigger: 'item',
		textStyle: {
			color: '#ffffff',
			fontSize: font * 1.1,
			fontWeight: 'normal'

		},
	},
	dataZoom: [{
		type: 'inside',
		textStyle: {
			color: '#ffffff',
			fontSize: font * 3,
			fontWeight: 'normal'

		},
		show: true,
		top: 35 * font,
		start: 0,
		end: 45,
		handleSize: 8
	}, ],
	title: {
		text: '一  时间',
		subtext: '丨  金额',
		padding: [0, font],
		textStyle: {
			color: '#ffffff',
			fontSize: font * 1.1,
			fontWeight: 'normal'

		},
		subtextStyle: {
			color: '#ffffff',
			fontSize: font * 1.1,
			fontWeight: 'normal'
		}
	},

	legend: {
		left: legendleft,
		icon: 'cricle',
		orient: 'vertical',
		textStyle: {
			color: '#ffffff',
			fontSize: font * 1.1,
			fontWeight: 'normal'

		},
		data: ['微信提现', '银行卡提现']
	},

	calculable: true,
	xAxis: [{
		//max:7,
		type: 'category',
		boundaryGap: true,

		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff',
				fontSize: font
			}
		},
		axisLine: { // 轴线
			show: true,
			lineStyle: {
				color: '#fff',
				type: 'solid',
				width: 2
			}
		},
		data: ['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
	}],
	yAxis: [{
		interval: 300,
		position: 'right',
		type: 'value',
		axisLabel: {
			show: true,
			textStyle: {
				color: '#fff',
				fontSize: font
			}
		},

		max: 2100,
		splitLine: {
			show: true,
			lineStyle: {
				color: '#fff',
				type: 'dashed',
				width: 2
			}
		},
		axisLine: { // 轴线
			show: true,
			lineStyle: {
				color: '#fff',
				type: 'solid',
				width: 2
			}
		}

	}],

	series: [{
			name: '微信提现',
			type: 'bar',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					},
					color: '#b9c4fd'
				}
			},
		
				barGap: '0%',

			label: {
				normal: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#ffffff',
						fontSize: font * 0.9
					}
				}
			},
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#fdf35e'
					}, {
						offset: 0.7,
						color: '#fff45c'
					}, {
						offset: 1,
						color: 'rgba(255,255,255,0.2)'
					}])
				}
			},
			data: [1186, 1100, 1100, 1700, 1100, 1400, 1700]

		}, {
			name: '银行卡提现',
			type: 'bar',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: 'default'
					},
					color: '#f0f4ff'
				}
			},
			label: {
				normal: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#324a95',
						fontSize: font * 0.9
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
			data: [980, 1700, 1700, 1700, 1700, 1890, 1700]

		},

	]
};

myChart.setOption(option);
$('#main canvas').css('top', font + 'px');
$('#main div').css({
	overflow: 'auto',
	height: font * 27 + 'px'
});