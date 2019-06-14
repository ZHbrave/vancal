require(['config'],() => {
    require(["swiper","url","template",'header','footer'],(Swiper,url,template,header) => {
        class Index{
            constructor(){
                this.banner();
                this.getData();
            }

            banner(){
                //首页轮播图

                var mySwiper = new Swiper('.swiper-container',{
                    autoplay:true,
                    effect : 'fade',
                    loop:true,  //循环模式选项
                    pagination:{
                        el:'.swiper-pagination',
                        clickable:true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                      },

                })
            }


            // 请求列表数据
            getData(){
                $.ajax({
                    url:url.rapBaseUrl+"vancl/type",
                    type: 'get',
                    dataType: "json",
                    success: data =>{
                        if(data.res_code===1){
                            this.render(data.res_body);
                        }
                    }
                })
            }

            //把接受到的数据渲染到template里
            render(list) {
                // var list1=list.list1
                //把列列表1加载到seckill里
                $("#seckill-list").html(template('seckill-template',{list:list.list1}));
                $("#rec-shop").html(template('rec-template',{list:list.list2}));
            }
        }
        new Index()
    })
})