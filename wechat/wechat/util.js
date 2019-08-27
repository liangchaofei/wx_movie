/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 09:15:31
 * @LastEditTime: 2019-08-27 10:06:29
 * @LastEditors: Please set LastEditors
 */
var xml2js = require('xml2js')
var Promise = require('bluebird')


exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve,reject){
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err){
                reject(err)
            }else{
                resolve(content)
            }
        })
    })
}

function formatMessage(result){
    var message = {}
    if(typeof result === 'object'){
        var keys = Object.keys(result);

        for(var i =0;i<keys.length;i++){
            var item = result[key[i]]
            var key = keys[i]

            if(!(item instanceof Array) || item.length ===0){
                continue
            }

            if(item.length === 1){
                var val = item[0]
                if(typeof val === 'object'){
                    message[key]  = formatMessage(val)
                }else{
                    message[key] === (val || '').trim()
                }
            }else{
                message[key] = []
                for(var j=0,k=item.length;j<k;j++){
                    message[key].push(formatMessage(item[j]))
                }
            }


        }
    }
}

exports.formatMessage = function(xml){
    return new Promise(function(resolve,reject){
        xml2js.parseString(xml,{trim:true},function(err,content){
            if(err){
                reject(err)
            }else{
                resolve(content)
            }
        })
    })
}