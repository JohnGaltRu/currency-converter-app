import React, { Component } from "react";
import './Converter.css';

class Converter extends Component {
    state = {}

    render() {
        return (
            <div className="Converter">
                <h2>Currency Converter</h2>
                <div className="Form">
                    <input/>
                    <select></select>
                    <select></select>
                    <button>Convert!!!!!!</button>
                </div>
                <h3>Result</h3>                
            </div>
        );
    }
}

export default Converter;