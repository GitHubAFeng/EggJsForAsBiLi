'use strict';

const path = require('path');
const fs = require('fs');
const Service = require('egg').Service;
const cheerio = require('cheerio');

class DrawService extends Service {
  constructor(ctx) {
    super(ctx);
    //默认是绘画
    this.root = 'https://api.vc.bilibili.com/link_draw/v2/Doc/index?type=recommend';
  }

  //发起请求
  async request(url, opts) {
    //对象赋加属性
    opts = Object.assign({
      timeout: ['30s', '30s'],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async list(params = {}) {
    const data_type = params.type || 'draw';   //数据类型
    const list_page = params.page || 0; //当前页码
    const list_size = params.size || 20; //每页数据数量
    const list_offset = list_page > 1 ? list_size * list_page : 0;  //偏移数据个数

    const url = `${this.root}&page_num=${list_page}&page_size=${list_size}`;
    
    const result = await this.request(url, {});
    
    let list_object = JSON.stringify(result.data.data.items);
    // let list_object = result.data.items;
    // this.app.logger.info('list_object:'+ JSON.stringify(result));
    this.app.logger.info('list_object:'+ list_object);
    let data_list = [];

    const arr = Object.keys(list_object);
    if (arr.length == 0) {
        //如果B站API失效则从数据库中读取数据
        data_list = await this.app.mysql.select('wepy_list', { // 搜索 wepy_list 表
        where: { type: data_type, is_delete: '0' }, // WHERE 条件
        orders: [['ctime', 'desc']], // 排序方式
        limit: list_size, // 返回数据量
        offset: list_offset, // 数据偏移量
      });

    } else {
      let cur_count = 0;
      //收录数据
      for (const key in list_object) {
        if (list_object.hasOwnProperty(key)) {
          const element = list_object[key];

          if(element.item.pictures.length==0){
              continue;
          }

          const img_name = element.item.pictures[0].img_src.slice(element.pic.lastIndexOf('/') + 1)

          const res = await this.ctx.curl(element.item.pictures[0].img_src, {
            writeStream: fs.createWriteStream('./app/public/images/draw/' + img_name),
          });

          let user_data = {
            uid: element.user.uid,
            head_url: element.user.head_url,
            name: element.user.name,
            type: data_type
          }

          await this.app.mysql.insert('wepy_user', user_data);

          let wxdata = {
            title: element.item.title,
            img_src: 'http://127.0.0.1:7001/public/images/draw/' + img_name,
            upload_time: element.item.upload_time,
            img_width: element.item.pictures[0].img_width,
            img_height: element.item.pictures[0].img_height,
            img_size: element.item.pictures[0].img_size,
            doc_id: element.item.doc_id,
            uid: element.user.uid,
            type: data_type
          };
          data_list.push(wxdata);         
          await this.app.mysql.insert('wepy_list_draw', wxdata);
          cur_count ++;
          if(cur_count >= list_size)break;  //只取需要的数量
        }
      }
    }

    return data_list;
  }



}

module.exports = DrawService;
