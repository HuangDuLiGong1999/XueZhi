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

        const url = "http://localhost:8087/question/"+ this.state.questionId

        var _this = this;

        var data;
        axios.get(url).then(function (response) {
            data = response.data;
            console.log(data)
        }).catch(function (e) {
            alert(e);
        }).then(
            function(){
               _this.setState({
                    title:data.title,
                    description:data.description,
                    items:data.answerList
                })
                console.log(_this.state)
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

        const url = "http://localhost:8081/users/followList";
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('id',cookie.load('userId')); //todo

        axios.post(url,data).then(function (response) {
            console.log(response.data)
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
        const url = "http://localhost:8087/qa/answers"
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        data.append('authorId',"testAuthor"); //todo
        data.append('description',answer);

        axios.post(url,data).then(function (response) {
            alert("submit success");
        }).catch(function (e) {
            alert(e);
        })

    }

    render() {
        const answerItems = this.state.items.map((item, index) =>
            <AnswerItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
        )
        return(
            <div>
                <Header history={this.props.history} />
                <div className="head">
                    <div className="questionTitle">
                        <h1>{this.state.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: this.state.description}} />
                    </div>
                    <div >
                        <Button className="answer1" onClick={this._answerClick}>我也说一句</Button>
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