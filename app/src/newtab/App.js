import React, { Component } from 'react';
import './App.css';

import { Footer } from './components/Footer/Footer';
import { Greet } from './components/Greet/Greet';
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
    async loadBackground(refresh) {
        const url = await this.photoService.get(refresh);
        this.setState({ backgroundImage: url });
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
            <div id="App" style={{background: `url(${this.state.backgroundImage})`}}>
                <Greet />
                {this.renderClearButton()}
                <Footer />
            </div>
        )
    }
    resetBackgroundImage() {
        this.loadBackground(true);
    }
}
