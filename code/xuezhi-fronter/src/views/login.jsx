import React from "react";
import axios from "axios";
import cookie from "react-cookies"
import {Redirect} from "react-router-dom"

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            account:"",
            pwd:"",
        }
    }
    getUserName(){
        const unameVal=window.event.target.value;
        this.setState({
            account:unameVal
        });
    }
    getPwd(){
        const pwdVal=window.event.target.value;
        this.setState({
            pwd:pwdVal
        })
    }
    componentDidMount(){
        window.localStorage.setItem("account","");
        window.localStorage.setItem("email","");
    }
    LoginFetch(userId){
        const _this = this;

        const url = "http://localhost:8081/login";

        var code;

        let data = new URLSearchParams();
        data.append('email',_this.state.account);
        data.append('password',_this.state.pwd);
        axios.post(url, data)
            .then(function (response) {
                // handle success
                code = response.data;
                console.log(code);
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                console.log(code);
                switch (code.status) {
                    //成功登录，跳转页面
                    case false: alert("failed");break;
                    case true: alert("success");
                    let date = new Date();
                        var user=code.user;
                        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                        cookie.save('userId', user.id, { expires: date ,path: '/' });
                        break;
                    default: alert("请输入邮箱和密码");break;
                }
            });
    }



    render(){
        return (
            <div className="loginBox">
                <h3>欢迎登陆</h3>
                <div className="formGroup">
                    <label>账号:</label>
                    <input type="text" class="formControl" onChange={this.getUserName.bind(this)} />
                </div>
                <div className="formGroup">
                    <label>密码:</label>
                    <input type="password" class="formControl" onChange={this.getPwd.bind(this)} />
                </div>
                <div className="btnGroup">
                    <button type="button" className="btn btn-primary" onClick={this.LoginFetch.bind(this)}>登录</button>
                </div>
            </div>
        )
    }
}