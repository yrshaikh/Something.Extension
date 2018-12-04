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
            <h2 className="Greetings">{this.state.message}</h2>
        );
    }
    setGreetings() {
        const date = new Date();
        const
            hour = date.getHours(),
            morning = hour < 12 ? 'AM' : 'PM';
        const greet = morning === 'AM' ? 'Good Morning' : 'Good Evening';
        this.setState({ message: `${greet}.` });
    }
}