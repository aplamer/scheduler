import React, {Component} from 'react'
import Time from '../../components/Time/Time'
import Container from 'react-bootstrap/Container'
import {connect} from 'react-redux'
class TimeOptions extends Component{
    constructor(){
        super();
        const [month, date, year]    = new Date().toLocaleDateString().split("/");
        const [hour, minute, second] = new Date().toLocaleTimeString().split(/:| /);
        const d = new Date().getDay();
        const totalhour = new Date().getHours();
        const day = this.dayHandler(d);
        let AMorPM = "AM"
        if (totalhour >= 12){
            AMorPM = "PM"
        }
        else{
            AMorPM = "AM"
        }
        this.state = {
            Date: date,
            Month: month,
            Year: year,
            Hour:  hour,
            TotalHour: totalhour,
            Minute: minute,
            Second: second,
            Day: day,
            AMPM: AMorPM
        };

    }

    dayHandler(dayNum){
        switch (dayNum){
            case 0: 
                return "Sunday"
            case 1: 
                return "Monday"
            case 2: 
                return "Tuesday"
            case 3: 
                return "Wednesday"
            case 4: 
                return "Thursday"
            case 5: 
                return "Friday"
            case 6: 
                return "Saturday"
            default:
                return "Error"
        }


    }
    componentDidMount(){
        this.interval = setInterval(() => this.updateClock(), 1000);
    }
    
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    updateClock = () => {
        const [month, date, year]    = new Date().toLocaleDateString().split("/");
        const [hour, minute, second] = new Date().toLocaleTimeString().split(/:| /);
        const d = new Date().getDay();
        const totalhour = new Date().getHours();
        const day = this.dayHandler(d);
        let AMorPM = "AM"
        if (totalhour >= 12){
            AMorPM = "PM"
        }
        else{
            AMorPM = "AM"
        }
        this.setState({ Date: date, Month: month, Year: year, Hour: hour, TotalHour: totalhour, Minute: minute, Second: second, Day: day, AMPM: AMorPM})
    }
    render(){

        let fullTime = null;
        if(this.props.timeType === "Regular"){
            fullTime = this.state.Hour + ":" + this.state.Minute + ":" + this.state.Second + this.state.AMPM;
        }
        else if(this.props.timeType === "Military"){
            fullTime = this.state.TotalHour + ":" + this.state.Minute + ":" + this.state.Second;
        }

        let fullDate = null;
        switch (this.props.dateType){
            case "MDY":
                fullDate = 
                <Time 
                date = {this.state.Month + "/" + this.state.Date + "/" + this.state.Year} 
                time = {fullTime} 
                day = {this.state.Day}>
                </Time>
                break;

            case "DMY":
                fullDate = 
                <Time 
                date = {this.state.Date + "/" + this.state.Month + "/" + this.state.Year} 
                time = {fullTime}  
                day = {this.state.Day}>
                </Time>
                break;

            case "YMD":
                fullDate = 
                <Time 
                date = {this.state.Year + "/" + this.state.Month + "/" + this.state.Date} 
                time = {fullTime} 
                day = {this.state.Day}>
                </Time>
                break;
            default: 
        }
        
        return(
            <Container style = {{textAlign: "center"}}>
                    {fullDate}
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

export default connect(mapStateToProps)(TimeOptions)