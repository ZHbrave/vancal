require(['config'],()=>{
    require(['url','jquery','smFooter'],(url,$)=>{
        function Register(){
            this.bindEvents();
        }
        $.extend(Register.prototype,{
            bindEvents(){
                $('.register-in').on("click",()=>{
                    let username = $("#phoNum").val(),
                        password = $(".password").val();
                        console.log($(".phonenum"));
                        $.ajax({
                            url:url.phpBaseUrl+"/register.php",
                            type: "post",
                            data:{username,password},
                            success:data=>{
                                if(data.res_code===1){
                                    alert(data.res_message+",即将跳转登录页");
                                    location.href='login.html';
                                }
                            },
                            dataType: 'json'
                        })
                })
            }
        })

        return new Register();
    })
})