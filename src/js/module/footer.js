define(['jquery'],$=>{
    function Footer() {
        this.container=$("#footer-container");
        this.load();
    }


    //对象合并
    $.extend(Footer.prototype,{
        //es6对象增强写法
        load() {
            //把footer.html加载到container里面
            return new Promise(resolve=>{
                this.container.load('/html/module/footer.html',()=>{
                    //load()异步执行结束
                    resolve();
                })
            })
        }
    })
    return new Footer()
})