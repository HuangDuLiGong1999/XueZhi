import React, { Component } from 'react'
import { Button, Switch,FormControlLabel,TextField} from 'material-ui'
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Editor from "../component/editor";
import axios from "axios";

import "./write.css"


class Write extends Component {
  // 加载一次，初始化状态
  constructor(props, context) {
    super(props)
    this.state = { title: '', atricleTagIndex: 0 ,option:false}

    this._blurTitle = this._blurTitle.bind(this)
    this._changeSwitch = this._changeSwitch.bind(this)
    this._clickSubmit = this._clickSubmit.bind(this)
  }


  // 加载一次，Dom 未加载
  componentWillMount() {
          //todo 检测登录状态
  }
  // 加载一次，这里 Dom 已经加载完成
  componentDidMount() {

  }

  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }


  _blurTitle(e){
    this.setState({title:e.target.value});

  }

  _changeSwitch(e){
    this.setState({option:e.target.checked});
  }

  _clickSubmit(e) {
    const { title} = this.state;
    if (title.length === 0) {
      this._snackBarOpen('没有标题～')
      return
    }

    const editor = this.refs.editor;
    if(editor.state.editor.txt.html().length<12){
      this._snackBarOpen("问题太短啦～");
      return;
    }
    const url = "http://localhost:8087/qa/questions"
    let data = new URLSearchParams();
    data.append('title',this.state.title);
    data.append('description',editor.state.editor.txt.html());
    data.append('askerId',"test");
    let school = "";
    if(!this.state.option)school = "public";
    data.append('school',school);//todo
    console.log(data.toString())
    axios.post(url,data).then(function (response) {
      alert("submit success");
    }).catch(function (e) {
      alert(e);
    })


  }





  // 渲染 Dom
  render() {

    return (
      <div className="write">
        <Progress show={this.state.progressShow} />
        <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
        <div className="head">
          <TextField id="standard-basic" defaultValue="" label="请输入标题.." onBlur={this._blurTitle}/>
        </div>
        <div className="content">
            <Editor ref="editor"/>
        </div>
        <div className="switchdiv">
          <FormControlLabel control={<Switch onChange={this._changeSwitch}/>} label="发布到校内" className="switch"/>
        </div>
        <div className="buttondiv">
          <Button className="button" onClick={this._clickSubmit}>发布</Button>
        </div>
      </div>
    )
  }


  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {

  }
  // 更新 Props 或 State 则调用
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  //在 Dom 更新之前调用 
  componentWillUpdate(nextProps, nextState) {

  }
  // 更新 Dom 结束后调用
  componentDidUpdate() {

  }
  // 拆卸调用
  componentWillUnmount() {

  }
}


export default Write
