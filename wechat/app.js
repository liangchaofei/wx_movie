/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 16:30:18
 * @LastEditTime: 2019-08-27 23:12:38
 * @LastEditors: Please set LastEditors
 */
var Koa = require('koa')
var path = require('path')
var wechat = require('./wechat/g')
var util = require('./libs/util')
var wechat_file = path.join(__dirname,'./config/wechat.txt')
var config = {
    wechat:{
        appID:'11',
        appSecret:'22',
        token:'24_5BiuQkOfWtSvMVh7M8jl6XyAawCMVjasv-klZsN36fHCGUnbNG_fX7MEAvt_gpEEW_dMIgzA5np1fL_-aisbhOx0imQuqBXNxnJhSlzzPgYgIklQhjyJHu-Chgg_2r0tFoiKUtq79B9PS33UFGCeABASTP',
        getAccessToken:function(){
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function(data){
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        }
        
    }
}

var app  = new Koa()
app.use(wechat(config.wechat))

app.listen(1234)
console.log('listen 1234')