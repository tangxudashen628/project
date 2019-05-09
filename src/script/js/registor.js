; (function () {
    $(function () {
        $('.form').validate({
            rules: {
                tel: {
                    required: true,
                    minlength:'11',
                    remote: {
                        url: 'http://10.31.163.74/homework/projectname/project/php/registor.php',
                        type: 'post'
                    },
                    isMobile: true
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20,
                },
                repass: {
                    required: true,
                    equalTo: '#password'
                },
                submit:{
                    required:true,
                }
            },
            messages: {
                tel: {
                    required: '手机号不能为空',
                    minlength:'手机号长度不能小于11位',
                    remote: '手机号已存在',
                    isMobile: '手机格式不正确'
                },
                password: {
                    required: '密码不能为空',
                    minlength: '长度不能少于6位',
                    maxlength: '长度不能大于20位',
                },
                repass: {
                    required: '密码不能为空',
                    equalTo: '密码输入有误'
                },
                submit:{
                    required:'错误'
                }
            }
        })
    })
    //手机号码验证  
    $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写手机号码");


    $.validator.setDefaults({
        /*添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)*/
        success: function (label) {
            label.text('√').css('color', 'green').addClass('valid');
        }

    });

})();