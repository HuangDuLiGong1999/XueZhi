import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'material-ui'
import marked from 'marked' //解析 markdown
import AV from "leancloud-storage"
import { Bottom, Good, Message, Read, Edid } from "../svg.js" //,Collection
import ReactMarkdown from 'react-markdown'
import Progress from "../progress"
import SnackBar from "../snackbar"
import "github-markdown-css"
import "./atricleItem.css"

class AtricleItem extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)

    console.log(props.item)
    const userId = props.item.answer.authorId;
    const title = props.item.title
    const questionId = props.item.questionId
    //从 marked 提取文本与图片地址
    const markdown = marked(props.item.answer.description)
    const data = markdown.replace(/<[^>]+>/g, '').replace(/&.+?;/g, ' ').substring(0, 150) + '...'
    const markSource = data;
    //
    let likeBool = false;
    // if (props.item.get('likeUsers') && props.item.get('likeUsers').split(',').indexOf(AV.User.current() && AV.User.current().id) !== -1) {
    //   likeBool = true
    // }
    // const messageCount = this.props.item.get('messageCount')
    // let headUrl = props.item.get('user').get('avatar') || 'https://secure.gravatar.com/avatar/' + md5(props.item.get('user').get('email')) + '?s=140*140&d=identicon&r=g'
    //
    let showRead, messagesShow, full;
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
      markSource,
      like: 0,
      likeBool,
      messageCount: 0, //评论条数
      headUrl: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3489753539,2528035229&fm=111&gp=0.jpg", //头像图片url
      showRead,
      messagesShow,
      full,
      tag: "问答",
      questionId
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

  render() {

    return (
        <div className="atricleItem">
          <Progress show={this.state.progressShow} />
          <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
          {/* 简介 */}
          <div>
            <span className="span">{this.state.tag}</span>
          </div>
          {/* 用户信息 */}
          <div className="user">
            <div className="left">
              < img className="headimg" src={this.state.headUrl} alt="header" />
              <Link className="name" to="/"> {this.state.userId} </Link>
            </div>
            <div className="time">
              {this.props.item.answer.updateTime}
            </div>
          </div>
          {/* 标题 */}
          <a className="h1" href={"/question/"+this.state.questionId}>{this.state.title}</a>
          {/* 内容 */}
          <div className="content">
            {this._readInfo()}
          </div>
          {/* 按钮工具 */}
          <div className="tool">
            <Button className={this.state.likeBool ? "button buttonBlue " : "button button-border"} onClick={this._clickGood}>
              <Good className={this.state.likeBool ? "g-color-white-fill" : "g-color-gray-fill"} />&nbsp; {this.state.like} 赞
            </Button>

            <Button className="button" onClick={this._clickMessage}>
              <Message className="g-color-gray-fill" />&nbsp; {this.state.messagesShow ? '收起评论' : this.state.messageCount + ' 条评论'}
            </Button>

            <Button className="button reply-butoon" href={"/read/"+this.state.questionId} style={{ display: this.state.full ? 'none' : '' }}>
              <Read className="g-color-gray-fill" />&nbsp; 问题详情
            </Button>

            {this._cloneButton()}
          </div>
          <this.props.MessageChildren messagesShow={this.state.messagesShow} item={this.props.item} messageSend={this._messageSend} />
        </div>
    )
  }
  // 展示信息
  _readInfo() {
    if (this.state.showRead) {
      return (<div className="info">
        <ReactMarkdown source={this.state.markSource} className="markdown-body markdown" escapeHtml={false} />
      </div>)
    } else {
      return (<div className="info" onClick={this._clickRead}>
        {this.state.data}
        <Button className="button read" >
          阅读全文 &nbsp;
          <Bottom className="g-color-gray-fill" />
        </Button>
      </div>)
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
    if (!AV.User.current()) {
      this._snackBarOpen('哎～，你忘记登录了耶~')
      return
    }

    const likeBool = !this.state.likeBool
    let like = likeBool ? this.state.like + 1 : this.state.like - 1
    this.setState({ likeBool, like })
    const id = this.props.item.id
    AV.Cloud.run('atricleLike', { id }).then(result => {
    }).catch(err => {
      this._snackBarOpen('讨厌，网络错误了')
      console.log(err)
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