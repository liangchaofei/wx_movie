/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-24 18:37:34
 * @LastEditTime: 2019-08-27 10:07:59
 * @LastEditors: Please set LastEditors
 */
var sha1 = require("sha1");
var getRawBody = require("raw-body");
var Wechat = require("./wechat");
var util = require("./util");

module.exports = function(opts) {
  // var wechat = new Wechat(opts)

  return async ctx => {
    console.log("aa", ctx.query);
    var that = this;
    var token = opts.token;
    var signature = ctx.request.query.signature;
    var nonce = ctx.request.query.nonce;
    var timestamp = ctx.request.query.timestamp;
    var echostr = ctx.request.query.echostr;
    var str = [token, timestamp, nonce].sort().join("");
    var sha = sha1(str);
    console.log("sha", sha);
    console.log("signature", signature);
    console.log("ctx", ctx.req);
    if (ctx.request.method === "GET") {
      if (sha === signature) {
        ctx.body = echostr + "";
      } else {
        ctx.body = "err";
      }
    } else if (ctx.request.method === "POST") {
      if (sha !== signature) {
        ctx.body = "err";
        return false;
      }

      var data = await getRawBody(ctx.req, {
        length: ctx.req.length,
        limit: "1mb",
        encoding: ctx.req.charset
      });
      console.log('data',data.toString());
      var content = await util.parseXMLAsync(data);
      console.log('content',content);
      var message = await util.formatMessage(content.xml);
      console.log('message',message);
      if (message.MsgType === "event") {
        if (message.Event === "subscribe") {
          var now = new Date().getTime();

          that.status = 200;
          that.type = "application/xml";
          that.body = `
                    <xml>
                    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
                    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
                    <CreateTime>${now}</CreateTime>
                    <MsgType><![CDATA[text]]></MsgType>
                    <Content><![CDATA[this is a test]]></Content>
                    <MsgId>1234567890123456</MsgId>
                  </xml>
                    `;
          return;
        }
      }
    }
  };
};
