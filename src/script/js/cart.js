//购物车渲染
; (function () {
    //渲染数据的函数
    function goodslist(sid, amount) {
        $.ajax({
            url: 'http://10.31.163.74/homework/projectname/project/php/index-returndata.php',
            dataType: 'json',

        }).done(function (data) {
            $.each(data, function (index, value) {
                // console.log(value.sid)

                if (sid == value.sid) {
                    //克隆数据列表 最后添加
                    // console.log(sid, amount, value)
                    var $clone = $('.shop-car-box:hidden').clone(true, true);
                    $clone.find('.car-pic-left').find('img').attr({ 'src': value.url, 'sid': sid });
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
    var $add = $('.num-right');
    var $reduce = $('.num-left');
    var $priceall = 0;
    //增加
    $add.on('click', function () {
        var $num = $(this).parent().find('.car-num-box').html();
        $num++;
        $(this).parent().find('.car-num-box').html($num)
        $priceall = $(this).parent().prev().find(' i').html() * $num;
        $(this).parent().next().find('i').html($priceall)
        setcookie($(this))

    })
    //减少
    $reduce.on('click', function () {
        var $num = $(this).parent().find('.car-num-box').html();
        $num--;
        if ($num >= 1) {
            $(this).parent().find('.car-num-box').html($num)
            $priceall = $(this).parent().prev().find(' i').html() * $num;
            $(this).parent().next().find('i').html($priceall)
        } else {
            $num = 1;
            $(this).parent().find('.car-num-box').html($num)
            $(this).parent().next().find('i').html($priceall)
        }

        setcookie($(this))
    })

    //改变cookie的num
    var sidarr = [];
    var numarr = [];
    function cookietoarray() {
        if ($.cookie('sid') && $.cookie('num')) {//判断商品是第一次存还是多次存储
            sidarr = $.cookie('sid').split(','); //cookie商品的sid  
            numarr = $.cookie('num').split(','); //cookie商品的num
        }
    }
    function setcookie(obj) {
        cookietoarray();//获取sid和num
        // console.log(obj)
        // console.log(numarr)
        var $index = obj.parents('.shop-car-box:visible').find('.car-pic img').attr('sid');
        // console.log($.inArray($index,sidarr))
        numarr[$.inArray($index, sidarr)] = obj.parents('.shop-car-box').find('.car-num .car-num-box').html();
        // console.log(obj.parents('.shop-car-box').find('.car-num .car-num-box').html())
        // console.log(numarr)
        $.cookie('num', numarr.toString(), 7)

    }



    //全选按钮
    $('.allsel').on('click', function () {
        if ($('.allsel').prop('checked')) {
            $('.shop-car-box .car-chk input').prop('checked', true)
        } else {
            $('.shop-car-box .car-chk input').prop('checked', false)
        }
    })
    $('.shop-car-box').on('change', function () {
        // console.log($('.shop-car-box:visible .car-chk input:checked').length)
        // console.log($('.shop-car-box:visible .car-chk input').length)
        if ($('.shop-car-box:visible .car-chk input:checked').length == $('.shop-car-box:visible .car-chk input').length) {
            $('.allsel').prop('checked', true)
        } else {
            $('.allsel').prop('checked', false)
        }
    })

    //删除商品
    $('.car-del').on('click', function () {
        // console.log($(this))
        // console.log($('.shop-car-box:visible .car-del'))
        cookietoarray()
        if (confirm('你确定要删除吗？')) {
            $(this).parents('.shop-car-box').remove();
            var $index =$(this).parents('.shop-car-box').find('.car-pic').find('img').attr('sid');
            // console.log($index);
            // console.log(numarr)
            // console.log(sidarr)
            // console.log($.inArray($index,sidarr))
            // console.log($.inArray($index.toString(),sidarr))
            numarr.splice($.inArray($index,sidarr),1);
            // console.log(numarr)
            sidarr.splice($.inArray($index,sidarr),1);
            // console.log(numarr)
            $.cookie('num', numarr, 7);
            $.cookie('sid',sidarr,7)
        }

    })

})();