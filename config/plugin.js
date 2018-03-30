'use strict';

// had enabled by egg
// exports.static = true;

exports.security = false;

//数据库
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

//数据验证
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

//日志
exports.logger = {
  enable: true,
  package: 'egg-logger',
};
