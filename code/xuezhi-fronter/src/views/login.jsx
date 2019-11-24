import React from "react";
import axios from "axios";
import cookie from "react-cookies"
import {Redirect} from "react-router-dom"
import "./login.css";
import "./base.css"
import Particles from "reactparticles.js";


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
        window.localStorage.setItem("pwd","");
    }
    LoginFetch(){
        const _this = this;

        const url = "http://49.234.73.158:8085/v1/user/login";

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
                        _this.props.history.push('/manage');
                        break;
                    default: alert("请输入邮箱和密码");break;
                }
            });

    }
    render(){
        return (
            <div>
                <Particles
                    id="config-1"
                    config="新建文本文档.json"
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "white",
                        opacity: "0.5",
                        zIndex:"-99",

                    }}

                    className="particles-class-name"
                />
            <div id="wrapper">
                <nav className="switch_nav">
                    <a href='#/login' id="switch_signup" className="switch_btn on">登录</a>
                    <a href='#/register' id="switch_login" className="switch_btn">注册</a>
                    <div className="switch_bottom" id="switch_bottom"></div>
                </nav>
            <div className="loginBox">
                <ul class="group_input">
                    <li>
                    <input type="text" class="formControl" placeholder={"请输入你的邮箱"} onChange={this.getUserName.bind(this)} />
                    </li>
                    <li style={{marginTop:'2px'}}>
                    <input type="password" class="formControl" placeholder={"请输入你的密码"} onChange={this.getPwd.bind(this)} />
                    </li>
                </ul>
                <div className="btnGroup">
                    <button type="button" className="submit_btn" onClick={this.LoginFetch.bind(this)}>登录</button>
                </div>
            </div>
            </div>
            </div>

        )
    }
}