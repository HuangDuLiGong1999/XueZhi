import React from "react";
import axios from "axios";
import AnswerItem from "../component/answerItem";

import "./read.css"
import Message from "../component/message";
import Header from "../component/header";
import cookie from "react-cookies";
class Read extends React.Component{
  constructor(props, context){
    super(props)
    const{questionId} = this.props.match.params
    this.state = {
      questionId,
      title:'',
      description:'',
      items:[]
    }

  }

  componentWillMount() {


    let str = this.props.match.url;
    str = str.toString();
    str = str.split("/authorId/")[1]
    let userId = str;


    const url = "http://49.234.73.158:8085/v1/qa_service/question/"+ this.state.questionId+ "/"+cookie.load("userId");

    var _this = this;

    var data;
    axios.get(url).then(function (response) {
      data = response.data;
      for (var i in data.answerList) {
        if (data.answerList[i]["authorId"] != userId) {
          delete data.answerList[i];
        }
      }


    }).catch(function (e) {
      alert(e);
    }).then(
        function(){
          _this.setState({
            title:data.title,
            description:data.description,
            items:data.answerList
          })
        }

    )


  }




  render() {
    const answerItems = this.state.items.map((item, index) =>
        <AnswerItem key={item.id} history={this.props.history} skip={true} item={item} MessageChildren={Message} />
    )
    return(
        <div>
          <Header history={this.props.history} />
          <div className="read">
              {answerItems}
          </div>
        </div>

    )
  }
}

export default Read