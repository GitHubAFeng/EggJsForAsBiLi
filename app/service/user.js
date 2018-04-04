'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(id) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('wepy_user', { uid: id });
    return user;
  }

  async getUserByLoginName(loginName) {
    const user = await this.app.mysql.get('wepy_user', { name: loginName });
    return user ;
  }

  async UserLogin(loginName,pwd) {
    const user = await this.app.mysql.get('wepy_user', { name: loginName , password:pwd});
    return user;
  }

  async insert(data) {
    const result = await this.app.mysql.insert('wepy_user', data);
    return result;
  }


}


module.exports = UserService;