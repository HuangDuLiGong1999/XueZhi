import React,{Component} from 'react'
import axios from 'axios'

export default  class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            birthday:"",
            sex:"",
            university:"",
            userstate:"",
        }
    }
    getUsername(){
        const usernameVal=window.event.target.value;
        this.setState({
            username:usernameVal
        });
    }
    getBirthday(){
        const birthdayVal=window.event.target.value;
        this.setState({
            birthday:birthdayVal
        });
    }
    getSex(){
        const sexVal=window.event.target.value;
        this.setState({
            sex:sexVal
        });
    }
    getUniversity(){
        const universityVal=window.event.target.value;
        this.setState({
            university:universityVal
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
        window.localStorage.setItem("birthday","");
        window.localStorage.setItem("sex","");
        window.localStorage.setItem("university","");
        window.localStorage.setItem("userstate","");
    }


    LoginFetch(){
        const _this = this;

        const url = "http://localhost:8081/login/check";

        var code;

        let data = new URLSearchParams();
        data.append('username',_this.state.username);
        data.append('birthday',_this.state.birthday);
        data.append('sex',_this.state.sex);
        data.append('university',_this.state.university);
        data.append('userstate',_this.state.userstate);
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
                    case false: alert("修改成功");break;
                    case true: alert("修改失败");break;
                    default: alert("请输入用户名和密码！"); break;
                }
            });}
    submit = (event)=> {
        if(this.state.sex==1){
            alert('录入成功');
        }else{
            alert('请输入正确的用户名或密码');
        }
    }
    render() {
        return(
            <div>
                <form onSubmit={this.submit}>
                        <h3>用户信息管理</h3>
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" placeholder="请输入你的用户名" onChange={this.getUsername.bind(this)}/>
                        </div>
                        <div className="con4">
                            <canvas id="cvs" width="200" height="200"></canvas>
                            <span className="btn upload">上传头像<input type="file" className="upload_pic" id="upload" onClick={this.getImage.bind(this)}/></span>
                        </div>
                        <div className="form-group">
                            <label>出生日期</label>
                            <input type="text" className="form-control" placeholder="请输入你的生日" onChange={this.getBirthday.bind(this)}/>
                        </div>

                        <div className="form-group">
                            <label>性别</label>
                            <input type="text" className="form-control" placeholder="请输入你的性别" onChange={this.getSex.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>所在学校</label>
                            <input type="text" className="form-control" placeholder="请再次输入你的学校" onChange={this.getUniversity.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>个人简介</label>
                            <input type="text" className="form-control" placeholder="请输入你的用户简介" onChange={this.getUserstate.bind(this)}/>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.LoginFetch.bind(this)}>注册</button>
                </form>
            </div>

        )

    }
}

