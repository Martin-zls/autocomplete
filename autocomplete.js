(function($){
    $.fn.nt_autoComplete = function (parameter) {
        var myParam = {
            suggestMark: true
        };
        var param = $.extend(myParam,parameter);
        var _this = this;
        var place = getplace(_this);
        var keyuptime = null,inputValue;


        _this.on('keyup',keyUpEvent);
        function keyUpEvent(){
            inputValue = $(this).val();

            clearTimeout(keyuptime);
            $(this).find('#autoCompleteList').remove();

            keyuptime = setTimeout(function (){
                if(param.keyUpEvent && param.keyUpEvent(inputValue,newcomlist)!==false){
                    console.log('abc');
                }
            },300)

        }

        _this.on('blur',blurEvent);
        function blurEvent(){
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
                    htmlstr += '<li data-eq="'+i+'">'+param.render(data[i])+'</li>';
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
                'top': place.top+18+'px',
                'left' : place.left +'px'
            }).on('click','li',function(){
                var i = $(this).data('eq');
                if(param.selectEvent && param.selectEvent(data[i],_this)!==false){
                    $(this).val(data[i].value)
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