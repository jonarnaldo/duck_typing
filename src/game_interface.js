import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion';

class DuckType extends React.Component {
  constructor(props) {
    super(props);
    this.Game = this.props.game;
    this.gameStates = this.Game.getGameStates;
    // this.onInputChange = this.onInputChange.bind(this);
    // this.getKey = this.getKey.bind(this);
    this.state = {
      items: [],
      currentGameState: this.Game.currentGameState,
    };
  }

  componentDidMount() {
    console.log(this.Game.words)
    this.nameInput.focus();
  }

  // n.b. return FINAL state here
  willLeave = (d) => {
    return {
      opacity: 0,
      // rotation: spring(180, springOptions()),
      top: 50,
    };
  }

  // n.b. return INITIAL state here, return plain object here
  willEnter = (d) =>{
    return {
      opacity: 0,
      // rotation: 180,
      top: 50,
    };
  }

  springOptions = () => {
    return { stiffness: 400, damping: 20 }
  }

  // n.b. pushed items need to declare FINAL style state
  onInputChange = (e) => {
    // if (!e.currentTarget.value) return;

    const items = this.state.items;

    items.push({
      data: e.currentTarget.value,
      key: `${e.currentTarget.value}-${items.length - 1}`,
      opacity: spring(1, this.springOptions()),
      top: spring(0, this.springOptions()),
    });

    this.setState({ items });

    // clear input value
    e.currentTarget.value = "";

    let testString = items.map(i => i.data).join('');
    let currentWord = this.Game.getCurrentWord(); // TODO - move this into state

    if (e.keyCode === 8) {
      // items.pop();

    } else if (testString.length >= currentWord.length) {
      // validate typed word
      let validation = this.Game.validateTypedWord(testString)

      if (validation) {
        this.Game.handleCorrectWord();
      } else {
        this.Game.handleIncorrectWord();
      }

      items.splice(0, items.length) // remove working set of player input
      this.setState({ items });
    }
  }

  getKey = (config, i) => {
    return config.key + i;
  }

  render() {
    let Game = this.Game;
    let message = Game.getNextMessage() || null;

    return (
      <div className="game">
        <div className="word-target">
          <span>word: <h1>{Game.getCurrentWord()}</h1></span>
        </div>
        <div className="player-status">
          <span>
            <div className="player-score">score: {Game.getScore()}</div>
            <div className="player-messages">{message ? message.message : ''}</div>
          </span>
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
    )
  }
}

export { DuckType }
