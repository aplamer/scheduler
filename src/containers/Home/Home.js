import React from 'react'
import TimeInputContainer from '../TimeInputContainer/TimeInputContainer'
import Score from '../../components/Score/Score'
import Aux from '../../hoc/Auxiliary/Auxiliary'
const Home = () => {
    return(
        <Aux>
            <TimeInputContainer></TimeInputContainer>
            <hr></hr>
            <Score></Score>
        </Aux>
    )
}
export default Home