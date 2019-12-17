import React, { Component } from 'react'
import AV from "leancloud-storage"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"

import "./college.css"
import axios from "axios";

class College extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { items: [] }
  }

  // 加载一次，Dom 未加载
  componentWillMount() {

  }

  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    this._net(this.props.match.params.page)
  }

  _net(page) {
    let _this=this;
    this.setState({ progressShow: true })
    const query = new AV.Query('Atricle')
    if (page === '精华') {
      query.equalTo('essence', 1)
    } else if (page) {
      query.contains('tag', page)
    }

    var school = "tongji";
    const url = "http://localhost:8087/recommends/"+school;


    let data;
    axios.get(url).then(function (response) {
      data = response.data;
      console.log(data);
      _this.setState({
        items: data,
        progressShow: false
      });
    }).catch(function (e) {
      alert(e);
    });

    // query.find().then((items) => {
    //   _this.setState({
    //     // items: [
    //     //   {
    //     //     "questionId": "5df3800f571b72650e8ef0e3",
    //     //     "answer": {
    //     //       "authorId": "5df37daea0e40753e18048b6",
    //     //       "updateTime": "2019-12-13 20:12:58",
    //     //       "description": "<p>的疯狂减肥回答开始计划饭卡健身房看见啊是</p >",
    //     //       "likesMap": {},
    //     //       "likes": 0
    //     //     },
    //     //     "author": {
    //     //       "password": "123456",
    //     //       "signature": "",
    //     //       "university": "",
    //     //       "sex": "",
    //     //       "name": "",
    //     //       "verImage": null,
    //     //       "telephone": "",
    //     //       "id": "5df37daea0e40753e18048b6",
    //     //       "avatar": null,
    //     //       "email": "1073130610@qq.com",
    //     //       "age": 0
    //     //     },
    //     //     "title": "打电话健康环球网"
    //     //   }
    //     // ],
    //     items:data,
    //     progressShow: false
    //   });
    //   console.log(123)
    //   console.log(_this.state)
    // }).catch((error) => {
    //   this._snackBarOpen('讨厌，网络错误了')
    //   this.setState({ progressShow: false })
    // })
  }
  // 渲染 Dom
  render() {
    //console.log("检查", this.state.items)
    const atricleItems = this.state.items.map((item, index) =>
        <AtricleItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
    )
    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container college">
            <Progress show={this.state.progressShow} />
            <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
            <div className="left">
              {atricleItems}
            </div>
            <div className="right">
              <div className="card">
                本站主要愿景：<br />
                建立高等教育信息分享平台，统一中国高校的经验分享市场，解决中国青年的升学和迷茫问题<br />
              </div>
            </div>
          </div>
        </div>
    )
  }
  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content });
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }
  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {
    this._net(nextProps.match.params.page)
  }
  // 更新 Props 或 State 则调用
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  //在 Dom 更新之前调用
  componentWillUpdate(nextProps, nextState) {

  }
  // 更新 Dom 结束后调用
  componentDidUpdate() {

  }
  // 拆卸调用
  componentWillUnmount() {

  }
}

export default College