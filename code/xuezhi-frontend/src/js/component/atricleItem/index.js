import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import { Bottom, Good, Message, Read, Edid } from "../svg.js"
import Progress from "../progress"
import SnackBar from "../snackbar"
import axios from "axios"

import "./atricleItem.css"
import cookie from "react-cookies";

class AtricleItem extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

    let loginUser = cookie.load("userId");


    const likesMap = props.item.answer.likesMap;

    const like = props.item.answer.likes;

    const answerList = props.item.answer.answerComments;

    const answerListLength = props.item.answer.answerComments.length;


    const userId = props.item.answer.authorId;
    const title = props.item.title;
    const questionId = props.item.questionId;
    //从 marked 提取文本与图片地址
    const data = props.item.answer.description;
    //

    let likeBool = false;
    for(var key in likesMap)
    {
      if(key == loginUser && likesMap[key] != 0)
      {
        likeBool = true;
      }
    }

    let showRead = false, messagesShow = false, full;
    // 单独页面，默认都打开
    if (this.props.skip) {
      showRead = true
      messagesShow = true
      full = true
    }

    this.state = {
      title,
      userId,
      data,
      like,
      likeBool,
      messageCount: 0, //评论条数
      headUrl: "http://49.234.73.158:8085/v1/user_service/users/avatar/"+userId, //头像图片url
      showRead,
      messagesShow,
      full,
      tag: "问答",
      questionId,
      user:[],
      loginUser,
      answerList,
      answerListLength,
    }

    this._clickRead = this._clickRead.bind(this)
    this._readInfo = this._readInfo.bind(this)
    this._clickMessage = this._clickMessage.bind(this)
    this._clickGood = this._clickGood.bind(this)
    this._messageSend = this._messageSend.bind(this)
    this._snackBarOpen = this._snackBarOpen.bind(this)
    this._cloneButton = this._cloneButton.bind(this)
    this._clickSkitRead = this._clickSkitRead.bind(this)
    this._clickSkitEdid = this._clickSkitEdid.bind(this)
  }

  componentWillMount() {
    let _this = this;
    const url = "http://49.234.73.158:8085/v1/user_service/users/" + this.state.userId;
    axios.get(url).then(
        function (response) {
          _this.setState(
              {
                user:response.data
              }
          )
        }
    )
  }

  render() {

    return (
        <div className="atricleItem">
          <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
          {/* 简介 */}
          <div>
            <span className="span">{this.state.tag}</span>
          </div>
          {/* 用户信息 */}
          <div className="user">
            <div className="left">
              < img className="headimg" src={this.state.headUrl} alt="header" />
              <Link className="name" to="/"> {this.state.user.name} </Link>
            </div>
            <div className="time">
              {this.props.item.answer.updateTime}
            </div>
          </div>
          {/* 标题 */}
          <Link className="h1" to={{pathname:"/question/"+this.state.questionId,hash:"",query:{foo: this.state.questionId, boo:'boz'}}}>{this.state.title}</Link>          {/* 内容 */}
          <div className="content">
            {this._readInfo()}
          </div>
          {/* 按钮工具 */}
          <div className="tool">
            <Button disabled={(cookie.load('userId')==null)}  className={this.state.likeBool ? "button buttonBlue " : "button button-border"} onClick={this._clickGood}>
              <Good className={this.state.likeBool ? "g-color-white-fill" : "g-color-gray-fill"} />&nbsp; {this.state.like} 赞
            </Button>

            <Button className="button" onClick={this._clickMessage}>
              <Message className="g-color-gray-fill" />&nbsp; {this.state.messagesShow ? '收起评论' : this.state.answerListLength + ' 条评论'}
            </Button>

            <Link className="button reply-butoon" to={{pathname:"/question/"+ this.state.questionId +"/authorId/"+ this.state.userId,hash:"",query:{foo: this.state.questionId, boo:this.state.userId}}} style={{ display: this.state.full ? 'none' : '' }}>
              <Read/>&nbsp; 回答详情
            </Link>

            {this._cloneButton()}
          </div>
          <this.props.MessageChildren messagesShow={this.state.messagesShow} item={this.props.item} authorId={this.state.userId} questionId={this.props.item.questionId} answerComments = {this.props.item.answer.answerComments}  messageSend={this._messageSend}/>
        </div>
    )
  }
  // 展示信息
  _readInfo() {
    if (this.state.showRead) {
      return (
        <div className="description" dangerouslySetInnerHTML={{__html:this.state.data}}>
        </div>
      )
    } else {
      return (
          <div>
                  <div className="description" dangerouslySetInnerHTML={{__html:this.state.data}}>
                  </div>
                  <div className="info" onClick={this._clickRead}>
                <Button className="button read" >
                  阅读全文 &nbsp;
                  <Bottom className="g-color-gray-fill" />
                </Button>
                  </div>
          </div>
      )
    }
  }
  _cloneButton() {
    if (this.state.showRead) {
      return (
          <div className="right-button">
            <Button className="button" onClick={this._clickRead}>
              收起 &nbsp;
              <Bottom className="g-color-gray-fill button-transform" />
            </Button>
          </div>
      )
    }
  }
  // 编辑
  _clickSkitEdid(e) {
    this.props.history.push('/write/' + this.props.item.id)
  }
  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }
  _messageSend(e) {
    const messageCount = this.state.messageCount + 1
    this.setState({ messageCount })
  }
  // 阅读全文
  _clickRead(e) {
    const showRead = !this.state.showRead
    this.setState({ showRead })
  }
  // 点赞
  _clickGood(e) {

    const likeBool = !this.state.likeBool
    let like = likeBool ? this.state.like + 1 : this.state.like - 1
    this.setState({ likeBool, like })


    const url = "http://49.234.73.158:8085/v1/qa_service/qa/likes";
    let data = new URLSearchParams();
    data.append('questionId', this.state.questionId);
    data.append('authorId', this.state.userId);
    data.append('likeUserId', cookie.load("userId"));

    axios.put(url, data).then(function (response) {
      console.log(response.data);
    }).catch(function (e) {
      alert(e);
    })
  }

  // 展开评论
  _clickMessage(e) {
    const messagesShow = !this.state.messagesShow;
    this.setState({ messagesShow })
  }

  // 阅读
  _clickSkitRead(e) {
    this.props.history.push('/read/' + this.props.item.id)
  }

}

export default AtricleItem