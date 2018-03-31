'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // const authUser = middleware.authUser();
  // const errorHandler = middleware.errorHandler();

  router.get('/', controller.home.index);
  router.get('/user', controller.user.info);
  router.post('/user/login', controller.user.login);



  //API
  //获取首页视频
  // router.resources('index/av', errorHandler, app.controller.av);
  router.get('/index/list', controller.av.list);











};
