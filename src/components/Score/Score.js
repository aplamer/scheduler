import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import classes from './Score.module.css'
import {connect} from 'react-redux'
class Score extends Component {
    render(){
        return(
            <Container>
                <Col className = {classes.scoreText}>Sleep Score</Col>
                <Col className = {classes.scoreImg}>{this.props.score}</Col>
            </Container>
        )
    }
    
}

const mapStateToProps = state => {
    return{
        score: state.sleepScore
    }
}
export default connect(mapStateToProps)(Score);
