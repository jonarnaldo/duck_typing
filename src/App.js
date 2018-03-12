import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TransitionMotion, spring} from 'react-motion';
import { DuckTypingGame } from './game.js';

const defaultStyle = {
  opacity: 1,
  rotation: 0,
  top: 0,
};

const springOptions = () => {
  return { stiffness: 400, damping: 20 }
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.Game = new DuckTypingGame();
    this.gameStates = this.Game.getGameStates;
    this.state = {
      items: [],
      currentGameState: this.Game.currentGameState,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getKey = this.getKey.bind(this);
  }

  getInitialState() {
    return this.state.items;
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  // n.b. return FINAL state here
  willLeave(d) {
    return {
      opacity: 0,
      // rotation: spring(180, springOptions()),
      top: 50,
    };
  }

  // n.b. return INITIAL state here, return plain object here
  willEnter(d) {
    return {
      opacity: 0,
      // rotation: 180,
      top: 50,
    };
  }

  // n.b. pushed items need to declare FINAL style state
  onInputChange(e) {
    const items = this.state.items;

    if (e.keyCode === 8) {
      items.pop();

    } else if (e.keyCode === 13) {
        let testString = this.state.items.map(i => i.data).join('');

        // validate typed word
        let validation = this.Game.validateTypedWord(testString)

        if (validation) {
          this.Game.handleCorrectWord();
          items.splice(0, items.length) // remove working set of player input
        }

        // // check game state
        // let currentGameState = this.state.currentGameState
        // if (currentGameState === this.gameStates.END) {
        //   this.state.currentGameState = this.gameStates.END;
        // }

    } else {
      if (!e.currentTarget.value) return;

      items.push({
        data: e.currentTarget.value,
        key: `${e.currentTarget.value}-${items.length - 1}`,
        opacity: spring(1, springOptions()),
        top: spring(0, springOptions()),
      });

      e.currentTarget.value = "";
    }

    this.setState({ items });
  }

  getKey(config, i) {
    return config.key + i;
  }

  render() {
    let Game = this.Game;

    return (
      <div>
        <div className="word-target">
          <span>word: {Game.getCurrentWord()}</span>
          <span> score: {Game.getScore()}</span>
          <span> progress: {Game.getCurrentGameState()}</span>
        </div>
        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.items.map(item => ({
            key: item.key,
            data: item.data,
            style: {
              opacity: item.opacity,
              top: item.top,
              // rotation: item.rotation
            },
        }))}>
        {interpolatedStyles =>
          <div className="letters">
          {interpolatedStyles.map((config, i) => {
            return (
              <div
                className="letter"
                key={config.key}
                style={{
                  opacity: config.style.opacity,
                  top: config.style.top,
                  // transform: `rotate3d(1,0,0,${config.style.rotation}deg)`,
                }} >
                {config.data}
              </div>
            )
          })}
          </div>
        }
        </TransitionMotion>
        <input
          className="letter-input"
          onKeyUp={this.onInputChange}
          ref={(input) => { this.nameInput = input; }}
        />
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Duck Typing
        </p>
        <Demo />
      </div>
    );
  }
}


export default App;
