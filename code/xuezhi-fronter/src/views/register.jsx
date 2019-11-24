import React,{Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import findDOMNode from 'react-dom'
import jquery from 'jquery'
import $ from  'jquery'
import Particles from "reactparticles.js";
export default  class Registe extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            checkin:"",
            password:"",
            checkpass:"",
            caonima:""
        }
    }
    getEmail(){
        const emailVal=window.event.target.value;
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test(emailVal)){
            this.setState({
                email:emailVal
            });
            $("#nmsl").text("");
        }else{
            $("#nmsl").text("邮箱格式不正确!");
        }
    }
    getCheckin(){
        const checkVal=window.event.target.value;
        this.setState({
            checkin:checkVal
        });
    }
    Checkinput(){
        if(this.state.checkin==this.state.caonima)
        {
            alert("邮箱验证成功");
        }
        else
        {
            alert("验证码输入错误，请重新输入！");
        }
    }
    getPass(){
        const passVal=window.event.target.value;
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if(reg.test(passVal))
        {
            this.setState({password:passVal});
            $("#6324").text("");
        }
        else
        {
            $("#6324").text("密码格式不正确");
        }
    }
    getCheckpass(){
        const checkpassVal=window.event.target.value;
        this.setState({
            checkpass:checkpassVal
        });
        if(checkpassVal===this.state.password)
        {
            $("#258").text("");
        }
        else
        {
            $("#258").text("两次密码不一致");
        }
    }
    componentDidMount(){
        window.localStorage.setItem("email","");
        window.localStorage.setItem("checkin","");
        window.localStorage.setItem("password","");
        window.localStorage.setItem("checkpass","");
    }
    getMailCheck(){
        const _this = this;
        const url = "http://49.234.73.158:8085/v1/user/register/checkcode";
        let data = new URLSearchParams();
        data.append('email',_this.state.email);
        var code;
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
                if(code=="fail")
                {
                    alert("邮箱已经被使用，请更换邮箱！");
                }
                else
                {
                    alert("邮箱可以使用，请输入验证码！");
                    _this.setState({caonima:code});
                }
            });
    }
    LoginFetch(){
        const _this = this;
        const url = "http://49.234.73.158:8085/v1/user/register";
        var code;
        let data = new URLSearchParams();
        data.append('email',_this.state.email);
        data.append('password',_this.state.password);
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
                switch (code) {
                    //成功登录，跳转页面
                    case false: alert("注册成功");break;
                    case true: alert("注册失败");break;
                    default:alert("注册成功");
                }

            });}
    render() {
        return(
            <div style={{width:'100%'}} >
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
                    <a href='#/login' id="switch_signup" className="switch_btn">登录</a>
                    <a href='#/register' id="switch_login" className="switch_btn on">注册</a>
                    <div className="switch_bottom" id="switch_bottom"></div>
                </nav>
                <div className="loginBox"  >
                <ul className="group_input" >
                    <li style={{marginTop:'2px'}}>
                    <input type="text" className="form-control" placeholder="请输入你的邮箱" id="123" onChange={this.getEmail.bind(this)}/>
                        <button type="button" style={{marginTop:'-150px',height:'30px',marginLeft:'-70px',border:'0px',backgroundColor:'#eeeeee',opacity:'0.9',borderRadius:'3px'}} onClick={this.getMailCheck.bind(this)}>验证邮箱</button>
                    </li>
                    <div id="nmsl" style={{fontSize:'15px',color:'#FF0000',marginLeft:'95px'}}></div>
                <li style={{marginTop:'2px'}}>
                    <input type="text" className="form-control" placeholder="请输入你的验证码" onChange={this.getCheckin.bind(this)}/>
                    <button type="button" style={{marginTop:'-150px',height:'30px',marginLeft:'-70px',border:'0px',backgroundColor:'#eeeeee',opacity:'0.9',borderRadius:'3px'}} onClick={this.Checkinput.bind(this)}>点击验证</button>
                </li>
                <li style={{marginTop:'2px'}}>
                    <input type="password" className="form-control" placeholder="请输入你的密码" onChange={this.getPass.bind(this)}/>
                </li>
                    <div id="6324" style={{fontSize:'15px',color:'#FF0000',marginLeft:'95px'}}></div>
                <li style={{marginTop:'2px'}}>

                    <input type="password" className="form-control" placeholder="请再次输入你的密码" onChange={this.getCheckpass.bind(this)}/>
                </li>
                    <div id="258" style={{fontSize:'15px',color:'#FF0000',marginLeft:'95px'}}></div>

                </ul>
                <button type="button" id="btnSubmit" class="submit_btn" style={{marginTop:'30px',width:'300px'}} onClick={this.LoginFetch.bind(this)}>注册</button>
                </div>
                <span className="agreement-tip" style={{marginBottom:'-100px',marginLeft:'0px'}}>点击「注册」按钮，即代表你同意<a href="javascript:;">《学·知协议》</a></span>
                </div>
            </div>
        )
    }
}