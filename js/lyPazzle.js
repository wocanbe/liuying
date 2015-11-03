!function($) {
	$.fn.extend({
		lyPazzle: function(rows, cols, data) {
			var $this = $(this);
			$this.addClass('ly_pazzle');
			var dataArr = new Array(cols);
			var listArr = [];
			for (var i = 0; i < cols; i++) {
				dataArr[i] = new Array(rows);
			}

			var pubFun = {
				addData: function(d1, d2, d3, answer, mode) {
					var i;
					if (mode) { //竖向
						var listX = [];
						for (i = 0; i < answer.length; i++) {
							listX.push(d2);
							if (d2 > d3) {
								dataArr[d1][d2] = answer.substr(i, 1);
								d2--;
							} else if (d2 < d3) {
								dataArr[d1][d2] = answer.substr(i, 1);
								d2++;
							} else {
								dataArr[d1][d2] = answer.substr(i, 1);
								break;
							}
						}
						listArr.push({
							y: d1,
							x: listX
						});
					} else { //横向
						var listY = [];
						for (i = 0; i < answer.length; i++) {
							listY.push(d2);
							if (d2 > d3) {
								dataArr[d2][d1] = answer.substr(i, 1);
								d2--;
							} else if (d2 < d3) {
								dataArr[d2][d1] = answer.substr(i, 1);
								d2++;
							} else {
								dataArr[d2][d1] = answer.substr(i, 1);
								break;
							}
						}
						listArr.push({
							y: listY,
							x: d1
						});
					}
				},
				initDate: function() {
					for (var i = 0; i < data.length; i++) {
						var start = data[i].start;
						var end = data[i].end;
						if (start[0] == end[0]) { //x坐标相同，竖向
							pubFun.addData(start[0] - 1, start[1] - 1, end[1] - 1, data[i].answer);
						} else if (start[1] == end[1]) { //y坐标相同，横向
							pubFun.addData(start[1] - 1, start[0] - 1, end[0] - 1, data[i].answer, true);
						}
					}
				},
				initHtml:function(){
					for (var m = 0; m < cols; m++) {
						var eles=$("<ul></ul>")
						for (var n = 0; n < rows; n++) {
							var ele=$('<input type="text" maxlength="1"/>');
							if (dataArr[m][n]){
								ele.data("answer",dataArr[m][n]);
							}else{
								ele.attr("disabled","disabled");
							}
							eles.append(ele)
						}
						$this.append(eles)
					}
				},
				initAction:function(){
					$this.children("ul").each(function(m) {
						$(this).children('input').each(function(n) {
							$(this).keyup(function(e){
								var $my=$(this);
								var $parent=$my.parent();
								if((e.keyCode>64&&e.keyCode<91)||(e.keyCode>47&&e.keyCode<58)||(e.keyCode>95&&e.keyCode<106)){
								//字母,数字,数字小键盘
									if($my.next().attr("disabled") != "disabled"){
										$my.next().focus()
									}else{
										$parent.next().children("input").eq(n).focus();
									}
								}else if(e.keyCode==38){//上箭头
									$parent.prev().children("input").eq(n).focus().select();
								}else if(e.keyCode==40){//下箭头
									$parent.next().children("input").eq(n).focus().select();
								}else if(e.keyCode==37){//左箭头
									if($my.prev().attr("disabled") != "disabled")$my.prev().focus().select();
								}else if(e.keyCode==39){//右箭头
									if($my.next().attr("disabled") != "disabled")$my.next().focus().select();
								}else{
									/*console.log(e.keyCode);*/
								}
							});
						})
					})
				}
			};
			pubFun.initDate();
			pubFun.initHtml();
			pubFun.initAction();


			var backFun = {
				showAnswer: function() {
					if ($this.hasClass('ly_pazzle')) {
						$this.find("input.on").each(function() {
							$(this).html($(this).data("answer")).attr("contenteditable", "false");
						})
					}
				},
				checkAnswer: function() {
					if ($this.hasClass('ly_pazzle')) {
						$this.find("input.on").each(function() {
							if ($(this).html() == $(this).data("answer")) $(this).addClass('right');
							else $(this).addClass('wrong');
						})
					}
				},
				refresh:function(){
					$this.find("input.on").html("").attr({"class":"on","contenteditable":"true"});
				},
				readFn: function() {
					var resArrs = [];
					$this.children("ul").each(function() {
						var resArr = [];
						$(this).children('input').each(function() {
							if ($(this).hasClass('on')) resArr.push($(this).html());
							else resArr.push("");
						});
						resArrs.push(resArr);
					});
					return JSON.stringify(resArrs);
				},
				setFn: function(str) {
					var ans = JSON.parse(str);
					$this.children("ul").each(function(m) {
						$(this).children('input').each(function(n) {
							if ($(this).hasClass('on')) $(this).html(ans[m][n]);
						});
					});
				},
				checkFn: function(str) {
					var ans = JSON.parse(str);
					var px, py;
					var result = [];
					for (var i = 0; i < listArr.length; i++) {
						var isRight = 1,
							j = 0;
						var pxs = listArr[i].x,
							pys = listArr[i].y;
						if (pxs instanceof Array) {
							py = pys;
							var localRow = $this.children().eq(py);
							for (j = 0; j < pxs.length; j++) {
								px = pxs[j];
								if (localRow.children().eq(px).data("answer") != ans[py][px]) {
									isRight = 0;
									break;
								}
							}
						} else {
							px = pxs;
							for (j = 0; j < pys.length; j++) {
								py = pys[j];
								if ($this.children().eq(py).children().eq(px).data("answer") != ans[py][px]) {
									isRight = 0;
									break;
								}
							}
						}
						result.push(isRight);
					}
					return JSON.stringify(result);
				}
			};
			return backFun;
		}
	})
}(jQuery);