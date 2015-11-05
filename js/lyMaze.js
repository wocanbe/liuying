!function($) {
	$.fn.extend({
		touchEvent:function(eventFun){
			var isSupportTouch="ontouchend" in document?true:false;
			window.touchState={isMove:false,nStartX:0,nStartY:0}
			if(isSupportTouch){
				$(this).on({
					"touchstart":function(ev){
						ev.stopPropagation();
						var e=ev.originalEvent.targetTouches[0];
						touchState.nStartY = e.pageY;
						touchState.nStartX = e.pageX;
						touchState.isMove=true;
						return false;
					},"touchmove":function(ev){
						if(touchState.isMove){
							ev.stopPropagation();
							var e=ev.originalEvent.targetTouches[0];
							var nEndY = e.pageY,nEndX = e.pageX;
							var xMove=nEndX-touchState.nStartX,
								yMove=nEndY-touchState.nStartY;
							if(Math.abs(xMove)>Math.abs(yMove)){
								if(xMove>0)eventFun("right");
								else eventFun("left");
							}else{
								if(yMove>0)eventFun("down");
								else eventFun("up");
							}
							touchState.isMove=false;
							return false;
						}
					}
				});
			}
			return isSupportTouch;
		},
		lyMaze: function(data) {
			var $this = $(this).empty();
			var _w=data.size[0],_h=data.size[1];
			var innerHtml='<table class="ly_maze" cellspacing="0" cellpadding="0">';
			var count=0;
			for(var x=0;x<_w;x++){
				innerHtml+="<tr>";
				for(var y=0;y<_h;y++){
					var _t=data.data[count][2],_r=data.data[count][3],_b=data.data[count][4],_l=data.data[count][5];
					var className="";
					if(_t==0)className+="top";
					if(_r==0)className+=" right";
					if(_b==0)className+=" bottom";
					if(_l==0)className+=" left";
					if(className=="")innerHtml+="<td></td>";
					else innerHtml+='<td class="'+className+'"></td>';
					count++;
				}
				innerHtml+="</tr>";
			}
			innerHtml+='</table>';
			var ele=$(innerHtml);
			var tds=ele.find("td");
			tds.first().removeClass("left").addClass("on");
			tds.last().removeClass("right");
			/*var lyMaze={
				local:[0,0],
				localEle:tds.eq(0),
				step:0,
				isOver:false
			}*/
			window.mazeLocal=[0,0];
			window.mazeLocalEle=tds.eq(0);
			window.mazeStep=0;
			window.mazeOver=false;
			var isTouch=$this.unbind().touchEvent(
				function(eventType){
					if(mazeOver)return;
					if(eventType=="up"){
						if(data.data[mazeLocal[1]*_w+mazeLocal[0]][2]==1){
							mazeLocalEle.removeClass("on");
							mazeLocal[1]-=1;
							mazeStep++;
						}
					}else if(eventType=="right"){
						if(data.data[mazeLocal[1]*_w+mazeLocal[0]][3]==1){
							mazeLocalEle.removeClass("on");
							mazeLocal[0]+=1;
							mazeStep++;
						}
					}else if(eventType=="down"){
						if(data.data[mazeLocal[1]*_w+mazeLocal[0]][4]==1){
							mazeLocalEle.removeClass("on");
							mazeLocal[1]+=1;
							mazeStep++;
						}
					}else if(eventType=="left"){
						if(data.data[mazeLocal[1]*_w+mazeLocal[0]][5]==1){
							mazeLocalEle.removeClass("on");
							mazeLocal[0]-=1;
							mazeStep++;
						}
					}else{
						return;
					}
					mazeLocalEle=tds.eq(mazeLocal[1]*_w+mazeLocal[0]);
					mazeLocalEle.addClass("on");
					if(mazeLocal[0]==(_w-1)&&mazeLocal[1]==(_h-1)){
						mazeOver=true;
						alert("你成功走出迷宫，共用"+mazeStep+"步");
					}
				}
			);
			if(!isTouch)$(window).unbind().keyup(function(e){
				if(mazeOver)return;
				if(e.keyCode==38){//上箭头
					if(data.data[mazeLocal[1]*_w+mazeLocal[0]][2]==1){
						mazeLocalEle.removeClass("on");
						mazeLocal[1]-=1;
						mazeStep++;
					}
				}else if(e.keyCode==40){//下箭头
					if(data.data[mazeLocal[1]*_w+mazeLocal[0]][4]==1){
						mazeLocalEle.removeClass("on");
						mazeLocal[1]+=1;
						mazeStep++;
					}
				}else if(e.keyCode==37){//左箭头
					if(data.data[mazeLocal[1]*_w+mazeLocal[0]][5]==1){
						mazeLocalEle.removeClass("on");
						mazeLocal[0]-=1;
						mazeStep++;
					}
				}else if(e.keyCode==39){//右箭头
					if(data.data[mazeLocal[1]*_w+mazeLocal[0]][3]==1){
						mazeLocalEle.removeClass("on");
						mazeLocal[0]+=1;
						mazeStep++;
					}
				}else{
					return;
					/*console.log(e.keyCode);*/
				}
				mazeLocalEle=tds.eq(mazeLocal[1]*_w+mazeLocal[0]);
				mazeLocalEle.addClass("on");
				if(mazeLocal[0]==(_w-1)&&mazeLocal[1]==(_h-1)){
					mazeOver=true;
					alert("你成功走出迷宫，共用"+mazeStep+"步");
				}
			});
			$this.append(ele);
		}
	})
}(jQuery);