import React, { Component } from 'react'
import AV from "leancloud-storage"
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import "./checkschool.css"
import axios from "axios";
import {Button, TextField} from "material-ui";
import Mavatar from 'mavatar'
import cookie from "react-cookies";
import $ from "jquery"
let avatar1;


class Checkschool extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props);
    this.state = { items: [] }
    this._handleReset = this._handleReset.bind(this)
    this._handleClip = this._handleClip.bind(this)
    this._picture = this._picture.bind(this)
 }

  // 加载一次，Dom 未加载
  componentWillMount() {

  }

  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    avatar1 = new Mavatar({
      el: '#avatar1',
      backgroundColor: '#ffffff'
    });
      const url = "http://49.234.73.158:8085/v1/qa_service/schools";
      let _this = this;
      let data;
      axios.get(url).then(function (response) {
          data= response.data;
          console.log(data);
          _this.setState({
              items: data,
          });
          console.log(data);
          for(var i=0;i<data.length;i++){
              $("#selectbox").append("<option value='"+data[i]+"'>"+data[i]+"</option>")
          }
      }).catch(function (e) {
          alert(e);
      });
  }
  _handleClip = (e) => {
    avatar1.imageClipper((dataurl) => {
      console.log(dataurl);
    });
  }
  _handleReset = (e) => {
    avatar1.resetImage();
  }
  _picture(e){
      let _this = this;
    avatar1.upload({
      url: 'http://49.234.73.158:8085/v1/check_service/verification',
      name: 'multipartFile',
      data: {userId: cookie.load('userId'),intention:$("#selectbox").val(),remark:$("#inputbox").val()},
      success: function (data) {
        console.log(data+"123");
        alert("上传成功！")
      },
      error: function (error) {
          console.log(_this.data+"123");
          console.log(error)
      }
    });
  }

  // 渲染 Dom
  render() {
    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container me">
            <Progress show={this.state.progressShow} />
            <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
            <div className="content">
              <h3>学生证上传</h3>
              <h4 style={{fontSize:"15px",fontWeight:"bolder"}}>请上传带有学生照片的一面！</h4>
              <div id="avatar1" style={{marginTop:"10px"}}></div>
                <div>
                <Button className="button" onClick={this._handleClip} style={{marginTop:"5px",marginLeft:"0px",height:"15px",width:"50px",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)"}}>裁剪</Button>
                <Button className="button" onClick={this._handleReset} style={{marginTop:"5px",marginLeft:"10px",height:"15px",width:"50px",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)"}}>重置</Button>
                  <div style={{width:"200px",marginTop:"-300px",marginLeft:"300px"}}>
                      <p style={{fontSize:"14px",marginTop:"10%",}}>备注</p>
                      <input id="inputbox" style={{width:"150px",height:"50px",marginTop:"0%",border:":#000000 6px solid"}}/>
                      <p style={{fontSize:"14px",marginTop:"10%"}}>请选择学校！</p>
                      <select id="selectbox" style={{width:"100px",marginTop:"0%"}}>请选择</select>
                      <Button className="button" onClick={this._picture} style={{marginTop:"40%",marginLeft:"110%",height:"15px",width:"50px",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)"}}>提交</Button>
                  </div>
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

export default Checkschool
