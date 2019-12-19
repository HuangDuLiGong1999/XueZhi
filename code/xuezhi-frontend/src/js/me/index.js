import React, { Component } from 'react'
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from 'material-ui'
import AV from "leancloud-storage"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import "./me.css"
import axios from 'axios'
import cookie from 'react-cookies'
import Mavatar from 'mavatar'
let avatar;

class Me extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = {
      name: axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({username: response.data.name}))
          .catch(error => console.log("get data error")),
      age: axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({age: response.data.age}))
          .catch(error => console.log("get data error")),
      sex: axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({sex: response.data.sex}))
          .catch(error => console.log("get data error")),
      userstate:axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({userstate: response.data.signature}))
          .catch(error => console.log("get data error")),
    }
    this._clickSave = this._clickSave.bind(this)
    this._onChangeName = this._onChangeName.bind(this)
    this._onChangeAge = this._onChangeAge.bind(this)
    this._onChangeSex = this._onChangeSex.bind(this)
    this._onChangeUserstate = this._onChangeUserstate.bind(this)
    this._open = this._open.bind(this)
    this._close = this._close.bind(this)
    this._handleReset = this._handleReset.bind(this)
    this._handleClip = this._handleClip.bind(this)
    this._picture = this._picture.bind(this)
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
      console.log(dataurl);
    });
  }
  _handleReset = (e) => {
    avatar.resetImage();
  }
  _picture(e){
    avatar.upload({
      url: 'http://localhost:8081/users/avatar',
      name: 'multipartFile',
      data: {id: cookie.load('userId')},
      success: function (data) {
        console.log(data);
        alert("上传成功！")
      },
      error: function (error) {
        console.log(error)
      }
    });
  }
  _onChangeName(e) {
    this.setState({ name: e.target.value })

    if (e.target.value.length === 0) {
      this.setState({ nameError: true })
    } else {
      this.setState({ nameError: false })
    }
  }
  // 保存信息
  _clickSave(e) {
    if (this.state.name && (this.state.name.length === 0 || this.state.name.length > 20)) {
      this._snackBarOpen('名字不能为空，且不能大于 20 字符')
      return
    }
    // 验证名字合格
    for (let i = 0; i < this.state.name.length; i++) {
      const str = this.state.name[i];
      if (str === '@') {
        this._snackBarOpen('名字不能有 @ 呢 ~_~')
        return
      }
      if (str === ' ') {
        this._snackBarOpen('名字不能有空格呢 -_-')
        return
      }
    }

    this.setState({ progressShow: true })
    const url = "http://localhost:8081/users/information";
    var code;
    let data = new URLSearchParams();
    data.append('id',cookie.load('userId'));
    data.append('name',this.state.name);
    data.append('age',this.state.age);
    data.append('sex',this.state.sex);
    data.append('signature',this.state.userstate);
    axios.put(url, data)
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
            switch (code) {
                //成功登录，跳转页面
              case false:
               alert("修改失败");break;
              case true:
                alert("修改成功");break;
            }
          });
  }
  // 验证邮箱
  // 更改密码
  // 修改个人信息
  _onChangeAge(e) {
    this.setState({ age: e.target.value })
  }
  // 修改博客
  _onChangeSex(e) {
    this.setState({ sex: e.target.value })
  }
  _onChangeUserstate(e) {
    this.setState({userstate:e.target.value})
  }
  _open(e) {
    this.setState({ show: true })
  }
  _close(e) {
    this.setState({ show: false })
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
              <h3>个人资料</h3>
              {/* 头像 */}
              {/* 邮箱 */}
              <div>
                <div id="avatar" />
                <button onClick={this._handleClip}>裁剪</button>
                <button onClick={this._handleReset}>重置</button>
                <button onClick={this._picture}>上传</button>
              </div>
              {/* 名字 */}
              <div className="cell">
                <TextField
                    required
                    error={this.state.nameError}
                    className="item"
                    value={this.state.name}
                    label={this.state.nameError ? '昵称不能为空' : '昵称'}
                    onChange={this._onChangeName}
                />
              </div>
              {/* 年龄 */}
              <div className="cell">
                <TextField
                    className="item"
                    value={this.state.age}
                    label={'年龄'}
                    onChange={this._onChangeAge}
                />
              </div>
              {/* 性别 */}
              <div className="cell">
                <TextField
                    multiline
                    rowsMax="4"
                    className="item"
                    value={this.state.sex}
                    label={'性别'}
                    onChange={this._onChangeSex}
                />
              </div>
              {/* 签名 */}
              <div className="cell">
                <TextField
                    multiline
                    rowsMax="4"
                    className="item"
                    value={this.state.userstate}
                    label={'个人签名'}
                    onChange={this._onChangeUserstate}
                />
              </div>
              <div className="cell">
                <Button className="button" onClick={this._clickSave}>
                  保存
                </Button>
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

export default Me