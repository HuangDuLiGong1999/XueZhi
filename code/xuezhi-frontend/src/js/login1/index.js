import React, { Component } from 'react'
import { TextField, Button } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import { Redirect } from 'react-router-dom'
import "./login1.css"
import axios from "axios";

class Login1 extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = {checknum:"",}
    this._onBlur = this._onBlur.bind(this)
    this._backHom = this._backHom.bind(this)
    this._LoginClick=this._LoginClick.bind(this)
    this._onChangeMail = this._onChangeMail.bind(this)
    this._onChangeCheck = this._onChangeCheck.bind(this)
    this._onChangePassword = this._onChangePassword.bind(this)
    this._onChangePasscheck = this._onChangePasscheck.bind(this)
    this._checkmail = this._checkmail.bind(this)
    this._check = this._check.bind(this)
    this._clickRegister = this._clickRegister.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  _LoginClick(e){
    this.props.history.push("/login");
  }
  _onChangeMail(e) {
    this.setState({ mail: e.target.value })
    this._verify()
  }
  _onChangeCheck(e){
    this.setState({ checkcode: e.target.value })
    this._verify()
  }
  _onChangePassword(e) {
    this.setState({ password: e.target.value })
    this._verify()
  }
  _onChangePasscheck(e){
    this.setState({ passcheck: e.target.value})
    this._verify()
  }
  //验证邮箱
  _checkmail(){
    const url = "http://49.234.73.158:8085/v1/user_service/register/checkcode";
    let data = new URLSearchParams();
    let _this = this;
    data.append('email',this.state.mail);
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
          if(code=="fail")
          {
            alert("邮箱已经被使用，请更换邮箱！");
          }
          else
          {
            alert("邮箱可以使用，请输入验证码！");
            _this.setState({checknum:code});
          }
        });
  }
  _check(){
    if(this.state.checkcode == this.state.checknum)
      alert("验证成功");
    else
      alert("验证失败");
  }
  // 判断账号和密码合法性，修改状态
  _verify() {
    if (this.state.password && this.state.password.length >= 6
        && this.state.mail && this.state.mail.match(/^(.+)@(.+)$/)
        &&this.state.password == this.state.passcheck
        &&this.state.checkcode == this.state.checknum
        &&this.state.checkcode!=null
    ) {
      this.setState({ buttonLogin: true })
    } else {
      this.setState({ buttonLogin: false })
    }
    // 密码与邮箱符合验证
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
    if (this.state.password == this.state.passcheck) {
      this.setState({ buttonPasscheckError: false })
    } else {
      this.setState({ buttonPasscheckError: true })
    }
  }
  _clickRegister(){
    const _this = this;
    const url = "http://49.234.73.158:8085/v1/user_service/register";
    var code;
    let data = new URLSearchParams();
    data.append('email',_this.state.mail);
    data.append('password',_this.state.password);
    axios.post(url, data)
        .then(function (response) {
        alert("注册成功");_this.props.history.push("./login");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          console.log(code);
          switch (code) {
              //成功登录，跳转页面
            case true: alert("注册成功");_this.props.history.push("./me");break;
            case false: alert("注册失败");break;
          }

        });}
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
      <div className="login1">
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
          <Button onClick={this._checkmail}>验证邮箱</Button>
          <TextField
              required
              className="item"
              onChange={this._onChangeCheck}
              onBlur={this._onBlur}
          />
          <Button onClick={this._check}>验证验证码</Button>
          <TextField
            required
            error={this.state.buttonPasswordError}
            className="item"
            label={this.state.buttonPasswordError ? '密码大于等于 6 位' : '密码'}
            type="password"
            onChange={this._onChangePassword}
            onBlur={this._onBlur}
          />
          <TextField
              required
              error={this.state.buttonPasscheckError}
              className="item"
              label={this.state.buttonPasscheckError ? '两次密码不一致！' : '验证密码'}
              type="password"
              onChange={this._onChangePasscheck}
              onBlur={this._onBlur}
          />
          {/* 按钮 */}
          <div className="itemButton">
          <Button className="button"onClick={this._LoginClick}>
              登陆
          </Button>
          <Button disabled={!this.state.buttonLogin} className={!this.state.buttonLogin ? 'button' : 'button blue'} onClick={this._clickRegister}>
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

export default Login1
