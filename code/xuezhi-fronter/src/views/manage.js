import React,{Component} from 'react'
import axios from 'axios'
import $ from 'jquery'
import cookie from 'react-cookies'
import ReactCanvasNest from 'react-canvas-nest';
import Particles from "reactparticles.js";

export default  class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:axios.get("http://49.234.73.158:8085/v1/user/users/"+cookie.load('userId')).then(response => this.setState({username: response.data.name}))
                .catch(error => console.log("get data error")),
            age:axios.get("http://49.234.73.158:8085/v1/user/users/"+cookie.load('userId')).then(response => this.setState({age: response.data.age}))
                .catch(error => console.log("get data error")),
            sex:axios.get("http://49.234.73.158:8085/v1/user/users/"+cookie.load('userId')).then(response => this.setState({sex: response.data.sex}))
                .catch(error => console.log("get data error")),
            userstate:axios.get("http://49.234.73.158:8085/v1/user/users/"+cookie.load('userId')).then(response => this.setState({userstate: response.data.signature}))
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
    componentDidMount(){

        window.localStorage.setItem("username","");
        window.localStorage.setItem("age","");
        window.localStorage.setItem("sex","");
        window.localStorage.setItem("userstate","");
    }

    LoginFetch(){
        const _this = this;

        const url = "http://49.234.73.158:8085/v1/user/users/information";

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
            <div style={{height:'751px',width:'70%',marginLeft:'15%',WebkitTapHighlightColor:'rgba(26,26,26,0)',boxShadow: '0 1px 3px rgba(26,26,26,1)'}}>
                <form onSubmit={this.submit} style={{zIndex:'1'}}>
                    <div className="form-group" style={{height:'180px'}}>
                        <img style={{height:'150px',width:'150px',marginLeft:'-455px',backgroundColor:'white'}}></img>
                        <input style={{marginTop:'-200px',height:'40px',textAlign:'middle',width:'40%',border:'0px',zIndex:'2',fontSize:'30px',backgroundColor:'transparent'}} type="text" id="8964" className="form-control" placeholder="请输入你的用户名" value={this.state.username} onChange={this.getUsername.bind(this)}/>
                    </div>
                    <hr style={{marginLeft:'150px',width:'85%',border:'1 solid #c0c0c0'}}/>
                    <div className="form-group"style={{height:'180px'}}>
                        <label style={{marginTop:'70px',height:'40px',marginLeft:'-475px',fontSize:'15px'}}>生日</label>
                        <input style={{marginTop:'70px',height:'40px',border:'1px',marginLeft:'50px',backgroundColor:'transparent'}} type="text" className="form-control" placeholder="请输入你的生日"  value={this.state.age} onChange={this.getBirthday.bind(this)}/>
                    </div>
                    <hr style={{marginLeft:'150px',width:'85%',border:'1 solid #c0c0c0'}}/>
                    <div className="form-group" style={{height:'180px'}}>
                        <label style={{marginTop:'70px',height:'40px',marginLeft:'-475px',fontSize:'15px'}}>性别</label>
                        <input style={{marginTop:'70px',height:'40px',border:'1px',marginLeft:'50px',backgroundColor:'transparent'}} type="text" className="form-control" placeholder="请输入你的性别" value={this.state.sex} onChange={this.getSex.bind(this)}/>
                    </div>
                    <hr style={{marginLeft:'150px',width:'85%',border:'1 solid #c0c0c0'}}/>
                    <div className="form-group" style={{height:'180px'}}>
                        <label style={{marginTop:'70px',height:'40px',marginLeft:'-475px',fontSize:'15px'}}>个人简介</label>
                        <input style={{marginTop:'70px',height:'40px',border:'1px',marginLeft:'30px',backgroundColor:'transparent'}} type="text" className="form-control" placeholder="请输入你的用户简介" value={this.state.userstate} onChange={this.getUserstate.bind(this)}/>
                    </div>
                    <button type="button" className="submit_btn" style={{width:'100px',marginLeft:'450px',marginTop:'-38px'}}onClick={this.LoginFetch.bind(this)}>修改</button>
                </form>
            </div>
            </div>

        )

    }
}
