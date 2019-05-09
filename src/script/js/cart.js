//购物车渲染
; (function () {
    //渲染数据的函数
    function goodslist(sid, amount) {
        $.ajax({
            url: 'http://10.31.163.74/homework/projectname/project/php/index-returndata.php',
            dataType: 'json',
            
        }).done(function (data) {
            console.log(data)
            $.each(data, function (index, value) {
                // console.log(value.sid)
                if (sid == value.sid) {
                    //克隆数据列表 最后添加
                    console.log(sid, amount, value)
                    var $clone = $('.shop-car-box').clone(true, true);
                    $clone.find('.car-pic-left').find('img').attr('src', value.url);
                    $clone.find('.car-pic-right').find('a').html(value.title);
                    $clone.find('.car-pir').find('i').html(value.price);
                    $clone.find('.car-num').find('.car-num-box').html(amount);
                    $clone.find('.car-money').find('i').html((value.price * amount).toFixed(2));
                    $clone.css('display', 'block');
                    $('#shop').append($clone);
                }
            })
        })
    }
    
    //获取cookie
    if ($.cookie('sid') && $.cookie('num')) {
        var sidarr = $.cookie('sid').split(',');
        var numarr = $.cookie('num').split(',');
        $.each(sidarr, function (index, value) {
            goodslist(sidarr[index], numarr[index]);
        })

    }

    //增加减少商品数量
    var $add = $('.num-right')
    var $reduce = $('.num-left');

    $add.on('click', function () {
        var $num = $(this).parent().find('.car-num-box').html()
        $num++;
        $(this).parent().find('.car-num-box').html($num)
        var $priceall= $(this).parent().prev().find(' i').html()* $num;
        $(this).parent().next().find('i').html($priceall)
    })








})();