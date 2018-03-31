'use strict';

module.exports = appInfo => {
  const config = exports = {};


  // debug 为 true 时，用于本地调试
  config.debug = true;

  config.addr = 'http://127.0.0.1/';

  config.secret_private_key = 'node_secret'; // token密钥

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521950350126_270';

  // 注册中间件
  config.middleware = ['authUser','errorHandler'];

    // errorHandler 中间件只对 /api 前缀的 url 路径生效
    // config.errorHandler = {
    //   match: '/api',
    // };

  exports.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'test',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  //日志目录
  exports.logger = {
    appLogName: `${appInfo.name}-web2.log`,
  }


  
  return config;
};
