!function($){
	$.fn.extend({
		lyLife: function(size) {
			var $this=$(this).empty(),$me=this;
			var datas=[];
			var lifeTimer;

			var initFun=function(){
				var innerEle='<table class="ly_life" cellspacing="0" cellpadding="0">';
				for(var i=0;i<size;i++){
					innerEle+='<tr>'
					for(var j=0;j<size;j++){
						datas.push(0);
						innerEle+='<td data-pos="'+(i*size+j)+'"></td>'
					}
					innerEle+='</tr>'
				}
				innerEle+='</table>';
				$this.html(innerEle).find("td").unbind("click").click(setFun);
			};
			var setFun=function(){
				var pos=$(this).data("pos");
				if(datas[pos]==0){
					$(this).addClass("on")
					datas[pos]=1;
				}else{
					$(this).removeClass("on")
					datas[pos]=0;
				}
			}
			var stepFun=function(){
				var count,tempData=datas.concat(),lorder=0;
				for(var i=0;i<size;i++){
					for(var j=0;j<size;j++){
						count=0;
						lorder=i*size+j;
						if(lorder<size){
							if(j==0){
								if(tempData[lorder+1]==1)count++;
								if(tempData[lorder+size+1]==1)count++;
							}else if(j==(size-1)){
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder+size-1]==1)count++;
							}else{
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder+1]==1)count++;
								if(tempData[lorder+size-1]==1)count++;
								if(tempData[lorder+size+1]==1)count++;
							}
							if(tempData[lorder+size]==1)count++;
						}else if(lorder>size*(size-2)-1){
							if(j==0){
								if(tempData[lorder+1]==1)count++;
								if(tempData[lorder-size+1]==1)count++;
							}else if(j==(size-1)){
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder-size-1]==1)count++;
							}else{
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder+1]==1)count++;
								if(tempData[lorder-size-1]==1)count++;
								if(tempData[lorder-size+1]==1)count++;
							}
							if(tempData[lorder-size]==1)count++;
						}else{
							if(j==0){
								if(tempData[lorder-size+1]==1)count++;
								if(tempData[lorder+size+1]==1)count++;
								if(tempData[lorder+1]==1)count++;
							}else if(j==(size-1)){
								if(tempData[lorder-size-1]==1)count++;
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder+size-1]==1)count++;
							}else{
								if(tempData[lorder-size+1]==1)count++;
								if(tempData[lorder+size+1]==1)count++;
								if(tempData[lorder+1]==1)count++;
								if(tempData[lorder-size-1]==1)count++;
								if(tempData[lorder-1]==1)count++;
								if(tempData[lorder+size-1]==1)count++;
							}
							if(tempData[lorder+size]==1)count++;
							if(tempData[lorder-size]==1)count++;
						}
						if(count==3){
							if(tempData[lorder]==0){
								datas[lorder]=1;
								$this.find("tr").eq(i).find("td").eq(j).addClass("on");
							}
						}else if(count==2){
							//保持不变
						}else{
							if(tempData[lorder]==1){
								datas[lorder]=0;
								$this.find("tr").eq(i).find("td").eq(j).removeClass("on");
							}
						}
					}
				}
				lifeTimer=setTimeout(stepFun.bind($me),1000);
			};
			initFun();
			var backFun={
				start:function(){
					lifeTimer=setTimeout(stepFun.bind($me),1000);
				},
				stop:function(){
					clearTimeout(lifeTimer);
				}
			}
			return backFun;
		}
	})
}(jQuery);