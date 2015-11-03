(function($){
	$.fn.extend({
		lyCalendar:function(dataURL,linkURL){
			var $this=$(this);
			var localDate=new Date(),showDate=new Date();
			showDate.setDate(1);
			var _r={
				year:localDate.getFullYear(),
				month:localDate.getMonth(),
				date:localDate.getDate()
			};
			var ele={};
			var lyCalendar={
				shown:showDate,
				local:localDate,
				ele:ele,
				pro:function(){
					lyCalendar.shown.setMonth(lyCalendar.shown.getMonth()-1);
					_add(lyCalendar.shown.getFullYear(),lyCalendar.shown.getMonth());
				},
				next:function(){
					lyCalendar.shown.setMonth(lyCalendar.shown.getMonth()+1);
					_add(lyCalendar.shown.getFullYear(),lyCalendar.shown.getMonth());
				}
			};

			var _add=function(yyyy,mm){
				var dateObj=new Date(yyyy,mm,1);
				var isLocal=false;
				var MM=mm>8?(mm+1):'0'+(mm+1);
				$("#lyc_lyear").html(yyyy);
				$("#lyc_lmonth").html(MM);
				if(_r.year==yyyy&&_r.month==mm)isLocal=true;//如果这个月
				var weekDay=dateObj.getDay();

				if(weekDay>0)dateObj.setDate(1-weekDay);
				$.ajax({
					url: dataURL,
					type:"post",
					data:'month='+yyyy+MM,
					dataType: 'json',
					success: function(json) {
						var m=0;
						var hasTest=json.dates;
						var dateStr='';
						var rPara="date="+yyyy+MM;
						var rURL=linkURL.indexOf('?')>0?linkURL+"&"+rPara:linkURL+"?"+rPara
						for(var i=0;i<6;i++){
							dateStr+='<ul>';
							for(var j=0;j<7;j++){
								var lDate=dateObj.getDate();
								var ldd=lDate>9?lDate:'0'+lDate;
								var lMonth=dateObj.getMonth();
								if(lMonth==mm){//当前显示月份
									if(isLocal&&lDate==_r.date){//如果是今天
										if(hasTest[m]==lDate){
											dateStr+='<li class="local has2"><a href="';
											dateStr+=rURL+ldd+'" target="_blank">'+ldd+'</a>';
											m++;
										}else{
											dateStr+='<li class="local">'+ldd;
										}
									}else{
										if(hasTest[m]==lDate){
											dateStr+='<li class="has"><a href="';
											dateStr+=rURL+ldd+'" target="_blank">'+ldd+'</a>';
											m++;
										}else {
											dateStr+='<li>'+ldd;
										}
									}
									dateStr+='</li>';
								}else{
									dateStr+='<li class="gray">';
									dateStr+=ldd;
									dateStr+='</li>';
								}
								dateObj.setDate(lDate+1);
							}
							dateStr+='</ul>';
							if(dateObj.getMonth()!=mm)break;
						}
						console.log(dateStr)
						ele['main'].html(dateStr);
					}
				});

			};

			window.lyCalendar=lyCalendar;

			var init=function(){
				ele['title']=$('<div class="title"><i></i><span id="lyc_lyear"></span>年<span id="lyc_lmonth"></span>月'
					+'<div id="lyc_dates">今天 <span id="lyc_year"></span>/<span id="lyc_month"></span>/<span id="lyc_day"></span><div></div>');
				ele['year']=ele['title'].find('#lyc_year');
				ele['month']=ele['title'].find('#lyc_month');
				ele['day']=ele['title'].find('#lyc_day');
				$this.append(ele['title']);

				ele['pro']=$('<div class="pro"></div>');
				ele['pro'].click(lyCalendar.pro);
				$this.append(ele['pro']);
				ele['next']=$('<div class="next"></div>');
				ele['next'].click(lyCalendar.next);
				$this.append(ele['next']);

				var innerStr='<ul><li class="red">SUN</li>';
				innerStr+='<li class="gray">MON</li>';
				innerStr+='<li class="gray">TUE</li>';
				innerStr+='<li class="gray">WED</li>';
				innerStr+='<li class="gray">THU</li>';
				innerStr+='<li class="gray">FRI</li>';
				innerStr+='<li class="gray">SAT</li></ul>';
				ele['tHead']=$(innerStr);
				$this.append(ele['tHead']);
				ele['main']=$('<div id="lyc_main"></div>');
				$this.append(ele['main']);

				ele['year'].html(_r.year);
				ele['month'].html(_r.month>8?_r.month+1:('0'+(_r.month+1)));
				ele['day'].html(_r.date>9?_r.date:'0'+_r.date);
			};

			init();
			_add(localDate.getFullYear(),localDate.getMonth());
			return $this;
		}
	});
})(jQuery);