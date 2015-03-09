var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess = req.session
    if (sess.loginAdminUser) {
        next();
    } else {
        res.render('loginError', { title: '管理员错误页',message:"您还没有登录"});
    }
});

router.get('/', function(req, res, next) {
    res.render('admin', { title: '管理页面'});
});

module.exports = router;
