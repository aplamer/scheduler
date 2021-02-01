
import React, {Component} from 'react'
import Header from './Header/Header'
import CurrentTime from './CurrentTime/CurrentTime'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from '../containers/Home/Home'
import History from '../containers/History/History'
import About from '../containers/About/About'
import Settings from '../containers/Settings/Settings'
class App extends Component{
    
    render(){
        return(
            <BrowserRouter>
                    <Header></Header>
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

export default App