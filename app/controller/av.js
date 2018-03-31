'use strict';

const Controller = require('egg').Controller;

class AvController extends Controller {

  //入参数据验证
  constructor(ctx) {
    super(ctx);

    // this.createRule = {
    //   accesstoken: 'string',
    //   title: 'string',
    //   tab: { type: 'enum', values: [ 'ask', 'share', 'job' ], required: false },
    //   content: 'string',
    // };
  }

  //主页随机推荐列表
  async list() {
    const { ctx } = this;
    const av_type = ctx.query.type;   //视频数据类型
    const list_page = ctx.query.page; //当前页码
    const list_size = ctx.query.size; //每页数据数量
    // ctx.validate(this.createRule);

    //目前只知道info/warn日志会打印
    // ctx.logger.info('some request data: %j', ctx.request.body);
    // ctx.logger.warn('WARNNING!!!!');
    // this.app.logger.info('启动耗时 %d ms', Date.now());
    // this.app.logger.warn('warning!');

    const data = await ctx.service.av.list(
      {
        page: list_page,
        size: list_size,
        type: av_type
      }
    );
    const msg = 'ok';
    ctx.body = {"code":0,"msg":msg,"result":data};    

  }







}

module.exports = AvController;
