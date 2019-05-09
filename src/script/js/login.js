;(function(){
    
    var $login=$('.button');
    $login.on('click',function(){
        var $tel=$('.user').val();
        var $pass=$('.pass').val();

        $.ajax({
            url:'http://10.31.163.74/homework/projectname/project/php/login.php',
            data:{
                tel:$tel,
                pass:$pass
            },
            type:'post'
        }).done(function(data){
 
            if(!data){//用户名或者密码错误
                $('.error-tip').html('用户名或者密码错误');
                $('.pass').val('');
            }else{//成功,存cookie,跳转到首页
                $.cookie('tel',$tel,7);
                location.href='http://10.31.163.74/homework/projectname/project/src/index1.html';
            }
        })
        
    })
    





})();