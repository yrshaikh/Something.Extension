import React, { Component } from 'react';
import './Greetings.css';

export class Greetings extends Component {
    constructor() {
        super();
        this.state = {
            message: null
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setGreetings(), 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <h1 className="Greetings">{this.state.message}</h1>
        );
    }
    setGreetings() {
        const date = new Date();
        const
            hour = date.getHours(),
            morning = hour < 12 ? 'AM' : 'PM';
        this.setState({ message: morning === 'AM' ? 'Good Morning' : 'Good Evening' });
    }
}
