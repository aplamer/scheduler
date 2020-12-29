import React from 'react'
import Container from 'react-bootstrap/Container'
import classes from './Time.module.css'
const Time = (props) => {
    return(
        <div>
            <Container>
                <div className = {classes.timeDisplay}>
                    {props.day}
                </div>
                <div className = {classes.timeDisplay}>
                    {props.date}
                </div>
                <div className = {classes.timeDisplay}> 
                    {props.time}
                </div>
            </Container>
            
        </div>
    )
}

export default Time;