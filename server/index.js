// 搭建express服务
const express=require('express');
const app=express();
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//静态文件托管 ----  访问：http:localhost:8989/图片.jpg
app.use(express.static('upload'))



// 路由
const router=require('./router.js')

app.use('/api',router)

app.listen(8989,()=>{
    console.log("服务8989已启动");
})