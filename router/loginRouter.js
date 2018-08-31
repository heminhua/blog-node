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



// 登录
router.get('/login', (req, res) => {
  res.render('login.html');
})

router.post('/login', (req, res) => {
  User.find((err, data) => {
    if (err) return res.status(500).json({
      code: 500,
      msg: 'server err'
    })
    var name = req.body.name;
    var password = req.body.password;
    var flag = data.find((item) => {
      return item.name == name && item.password == md5(md5(password));
    })
    if (!flag) return res.status(200).json({
      code: 1,
      msg: 'password err or name err'
    })
    req.session.user = req.body

    return res.status(200).json({
      code: 0,
      msg: 'success'
    })
  })
})

// 注册 
router.get('/register', (req, res) => {
  res.render('register.html');
})


router.post('/register', (req, res) => {

  //为了更加安全而加了两层的md5
  req.body.password = md5(md5(req.body.password));
  User.findOne({ name: req.body.name }, (err, data) => {
    if (err) return res.status(500).json({
      code: 500,
      msg: 'server err'
    })
    if (data) {
      return res.status(200).json({
        code: 2,
        msg: '该用户已经存在，请重新注册'
      })
    } else {
      User.findOne({ email: req.body.email }, (err, data) => {
        if (err) return res.status(500).json({
          code: 500,
          msg: 'server err'
        })
        if (data) {
          return res.status(200).json({
            code: 1,
            msg: '该邮箱已经存在，请重新注册'
          })
        } else {
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

    }
  })



})






module.exports = router;