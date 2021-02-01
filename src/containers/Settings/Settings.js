import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import classes from './Settings.module.css'
class Settings extends Component {
    render(){
        
        return(
            <Container>
                <Row>
                    Date Format:
                    <select value = {this.props.dateType} className = {classes.dropdownOption} onChange = {(event) => this.props.onChangeSettings(event, "Date")}>
                        <option value="MDY">MDY</option>
                        <option value="DMY">DMY</option>
                        <option value="YMD">YMD</option>
                    </select>
                </Row>
                <br></br>
                <br></br>
                <Row>
                    Time Setting:
                    <select value = {this.props.timeType} className = {classes.dropdownOption}  onChange = {(event) => this.props.onChangeSettings(event, "Time")}>
                        <option value="Regular">Regular</option>
                        <option value="Military">Military</option>
                    </select>
                </Row>

            </Container>
            )
    }
}

const mapStateToProps = state =>{
    return{
        timeType: state.timeSettings,
        dateType: state.dateSettings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeSettings: (data, changing) => dispatch({type: "CHANGE_SETTINGS", value: data.target.value, timeOrDate: changing}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings)