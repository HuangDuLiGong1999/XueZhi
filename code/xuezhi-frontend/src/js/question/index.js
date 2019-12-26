import React from "react";
import {Button} from "material-ui"
import axios from "axios";
import Editor from "../component/editor";
import AnswerItem from "../component/answerItem";

import "./question.css"
import Message from "../component/message";
import Header from "../component/header";
import cookie from "react-cookies"
class Question extends React.Component{
    constructor(props, context){
        super(props)
        const{questionId} = this.props.match.params
        this.state = {
            questionId,
            title:'',
            description:'',
            items:[]
        }

        this._answerClick = this._answerClick.bind(this)
        this._submitAnswerClick = this._submitAnswerClick.bind(this)
        this._addquestionClick = this._addquestionClick.bind(this)
        this._snackBarOpen = this._snackBarOpen.bind(this)
    }

    componentWillMount() {
        let _this = this;

        if( ('query' in this.props.location) == false){
            _this.props.history.push('/')
            return;
        }
        const url = "http://49.234.73.158:8085/v1/qa_service/question/"+ this.props.location.query.foo + "/"+cookie.load("userId")


        var data;
        axios.get(url).then(function (response) {
            data = response.data;
        }).catch(function (e) {
            alert(e);
        }).then(
            function(){
               _this.setState({
                    title:data.title,
                    description:data.description,
                    items:data.answerList
                })
            }

        ).then(

            function(){
                for (var i in _this.state.items) {
                    if (_this.state.items[i]["authorId"] === cookie.load("userId")) {
                        _this.refs.answer1.style.display = "none"
                        break;
                    }
                }
            }
        )


    }

    componentDidMount() {
        var editor = this.refs.editor;
        editor.style.display = "none"
        var _this = this
        let answerItem = new Object();
        answerItem.authorId = cookie.load("userId");
        answerItem.description = "<p>123123</p>";
        answerItem.updateTime = "刚刚";
        _this.state.items.push(answerItem)


    }

    _answerClick(e){
        var editor = this.refs.editor;
        editor.style.display = ""
    }
    _addquestionClick(e){

        const url = "http://49.234.73.158:8085/v1/user_service/users/followList";
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('id',cookie.load('userId'));

        axios.post(url,data).then(function (response) {
            if(response.data)
                alert("关注成功");
            else
                alert("已经关注，无法重复关注！")
        }).catch(function (e) {
            alert(e);
        })
    }

    _snackBarOpen(content, time = 2000) {
        this.setState({ snackBarOpen: true, content: content })
        setTimeout(() => {
            this.setState({ snackBarOpen: false })
        }, time)
    }

    _submitAnswerClick(e){
        let _this = this;
        var editor = this.refs.editorContext;
        var answer = editor.state.editor.txt.html();
        const url = "http://49.234.73.158:8085/v1/qa_service/qa/answers"
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('authorId',cookie.load("userId"));
        data.append('description',answer);

        axios.post(url,data).then(function (response) {
            alert("评论成功");
            _this.props.history.push('/')

        }).catch(function (e) {
            alert(e);
        })

    }

    render() {
        const answerItems = this.state.items.map((item, index) =>
            <AnswerItem questionId ={this.state.questionId} history={this.props.history} item={item} MessageChildren={Message} />
        )

        return(
            <div>
                <Header history={this.props.history} />
                <div className="head">
                    <div className="questionTitle">
                        <h1>{this.state.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: this.state.description}} />
                    </div>
                    <div className="buttonList">
                    <div ref="answer1">
                        <Button className="answer1"  onClick={this._answerClick}>我也说一句</Button>
                    </div>
                    <Button className="answer2" onClick={this._addquestionClick}>关注问题</Button>
                    </div>
                </div>
                <div className="answerList">
                    <div ref="editor" className="editor">
                        <Editor ref="editorContext" />
                        <Button className="submitAnswer" onClick={this._submitAnswerClick}>提交回答</Button>
                    </div>
                    {answerItems}
                </div>

            </div>

        )
    }
}

export default Question