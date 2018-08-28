var express = require('express');
var User = require('../models/user');
//密码加密
var md5=require('md5');

// 创建一个路由容器
var router = express.Router();

// 首页
router.get('/', (req, res) => {

  res.render('index.html', { title: '我是首页1' });

})


// 登录
router.get('/login', (req, res) => {
  res.render('login.html');
})

router.post('/login', (req, res) => {
  User.find((err,data)=>{
    if(err) return res.status(500).json({
      code: 500,
      msg: 'server err'
    })
    var email=req.body.email;
    var password=req.body.password;
    var flag=data.find((item)=>{
      return item.email==email&&item.password==md5(md5(password));
    })
    if(!flag) return res.status(200).json({
      code:1,
      msg:'password err or email err'
    })
    return res.status(200).json({
      code:0,
      msg:'success'
    })
  })
})

// 注册 
router.get('/register', (req, res) => {
  res.render('register.html');
})

router.post('/register', (req, res) => {
  // console.log(typeof req.body.password);
  req.body.password = md5(md5(req.body.password));
  User.find({
    $or: [
      { name: req.body.name },
      { email: req.body.email }
    ]
  }, (err, data) => {
    if (err) return res.status(500).json({
      code: 500,
      msg: 'server err'
    });
    if (data && data.length != 0) {
      return res.status(200).json({
        code: 1,
        msg: '该用户已经存在，请重新注册'
      });
    } else {

      //为了更加安全而加了两层的md5
      new User(req.body).save((err, data) => {
        if (err) return res.status(500).json({
          code: 500,
          msg: 'server err'
        });
        return res.status(200).json({
          code: 0,
          msg: '注册成功'
        })
      })
    }
  })

})

// 发起 
router.get('/topics/new', (req, res) => {
  res.render('topic/new.html');
})

// 编辑
router.get('/topics/123', (req, res) => {
  res.render('topic/show.html');
})
router.post('/topics/123', (req, res) => {
  res.render('topic/show.html');
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