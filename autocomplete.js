(function($){
    $.fn.nt_autoComplete = function (parameter) {
        var myParam = {
                suggestMark: true,
                listOffsetX: 0,
                listOffsetY: 18,
                //是否允许自定义
                customize: false
            },
            triggerEventArr = ['keyup','focus'];
        var param = $.extend(myParam,parameter),
            _this = this,
            place = getplace(_this),
            keyuptime = null,inputValue;

        if($.inArray(param.trigger, triggerEventArr)>=0){
            _this.on(param.trigger,keyUpEvent);
        }else{
            _this.on('keyup',keyUpEvent);
        }


        function keyUpEvent(){
            inputValue = $.trim($(this).val());
            $(this).val(inputValue);
            if(inputValue===''){
                _this.removeAttr('data-clear');
            }else{
                _this.attr('data-clear','true');
            }

            clearTimeout(keyuptime);
            $(this).find('#autoCompleteList').remove();

            keyuptime = setTimeout(function (){
                if(param.keyUpEvent && param.keyUpEvent(inputValue,newcomlist)!==false){
                    //
                }
            },300)

        }

        _this.on('blur',blurEvent);
        function blurEvent(){
            if(param.customize === false){
                _this.val('');
            }
            setTimeout(function(){
                $('#autoCompleteList').remove();
            },300);
        }

        function newcomlist(data){
            if(data && data.length==0){
                $('#autoCompleteList').remove();
                return;
            }
            var htmlstr = "<ul id='autoCompleteList'>";

            if(param.render){
                for(var i=0,len=data.length;i<len;i++ ){
                    var content = param.render(data[i]).replace(inputValue,'<span class="sign">'+inputValue+'</span>');
                    htmlstr += '<li data-eq="'+i+'">'+content+'</li>';
                }
            }else{
                for(var i=0,len=data.length;i<len;i++ ){
                    htmlstr += '<li data-eq="'+i+'">'+data.value+'</li>';
                }
            }

            htmlstr += "</ul>";

            if($('#autoCompleteList').length>0){
                $('#autoCompleteList').replaceWith(htmlstr);
            }else{
                $('body').append(htmlstr);
            }

            $('#autoCompleteList').css({
                'position': 'absolute',
                'top': (place.top+param.listOffsetY)+'px',
                'left' : (place.left+param.listOffsetX) +'px'
            }).on('click','li',function(){
                var i = $(this).data('eq');
                if(param.selectEvent && param.selectEvent(data[i],_this)!==false){
                    $(this).val(data[i].value);
                    _this.attr('data-clear','false');
                }
            });
        }

        //获取输入框的坐标
        function getplace(obj){
            return $(obj).offset();
        }

        return _this;
    }










})(jQuery);