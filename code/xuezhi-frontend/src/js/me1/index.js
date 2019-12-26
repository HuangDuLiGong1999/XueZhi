import React, { Component } from 'react'
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import "./me1.css"
import cookie from 'react-cookies'
import Mavatar from 'mavatar'
let avatar;

class Me1 extends Component {
  // 加载一次，初始化状态
  constructor(props) {
    super(props)
    this.state = {
    }
    this._open = this._open.bind(this)
    this._close = this._close.bind(this)
    this._handleReset = this._handleReset.bind(this)
    this._handleClip = this._handleClip.bind(this)
    this._picture = this._picture.bind(this)
    this._clickJump = this._clickJump.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {
  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
    avatar = new Mavatar({
      el: '#avatar',
      backgroundColor: '#ffffff'
    });
  }
  _handleClip = (e) => {
    avatar.imageClipper((dataurl) => {
    });
  }
  _handleReset = (e) => {
    avatar.resetImage();
  }
  _picture(e){
    avatar.upload({
      url: 'http://49.234.73.158:8085/v1/user_service/users/avatar',
      name: 'multipartFile',
      data: {id: cookie.load('userId')},
      success: function (data) {

        alert("上传成功！")
      },
      error: function (error) {

      }
    });
  }
  _open(e) {
    this.setState({ show: true })
  }
  _close(e) {
    this.setState({ show: false })
  }
  _clickJump(e){
    this.props.history.push("/checkschool")
  }
  // 渲染 Dom
  render() {

    return (
        <div>
          <Header history={this.props.history} />
          <div className="g-container me1">
            <Progress show={this.state.progressShow} />
            <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
            <div className="content">
              <h3>头像上传</h3>
              {/* 头像 */}
              {/* 邮箱 */}
              <div id="avatar">
              </div>
                <button onClick={this._handleClip} style={{width:"90px",border:"none",height:"30px",marginTop:"5px",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)",background:"#0f88eb",color:"white"}}>裁剪</button>
                <button onClick={this._handleReset} style={{width:"90px",border:"none",height:"30px",marginLeft:"15px",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)",background:"#0f88eb",color:"white"}}>重置</button>
                <button onClick={this._picture} style={{width:"100px",border:"none",height:"30px",marginTop:"0%",marginLeft:"80%",boxShadow: "0 1px 3px 0 rgba(0,34,77,.1)",background:"#0f88eb",color:"white"}}>上传</button>
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
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }
  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {

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

export default Me1