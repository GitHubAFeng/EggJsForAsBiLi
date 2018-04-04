'use strict';

const Controller = require('egg').Controller;

class CrawlerDrawController extends Controller {

  //入参数据验证
  constructor(ctx) {
    super(ctx);

  }

  //主页随机推荐列表
  async list() {
    const { ctx } = this;
    const data_type = ctx.query.type;   //视频数据类型
    const list_page = ctx.query.page; //当前页码
    const list_size = ctx.query.size; //每页数据数量

    const data = await ctx.service.crawler.draw.list(
      {
        page: list_page,
        size: list_size,
        type: data_type
      }
    );
    const msg = 'ok';
    ctx.body = {"code":0,"msg":msg,"result":data};    

  }


}

module.exports = CrawlerDrawController;
