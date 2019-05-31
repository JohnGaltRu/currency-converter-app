import React, { Component } from "react";
import './Converter.css';

class Converter extends Component {
    state = {
    amount: null,    
    fromCurrency: 'AUD', 
    toCurrency: 'AUD',
    result: null,
    curriences: []
    }

    componentDidMount() { 
    fetch('https://api.openrates.io/latest')
        .then(res => res.json())
        .then(res => {
            const curArr = [];
            for (const key in res.rates) {
            curArr.push(key);
            }
            curArr.push(res.base);
            curArr.sort();
            this.setState({ curriences: curArr })
        })
        .catch(error => console.log("Opps", error.message))     
    } 

    converting = () => {
        fetch(`https://api.openrates.io/latest?base=${this.state.fromCurrency}&symbols=${this.state.toCurrency}`)    
            .then(res => res.json())
            .then(res => {
                const result = this.state.amount * (res.rates[this.state.toCurrency]);
                this.setState({ result: result.toFixed(2) })
            })
            .catch(error => console.log("Opps", error.message))
    }

    render() {
        return (
            <div className="Converter">
                <h2>Currency Converter</h2>
                <form className="Form">
                    <input name='amount' type='number' onChange={(e) => this.setState({ amount: e.target.value }) } min="1" required/>
                    <select name='fromCur' onChange={(e) => this.setState({ fromCurrency: e.target.value }) }>
                    {this.state.curriences.map((cur) => {return <option key={`from${cur}`}>{cur}</option>})}
                    </select>
                    <select name='toCur' onChange={(e) => this.setState({ toCurrency: e.target.value }) }>
                    {this.state.curriences.map((cur) => {return <option key={`to${cur}`}>{cur}</option>})}
                    </select>
                    <button onClick={(e) => {e.preventDefault(); this.converting()}}>Convert</button>
                </form>
                <h3>{this.state.result}</h3>                
            </div>
        );
    }
}

export default Converter;