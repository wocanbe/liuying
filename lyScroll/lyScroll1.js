! function($) {
	$.fn.extend({
		lyScroll: function(dataURL,dataCount,successFun) {
			var textInfo=['maxPage','localPage','error request！']
			var $this=$(this),pageCount=5;
			var backFun=function(json){
				$this.data(textInfo[0],json.maxPage);
				if(successFun)successFun(json.content);
				lyState=true;
			};
			if(dataCount)pageCount=dataCount;
			$this.data({
				localPage:1,
				maxPage:2
			});
			
			
			var loadData=function(){
				lyState=false;
				var localPage=$this.data(textInfo[1])+1;
				$this.data(textInfo[1],localPage);
				$.ajax({
					url : dataURL,
					type: 'GET',
					data: {'pageNo':localPage,'pageCount':pageCount},
					dataType : 'json',
					success : backFun,
					error:function(){
						console.log(textInfo[2]);
						/*毫秒 （比如 1500）"slow""normal""fast"*/
					}
				});
			};
			
			var localScroll={
				ele:$this,
				fun:loadData
			}
			
			var init=function(){
				var mb=$(document).scrollTop()+$(window).height()-localScroll.ele.height()-localScroll.ele.offset().top;
				if (mb>0&&lyState){
					if($this.data(textInfo[0])>$this.data(textInfo[1]))initData();
				}
			}
			var initData=function(){
				lyState=false;
				var localPage=$this.data(textInfo[1])+1;
				$this.data(textInfo[1],localPage);
				$.ajax({
					url : dataURL,
					type: 'GET',
					data: {'pageNo':localPage,'pageCount':pageCount},
					dataType : 'json',
					success : function(json){
						$this.data(textInfo[0],json.maxPage);
						if(successFun)successFun(json.content);
						lyState=true;
						init();
					},
					error:function(){
						console.log(textInfo[2]);
					}
				});
			}

			if(!window.lyScroll)window.lyScroll=[];
			window.lyScroll.push(localScroll);
			window.lyState=true;
			$(window).scroll(function(){
				if($this.data(textInfo[0])>$this.data(textInfo[1])){
					if(lyState){
						var mb=$(document).scrollTop()+$(window).height()-localScroll.ele.height()-localScroll.ele.offset().top;
						//var mb=$(document).height() - $(this).scrollTop() - $(this).height();
						//console.log(mb,localScroll.ele.data('buttom'))
					    if (mb>0)localScroll.fun();
					}
				}
			});
			init();
			return $this;
		}
	})
}(jQuery);