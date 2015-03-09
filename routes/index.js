var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = '/avatar/';
var TITLE = '文件上传';

router.get('/login/:username/:password', function(req, res, next) {
    var username = req.params.username;
    var password = req.params.password;
    if(username =='aaa' && password =='123456'){
        req.session.loginUser = req.params.username;
        res.json({'s':1,'u':username});
    }else{
        res.json({'s':0,'u':username});
    }
});

router.post('/uploadimg', function(req, res) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', { title: 'Express','loginUser':req.session.loginUser});
            return;
        }

        var extName = '';  //后缀名
        switch (files.files.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.render('index', { title: 'Express','loginUser':req.session.loginUser});
            return;
        }

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);
        fs.renameSync(files.files.path, newPath);  //重命名
    });

    res.locals.success = '上传成功';
    //res.download(realpath,filename);下载文件
    res.render('index', { title: 'Express','loginUser':req.session.loginUser});
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express','loginUser':req.session.loginUser});
});

module.exports = router;
