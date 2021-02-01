
import React, {Component} from 'react'
import Header from './Header/Header'
import TimeOptions from './TimeOptions/TimeOptions'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from '../containers/Home/Home'
import History from '../containers/History/History'
import About from '../containers/About/About'
class App extends Component{
    
    render(){
        return(
            <BrowserRouter>
                    <Header></Header>
                    <br></br>
                    <br></br>
                    <TimeOptions></TimeOptions>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Route path = "/" exact component = {Home}/>
                    <Route path = "/history" component = {History}/>
                    <Route path = "/about" component = {About}/>
            </BrowserRouter>
        )
    }

}

export default App