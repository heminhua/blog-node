// 引入核心模块
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var mongoose = require("mongoose");//链接mongoDB的库

// 引入文件
var indexRouter = require('./router/indexRouter');
var loginRouter = require('./router/loginRouter');
// var uploadimg=require('./upload');
// uploadimg.upload();

var app = express();

//将当前全局对象下的Promise赋值给mongoose.promise
mongoose.Promise = global.Promise;
//链接mongodb数据库,第二个参数表示兼容老版本mongo
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true }, function (err) {
  if (!err) {			//此处这个函数的第一个参数是mongoose库提供的一个内置的错误对象
    console.log("连接成功")
  } else {
    console.log("连接失败")
  }
});

//配置中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置模版
app.engine('html', require('express-art-template'));

//开放静态资源
app.use('/views/', express.static(path.join(__dirname, './views/')));
app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));
// app.use('/uploadcache/', express.static(path.join(__dirname, './uploadcache/')));
// app.use('/router/',express.static(path.join(__dirname,'./router/')));

// app.get('/',(req,res)=>{
//   res.render('index.html',{name:'heminhua'});
// })
app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}))
// 使用路由
app.use(indexRouter);
app.use(loginRouter);

app.listen(3000, () => {
  console.log('run...');

})