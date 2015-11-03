(function($){
    $.fn.extend({
        lyTimer:function(config){
            var $this=$(this);
            var me=$this[0];
            var offset = $this.offset();
            if(me.nodeName!='INPUT')return;
            var _config={
                startTime:'08:00',
                endTime:'23:30',
                step:30,
                startLimit:'',
                endLimit:'',
                default:'08:00'
            };
            var paras= $.extend(_config,config);
            var addTime=function(time){
                var _timer=time.split(':');
                var _h=parseInt(_timer[0]),_m=parseInt(_timer[1])+paras.step;
                if(_m>59){_h+=1;_m-=60;}
                var _rh=_h<10?'0'+_h:_h;
                var _rm=_m<10?'0'+_m:_m;
                return _rh+':'+_rm;
            };
            var makeTimeArray=function(){
                var timeStr='';
                var localTimer=paras.startTime;
                while(localTimer<paras.endTime){
                    if(localTimer==paras.default){
                        timeStr+='<li class="active">'+localTimer+'</li>';
                        $this.val(localTimer).data('value',localTimer);
                    }else{
                        timeStr+='<li>'+localTimer+'</li>';
                    }
                    localTimer=addTime(localTimer);
                }
                return timeStr;
            };
            var show=function(event){
                var _id='#'+$(this).data('id');
                $('.lyTimer').hide();

                if(paras.startLimit){
                    var startTime=$(paras.startLimit).val();
                    $(_id).children().each(function(){
                        if($(this).html()<startTime)$(this).addClass('enable');
                        else $(this).removeClass('enable');
                    });
                }
                if(paras.endLimit){
                    var endTime=$(paras.endLimit).val();
                    $(_id).children().each(function(){
                        if($(this).html()>endTime)$(this).addClass('enable');
                        else $(this).removeClass('enable');
                    });
                }
                $(_id).show();
                event.stopPropagation();
            };
            var _change=function(){
                var regPat1=/^\d{2}\:\d{2}$/,regPat2=/^\d{4}$/;
                var value=$(this).val();
                if(regPat1.test(value)){
                    $(this).data('value',value);
                }else if(regPat2.test(value)){
                    var rValue=value.substring(0,2);
                    rValue+=':'+value.substring(2,4);
                    $(this).val(rValue).data('value',rValue);
                }else{
                    $(this).val($(this).data('value'));
                }
            };
            var init=function(){
                if($this.data('hasAdd'))return;
                var _num = $(".lyTimer").length;
                var _id = "lyTimer_" + _num;
                var $timerBoxs=$('<ul class="lyTimer" id="'+_id+'" style="top:'+(offset.top+$this.outerHeight())+'px;left:'+offset.left+'px"></ul>');
                $timerBoxs.append(makeTimeArray());
                $('body').append($timerBoxs).click(function(){ $timerBoxs.hide();});
                $this.addClass('has_add_ly').data({'hasAdd':true,'id':_id}).click(show).change(_change);
                $timerBoxs.find('li').click(function(event){
                    event.stopPropagation();
                    if($(this).hasClass('enable'))return;
                    $(this).addClass('active').siblings().removeClass();
                    $this.val($(this).html());
                    $timerBoxs.hide();
                });
            };
            init();
            return $this;
        }
    });
})(jQuery);