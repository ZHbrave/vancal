require(['config'],()=>{
    require(['url','template','header','footer'],(url,template,header)=>{
        class List{
            constructor(){
                this.getData();
            }

            //请求数据
            getData(){
                $.ajax({
                    url:url.rapBaseUrl+"vancl/type",
                    type:'get',
                    dataType: "json",
                    success: data =>{
                        console.log(data)
                        if(data.res_code===1)this.render(data.res_body.list3);
                        console.log(data.res_body.list3)
                    }
                })
            }
            //进入列表页时默认状态下商品数据的渲染
            render(list){
                $("#shop-list").html(template("shopList-template",{list}))
                $("#screen-ul").on("click",(e)=>{
                    // console.log(e.target.id);
                  switch(e.target.id){
                      case "priceLow":this.priceLow(e,list) ;break;
                      case "defult" : this.defult(e,list);break;
                  } 
                })
            }
            //点击价格从高到低按钮事件
            priceLow(e,list){
                $(e.target).parents("#screen-ul").find("span").removeClass("redPic");
                $(e.target).css({"color":"#a00000"}).siblings("span").addClass("redPic");
                var heightList3 = list.sort((a,b)=>{
                    return b.price-a.price;
                })
                $("#shop-list").html(template("shopList-template",{list:heightList3}))
            }

            //点击默认按钮事件
            defult(e,list){
                console.log(list)
                $(e.target).parents("#screen-ul").find("span").removeClass("redPic").siblings("em").css({"color":"#656565"});
                $(e.target).css({"color":"#a00000"}).siblings("span").addClass("redPic");
                var defultList = list.sort((a,b)=>{
                    return a.id-b.id
                })
                $("#shop-list").html(template("shopList-template",{list:defultList}))
            }
        }


        return new List()
    })
})