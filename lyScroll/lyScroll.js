! function($) {
	$.fn.extend({
		lyScroll: function(dataURL,dataCount,successFun,errorFun) {
			var $this=$(this),pageCount=5;
			var backFun=function(json){
				$this.data('maxPage',json.maxPage);
				if(successFun)successFun(json.content);
				lyState=true;
			};
			var errorBackFun=function(){
				console.log('error request！');
				/*毫秒 （比如 1500）"slow""normal""fast"*/
			};
			if(errorFun)errorBackFun=errorFun;
			if(dataCount)pageCount=dataCount;
			$this.data({
				localPage:1,
				maxPage:2
			});
			
			var loadData=function(){
				lyState=false;
				var localPage=$this.data('localPage')+1;
				$this.data('localPage',localPage);
				$.ajax({
					url : dataURL,
					type: 'GET',
					data: {'pageNo':localPage,'pageCount':pageCount},
					dataType : 'json',
					success : backFun,
					error : errorBackFun
				});
			};
			
			var localScroll={
				ele:$this,
				fun:loadData
			}
			
			var init=function(){
				var mb=$(document).scrollTop()+$(window).height()-localScroll.ele.height()-localScroll.ele.offset().top;
				if (mb>0&&lyState){
					if($this.data('maxPage')>$this.data('localPage'))initData();
				}
			}
			var initData=function(){
				lyState=false;
				var localPage=$this.data('localPage')+1;
				$this.data('localPage',localPage);
				$.ajax({
					url : dataURL,
					type: 'GET',
					data: {'pageNo':localPage,'pageCount':pageCount},
					dataType : 'json',
					success : function(json){
						$this.data('maxPage',json.maxPage);
						if(successFun)successFun(json.content);
						lyState=true;
						init();
					},
					error : errorBackFun
				});
			}
			
			if(!window.lyScroll)window.lyScroll=[];
			window.lyScroll.push(localScroll);
			window.lyState=true;
			$(window).scroll(function(){
				if($this.data('maxPage')>$this.data('localPage')){
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