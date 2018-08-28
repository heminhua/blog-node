var express = require('express');
var User = require('../models/user');

// 创建一个路由容器
var router = express.Router();

// 首页
router.get('/', (req, res) => {
  User.find((err, data) => {
    if (err) res.status(500).send('331;');
    console.log(data);
    res.render('index.html', { title: '我是首页1' });

  })
})


// 登录
router.get('/login', (req, res) => {
  res.render('login.html');
})

// 注册 
router.get('/register', (req, res) => {
  res.render('register.html');
})

router.post('/register', (req, res) => {
  console.log(req.body);

  res.send('register');
})

// 发起 
router.get('/topics/new', (req, res) => {
  res.render('topic/new.html');
})

// 编辑
router.get('/topics/123', (req, res) => {
  res.render('topic/edit.html');
})

// 设置
router.get('/settings/profile', (req, res) => {
  res.render('settings/admin.html');
})

// 退出 
router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router;