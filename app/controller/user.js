'use strict';

const Controller = require('egg').Controller;
// const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async info() {
    const { ctx, service } = this;
    const userId = ctx.query.id;
    const user = await ctx.service.user.find(userId);
    ctx.body = user;

  }

  async login() {
    const { ctx, service } = this;
    const user_name = ctx.request.body.user_name;
    // const user = await ctx.service.user.getUserByLoginName(user_name);

	ctx.body = 'ssss:'+user_name;

    // if (!user) {
    //   ctx.status = 404;
    //   ctx.message = '这个用户不存在。';
    //   return;
    // }

    // const user_password = ctx.params.password;
    // if(user_password != user.password){
    // 	ctx.status = 404;
    // 	ctx.message = '用户名或者密码错误！';
    // 	return;
    // }

    // let content ={ name:user.name}; // 要生成token的主题信息
    // let secretOrPrivateKey="app.get(user)"; // 这是加密的key（密钥） 
    // let time_out = 60*60*24;  // 24小时过期
    // // 创建token
    // let token = jwt.sign(content, secretOrPrivateKey, { expiresIn: time_out });


    // ctx.body = token;

  }

}

module.exports = UserController;
