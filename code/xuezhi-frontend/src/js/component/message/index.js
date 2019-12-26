import React, { Component } from 'react'
import { Button } from 'material-ui'
import AV from "leancloud-storage"
import TextareaAutosize from 'react-autosize-textarea'
import "github-markdown-css"
import Progress from "../progress"
import SnackBar from "../snackbar"
import "./message.css"
import cookie from "react-cookies";
import axios from "axios";

class MessageComponent extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    const questionId = props.questionId;
    const userId = props.authorId;
    const answerListLength = props.answerComments.length;
    const messages = props.answerComments;

    this.state = {
      progressShow: false,
      snackBarOpen: false,
      messages,
      questionId,
      userId,
      answerListLength,
      message:''
    }
    this._textarea = this._textarea.bind(this)
    this._clickSend = this._clickSend.bind(this)
    this._getDateDiff = this._getDateDiff.bind(this)
    this._clickReply = this._clickReply.bind(this)
    this._snackBarOpen = this._snackBarOpen.bind(this)
  }
  // 加载一次，Dom 未加载
  componentWillMount() {

  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {
  }
  _textarea(e) {
    this.setState({ message: e.target.value })
  }
  render() {
    const messagesItems = this.state.messages.map((item, index) => {
      const headUrl = "http://49.234.73.158:8085/v1/user_service/users/avatar/"+item.commentatorId
      const url = "http://49.234.73.158:8085/v1/user_service/users/" + item.commentatorId;

      return(<div key={index}>

        <div className="comment">
          <img src={headUrl} />&ensp;&ensp;&ensp;&ensp;

          <div className="content" dangerouslySetInnerHTML={{__html: item.comment}}/>
        </div>

      </div>)
    })



    return (
      <div className="messagesList" style={{ display: this.props.messagesShow ? '' : 'none' }}>
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="messagesCount">{this.state.answerListLength} 条留言</div>
        <div className="messages">
          {/*  留言 */}
          <div>
            {messagesItems}
          </div>
          {/*  /留言 */}
          <div className="replyMessage">
            <TextareaAutosize value={this.state.message} onChange={this._textarea} placeholder="留言的人运气不会差" />
            <Button onClick={this._clickSend}>
              发送
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
  // 发送留言
  _clickSend(e) {
    if (cookie.load("userId").toString() == "undefined"){
      this._snackBarOpen('哎～，你忘记登陆了耶')
      return
    }

    const message = this.state.message;
    this.state.message = " "



    const url = "http://49.234.73.158:8085/v1/qa_service/qa/answers/comments";
    let data = new URLSearchParams();
    data.append('questionId', this.state.questionId);
    data.append('authorId', this.state.userId);
    data.append('commentatorId', cookie.load("userId"));
    data.append('description', message);

    let _this = this;
    axios.put(url, data).then(function (response) {
      let comment = new Object();
      comment.commentatorId = cookie.load("userId");
      comment.comment = message;
      _this.state.messages.push(comment);
      _this._snackBarOpen("评论成功");
    })
  }
  // 点赞
  _clickGood(index, e) {
    if (cookie.load("userId").toString() == "undefined"){
      this._snackBarOpen('哎～，你忘记登陆了耶')
      return
    }

    const messages = this.state.messages;
    const bool = messages[index].likeBool
    const like = messages[index].get('like')
    messages[index].likeBool = !bool
    if (bool) {
      messages[index].set('like', like - 1);
    } else {
      messages[index].set('like', like + 1);
    }
    this.setState({ messages })
    const id = this.state.messages[index].id
    AV.Cloud.run('messageLike', { id }).then(result => {
    }).catch(err => {
      this._snackBarOpen('讨厌，网络错误了')
    })
  }
  // 回复
  _clickReply(e){
    this._snackBarOpen('讨厌，此功能还没写完 = =')
  }

  _getDateDiff(dateTimeStamp) {
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const now = new Date().getTime()
    const diffValue = now - dateTimeStamp
    if (diffValue < 0) return
    const monthC = diffValue / month
    const weekC = diffValue / (7 * day)
    const dayC = diffValue / day
    const hourC = diffValue / hour
    const minC = diffValue / minute

    if (monthC >= 1) {
      return parseInt(monthC, 10) + "月前"
    }
    else if (weekC >= 1) {
      return parseInt(weekC, 10) + "周前"
    }
    else if (dayC >= 1) {
      return parseInt(dayC, 10) + "天前"
    }
    else if (hourC >= 1) {
      return parseInt(hourC, 10) + "小时前"
    }
    else if (minC >= 1) {
      return parseInt(minC, 10) + "分钟前"
    } else {
      return "刚刚"
    }
  }
}

export default MessageComponent


//https://secure.gravatar.com/avatar/3a1e5cac75ad5e0a710e828fa2f433bd?s=50*50