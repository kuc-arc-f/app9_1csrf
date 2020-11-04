
var express = require('express');
var router = express.Router();

//CSRFミドルウェアを生成する
var csrf = require('csrf');
var tokens = new csrf();

/******************************** 
* 
*********************************/
router.get('/', function(req, res) {
  try{
    //新規で秘密文字とトークンを生成する
    var secret = tokens.secretSync();
    var token = tokens.create(secret);

    //秘密文字をセッションに保存する
    req.session._csrf = secret;
    //トークンをCookieに保存する
    res.cookie('_csrf', token);
    res.render('login');
  } catch (e) {
      console.log(e);
  }
});

/******************************** 
* 
*********************************/
router.post('/', function(req, res){
    var ret_arr = {ret:0, msg:""}
    try{
        var data = req.body
        console.log(data )    
        //秘密文字をセッションから取得する
        var secret = req.session._csrf;
        //トークンをCookieから取得する
        var token = req.cookies._csrf;
        //秘密文字とトークンの組み合わせが正しいかチェックする
        if(tokens.verify(secret, token) === false)
        {
            throw new Error('Invalid Token');
        }else{
            console.log("Success, Token");
        }
        //使用済みの秘密文字を削除する
        delete req.session._csrf;
        //使用済みのトークンを削除する
        res.clearCookie('_csrf');
        ret_arr.ret = 1
        res.json( ret_arr )
    } catch (e) {
        console.log(e);
        res.json(ret_arr);        
    }

});

module.exports = router;
