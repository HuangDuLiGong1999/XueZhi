import React,{Component} from 'react'
import {NavLink, Switch, Route,Redirect} from 'react-router-dom'

import Registe from '../views/registe'
import Login from '../views/login'
import Manage from '../views/manage'

export default  class App extends Component{

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="page-header hx"><h2>React Login Demo</h2></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <Switch>
                            <Route path='/registe' component={Registe}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/manage' component={Manage}/>
                            <Redirect to='/login'/>
                        </Switch>
                    </div>
                </div>
                <div className="row mg">
                    <div className="col-md-4 offset-md-4">
                        <div>
                            <NavLink to='/login'>
                                <button className="btn btn-primary b1">
                                    用户登录
                                </button>
                            </NavLink>
                            <NavLink to='/registe'>
                                <button className="btn btn-primary b1">
                                    用户注册
                                </button>
                            </NavLink>
                            <NavLink to='/manage'>
                                <button className="btn btn-primary b1">
                                    用户信息管理
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}