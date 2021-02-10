
import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from '../containers/Home/Home'
import History from '../containers/History/History'
import About from '../containers/About/About'
import Settings from '../containers/Settings/Settings'
import Header from '../containers/Header/Header'
import CurrentTime from '../containers/CurrentTime/CurrentTime'
import {connect} from 'react-redux'
import axios from 'axios'
class App extends Component{
    componentDidMount = () => {
        const token = localStorage.getItem('token');
        if(!token){
            
            this.props.logOut();
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if(expirationDate <= new Date()){
                this.props.logOut();
            }
            else{
                const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
                axios.get('https://sleep-scheduler-4c01c-default-rtdb.firebaseio.com/data.json' + queryParams)
                .then(res => {
                    this.props.autoLogin(res, token)
                    setTimeout(() => {
                        this.props.logOut();
                    }, ((expirationDate.getTime() - new Date().getTime())/1000) * 1000);
                })
            }
        }
    }
    render(){
        return(
            <BrowserRouter>
                    <Route path = "" component = {Header}/>
                    <br></br>
                    <br></br>
                    <CurrentTime></CurrentTime>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Route path = "/" exact component = {Home}/>
                    <Route path = "/history" component = {History}/>
                    <Route path = "/about" component = {About}/>
                    <Route path = "/settings" component = {Settings}/>
            </BrowserRouter>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: (response, newToken) => dispatch({type: "AUTH_LOGIN", response: response, token: newToken}),
        logOut: () => dispatch({type: "LOGOUT"})
    }
}
export default connect(null, mapDispatchToProps)(App)