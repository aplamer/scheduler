import React, {Component} from 'react'
import Time from '../../components/Time/Time'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import classes from './TimeOptions.module.css'
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
            TimeType: 'Regular',
            DateType: 'MDY',
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

    dateHandler = (event, type) => {
        if(type === "Date"){ 
            this.setState({DateType: event.target.value});
        }
        else if (type === "Time"){
            this.setState({TimeType: event.target.value});
        }
                
    }
    render(){

        let fullTime = null;
        if(this.state.TimeType === "Regular"){
            fullTime = this.state.Hour + ":" + this.state.Minute + ":" + this.state.Second + this.state.AMPM;
        }
        else if(this.state.TimeType === "Military"){
            fullTime = this.state.TotalHour + ":" + this.state.Minute + ":" + this.state.Second;
        }

        let fullDate = null;
        switch (this.state.DateType){
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
            <Container>
                <Row>
                    <Col>
                    Time and Date Settings
                    </Col>
                    
                </Row>
                <Row>
                    <Col>  
                    <select value = {this.state.DateType} className = {classes.dropdownOption} onChange = {(event) => this.dateHandler(event, "Date")}>
                        <option value="MDY">MDY</option>
                        <option value="DMY">DMY</option>
                        <option value="YMD">YMD</option>
                    </select>
            
                    <select value = {this.state.TimeType} className = {classes.dropdownOption}  onChange = {(event) => this.dateHandler(event, "Time")}>
                        <option value="Regular">Regular</option>
                        <option value="Military">Military</option>
                    </select>
                    </Col>

                    <Col>
                    
                    {fullDate}
                    </Col>
                </Row>
                
            </Container>
            
        )
    }
}
export default TimeOptions;