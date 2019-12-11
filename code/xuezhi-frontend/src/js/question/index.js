import React from "react";
import {Button} from "material-ui"
import axios from "axios";
import Editor from "../component/editor";
import AtricleItem from "../component/atricleItem";

import "./question.css"
import Message from "../component/message";
import Header from "../component/header";
class Question extends React.Component{
    constructor(props, context){
        super(props)
        const{questionId} = this.props.match.params
        this.state = {
            questionId,
            items:[]
        }

        this._answerClick = this._answerClick.bind(this)
    }

    componentWillMount() {

        const url = ""    //todo
        let data = new URLSearchParams();
        data.append('questionId',this.state.questionId);
        /*
        axios.get(url,data).then(function (response) {
            console.log(response);
            var question = response.data;
        }).catch(function (e) {
            alert(e);
        })

         */
    }

    componentDidMount() {
        var editor = this.refs.editor;
        editor.style.display = "none"
    }

    _answerClick(e){
        var editor = this.refs.editor;
        editor.style.display = ""
    }

    _submitAnswerClick(e){
        var editor = this.refs.editorContext;

    }

    render() {
        const answerItems = this.state.items.map((item, index) =>
            <AtricleItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
        )
        return(
            <div>
                <Header history={this.props.history} />
                <div className="head">
                    <div className="questionTitle">
                        <h1>树上骑个猴，地上一个猴，一共几个猴？</h1>
                        <p>教室健康照明认证是一种采用“初始检测+初始现场检查+获证后监督”服务模式。不仅含有初始检测应关注的健康质量指标，还包括跟踪检测认证应关注的质量控制方法、程序、记录等，并将光源从光衰到不亮这段时间内照明质量的“失控点”纳入为照明服务提供商或者生产厂家的“过程控制点”，从而确保教室照明环境持续符合标准要求。</p>
                    </div>
                    <div className="buttonList">
                        <Button className="answer" onClick={this._answerClick}>我也说一句</Button>
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