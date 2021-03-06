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


class Oauth extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }
  // 渲染 Dom
  render() {
    return (
      <div>
        <Header history={this.props.history} />

        <br/>
        <br/>
        <h1>尚未开发丫~</h1>
      </div>
    )
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


export default Oauth
