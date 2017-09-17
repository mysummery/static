var font = $('html').css('font-size');
var len = font.length - 2;
font = font.substring(0, len);
fontcommon = font * 1.2;
//公用字体大小，1.2rem
var legendleft = font * 6; //lengend的左间距
var legendtop = font * 20.8;

var myChart = echarts.init(document.getElementById('main'));

option = {
	legend: {
		top: legendtop,
		itemWidth: font * 0.7,
		itemHeight: font * 0.7,
		itemGap: font * 0.7,
		selectedMode: false,
		textStyle: {
			color: 'black',
			fontSize: font * 0.83,
			fontWeight: 'normal',

		},
		data: ['海外游', '国内游', '讲师', '助讲', '创客', 'VIP', '普通']
	},
	series: [{
		name: '访问来源',
		type: 'pie',
		radius: '55%',
		color: ['#fdb9b9', '#ffb284', '#b9c4fd', '#fdb9f6', '#7eeafa', "#8fd9ff", "#8f9aff", ""],
		events: {
			legendItemClick: function() {

				return false;

			}
		},

		data: [{
			value: 20,
			name: '海外游'
		}, {
			value: 7.5,
			name: '国内游'
		}, {
			value: 10,
			name: '讲师'
		}, {
			value: 10,
			name: '助讲'
		}, {
			value: 20,
			name: '创客'
		}, {
			value: 15.5,
			name: 'VIP'
		}, {
			value: 16,
			name: '普通'
		}],
		label: {
			normal: {
				position: 'inner',
				textStyle: {
					color: "#fff",
					fontSize: font * 0.9
				},
				formatter: function(param) {
//					console.log(param);
					return param.value + '%';
				}
			}

		},
		itemStyle: {
			normal: {
				//				                  color: '#c23531',
				//				shadowBlur: 5,
				shadowColor: 'rgba(0, 0, 0, 0.5)',
				borderWidth: 1,
				borderColor: '#fff'
			}
		}

	}]
};

myChart.setOption(option);