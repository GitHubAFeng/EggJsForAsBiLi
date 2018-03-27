'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async info() {
    const { ctx, service } = this;
    const userId = ctx.query.id;
    const user = await ctx.service.user.find(userId);
    ctx.body = user;

  }

  async login() {
    const { ctx, service } = this;

    let msg = '';
    let result = '';

    const user_name = ctx.request.body.user_name;
    const user = await ctx.service.user.getUserByLoginName(user_name);

    if (!user) {
      msg = '用户不存在';
      ctx.body = {"code":0,"msg":msg,"result":result};
      return;
    }

    const user_password = ctx.request.body.user_password;
    if(user_password != user.password){
      msg = '用户名或者密码错误';
      ctx.body = {"code":0,"msg":msg,"result":result};
    	return;
    }

    let content = { name:user_name }; // 要生成token的加密信息
    let secretOrPrivateKey = "app.get(user)"; // 这是加密的key（密钥） 
    let time_out = 60*60*24;  //token有效时间，24小时后过期
    
    // 创建token
    result = jwt.sign(content, secretOrPrivateKey, { expiresIn: time_out });
    ctx.body = {"code":1,"msg":msg,"result":result};


  }

}

module.exports = UserController;
