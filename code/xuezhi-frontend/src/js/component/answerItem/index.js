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
import "./answerItem.css"
import axios from "axios";



class AnswerItem extends Component {
    // 加载一次，初始化状态
    constructor(props, context) {
        super(props)
        const questionId = props.questionId;
        const userId = props.item.authorId;
        const title = props.item.title
        //从 marked 提取文本与图片地址
        const data = props.item.description
        //
        let likeBool = false;
        const answerListLength = props.item.answerComments.length;

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
            like: 0,
            likeBool,
            messageCount: 0, //评论条数
            headUrl: "http://49.234.73.158:8085/v1/user_service/users/avatar/"+userId, //头像图片url
            showRead,
            messagesShow,
            full,
            tag: "问答",
            questionId,
            user:[],
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
                        <Link className="name" to="/"> {this.state.user.name} </Link>
                    </div>
                    <div className="time">
                        {this.props.item.updateTime}
                    </div>
                </div>
                {/* 标题 */}
                <h1 className="h1">{this.state.title}</h1>
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
                        <Message className="g-color-gray-fill" />&nbsp; {this.state.messagesShow ? '收起评论' : this.state.answerListLength + ' 条评论'}
                    </Button>

                    <Button className="button reply-butoon" onClick={this._clickSkitRead} style={{ display: this.state.full ? 'none' : '' }}>
                        <Read className="g-color-gray-fill" />&nbsp; 全屏阅读
                    </Button>

                    {this._cloneButton()}
                </div>
                <this.props.MessageChildren messagesShow={this.state.messagesShow} item={this.props.item} authorId={this.state.userId} questionId = {this.props.questionId} answerComments = {this.props.item.answerComments} messageSend={this._messageSend} />
            </div>
        )
    }
    // 展示信息
    _readInfo() {
        if (this.state.showRead) {
            return (
                <div className="description" dangerouslySetInnerHTML={{__html:this.state.data}}>
            </div>)
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
        this.props.history.push(this.state.questionId +'/authorId/' + this.state.userId)
    }

}

export default AnswerItem