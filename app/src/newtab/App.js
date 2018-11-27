import React, { Component } from 'react';
import './App.css';

// // ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';

// // require syntax
//const Unsplash = require('unsplash-js').default;

//import Unsplash from 'unsplash-js/native';

import { Footer } from './components/Footer/Footer';
import { Greet } from './components/Greet/Greet';

const unsplash = new Unsplash({
    applicationId: "4ea9098287864f4bcb9d6284912e3e520e302224d3acc440e66122172f412650",
    secret: "35e72e41e723375703cd6c6edda3f4fc15a709b2d26e0933940454140a6093e9",
    //callbackUrl: "{CALLBACK_URL}"
});

export class App extends Component {

    constructor() {
        super();
        this.setState({
            backgroundImage: null
        })
        this.getPhoto();
    }

    async getPhoto() {
        let response = await unsplash.photos.getRandomPhoto();
        console.log("response", response);
        let photo = await toJson(response);
        console.log(photo);
        const photoObj = {
            url: photo.urls.regular,
            user: photo.user,
        };
        this.setState({ backgroundImage: photoObj.url });
    }

    render() {
        console.log('debug');
        if (this.state === null || this.state.backgroundImage === null)
            return <div>not ready</div>;

        console.log("s", this.state.backgroundImage);
        return (
            <div id="App" style={{background: `url(${this.state.backgroundImage})`}}>
                <Greet />
                <Footer />
            </div>
        )
    }
}
