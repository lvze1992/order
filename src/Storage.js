/**
 * @file    组件 Storage
 */
import AV from 'leancloud-storage';
import React, { Component } from 'react';
export default class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    AV.init({
      appId: '8Is6HVIchUuDTxfh14PaY4Uf-gzGzoHsz',
      appKey: 'ttG2vveJsC4ffIFuTdpplmxn',
      serverURL: 'https://8is6hvic.lc-cn-n1-shared.com',
    });
    localStorage.setItem('debug', 'leancloud*');
    this.save();
  }
  save = () => {
    // 声明 class
    const Todo = AV.Object.extend('Todo');
    // 构建对象
    const todo = new Todo();
    // 为属性赋值
    todo.set('title', '工程师周会');
    todo.set('content', '周二两点，全体成员');
    // 将对象保存到云端
    todo.save().then(
      (todo) => {
        // 成功保存之后，执行其他逻辑
        console.log(`保存成功。objectId：${todo.id}`);
        this.query(todo.id);
        this.update(todo.id);
      },
      (error) => {
        // 异常处理
      },
    );
  };
  query = (queryId) => {
    const query = new AV.Query('Todo');
    query.get(queryId).then((todo) => {
      const data = todo.toJSON();
      const title = todo.get('title');
      const priority = todo.get('priority');
      // 获取内置属性
      const objectId = todo.id;
      const updatedAt = todo.updatedAt;
      const createdAt = todo.createdAt;
      console.log('获取数据', data, title, priority, objectId, updatedAt, createdAt);
    });
  };
  update = (queryId) => {
    const todo = AV.Object.createWithoutData('Todo', queryId);
    todo.set('content', '这周周会改到周三下午三点。');
    todo.save();
  };
  render() {
    console.log('Storage console', this.props, this.state);
    return <div></div>;
  }
}
