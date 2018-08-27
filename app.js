// 引入核心模块
var fs=require('fs');
var path=require('path');
var bodyParser=require('body-parser');
var express=require('express');

// 引入文件
var router=require('./router/router');

var app=express();

//配置中间件
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

// 配置模版
app.engine('html',require('express-art-template'));

//开放静态资源
app.use('/views/',express.static(path.join(__dirname,'./views/')));
app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
// app.use('/router/',express.static(path.join(__dirname,'./router/')));

// app.get('/',(req,res)=>{
//   res.render('index.html',{name:'heminhua'});
// })

// 使用路由
app.use(router);

app.listen(3000,()=>{
  console.log('run...');
  
})