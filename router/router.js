var express = require('express');
// 创建一个路由容器
var router = express.Router();

// 首页
router.get('/', (req, res) => {
  res.render('index.html');
})

// 登录
router.get('/login', (req, res) => {
  res.render('login.html');
})

// 注册 
router.get('/register', (req, res) => {
  res.render('register.html');
})

// 发起 
router.get('/topics/new', (req, res) => {
  res.render('topic/new.html');
})

// 发起 
router.get('/settings/profile', (req, res) => {
  res.render('settings/profile.html');
})

// 退出 
// router.get('/logout', (req, res) => {
//   res.render('settings/profile.html');
// })

module.exports = router;