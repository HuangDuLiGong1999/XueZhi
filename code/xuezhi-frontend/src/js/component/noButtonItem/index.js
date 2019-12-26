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
import "./noButtonItem.css"
import cookie from "react-cookies";
import axios from "axios";

class NoButtonItem extends Component {
    // 加载一次，初始化状态
    constructor(props, context) {
        super(props)
        const userId = props.item.askerId;
        const questionId = props.item.questionId
        const title = props.item.title

        const data = props.item.description
        const markSource = data;
        //
        let likeBool = false;

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
            headUrl: "http://49.234.73.158:8085/v1/user_service/users/avatar/"+userId,//头像图片url
            showRead,
            messagesShow,
            full,
            questionId
        }
        this._messageSend = this._messageSend.bind(this)
        this._snackBarOpen = this._snackBarOpen.bind(this)
    }

    render() {

        return (
            <div className="historyItem">
                <Progress show={this.state.progressShow} />
                <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
                {/* 用户信息 */}
                <div className="user">
                    <div className="left">
                        < img className="headimg" src={this.state.headUrl} alt="header" />
                    </div>
                    <div className="time">
                        {this.props.item.updateTime}
                    </div>
                </div>
                {/* 标题 */}
                <Link className="h1" to={{pathname:"/question/"+this.state.questionId,hash:"",query:{foo: this.state.questionId, boo:'boz'}}}>{this.state.title}</Link>

                {/* 按钮工具 */}
                <div className="tool">
                    <Link className="button reply-butoon" to={{pathname:"/question/"+ this.state.questionId +"/authorId/"+ this.state.userId,hash:"",query:{foo: this.state.questionId, boo:this.state.userId}}} style={{ display: this.state.full ? 'none' : '' }}>
                    </Link>
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
    _messageSend(e) {
        const messageCount = this.state.messageCount + 1
        this.setState({ messageCount })
    }

}

export default NoButtonItem