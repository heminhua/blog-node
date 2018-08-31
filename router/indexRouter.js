var express = require('express');
var User = require('../models/user');
var Topic = require('../models/topic');
var session = require('express-session');

//上传图片
var upload = require("../upload");

//密码加密
var md5 = require('md5');

// 创建一个路由容器
var router = express.Router();
//上传图片
router.post("/upload", function (req, res) {
  //upload.upload()是在formidable的配置文件中用exports.upload定义的一个函数,这个函数中引用了formidable插件，同时也包含了返回给前端数据的过程（可以阅读这个formidable配置文件）
  upload.upload(req, res);
})
// 首页
router.get('/', (req, res) => {
  var user = req.session.user;

  Topic.find((err, data) => {
    if (err) return res.status(500).json({
      code: 500,
      msg: 'server err'
    })

    return res.render('index.html', { title: '我是首页', user: user, data: data });
  })

})



// 发起 
router.get('/topics/new', (req, res) => {
  var user = req.session.user;
  res.render('topic/new.html', { user: user });
})
router.post('/topics/new', (req, res) => {
  // var user = req.session.user;
  console.log(typeof req.body.avator);
  if(req.body.avator==""){
    req.body.avator = '/public/img/avatar-default.png'
  }
  // req.body.avator = '/public/img/upload' + req.body.avator
  new Topic(req.body).save((err, data) => {
    if (err) res.status(500).json({
      code: 500,
      msg: err.message
    })
    return res.status(200).json({
      code: 0,
      msg: "发表成功",
      // list: [doc]
    })
  })
  // res.render('topic/new.html', { user: user });
})

// 编辑
router.get('/topics/123', (req, res) => {
  var user = req.session.user;
  res.render('topic/show.html', { user: user });
})
router.post('/topics/123', (req, res) => {
  var user = req.session.user;
  res.render('topic/show.html', { user: user });
})

// 设置
router.get('/settings/profile', (req, res) => {
  var user = req.session.user;
  res.render('settings/admin.html', { user: user });
})

// 退出 
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
})

module.exports = router;