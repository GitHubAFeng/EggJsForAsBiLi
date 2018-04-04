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
  router.get('/index/list/draw', controller.draw.list);   //获取图片列表

  router.get('/crawler/draw', controller.crawler.draw.list);   //爬取图片列表




};
