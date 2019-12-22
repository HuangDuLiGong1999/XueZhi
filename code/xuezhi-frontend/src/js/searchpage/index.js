import React from 'react'
import AtricleItem from "../component/atricleItem"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import axios from "axios";
import cookie from "react-cookies";
import HistoryItem from "../component/historyItem";
import NoButtonItem from "../component/noButtonItem";

class Searchpage extends React.Component {
    // 加载一次，初始化状态
    constructor(props, context) {
        super(props);
        const{searchId} = this.props.match.params
        this.state={
            items: []
        };
    }
    // 加载一次，Dom 未加载
    componentWillMount() {
    }

    // 加载一次，这里 Dom 已经加载完成
    componentDidMount() {

        this._net(this.props.match.params.page)
    }
    _net(page) {
        const url = "http://49.234.73.158:8085/v1/qa_service/answers/regex/"+this.props.location.query.foo+"/"+cookie.load('university');

        let _this = this;
        let data = [];
        axios.get(url).then(function (response) {
            data = response.data;
            console.log(data);
            console.log("323233333333333");
            _this.setState({
                items: data,
                progressShow: false
            });

        }).catch(function (e) {
            alert(e);
        });



    }

     // 渲染 Dom
    render()
    {    let _this = this;
        var header=this.props.location.query.foo;
        console.log(header);
        console.log("检查4544", this.state.items)
        const atricleItems = this.state.items.map((item, index) =>
            <NoButtonItem key={item.id} history={this.props.history} item={item}  />
        )
        return (
            <div>
                <Header history={this.props.history} />
                <div className="g-container home">
                    <Progress show={this.state.progressShow} />
                    <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
                    <div className="left">
                        {atricleItems}
                    </div>
                    <div className="right">
                        <div className="card">
                            本站主要愿景：<br />
                            建立高等教育信息分享平台，统一中国高校的经验分享市场，解决中国青年的升学和迷茫问题<br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    _snackBarOpen(content, time = 2000) {
        this.setState({ snackBarOpen: true, content: content });
        setTimeout(() => {
            this.setState({ snackBarOpen: false })
        }, time)
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

export default Searchpage