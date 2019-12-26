import React, { Component } from 'react'
import md5 from 'blueimp-md5'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import AtircleMessage from "../component/atircleMessage"

import "./atricle.css"
import cookie from "react-cookies";
import axios from "axios";
import NoButtonItem from "../component/noButtonItem";


class Oauth extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props);
    this.state = { items: [] };
    this._clickUserJump=this._clickUserJump.bind(this)
  }

  _clickUserJump(e){
    this.props.history.push("./me")
  }

  // 加载一次，Dom 未加载
  componentWillMount() {
    this._net()
  }

  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _net() {
    this.setState({ progressShow: true });
    const url = "http://49.234.73.158:8085/v1/qa_service/questions/"+cookie.load('userId');
    let _this = this;
    let data = [];
    axios.get(url).then(function (response) {
      data = response.data;

      for(let i = 0; i <response.data.length; i++) {
        data[i].askerId = cookie.load("userId");
      }

      _this.setState({
        items:response.data
      })

    }).catch(function (e) {
      alert(e);
    });



  }
  // 渲染 Dom
  render() {
    let _this = this;

    const atricleItems = this.state.items.map((item, index) =>
        <NoButtonItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
    )
    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container userhistory">
            <div className="content">
              <div style={{marginLeft:"-50px",marginTop:"30px"}}>
                <div id="1" >{atricleItems}</div>
              </div>
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


export default Oauth
