import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button, IconButton, Menu, MenuItem } from 'material-ui'
import './header.css'
import { Bell } from './svg.js'
import cookie from "react-cookies";
class Header extends React.Component {
  constructor(props, context) {
    super(props)
    let url = "http://49.234.73.158:8085/v1/user_service/users/avatar/" + cookie.load('userId');

    this.state = { anchorEl: null, menuShow: false, url, numer: 0 ,searchvalue:0,InputValue : ""}
    this._clickHead = this._clickHead.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleMenuClose = this._handleMenuClose.bind(this)
    this._clickLogin = this._clickLogin.bind(this)
    this._clickNotice = this._clickNotice.bind(this)
    this._verify = this._verify.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {
  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
  }
  render() {
    return (
      <header className="header">
        <div className="g-container container">
          <div className="left">
            <Link className="logo" to="/"> 学知 </Link>
            <nav>
              <Button className="button"><NavLink to="/" className="g-color-gray a" activeClassName="selected"> 首页 </NavLink></Button>
              <Button disabled={(cookie.load('userId')==null)} className="button"><NavLink to="/college" className="g-color-gray a" activeClassName="selected"> 我的校园 </NavLink></Button>
            </nav>
            <input type="input"
                   id="search1"
                   onChange={this.handleGetInputValue}
                   style={{width:"300px",
                    marginLeft:"60px",
                     height:"24px",
                     borderRadius: "2px",
                     boxShadow: "0 1px 2px 0 rgba(0,0,0,.05)",
                   }} placeholder="请输入你要搜索的内容"/>
            <button disabled={this.state.InputValue==null}
                style={{marginLeft:"10px",
                  height:"30px",
                  color: "#ffffff",
                  background: "#0f88eb",
                  borderRadius: "2px",
                  border:"none",
                }}>
              <li disabled={this.state.InputValue==null} style={{listStyle:"none"}}>
                <Link disabled={this.state.InputValue==null} style={{textDecoration:"none",color:"white"}} to={{pathname:"/searchpage/"+this.state.InputValue, hash:"", query:{foo: this.state.InputValue, boo:'boz'}}} activeClassName="GlobalNav-active">搜索</Link>
              </li>
            </button>

          </div>
          {this._userShow()}
        </div>

        <Menu
          open={this.state.menuShow}
          anchorEl={this.state.anchorEl}
          onClick={this._handleMenuClose}
          id="menuList"
        >
          <MenuItem onClick={this._handleClose.bind(this, 0)}>个人信息</MenuItem>
          <MenuItem onClick={this._handleClose.bind(this, 1)}>我的提问</MenuItem>
          <MenuItem onClick={this._handleClose.bind(this, 2)}>个人空间</MenuItem>
          <MenuItem onClick={this._handleClose.bind(this, 3)}>退出</MenuItem>
        </Menu>
      </header>
    )
  }
  _userShow() {
    return cookie.load('userId')!=null?
      (<div className="right">
        <Button className="button buttonw "><NavLink to="/write" className="a" activeClassName="selected"> 发布话题 </NavLink></Button>
        <IconButton className="bell" onClick={this._clickNotice}>
          <span className="tag" style={{ display: this.state.numer ? '' : 'none' }}>{this.state.numer}</span>
          <Bell className="g-color-gray-fill" />
        </IconButton>
        <img className="headimg" onClick={this._clickHead} src={this.state.url} alt="header" />
      </div>) :
      (<div className="right">
        <Button className="button login" onClick={this._clickLogin}>&nbsp;&nbsp;&nbsp;登&nbsp;&nbsp;陆&nbsp;&nbsp;&nbsp;</Button>
      </div>)
  }
  // 跳转提示页面
  _clickNotice(e){
    this.props.history.push('/notice')
  }
  // 点击了头像
  _clickHead(e) {
    const { menuShow } = this.state
    this.setState({
      anchorEl: e.currentTarget,
      menuShow: !menuShow
    })
  }
  handleGetInputValue = (e) => {
    this.setState({
      InputValue : e.target.value
    })
  };
  _verify(e){
    if(this.state.InputValue==null){
      this.setState({searchstate:false})}
      else
        this.setState({searchstate:true})
    }
  // 点击了登陆
  _clickLogin(e) {
    this.props.history.push('./login')
  }
  // 点击 item
  _handleClose(i, e) {
    this.setState({ menuShow: false })
    if (i === 0) {
      this.props.history.push('/me')
      return
    }
    if (i === 1) {
      this.props.history.push('/atricle')
      return
    }
    if (i === 2) {
      this.props.history.push('/userhistory')
      return
    }
    if (i === 3) {
      cookie.remove('userId', { path: '/' })
      this.props.history.push('/')
      return
    }
  }
  // 按钮组
  _handleMenuClose() {
    this.setState({ menuShow: false })
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

export default Header
