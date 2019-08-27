/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 09:33:56
 * @LastEditTime: 2019-08-26 10:15:19
 * @LastEditors: Please set LastEditors
 */
var fs = require('fs')
var Promise = require('bluebird')


exports.readFileAsync = function(fpath,encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding,function(err,content){
            if(err){
                reject(err)
            }else{
                resolve(content)
            }
        })
    })
}

exports.writeFileAsync = function(fpath,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath,content,function(err){
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    })
}