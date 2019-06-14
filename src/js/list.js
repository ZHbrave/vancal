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

            render(list){
                $("#shop-list").html(template("shopList-template",{list}))
                $("#screen-ul").on("click",(e)=>{
                  switch(e.target.id){
                      case "priceLow":this.priceLow(e,list)
                  } 
                })
            }

            priceLow(e,list){
                $(event.target).parents("#screen-ul").find("span").removeClass("redPic");
                $(event.target).siblings("span").addClass("redPic");
                
            }
        }


        return new List()
    })
})