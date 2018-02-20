import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createReactClass from 'create-react-class';
import {TransitionMotion, spring, presets} from 'react-motion';

const springConfig = () => {
  return {stiffness: 100, damping: 17};
}

const defaultStyle = { opacity: 1};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { ...defaultStyle, data: 'a', key: 'a0' },
        { ...defaultStyle, data: 'b', key: 'b1' },
        { ...defaultStyle, data: 'c', key: 'c2' }
      ],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  getInitialState() {
    return this.state.items;
  }

  componentDidMount() {
  }

  willLeave(d) {
    return { opacity: spring(0, springConfig()) };
  }

  willEnter(d) {
    return { opacity: 0 };
  }

  onInputChange(e) {
    const items = this.state.items;

    if (e.keyCode === 8) {
      items.pop();

    } else {
      if (!e.currentTarget.value) return;

      items.push({
        data: e.currentTarget.value,
        key: `${e.currentTarget.value}-${items.length - 1}`,
        opacity: spring(1, springConfig())
      });

      e.currentTarget.value = "";
    }

    this.setState({ items });
  }

  getKey(config, i) {
    return config.key + i;
  }

  render() {
    return (
      <div>
        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.items.map(item => ({
            key: item.key,
            data: item.data,
            style: {
              opacity: item.opacity,
            },
        }))}>
        {interpolatedStyles =>
          <div className="letters">
          {interpolatedStyles.map((config, i) => {
            return (
              <div
                className="letter"
                key={config.key}
                style={{...config.style}} >
                {config.data}
              </div>
            )
          })}
          </div>
        }
        </TransitionMotion>
        <input className="letter-input" onKeyUp={this.onInputChange} />
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Test
        </p>
        <Demo />
      </div>
    );
  }
}


export default App;
