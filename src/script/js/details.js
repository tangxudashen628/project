//index点击传sid
;(function(){
    var sid=window.location.href.split('=')[1];
    $.ajax({
        url:'http://10.31.163.74/homework/projectname/project/php/details-getsid.php',
        data:{
            sid:sid
        },
        dataType:'json'

    }).done(function(data){
        console.log(data)
        var $str='';
        var $wrap=$('.wrap');
        var $arr=data[0].urlist.split(',');
        console.log($arr.length)
        $str+=`
        <div id="spic">
            <img src="${$arr[0]}" alt="">
            <div id="sf"></div>
        </div>
        <div id="bf">
            <img src="${$arr[0]}" alt="" id="bpic">
        </div>
        <div id="ulist">
            <div id="list">
                <ul>
                    <li><img src="${$arr[0]}" alt=""></li>
                    <li><img src="${$arr[1]}" alt=""></li>
                    <li><img src="${$arr[2]}" alt=""></li>
                    <li><img src="${$arr[3]}" alt=""></li>
                    <li><img src="${$arr[4]}" alt=""></li>
                </ul>
            </div>
        </div>
        
        
        `;
        $wrap.html($str)
    })
})();