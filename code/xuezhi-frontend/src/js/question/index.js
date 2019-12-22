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
    }

    componentWillMount() {

        const url = "http://49.234.73.158:8085/v1/qa_service/question/"+ this.state.questionId + "/"+cookie.load("userId")

        var _this = this;

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
    }

    _answerClick(e){
        var editor = this.refs.editor;
        editor.style.display = ""
    }
    _addquestionClick(e){

        const url = "http://49.234.73.158:8085/v1/user_service/users/followList";
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('id',cookie.load('userId')); //todo

        axios.post(url,data).then(function (response) {
            if(response.data)
                alert("关注成功");
            else
                alert("已经关注，无法重复关注！")
        }).catch(function (e) {
            alert(e);
        })
    }

    _submitAnswerClick(e){
        var editor = this.refs.editorContext;
        var answer = editor.state.editor.txt.html();
        const url = "http://49.234.73.158:8085/v1/qa_service/qa/answers"
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('authorId',cookie.load("userId"));
        data.append('description',answer);

        axios.post(url,data).then(function (response) {
            alert("submit success");
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