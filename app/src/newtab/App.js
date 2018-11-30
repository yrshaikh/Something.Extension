import React, { Component } from 'react';
import './App.css';

import { TimeAndGreetings } from './components/TimeAndGreetings/TimeAndGreetings';
import { Footer } from './components/Footer/Footer';
import { PhotoService } from './services/PhotoService';

export class App extends Component {
    constructor() {
        super();
        this.state = {
            backgroundImage: null
        };
        this.photoService = new PhotoService();
        this.resetBackgroundImage = this.resetBackgroundImage.bind(this);
    }
    componentDidMount() {
        this.loadBackground();
    }
    async loadBackground() {
        const image = await this.photoService.get();
        console.log('image in loadBackground', image);
        this.setState({ backgroundImage: image.urlHd });
    }
    renderClearButton() {
        return (
            <button onClick={this.resetBackgroundImage}>Reset</button>
        );
    }
    render() {
        if (this.state === null || this.state.backgroundImage === null)
            return <div>loading...</div>;
        return (
            <div id="App" >
                <ul id="background">
                    <li style={{ background: `url(${this.state.backgroundImage})` }}>
                    </li>
                </ul>
                <TimeAndGreetings />
                {this.renderClearButton()}
                <Footer />
            </div>
        );
    }
    async resetBackgroundImage() {
        this.photoService.reset();
        this.loadBackground();
    }
}
