'use strict';

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

  async dougaList(params = {}) {
    const result = await this.request('', {
      data: params,
    });

    const douga_object = result.data.douga;
    let douga_list = [];

    const arr = Object.keys(douga_object);
    if(arr.length == 0){
      
    }else{
      //收录数据
      for (const key in douga_object) {
        if (douga_object.hasOwnProperty(key)) {
          const element = douga_object[key];
          let wxdata = {
            tname: element.tname,
            title: element.title,
            pic: element.pic,
            ctime: element.ctime,
            desc: element.desc,
            aid: element.aid,
          };
          douga_list.push(wxdata);
          // const sql = `
          // INSERT ignore INTO wepy_list_douga (tname,title,pic,ctime,desc,aid) VALUES(?,?,?,?,?,?)
          // `;
          // await this.app.mysql.query(sql, [wxdata.tname, wxdata.title,wxdata.pic,wxdata.ctime,wxdata.desc,wxdata.aid]);
          await this.app.mysql.insert('wepy_list_douga', wxdata);
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
