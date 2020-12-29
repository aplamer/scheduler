import React, {Component} from 'react'
import Time from '../Time'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class TimeOptions extends Component{
    constructor(){
        super();
        let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        this.state = {
            Date: month + "/" + date + "/" + year,
            Time:  hour + ":" + minute + ":" + second,
            Day: 'Monday',
            Timezone: 'EST',
            TimeType: 'Regular',
            DateType: 'USA'
        } ;
    }

    componentDidMount(){
        this.interval = setInterval(() => this.updateClock(), 1000);
    }
    
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    updateClock = () => {
        let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/");
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /);
        this.setState({ Date: month + "/" + date + "/" + year, Time: hour + ":" + minute + ":" + second,})
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Timezone">
                            <Dropdown.Item href="#">EST</Dropdown.Item>
                            <Dropdown.Item href="#">PST</Dropdown.Item>
                            <Dropdown.Item href="#">MST</Dropdown.Item>
                        </DropdownButton>
                    </Col>

                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Time Type">
                            <Dropdown.Item href="#">Regular</Dropdown.Item>
                            <Dropdown.Item href="#">Military</Dropdown.Item>
                        </DropdownButton>
                    </Col>

                    <Col>
                        <DropdownButton id="dropdown-basic-button" title="Date Type">
                            <Dropdown.Item href="#">USA</Dropdown.Item>
                            <Dropdown.Item href="#">European</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                
                <Time date = {this.state.Date} time = {this.state.Time} day = {this.state.Day}>
                </Time>
            </Container>
            
        )
    }
}
export default TimeOptions;