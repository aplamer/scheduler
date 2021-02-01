import React from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Aux from '../../hoc/Auxiliary/Auxiliary'
class History extends Component {

    render(){
        let timesReturn = null
        if(this.props.times[0].id === "-1"){
            timesReturn = <h1 style = {{textAlign: "center", color: "grey"}}>No sleep times recorded.</h1>
        }
        else{
            timesReturn = this.props.times.map(timeElement =>
                {
                    if(timeElement.id === "-1"){
                        return null
                    }
                    else{
                        return(
                            <Aux key = {timeElement.id}>
                                
                                <Row>
                                    <Col>
                                    <div style = {{color: "#007bff"}}>
                                        Date Entered:
                                    </div>
                                    {timeElement.id}
                                    </Col>

                                    <Col>
                                    <div style = {{color: "#007bff"}}>
                                        Sleep Time:
                                    </div>
                                    {timeElement.sleepTime}
                                    </Col>

                                    <Col>
                                    <div style = {{color: "#007bff"}}>
                                        Wake Time:
                                    </div>
                                    {timeElement.wakeTime}
                                    </Col>

                                    <Col>
                                    <div style = {{color: "#007bff"}}>
                                        Total Hours:
                                    </div>
                                    {timeElement.totalHours}
                                    </Col>
                                </Row>
                                <hr></hr>
                            </Aux>
                        )
                    }
                }
            )
        }
        return(
            <Container>
                {timesReturn}
            </Container>
        )
    }
    
}


const mapStateToProps = state => {
    return {
        times: state.Times
    }
}

export default connect(mapStateToProps)(History)