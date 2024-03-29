import React, { Component } from 'react'
import Message from "../component/message"
import Header from "../component/header"
import $ from "jquery"
import "./userfocus.css"
import axios from "axios";
import cookie from "react-cookies";
import HistoryItem from "../component/historyItem";

class Userfocus extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props);
    this.state = { items: [] };
    this._click1=this._click1.bind(this)
  }
  _click1(){
    this.props.history.push('./userhistory')
}
  // 加载一次，Dom 未加载
  componentWillMount() {

  }

  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    this._net(this.props.match.params.page)
  }
  _net(page) {
    this.setState({ progressShow: true });
    const url = "http://49.234.73.158:8085/v1/user_service/users/followList/"+cookie.load('userId');
    let _this = this;
    let data = [];
    axios.get(url).then(function (response) {
      //data = response.data;
      // console.log(response.data);
      // console.log("222222222222222222222222222222");

      for(let i = 0; i <response.data.length; i++) {

        const url = "http://49.234.73.158:8085/v1/qa_service/question/"+response.data[i]+"/"+cookie.load('userId');
        axios.get(url).then(function (response) {
          data.push(response.data);
          console.log(data);

          _this.setState({
            items: data,
            progressShow: false
          });

        }).catch(function (e) {
          alert(e);
        });
      }

    }).catch(function (e) {
      alert(e);
    });



  }
  // 渲染 Dom
  render() {
    let _this = this;
    console.log("检查444", this.state.items)
    const atricleItems = this.state.items.map((item, index) =>
        <HistoryItem key={item.id} history={this.props.history} item={item}  />
    )
    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container userhistory">
            <div className="content">
                <button id="11"onClick={this._click1}className="btn-1">浏览历史</button>
                <button id="22"className="btn-2">关注问题</button>
              <div style={{marginLeft:"-50px",marginTop:"30px"}}>
              <div id="1" style={{display:"none"}}></div>
              <div id="2"  className="11111">{atricleItems}</div>
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

export default Userfocus
