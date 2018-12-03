import React, { Component } from 'react';
import './App.css';

import { TimeAndGreetings } from './components/TimeAndGreetings/TimeAndGreetings';
import { Footer } from './components/Footer/Footer';
import { FlickrService } from './services/FlickrService';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            backgroundImage: null
        };
        this.flickrService = new FlickrService();
    }
    componentDidMount() {
        this.loadBackground();
    }
    async loadBackground() {
        const image = await this.flickrService.get('morning');
        this.setState({ backgroundImage: image });
    }
    render() {
        if (this.state === null || this.state.backgroundImage === null)
            return null;
        return (
            <div id="App" >
                <ul id="background">
                    <li style={{ background: `url(${this.state.backgroundImage})` }}>
                    </li>
                </ul>
                <TimeAndGreetings />
                <Footer />
            </div>
        );
    }
}