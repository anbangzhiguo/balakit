var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess = req.session
    if (sess.loginUser) {
        next();
    } else {
        res.render('loginError', { title: '错误页',message:"您还没有登录"});
    }
});

router.get('/', function(req, res, next) {
    res.render('users', { title: '用户页面'});
});

module.exports = router;
