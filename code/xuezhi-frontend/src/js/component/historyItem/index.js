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
        console.log(props.item)
        const userId = props.item.authorId;
        const questionId = props.item.questionId
        const title = props.item.title
        //从 marked 提取文本与图片地址
        const markdown = marked(props.item.description)
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
                        <Link className="name" to="/"> {this.state.userId} </Link>
                    </div>
                    <div className="time">
                        {this.props.item.updateTime}
                    </div>
                </div>
                {/* 标题 */}
                <a className="h1" href={"/question/"+this.state.questionId}>{this.state.title}</a>
                {/* 按钮工具 */}
                <div className="tool">
                    <Button className="button reply-butoon" href={"/read/"+this.state.questionId} style={{ display: this.state.full ? 'none' : '' }}>
                        <Read className="g-color-gray-fill" />&nbsp; 问题详情
                    </Button>
                    <Button onClick={this._cancelfocus}>
                        取消关注
                    </Button>
                </div>
                <this.props.MessageChildren messagesShow={this.state.messagesShow} item={this.props.item} messageSend={this._messageSend} />
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

        const url="http://localhost:8081/users/followList/"+cookie.load('userId')+"/"+this.state.questionId;
        // let data = new URLSearchParams();
        // data.append('questionId',this.state.questionId);
        // data.append('id',cookie.load('userId')); //todo

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