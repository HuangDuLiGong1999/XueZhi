import React,{Component} from 'react'
import {NavLink, Switch, Route,Redirect} from 'react-router-dom'

import Register from '../views/register'
import Login from '../views/login'
import Manage from '../views/manage'
import "./index/base.css"
import ReactCanvasNest from "react-canvas-nest";

export default  class App extends Component{

    render() {
        return(
            <div className="container">
                <div className="row">
                </div>
                <div>
                    <h1 style={{fontSize: '50px',zIndex:'-1',color:'#C0C0C0'}}>学·知</h1>
                    <h2 style={{marginTop: '-10px',zIndex:'-1',color:'#C0C0C0',fontSize:'20px'}}>文明冲浪，健康生活</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <Switch>
                            <Route path='/register' component={Register}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/manage' component={Manage}/>
                            <Redirect to='/register'/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}