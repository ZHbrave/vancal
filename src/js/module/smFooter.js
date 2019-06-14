define(['jquery'],$=>{
    class SmFooter{
        constructor() {
            this.smfooter=$("#smFooter");
            this.load().then(() => {
                console.log(1);
            });
        }

        load() {
            //把smFooter.html加载到容器里
            return new Promise(resolve=>{
                this.smfooter.load('/html/module/smFooter.html',()=>{
                    //load()异步执行结束
                    resolve();
                })
            })
        }
    }
    return new SmFooter();
})