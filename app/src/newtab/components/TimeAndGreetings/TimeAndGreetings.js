import React, { Component } from 'react';
import './TimeAndGreetings.css';

import { Greetings } from './components/Greetings/Greetings';
import { Time } from './components/Time/Time';

export class TimeAndGreetings extends Component {
    render() {
        return (
            <div className="TimeAndGreetings">
                <Greetings />
                <Time />
            </div>
        );
    }
}
