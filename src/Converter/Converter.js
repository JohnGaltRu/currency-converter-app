import React, { Component } from "react";
import "./Converter.css";

// N.B.: https://reactjs.org/docs/react-api.html#reactmemo
const SelectM = React.memo(function Select({
  name,
  options,
  currentValue,
  onChange,
  ...restProps
}) {
  return (
    <select
      name={name}
      value={currentValue}
      onChange={onChange}
      {...restProps}
    >
      {options.map((option, i) => {
        return <option key={i}>{option}</option>;
      })}
    </select>
  );
});

class Converter extends Component {
  state = {
    amount: null,
    result: null,
    fromCurrency: "USD",
    toCurrency: "RUB",
    currencies: []
  };

  componentDidMount() {
    fetch(`https://api.openrates.io/latest`)
      .then(res => res.json())
      .then(({ rates, base }) => {
        const curArr = Object.keys(rates)
          .concat(base)
          .sort();
        this.setState({ currencies: curArr });
      })
      .catch(error => console.log("Opps", error.message));
  }

  converting = () => {
    this.setState({ loading: true });
    fetch(
      `https://api.openrates.io/latest?base=${
        this.state.fromCurrency
      }&symbols=${this.state.toCurrency}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false });
        const result = this.state.amount * res.rates[this.state.toCurrency];
        this.setState({ result: result.toFixed(2) });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log("Opps", error.message);
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  switchCurrencies = () => {
    const { toCurrency, fromCurrency } = this.state;
    this.setState({
      fromCurrency: toCurrency,
      toCurrency: fromCurrency
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.converting();
  };

  render() {
    const {
      currencies,
      toCurrency,
      fromCurrency,
      result,
      loading
    } = this.state;
    return (
      <div className="Converter">
        <h2>Currency Converter</h2>
        <form className="Form" onSubmit={this.onSubmit}>
          <input
            name="amount"
            type="number"
            onChange={this.onChange}
            min="1"
            required
          />
          <SelectM
            name="fromCurrency"
            currentValue={fromCurrency}
            onChange={this.onChange}
            options={currencies}
          />
          <span className="switch" onClick={this.switchCurrencies}>
            {"<-->"}
          </span>
          <SelectM
            name="toCurrency"
            currentValue={toCurrency}
            onChange={this.onChange}
            options={currencies}
          />
          <button type="submit">Convert</button>
        </form>
        {loading ? <h3>.....loading.....</h3> : <h3>{result}</h3>}
      </div>
    );
  }
}

export default Converter;
