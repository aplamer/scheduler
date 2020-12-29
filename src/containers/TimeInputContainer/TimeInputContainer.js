import React from 'react'
import Date from '../../components/TimeInput/Date/Date'
import Inputs from '../../components/TimeInput/Inputs/Inputs'
import PrevInputs from '../../components/TimeInput/PrevInputs/PrevInputs'
import Container from 'react-bootstrap/Container'

const TimeInputContainer = () =>{
    return(
        <Container>
            <Date>

            </Date>

            <Inputs>
            </Inputs>
            
            <br></br>
            
            <PrevInputs>

            </PrevInputs>
            
        </Container>
    )
}
export default TimeInputContainer;