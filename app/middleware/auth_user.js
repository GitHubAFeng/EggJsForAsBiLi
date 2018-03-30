'use strict';

module.exports = (option, app) => {
  // 验证用户是否登录
  return async function(ctx, next) {
    //todo
    // const user_token = ctx.request.header.authorization;
    // if(user_token == ''){
    //   ctx.status = 403;
    //   ctx.body = {"code":0,"msg":"需要登录后操作","result":""};
    //   return;
    // }else{
    //   const secretOrPrivateKey = this.app.config.secret_private_key;
    //   jwt.verify(user_token, secretOrPrivateKey, function (err, decode) {
    //     if (err) { 
    //       switch (err.name) {
    //         case 'TokenExpiredError':
    //           msg = '登录验证超时，请重新登录';
    //           break;
  
    //           case 'JsonWebTokenError':
    //           msg = 'Token验证错误，请重新登录';
    //           break;
          
    //         default:
    //           msg = '登录验证错误，请重新登录';
    //           break;
    //       } 

    //       ctx.status = 403; 
    //       ctx.body = {"code":0,"msg":msg,"result":result};
    //       return;
    //     } else {
    //         msg = decode.name;
    //         ctx.body = {"code":1,"msg":msg,"result":result};
    //         return;
    //     }
    //   })

    // }

    await next();


  };
};
