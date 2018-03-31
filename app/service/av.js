'use strict';

const path = require('path');
const fs = require('fs');
const Service = require('egg').Service;

class AvService extends Service {
  constructor(ctx) {
    super(ctx);
    this.root = 'https://www.bilibili.com/index/ding.json';
  }

  //发起请求
  async request(url, opts) {
    url = `${this.root}${url}`;
    //对象赋加属性
    opts = Object.assign({
      timeout: ['30s', '30s'],
      dataType: 'json',
    }, opts);
    return this.ctx.curl(url, opts);
  }

  async list(params = {}) {
    const result = await this.request('', {});

    const av_type = params.type;   //视频数据类型
    const list_page = params.page; //当前页码
    const list_size = params.size; //每页数据数量
    // console.log(av_type+'/'+list_page+'/'+list_size);
    const list_offset = list_page > 1 ? list_size * list_page : 0;  //偏移数据个数

    let douga_object = {};
    switch (av_type) {
      case 'douga':
        douga_object = result.data.douga;
        break;
      case 'ad':
        douga_object = result.data.ad;
        break;

      default:
        break;
    }

    let douga_list = [];

    // const sql = "SELECT * FROM `wepy_list` WHERE `type` = 'douga' AND `is_delete`=0 ORDER BY `ctime` DESC LIMIT 0, 10";

    const arr = Object.keys(douga_object);
    if (arr.length == 0) {
      //如果B站API失效则从数据库中读取数据
      douga_list = await this.app.mysql.select('wepy_list', { // 搜索 wepy_list 表
        where: { type: av_type, is_delete: '0' }, // WHERE 条件
        orders: [['ctime', 'desc']], // 排序方式
        limit: list_size, // 返回数据量
        offset: list_offset, // 数据偏移量
      });

    } else {
      let cur_count = 0;
      //收录数据
      for (const key in douga_object) {
        if (douga_object.hasOwnProperty(key)) {
          const element = douga_object[key];

          const name = element.pic.slice(element.pic.lastIndexOf('/') + 1)

          const res = await this.ctx.curl(element.pic, {
            writeStream: fs.createWriteStream('./app/public/images/' + name),
          });

          let wxdata = {
            tname: element.tname,
            title: element.title,
            pic: 'http://127.0.0.1:7001/public/images/' + name,
            ctime: element.ctime,
            desc: element.desc,
            aid: element.aid,
            type: av_type
          };
          douga_list.push(wxdata);         
          // const sql = `
          // INSERT ignore INTO wepy_list (tname,title,pic,ctime,desc,aid) VALUES(?,?,?,?,?,?)
          // `;
          // await this.app.mysql.query(sql, [wxdata.tname, wxdata.title,wxdata.pic,wxdata.ctime,wxdata.desc,wxdata.aid]);
          await this.app.mysql.insert('wepy_list', wxdata);

          cur_count ++;
          if(cur_count >= list_size)break;  //只取需要的数量
        }
      }
    }

    return douga_list;
  }

  //验证
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }
    if (!result.data.success) {
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }





}

module.exports = AvService;
