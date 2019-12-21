import React, { Component } from 'react'
import Message from "../component/message"
import Header from "../component/header"
import $ from "jquery"
import "./userhistory.css"
import axios from "axios";
import cookie from "react-cookies";
import AnswerItem from "../component/answerItem";

class Userhistory extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props);
    this.state = { items: [] };
    this._click1=this._click1.bind(this)
    this._click2=this._click2.bind(this)
    this._click3=this._click3.bind(this)
    this._clickUserJump=this._clickUserJump.bind(this)
  }
  _click1(){
    $("#11").click(function(){
      $("#2").hide();
      $("#3").hide();
      $("#1").show();
    });
}
  _click2(){
    $("#22").click(function(){
      $("#1").hide();
      $("#3").hide();
      $("#2").show();
    });
  }
  _click3(){
    $("#33").click(function(){
      $("#1").hide();
      $("#2").hide();
      $("#3").show();
    });
  }
  _clickUserJump(e){
    this.props.history.push("./me")
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
    const url = "http://localhost:8081/users/history/"+cookie.load('userId');
    let _this = this;
    let data = [];
    axios.get(url).then(function (response) {
      //data = response.data;
      //console.log(data);
      for(let i = 0; i <response.data.length; i++) {
        const url = "http://localhost:8087/question/"+response.data[i].id;
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
        <AnswerItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
    )
    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container userhistory">
            <div className="content">
                <button id="11"onClick={this._click1}style={{float:"left",marginLeft:"10px",width:"200px"}}>关注问题</button>
                <button id="22"onClick={this._click2}style={{float:"left",marginLeft:"10px",outline:"none"}}>浏览历史</button>
                <button id="33"onClick={this._click3}style={{float:"left",marginLeft:"10px",outline:"none"}}>导航三</button>
              <div style={{marginLeft:"-50px",marginTop:"30px"}}>
              <div id="1" >{atricleItems}</div>
              <div id="2"  className="11111" style={{display:"none"}}>内容二11111</div>
              <div id="3" className="22222" style={{display:"none"}}>内容三</div>
              </div>
            </div>
            <button onClick={this._clickUserJump}>修改个人资料</button>
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

export default Userhistory
