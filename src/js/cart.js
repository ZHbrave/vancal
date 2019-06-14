require(['config'],()=>{
    require(['jquery','template','header','smFooter'],($,template,header)=>{
        function Cart(){
            //获取元素
            this.content = document.querySelector(".content");
            this.productsCont = document.querySelector("#productsCont");
            this.totalPrice = this.content.querySelector("#totalPrice")
            this.allCheckTop = this.content.querySelector("#allCheckTop");
            this.allCheckBot = this.content.querySelector("#allCheckBot");
            this.alldel = this.content.querySelector("#alldel");
            this.init();
            this.isLogin();
        }
            //合并方法
        Cart.prototype={
            constructor : Cart,

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

            //取数据
            init(){
                let cart = localStorage.getItem('cart');
                if(cart&&cart !== "[]"){
                    cart = JSON.parse(cart);
                    this.render(cart);
                    this.calcMoney();

                }else{
                    $(".content").hide()
                    let empty=document.createElement("div");
                    $(empty).html("购物车是空的，赶快去<a href='/index.html'>购物</a>吧").css({"width":"980px","height":"70px","color":"gray","font-size":"16px","text-align":"center",
                "margin-top":"50px",}).appendTo("main").find("a").css({"color":"red"})
                    // this.calcMoney();
                    
                }
            },
            //渲染
            render(cart){
                $('#productsCont').html(template('cartTemplate',{cart}))
                this.productsCont = this.content.querySelector("#productsCont");
                this.checks = Array.from(this.productsCont.querySelectorAll("#aloneCheck"));
                this.n = this.checks.length;
                this.bindEvents();
            },
            bindEvents(){
                //事件委托
                this.content.onclick = e=>{
                    this.liContainer = e.target.parentNode;
                    let cart = JSON.parse(localStorage.getItem('cart')),
                    index = 0,
                    idName = $(e.target).parents("#temShop").attr("data-id")*1;//找到自定义属性值
                    
                    // 遍历存下的数据
                    cart.some((item,i)=>{
                        index = i
                        return item.id === idName
                    });
                    
                    //给删除按钮绑事件
                    if(e.target.id==="onlydel"){
                        this.delBtn(index,cart,e);
                    };
                    //给减商品按钮绑事件
                    if(e.target.id==="minus"){
                        this.minusBtn(index,cart)
                    };

                    //增商品绑事件
                    if(e.target.id==="add"){
                        this.addBtn(index,cart)
                    };


                    //给上全选按钮绑事件
                    this.allCheckTop.onchange=this.allCheckChange.bind(this)
                    //给下全选按钮绑事件
                    this.allCheckBot.onchange=this.allCheckChangecopy.bind(this)
                    
                    //给单选按钮绑事件
                    this.checks.forEach(check=>{
                        check.onchange=()=>{
                         this.aloneCheckChange(check);
                        }
                    })
                }
                    
            },
            //删除按钮的事件
            delBtn(index,cart,e){
                $('.simple-dialog').hide(); 
                 $(e.target).siblings('.simple-dialog').show().on({
                    'click':(e)=>{
                        if(e.target.id==="okBtn"){
                            this.liContainer.remove();

                            //重新获取n的数量
                            
                            //找到传过来缓存里面的cart，删除对应下标的那一条数据商品
                            cart.splice(index,1);
                            localStorage.setItem('cart',JSON.stringify(cart));
                            this.checks=Array.from(this.productsCont.querySelectorAll("#aloneCheck"));
                            this.n=0
                            this.checks.forEach(check=>{
                                if(check.checked)this.n++
                            })
                            this.allCheckTop.checked = this.n===this.checks.length;
                            if(cart.length === 0) this.init();
                            this.calcMoney();
                        }
                        $('.simple-dialog').hide();     //确定删除后删除框隐藏          
                        $('.simple-dialog').off('click'); //取消事件监听
                    },
                    'mouseleave':()=>{
                        $('.simple-dialog').hide();     //鼠标移开后删除框隐藏                           
                    }
            });
                 header.calcCartNum();  
                    
            },

             // 减少商品事件
             minusBtn(index,cart){
               if(cart[index].num>1) cart[index].num--
               $('#productsCont').html(template('cartTemplate',{cart}))
                localStorage.setItem('cart',JSON.stringify(cart));
                this.calcMoney();
            },
            //增加商品事件
            addBtn(index,cart){
                cart[index].num++;
                $('#productsCont').html(template('cartTemplate',{cart}))
                localStorage.setItem('cart',JSON.stringify(cart));
                this.calcMoney();

            },

            //全选按钮的事件
            allCheckChange(){
                console.log(this.checks);
                this.checks.forEach(check=> {
                    check.checked = this.allCheckTop.checked;
                    this.allCheckBot.checked=this.allCheckTop.checked;
                });
                this.n=this.allCheckTop.checked?this.checks.length:0;

                this.calcMoney();
            },
            allCheckChangecopy(){
                this.allCheckTop.checked = this.allCheckBot.checked;
                this.allCheckChange();
            },

            //dan选按钮的事件
            aloneCheckChange(check){
                // 修改选中单选的数量
                this.n += check.checked ? 1 : -1;
                console.log(this.n);
                this.allCheckTop.checked=this.allCheckBot.checked = this.n === this.checks.length;
                this.calcMoney();
            },
           
            calcMoney(){
                this.allMoney=0;
                this.ulList=Array.from(this.productsCont.children)
                this.ulList.forEach(item=>{
                   if(item){
                    if(item.querySelector("#aloneCheck").checked){
                        this.allMoney+=Number(item.querySelector(".subtotal em").innerHTML)
                    }
                   }else{
                    this.allMoney === 0
                   }
                });
                this.totalPrice.innerHTML = this.allMoney
            }
            
        }
        return new Cart()
    })
})