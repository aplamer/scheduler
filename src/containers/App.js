
import React, {Component} from 'react'
import Header from '../components/Header/Header'
import TimeOptions from './TimeOptions/TimeOptions'
import TimeInputContainer from './TimeInputContainer/TimeInputContainer'
import Score from '../components/Score/Score'
import Tips from '../components/Tips/Tips'
class App extends Component{
    
    render(){
        return(
            <div>
                <Header></Header>
                <br></br>
                <br></br>
                <TimeOptions></TimeOptions>
                <br></br>
                <br></br>
                <br></br>
                <TimeInputContainer></TimeInputContainer>
                <hr></hr>
                <Score></Score>
                <hr></hr>
                <Tips></Tips>
            </div>
        )
    }

}

export default App