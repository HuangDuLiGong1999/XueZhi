import React,{Component} from 'react'
import axios from 'axios'
import $ from 'jquery'
import cookie from 'react-cookies'

export default  class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({username: response.data.name}))
                .catch(error => console.log("get data error")),
            age:axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({age: response.data.age}))
                .catch(error => console.log("get data error")),
            sex:axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({sex: response.data.sex}))
                .catch(error => console.log("get data error")),
            userstate:axios.get("http://localhost:8081/users/"+cookie.load('userId')).then(response => this.setState({userstate: response.data.signature}))
                .catch(error => console.log("get data error")),
        }
    }

    getUsername(){
        const usernameVal=window.event.target.value;
        this.setState({
            username:usernameVal
        });
    }
    getBirthday(){
        const ageVal=window.event.target.value;
        this.setState({
            age:ageVal
        });
    }
    getSex(){
        const sexVal=window.event.target.value;
        this.setState({
            sex:sexVal
        });
    }
    getUserstate(){
        const userstateVal=window.event.target.value;
        this.setState({
            userstate:userstateVal
        });
    }
    getImage()
    {
        var input1 = document.getElementById("upload");
        if(typeof FileReader === 'undefined') {
            //result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
            input1.setAttribute('disabled', 'disabled');
        } else {
            input1.addEventListener('change', readFile, false);

        }

        function readFile() {
            var file = this.files[0]; //获取上传文件列表中第一个文件
            if(!/image\/\w+/.test(file.type)) {
                //图片文件的type值为image/png或image/jpg
                alert("文件必须为图片！");
                return false;
            }
            // console.log(file);
            var reader = new FileReader(); //实例一个文件对象
            reader.readAsDataURL(file); //把上传的文件转换成url
            //当文件读取成功便可以调取上传的接口
            reader.onload = function(e) {

                var image = new Image();
                // 设置src属性
                image.src = e.target.result;
                var max = 200;
                // 绑定load事件处理器，加载完成后执行，避免同步问题
                image.onload = function() {
                    // 获取 canvas DOM 对象
                    var canvas = document.getElementById("cvs");
                    // 获取 canvas的 2d 环境对象,
                    var ctx = canvas.getContext("2d");
                    // canvas清屏
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.drawImage(image, 0, 0, 200, 200);

                };
            }
        };
    }
    componentDidMount(){

        window.localStorage.setItem("username","");
        window.localStorage.setItem("age","");
        window.localStorage.setItem("sex","");
        window.localStorage.setItem("userstate","");
    }

    LoginFetch(){
        const _this = this;

        const url = "http://localhost:8081/users/information";

        var code;

        let data = new URLSearchParams();
        data.append('id',cookie.load('userId'));
        data.append('name',_this.state.username);
        data.append('age',_this.state.age);
        data.append('sex',_this.state.sex);
        data.append('signature',_this.state.userstate);
        axios.put(url, data)
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
                    case false: alert("修改失败");break;
                    case true: alert("修改成功");break;
                }
            });}

    render() {
        return(
            <div>
                <form onSubmit={this.submit}>
                        <h3>用户信息管理</h3>
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" id="8964" className="form-control" placeholder="请输入你的用户名" value={this.state.username} onChange={this.getUsername.bind(this)}/>
                        </div>
                        <div className="con4">
                            <canvas id="cvs" width="200" height="200"></canvas>
                            <span className="btn upload">上传头像<input type="file" className="upload_pic" id="upload" onClick={this.getImage.bind(this)}/></span>
                        </div>
                        <div className="form-group">
                            <label>出生日期</label>
                            <input type="text" className="form-control" placeholder="请输入你的生日"  value={this.state.age} onChange={this.getBirthday.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label>性别</label>
                            <input type="text" className="form-control" placeholder="请输入你的性别" value={this.state.sex} onChange={this.getSex.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>个人简介</label>
                            <input type="text" className="form-control" placeholder="请输入你的用户简介" value={this.state.userstate} onChange={this.getUserstate.bind(this)}/>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.LoginFetch.bind(this)}>修改</button>
                </form>
            </div>

        )

    }
}

