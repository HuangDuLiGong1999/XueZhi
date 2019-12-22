/**
 * 担任页面路由
 */
import React, { Component } from 'react'
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom'
import Home from "./home"
import Write from "./write"
import Login from "./login"
import Me from "./me"
import Read from "./read"
import Atricle from "./atricle"
import Notice from "./notice"
import Question from "./question";
import College from "./college";
import Login1 from "./login1";
import Checkschool from "./checkschool";
import Userhistory from "./userhistory";
import Userfocus from "./userfocus";
import Searchpage from "./searchpage";
import Me1 from "./me1";
class App extends Component {
  render() {
    return (
      <Router hashType="hashbang">
        <div>
          <Switch>
            <Route exact path="/me1" component={Me1} />
            <Route exact path="/userhistory" component={Userhistory} />
            <Route exact path="/userfocus" component={Userfocus} />
            <Route exact path="/searchpage/:searchId?" component={Searchpage} />
            {/* 登陆 */}
            <Route exact path="/login" component={Login} />
            {/*注册*/}
            <Route exact path="/login1" component={Login1} />
            {/* 自己信息设置 */}
            <Route exact path="/me" component={Me} />
            {/*学生卡上传*/}
            <Route exact path="/checkschool" component={Checkschool} />
            <Route exact path="/college" component={College}/>
            {/* 通知页面 */}
            <Route exact path="/notice" component={Notice} />
            {/* 个人文章展示 */}
            <Route exact path="/atricle/:userId?" component={Atricle} />
            {/* 写文章界面 */}
            <Route exact path="/write/:atricleId?" component={Write} />
            {/*问题详情界面*/}
            <Route exact path="/question/:questionId?" component={Question}/>
            {/* 回答详情 */}
            <Route exact path="/question/:questionId/authorId/:authorId?" component={Read} />
            {/* 主页文章列表 */}
            <Route exact path="/:page?" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
