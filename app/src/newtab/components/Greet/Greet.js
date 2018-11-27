import React, { Component } from 'react';
import './Greet.css';

export class Greet extends Component {
  render() {

    return (
      <div className="Greet">
        <h1 className="Greet__heading">Good Morning!</h1>
        <h1 className="Greet__time">6: 53 PM</h1>
      </div>
    )
  }
}
