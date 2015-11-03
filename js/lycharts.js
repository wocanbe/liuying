var initCharts = function(data) {
	function getAve (array) {
		var ave=0,i;
		for(i=0;i<array.length;i++){
			ave+=array[i];
		}
		ave/=i;
		return ave;
	}
	var lieming=[],shuju1=[],shuju2=[],shuju3,shuju4;
	for(var i=0;i<data.length;i++){
		lieming.push(data[i].name);
		var rightPercent=parseInt(data[i].right/data[i].total*100);
		shuju1.push(rightPercent);
		shuju2.push(100-rightPercent);
	}
	shuju3=getAve(shuju1);
	shuju4=getAve(shuju2);
	var _c1={
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: null
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: { enabled: false },
				showInLegend: true
			},
			series: {
				cursor: 'pointer',
				events: {
					click: function(e) {
						console.log(e.point.name);
						console.log(e.point.series.name);
					}
				}
			}
		},
		series: [{
			type:"pie",
			name: 'Score Data',
			center: [120, 150],
			size: 200,
			data:[{
				name: 'wrong',
				y: shuju4,
				color: "#d56a6a"
			},{
				name: 'right',
				y: shuju3,
				color: "#50a066"
			}]
		}]
	};
	var _c2={
		chart: {
			type: 'bar'
		},
		title: {
			text: null
		},
		xAxis: {
			categories: lieming,
			title: {
				text: null
			},
			stackLabels: {
				enabled: true
			}
		},
		yAxis: {
			min: 0,
			max: 100,
			title: {
				text: null
			}
		},
		tooltip: {
			valueSuffix: ' %'
		},
		plotOptions: {
			bar: {
				stacking: 'normal'
			},
			series: {
				cursor: 'pointer',
				events: {
					click: function(e) {
						console.log(e.point.category);
						console.log(e.point.series.name);
					}
				}
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: 'wrong',
			data: shuju2,
			color: "#d56a6a"
		},{
			name: 'right',
			data: shuju1,
			color: "#50a066"
		}]
	};
	var backPara=[];
	backPara.push(_c1);
	backPara.push(_c2);
	return backPara;
};
var initTable=function(data,target){
	var htmlStr="";
	for(var i=0;i<data.length;i++){
		htmlStr+='<ul><li class="name">'+data[i].name;
		htmlStr+='</li><li class="percent">'+data[i].percent;
		htmlStr+='%</li><li class="num">'+data[i].right;
		htmlStr+='</li><li class="desc">'+data[i].description;
		htmlStr+='</li><li><a href="'+data[i].id;
		htmlStr+='"></a></li></ul>';
	}
	target.html(htmlStr)
}