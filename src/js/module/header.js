define(["jquery","cookie"], $ =>{
    function Header(){
        this.container = $("#header-container");
        // this.searchResults = $('#searchResults')
        this.load().then(()=>{
            this.calcCartNum();
            this.search();
            this.navHover();
            this.isLogin();
        })
    }

    //对象合并
    $.extend(Header.prototype,{
        //加载
        load () {
            return new Promise(resolve=>{
                this.container.load('/html/module/header.html',()=>{
                    resolve();
                })
            })
        },


        //搜索框功能
        search(){
            $(".search-text").on('keyup',()=>{
                $('#searchResults').html("")
                let keyWords = $(".search-text").val();
                //请求接口
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keyWords, data => {
                data = data.s.slice(0,10);
                $(data).each((index,item)=>{
                    $("<li>").html(item).appendTo($("#searchResults"));
                    
                })
        })
            })
        },

        isLogin(){
            if($.cookie('username')){
                $('#welText').hide();
                $('.before-login').hide();
                $('.username').show().html($.cookie('username'));
                $('.after-login').show();
            };
            $('#exit').on("click",()=>{
                $.removeCookie("username",{path:'/'})
                $('#welText').show();
                $('.before-login').show();
                $('.username').hide()
                $('.after-login').hide();
            })
        },

        navHover(){
            console.log(8)
            $("#bigNav li").on({
                'mouseenter' :(event)=>{
                    // console.log( $(event.target).find(".subNav"));
                    $(event.target).find(".subNav").slideDown('slow')
                },
                'mouseleave' :()=>{
                    $("#bigNav li").find(".subNav").slideUp('slow')
                }
                
            })
        },

        //计算购物车中的数量
        calcCartNum(){
            let cart = localStorage.getItem('cart'),
                num = 0;
            if(cart){
                cart = JSON.parse(cart)
                num = cart.reduce((n,shop) =>{
                    n+=shop.num;
                    return n
                },0)
            }
            $("#cartNumber").html(num);

        }
    })
    return new Header();
})