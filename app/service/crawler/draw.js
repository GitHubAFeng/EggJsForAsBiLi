'use strict';

const path = require('path');
const fs = require('fs');
const Service = require('egg').Service;
const cheerio = require('cheerio');
const https    = require('http');

class CrawlerDrawService extends Service {
  constructor(ctx) {
    super(ctx);
    //默认是绘画
    this.root = 'http://m.acfun.cn/list/#channel=110';
    // this.root = 'https://h.bilibili.com/ywh/h5/home#/draw';
    // this.root = 'http://www.woyaogexing.com/tupian/z/xqx/';
    
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

    const { app } = this;

    // const html = await this.request(this.root, {});
    // let $ = cheerio.load(html, { decodeEntities: false })

    // let title = $('.waterfall-item');
    // app.logger.info('title:'+ title.length);

    // app.logger.info('ok');

    https.get(this.root, sres => {
      let chunks = []
      sres.on('data', chunk => {
        chunks.push(chunk)
      })
      sres.on('end', chunk => {
        let $ = cheerio.load(Buffer.concat(chunks), { decodeEntities: false });
        // $('.title').each((idx, element) => {
        //   let $element = $(element);
        //   app.logger.info($element.text());
        // })
        let title = $('.ctn').children('.waterfall-item');
        app.logger.info(title.length);
        app.logger.info('ok');
        
      })
    })
    
    return 'asadsadas'
  }



}

module.exports = CrawlerDrawService;
