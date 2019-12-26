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
import "./historyItem.css"
import cookie from "react-cookies";
import axios from "axios";

class HistoryItem extends Component {
    // 加载一次，初始化状态
    constructor(props, context) {
        super(props)
        const userId = props.item.askerId;
        const questionId = props.item.questionId
        const title = props.item.title
        //从 marked 提取文本与图片地
        const data = props.item.description
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
            headUrl: "http://49.234.73.158:8085/v1/user_service/users/avatar/"+userId,//头像图片url
            showRead,
            messagesShow,
            full,
            questionId
        }
        this._messageSend = this._messageSend.bind(this)
        this._snackBarOpen = this._snackBarOpen.bind(this)
        this._cancelfocus = this._cancelfocus.bind(this)
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
                    <Button className="button reply-butoon" href={"/read/"+this.state.questionId} style={{ display: this.state.full ? 'none' : '' }}>
                        <Read className="g-color-gray-fill" />&nbsp; 问题详情
                    </Button>
                    <Button onClick={this._cancelfocus}>
                        取消关注
                    </Button>
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
    _cancelfocus(e){

        const url="http://49.234.73.158:8085/v1/user_service/users/followList/"+cookie.load('userId')+"/"+this.state.questionId;

        axios.delete(url).then(function (response) {

            console.log(response.data)
            console.log("22213123123123")

            if(response.data)
                alert("取消关注成功");
            else
                alert("此问题未关注！")
        }).catch(function (e) {
            alert(e);
        })


    }

}

export default HistoryItem