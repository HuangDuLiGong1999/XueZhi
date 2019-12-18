import React, { Component } from 'react'
import { TextField, Button } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import { Redirect } from 'react-router-dom'
import "./login.css"
import axios from "axios";
import cookie from "react-cookies"

class Login extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = {university:""}

    this._clickLogin = this._clickLogin.bind(this)
    this._onBlur = this._onBlur.bind(this)
    this._backHom = this._backHom.bind(this)
    this._RegisterClick=this._RegisterClick.bind(this)
    this._onChangeMail = this._onChangeMail.bind(this)
    this._onChangePassword = this._onChangePassword.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _RegisterClick(e){
    this.props.history.push("/login1");
  }
  // 登陆
  _clickLogin(e) {
    this.setState({ progressShow: true });
    let _this = this;
    let data = new URLSearchParams();
    data.append('email',this.state.mail);
    data.append('password',this.state.password);
    const url = "http://localhost:8081/login";
    var code;
    axios.post(url, data)
        .then(function (response) {
          // handle success
          code = response.data;
          console.log(code);
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          console.log(code);
          switch (code.status) {
              //成功登录，跳转页面
            case false:alert("登陆失败");break;
            case true:
              alert("登陆成功");
              let date = new Date();
              var user=code.user;
              date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
              console.log(user.university);
              cookie.save('userId', user.id, { expires: date ,path: '/' ,'university':user.university});
              _this.props.history.push('./me');
              break;
            default: alert("请输入邮箱和密码");break;
          }
        });
  }
  _onChangeMail(e) {
    this.setState({ mail: e.target.value })
    this._verify()
  }
  _onChangePassword(e) {
    this.setState({ password: e.target.value })
    this._verify()
  }
  // 判断账号和密码合法性，修改状态
  _verify() {
    // 密码与邮箱符合验证
    if (this.state.password && this.state.password.length >= 6
      && this.state.mail && this.state.mail.match(/^(.+)@(.+)$/)) {
      this.setState({ buttonLogin: true })
    } else {
      this.setState({ buttonLogin: false })
    }

    if (this.state.mail && this.state.mail.match(/^(.+)@(.+)$/)) {
      this.setState({ buttonMailError: false })
    } else if (this.state.mail) {
      this.setState({ buttonMailError: true })
      return
    }

    if (!this.state.password) return

    if (this.state.password && this.state.password.length >= 6) {
      this.setState({ buttonPasswordError: false })
    } else {
      this.setState({ buttonPasswordError: true })
    }

  }
  // 失去焦点
  _onBlur(e) {
    this._verify()
  }
  // back 主页
  _backHom() {
    this.props.history.push('/')
  }
  // 渲染 Dom
  render() {
    const hiddenStyle = {
      display: 'none'
    }
    const visibleStyle = {
      display: ''
    }
    return (
      <div className="login">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="box" style={this.state.findPsw ? hiddenStyle : visibleStyle}>
          <h1 onClick={this._backHom}>VSCodeChina</h1>
          <TextField
            required
            error={this.state.buttonMailError}
            className="item"
            label={this.state.buttonMailError ? '不是合法邮箱' : '邮箱'}
            onChange={this._onChangeMail}
            onBlur={this._onBlur}
          />
          <TextField
            required
            error={this.state.buttonPasswordError}
            className="item"
            label={this.state.buttonPasswordError ? '密码大于等于 6 位' : '密码'}
            type="password"
            onChange={this._onChangePassword}
            onBlur={this._onBlur}
          />
          {/* 按钮 */}
          <div className="itemButton">
          <Button disabled={!this.state.buttonLogin} className={!this.state.buttonLogin ? 'button' : 'button blue'} onClick={this._clickLogin}>
              登陆
          </Button>
          <Button className="button" onClick={this._RegisterClick}>
              注册
          </Button>
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

export default Login
