import React from 'react'
import TimeInputContainer from '../TimeInputContainer/TimeInputContainer'
import Score from '../../components/Score/Score'
import Tips from '../../components/Tips/Tips'
import Aux from '../../hoc/Auxiliary/Auxiliary'
const Home = () => {
    return(
        <Aux>
            <TimeInputContainer></TimeInputContainer>
            <hr></hr>
            <Score></Score>
            <hr></hr>
            <Tips></Tips>
        </Aux>
    )
}
export default Home