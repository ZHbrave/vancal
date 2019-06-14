require(['config'],()=>{
    require(['url','jquery','cookie','smFooter'],(url,$)=>{
        function Login(){
            this.userName = $(".username");
            this.passWord = $(".password");
            this.loginBtn = $(".login-btn");
            this.bindEvents();
        }
        $.extend(Login.prototype,{
            bindEvents(){
                this.loginBtn.on("click",()=>{
                    let username = this.userName.val(),
                        password = this.passWord.val();
                        //请求数据
                    $.ajax({
                        url: url.phpBaseUrl+"/login.php",
                        type: "POST",
                        data: {username,password},
                        success:data=>{
                            if(data.res_code===1){
                                this.loginSucc(username);
                            }
                        },
                        dataType:'json'
                    })
                })
            },

            loginSucc(username){
                //存cookie
                let expires = {expires:10,path:"/"};
                $.cookie('username',username,expires);
                alert("登录成功，即将跳转首页");
                //跳转回首页
                location.href = "/"
            }
        })

        return new Login();
    })
})