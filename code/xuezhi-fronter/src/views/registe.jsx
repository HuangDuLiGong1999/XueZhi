import React,{Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';
import findDOMNode from 'react-dom'
import jquery from 'jquery'
import $ from  'jquery'
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
            $("#nmsl").text("邮箱格式不正确");
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
        if(checkpassVal==this.state.password)
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
        const url = "http://localhost:8081/register/checkcode";
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
        const url = "http://localhost:8081/register";
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
                }
            });}
    render() {
        return(
            <div>
                        <h3>用户注册</h3>
                        <div className="form-group">
                            <label>邮箱</label>
                            <input type="text" className="form-control" placeholder="请输入你的邮箱" id="123" onChange={this.getEmail.bind(this)}/>
                            <button type="button" onClick={this.getMailCheck.bind(this)}>点击验证</button>
                            <div id="nmsl"></div>
                        </div>
                        <div className="form-group">
                            <label>验证码</label>
                            <input type="text" className="form-control" placeholder="请输入你的验证码" onChange={this.getCheckin.bind(this)}/>
                            <button type="button" onClick={this.Checkinput.bind(this)}>点击验证</button>
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" className="form-control" placeholder="请输入你的密码" onChange={this.getPass.bind(this)}/>
                            <div id="6324"></div>
                        </div>
                        <div className="form-group">
                            <label>验证密码</label>
                            <input type="password" className="form-control" placeholder="请再次输入你的密码" onChange={this.getCheckpass.bind(this)}/>
                            <div id="258"></div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.LoginFetch.bind(this)}>注册</button>


            </div>
        )
    }
}
