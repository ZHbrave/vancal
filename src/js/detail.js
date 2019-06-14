require(['config'],()=>{
    require(['url','template','header','footer','fly','zoom'],(url,template,header)=>{
        function Detail (){
        // console.dir(location)
        this.init()
        this.addCart()
        }
        Detail.prototype={
            constructor:Detail,
            init(){
                let id =Number(location.search.slice(4));
                $.get(url.rapBaseUrl+"detail/get",{id},res=>{
                    // console.log(res)
                    if(res.res_code===1){
                        let data=res.res_body.data;
                        data={...data,id};
                        console.log(data);
                        this.data = data;
                        this.render(data)
                    }
                })

            },

            render(data){
                $("#mainDetail").html(template('detailTemplate',{data}))
                this.zoom()
            },

            //放大镜
            zoom(){
                $(".zoom-img").elevateZoom({
                    gallery: "gal1",
                    cursor: "crosshair",
                    galleryActiveClass: 'active',
                    borderSize: "1",
                    borderColor: "#888",
                    zoomWindowOffetx:5,
                    zoomWindowOffety:-25
                })
            },

            addCart(){
                //事件委托

                $("#mainDetail").on("click","#addCar",e=>{
                    //完成抛物线加购物车动画
                    $(`<img src='${this.data.img[0]}' style='width:30px;height:30px;'>`).fly({
                        start:{
                            left: e.clientX,
                            top:e.clientY
                        },
                        end:{
                            left:$(".shop-car").offset().left,
                            top:$(".shop-car").offset().top
                        },
                        onEnd:function(){
                            this.destroy(); //销毁抛物体
                            // header.calcCartNum();//调用一次计算购物车数量的方法
                            header.calcCartNum()
                        }
                    });
                    // 取到当前购物车里面的的值
                    let num = $("#selectNum option:selected").text()*1,
                    cart = localStorage.getItem('cart');
                    // console.log(num)

                    if(cart){

                        cart = JSON.parse(cart);
                        //已经存过购物车，判断存过的购物车里面有没有一样的商品
                        let index=0;
                        // num =document.querySelector("#selectNum").value,
                        if(cart.some((shop,i)=>{
                            index = i;
                            return shop.id=== this.data.id
                        })){

                            cart[index].num+=num;
                        }else{
                            cart.push({...this.data,num:num})
                        }
                    }else{
                        //购物车为空的时候
                        //设置数据，把这条data存到数据里面去
                        cart = [{...this.data,num:num}];
                    }

                    //把cart存进localStorage里面
                    localStorage.setItem('cart',JSON.stringify(cart));
                })
            }
        }
        return new Detail()
    })
})