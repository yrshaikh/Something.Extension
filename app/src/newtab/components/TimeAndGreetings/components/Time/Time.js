import React, { Component } from 'react';
import './Time.css';

export class Time extends Component {
    constructor() {
        super();
        this.state = {
            time: null
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setFormattedTime(), 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <h1 className="Time">{this.state.time}</h1>
        );
    }
    setFormattedTime() {
        const date = new Date();
        const
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? '0' + minute : minute,
            morning = hour < 12 ? 'AM' : 'PM';

        const formattedTime = `${hourFormatted}:${minuteFormatted}:${second} ${morning}`;
        this.setState({ time: formattedTime });
    }
}
