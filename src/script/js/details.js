//index点击传sid +数据拼接+ 放大镜
; (function () {
    var sid = window.location.href.split('=')[1];
    $.ajax({
        url: 'http://10.31.163.74/homework/projectname/project/php/details-getsid.php',
        data: {
            sid: sid
        },
        dataType: 'json'

    }).done(function (data) {
        var $str = '';
        var $wrap = $('.wrap');
        var $arr = data[0].urlist.split(',');
        $spic = $('#spic img');
        $bpic = $('#bpic')
        $ul = $('#list ul')

        //小图
        $.each($arr, function (index, value) {
            $str += `<li><img data-original="${value}" class="lazy" width="100" height="100"></li>`
        })
        $ul.html($str);

        //大图
        $spic.attr('src', $arr[0]);
        $bpic.attr('src', $arr[0]);
    
        //懒加载
        $(function () {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        });

        //放大镜
        class scale {
            constructor() {
                this.spic = $('#spic');
                this.sf = $('#sf');
                this.bf = $('#bf');
                this.bpic = $('#bpic');
                this.wrap = $('.wrap')
                //bili
                this.bili = this.bpic.width() / this.spic.width();
                // console.log(this.bili)
                //列表图片
                this.li = $('#list ul li');
                //ul
                this.ul = $('#list ul');
                //左右按钮
                this.left = $('#left');
                this.right = $('#right');
            }
            init() {
                var _this = this;
                this.spic.hover(function () {
                    _this.in();
                }, function () {
                    _this.out();
                });
                //计算ul宽度
                this.liwidth = this.li.outerWidth();
                // alert(this.liwidth);
                this.ul.width(this.liwidth * this.li.length);
                // alert(this.ul.width())
                this.li.on('click', function () {
                    _this.tab(this);//一定要传this当前操作的li
                })


                //左右按钮点击
                this.visiblelength = 5;
                if($arr.length<6){
                    this.right.css('color', '#fff')

                }
                this.left.on('click', function () {
                    _this.leftclick();
                });
                this.right.on('click', function () {
                    _this.rightclick();
                });
            }
            in() {
                var _this = this;
               
                this.sf.css('display', 'block');
                this.bf.css('display', 'block');
                //小放的尺寸
                this.sf.width(this.bf.width() * this.spic.width() / this.bpic.width());
                this.sf.height(this.bf.height() * this.spic.height() / this.bpic.height());
                
                //跟随鼠标移动
                this.spic.on('mousemove', function (e) {
                    _this.move(e);
                });

            }
            out() {
                this.sf.css('display', 'none');
                this.bf.css('display', 'none');
            }
            move(e) {
                var $left = e.pageX - this.sf.width() / 2 - this.wrap.offset().left;
                var $top = e.pageY - this.sf.height() / 2 - this.wrap.offset().top;
                if ($left <= 0) {
                    $left = 0
                } else if ($left >= this.spic.width() - this.sf.width()) {
                    $left = this.spic.width() - this.sf.width()
                }
                if ($top <= 0) {
                    $top = 0
                } else if ($top >= this.spic.height() - this.sf.height()) {
                    $top = this.spic.height() - this.sf.height()
                }
                this.sf.css({
                    left: $left,
                    top: $top
                })
                this.bpic.css({
                    left: -$left * this.bili,
                    top: -$top * this.bili
                })
            }
            tab(li) {
                var $url = ($(li).find('img').attr('data-original'));
                this.spic.find('img').attr('src', $url);
                this.bpic.attr('src', $url);
            }
            leftclick() {
                if (this.visiblelength > 5) {
                    this.visiblelength--;
                    this.right.css('color', '#333')
                    if (this.visiblelength == 5) {
                        this.left.css('color', '#fff')
                    }
                    
                }
                this.ul.css({
                        left: -this.liwidth * (this.visiblelength - 5)
                    })
            }
            rightclick() {
                if (this.li.length > this.visiblelength) {
                    this.visiblelength++;
                    this.left.css('color', '#333')
                    if (this.visiblelength == this.li.length) {
                        this.right.css('color', '#fff')
                    }
                    
                }
                this.ul.css({
                        left: -this.liwidth * (this.visiblelength - 5)
                    })
                
            }
        }
        new scale().init();

        //右边购物车 title  price
        var $h3=$('.box_right h3');
        var $span=$('.box_right span');
        $h3.html(data[0].title);
        $span.html(data[0].price);

        //数量加减
        var $num=$('.num');
        var $num_pre=$('.num_pre');
        var $num_next=$('.num_next');
        var $quantity=1;
        $num_next.on('click',function(){
            $quantity--
            if($quantity>=1){
            $num.val($quantity);
            
            }else{
                $quantity=1;
            }
        });
        $num_pre.on('click',function(){
            $num.val(++$quantity);
        });

        //点击购物车存入cookie
        var $addgwc=$('.box_right button');
        var sidarr=[];
        var numarr=[];
        function cookietoarray() {
            if($.cookie('sid')&& $.cookie('num')) {//判断商品是第一次存还是多次存储
                sidarr = $.cookie('sid').split(','); //cookie商品的sid  
                numarr = $.cookie('num').split(','); //cookie商品的num
            }
        }
        $addgwc.on('click',function(){
            cookietoarray();//获取sid和num
            if($.inArray(sid,sidarr)!=-1){//如果存在
                var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($num.val());
                numarr[$.inArray(sid,sidarr)]=num;
                $.cookie('num',numarr.toString(),7)
                
            }else{
                sidarr.push(sid);
                numarr.push($num.val());
                $.cookie('sid',sidarr.toString(),7);
                $.cookie('num',numarr.toString(),7);
                
            }
            
        })
    })
})();


