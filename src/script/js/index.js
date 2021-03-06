// 轮播图
; (function () {
    var $liwidth = $('.banner li').width();
    var $ul = $('.banner');
    var $tabA = $('.tab a');
    var $right = $('.right');
    var $main = $('.main-l');
    var num = 0;
    var timer = null;
    $ul.append('<li><a href="#"><img src="https://p2.maiyaole.com/img/item/1556803775251155.jpg" alt=""></a></li>');

    $ul.width($liwidth * $('.banner li').length);
    $ul.css('left', 0);
    $tabA.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $ul.animate({
            left: -$liwidth * ($(this).index() + 1),
        })
        num = $(this).index();
    });
    $right.on('click', function () {
        num++;
        if (num > $('.banner li').length - 1) {
            num = 1;
            $ul.css('left', 0);
        };
        if (num == $('.banner li').length - 1) {
            $tabA.eq(0).addClass('active').siblings().removeClass('active');
        }
        $tabA.eq(num).addClass('active').siblings().removeClass('active');
        $ul.animate({
            left: -$liwidth * num,
        })
    })
    timer = setInterval(function () {
        $right.click()
    }, 3000);

    $main.hover(function () {
        clearInterval(timer)
    }, function () {
        timer = setInterval(function () {
            $right.click()
        }, 3000);
    })
})();


// 导航hover二级导航效果
(function () {
    var $navText = $('.nav-text');
    var $category = $('.category');
    var $i = $('.nav-text i');

    $navText.on('mouseover', function () {
        $category.css('display', 'block');
        $(this).css({
            'color': '#314349',
            'background-color': '#fff'
        });
        $(this).find($i).css('color', '#314349')
    });
    $navText.on('mouseleave', function () {
        $category.css('display', 'none');
        $(this).css({
            'color': '#fff',
            'background-color': '#314349'
        });
        $i.css('color', '#fff');
    });
})();


// 楼梯
(function () {
    var $elevator = $('.elevator');
    var $li = $('.elevator li');
    var $firsta = $('.loutifloor');
    var $seconda = $('.hover');
    var $louceng = $('.louceng');
    //显示楼梯
    $(window).on('scroll', function () {
        if ($('body,html').scrollTop() > 600 && $('body,html').scrollTop() < $('.floor6').offset().top) {
            $elevator.show()
        } else {
            $elevator.hide();
        };

        //随着滚动条li滚动
        $louceng.each(function (index, element) {
            if ($('body,html').scrollTop() < $(element).offset().top + 200) {
                $li.removeClass('current');
                $li.eq(index).addClass('current');
                return false
            }
        })
    })
    //文字切换
    $li.hover(function () {
        $firsta.eq($(this).index()).hide()
        $seconda.eq($(this).index()).show().css('background', '#157CDB');
    }, function () {
        $firsta.show();
        $seconda.hide();

    })
    //点击楼层跳转
    $li.on('click', function () {
        $(this).addClass('current').siblings().removeClass('current');
        $seconda.eq($(this).index()).css('display', 'block')
        var $top = $louceng.eq($(this).index()).offset().top;
        $('body,html').animate({
            scrollTop: $top
        })
    })

})();

//tab切换
(function () {
    var $title = $('.footer-1 ul li');
    var $inner = $('.logopic');

    $title.on('mouseover', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $inner.eq($(this).index()).addClass('show').siblings().removeClass('show')
    })

})();

//搜索框https://suggest.taobao.com/sug?code=utf-8&q=aa&_ksTS=1557212158431_285&callback=jsonp286&k=1&area=c2c&bucketid=15

(function () {


})();


//渲染数据ajax

; (function () {
    $.ajax({
        url: 'http://10.31.163.74/homework/projectname/project/php/index-returndata.php',
        dataType: 'json',
    }).done(function (data) {
        //拼接135数据
        console.log(data)
        var $floor1 = $('.floor-r-1');
        var $floor3 = $('.floor-r-3');
        var $floor5 = $('.floor-r-5');
        var $str = '';
        $str += `
                <a href="details.html?sid=${data[14].sid}"><img data-original="${data[14].url}" class="lazy" width="625" height="284"></a>
                <a href="details.html?sid=${data[0].sid}"><img data-original="${data[0].url}" class="lazy" width="190" height="284"></a>
                <a href="details.html?sid=${data[1].sid}"><img data-original="${data[1].url}" class="lazy" width="190" height="284"></a>
                <ul>
                    <li>
                        <a href="details.html?sid=${data[2].sid}"><img data-original="${data[2].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[2].sid}" class="main-title">${data[2].title}</a>
                        <p>${data[2].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[3].sid}"><img data-original="${data[3].url}" class="lazy" width="100" height="100"></a>
                        <a href=details.html?sid=${data[3].sid} class="main-title">${data[3].title}</a>
                        <p>${data[3].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[4].sid}"><img data-original="${data[4].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[4].sid}" class="main-title">${data[4].title}</a>
                        <p>${data[4].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[5].sid}"><img data-original="${data[5].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[5].sid}" class="main-title">${data[5].title}</a>
                        <p>${data[5].price}</p>
                    </li>
                    <li><a href="details.html?sid=${data[6].sid}"><img data-original="${data[6].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[6].sid}" class="main-title">${data[6].title}</a>
                        <p>${data[6].price}</p>
                    </li>
                </ul>
            `;
        $floor1.html($str);
        $floor3.html($str);
        $floor5.html($str);

        //拼接246数据
        var $floor2 = $('.floor-r-2');
        var $floor4 = $('.floor-r-4');
        var $floor6 = $('.floor-r-6');
        $str = '';
        $str += `
                <a href="details.html?sid=${data[15].sid}"><img data-original="${data[15].url}" class="lazy" width="625" height="284"></a>
                <a href="details.html?sid=${data[7].sid}"><img data-original="${data[7].url}" class="lazy" width="190" height="284"></a>
                <a href="details.html?sid=${data[8].sid}"><img data-original="${data[8].url}" class="lazy" width="190" height="284"></a>
                <ul>
                    <li>
                        <a href="details.html?sid=${data[9].sid}"><img data-original="${data[9].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[9].sid}" class="main-title">${data[9].title}</a>
                        <p>${data[9].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[10].sid}"><img data-original="${data[10].url}" class="lazy" width="100" height="100"></a>
                        <a href=details.html?sid=${data[10].sid} class="main-title">${data[10].title}</a>
                        <p>${data[10].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[11].sid}"><img data-original="${data[11].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[11].sid}" class="main-title">${data[11].title}</a>
                        <p>${data[11].price}</p>
                    </li>
                    <li> <a href="details.html?sid=${data[12].sid}"><img data-original="${data[12].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[12].sid}" class="main-title">${data[12].title}</a>
                        <p>${data[12].price}</p>
                    </li>
                    <li><a href="details.html?sid=${data[13].sid}"><img data-original="${data[13].url}" class="lazy" width="100" height="100"></a>
                        <a href="details.html?sid=${data[13].sid}" class="main-title">${data[13].title}</a>
                        <p>${data[13].price}</p>
                    </li>
                </ul>
            `;
        $floor2.html($str);
        $floor4.html($str);
        $floor6.html($str);
        //懒加载
        $(function () {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        });
    })
})();

// 登录成功后改变用户名
; (function () {
    setTimeout(function () {
        var $afterlogin = $('.header-nav-right .login .red');
        var $registor = $('.login .black');
        if ($.cookie('tel') == undefined) {//如果不存在cookie
            $afterlogin.html('登录').attr('href','http://10.31.163.74/homework/projectname/project/src/login.html');
            $registor.html('注册').attr('href','http://10.31.163.74/homework/projectname/project/src/registor.html');
        //如果存在cookie改变登录注册的跳转路径
        } else {
            $afterlogin.html($.cookie('tel')).attr('href','javascript:;');
            $registor.html('退出').attr('href','javascript:;')
            
        }
        //点击退出时删除cookir并刷新页面
        $registor.on('click', function () {
            $.cookie('tel', null,{ expires: -1 })
            location.reload()
        })
       
    })

})();

