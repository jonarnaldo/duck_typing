import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion';
import { DuckTypingGame } from './game.js';
import './game_interface.css';

class DuckTypeInterface extends React.Component {
  constructor(props) {
    super(props);
    this.Game = new DuckTypingGame();
    this.onInputChange = this.onInputChange.bind(this);
    this.getKey = this.getKey.bind(this);
    this.state = {
      items: [],
      currentGameState: this.Game.currentGameState,
      currentMessage: [], // this holds the last message
      time: 20000,
    };
  }

  componentDidMount() {
    this.nameInput.focus();

    // window.setTimeout(() => {
    //   this.props.updateSummary({
    //     score: this.Game.getScore(),
    //     messages: this.Game.getAllMessages(),
    //   })
    //   this.props.updateScreen('END')
    // }, this.state.time)
  }

  updateMessages = () => {
    let currentMessage = this.state.currentMessage;
    let nextMessage = this.Game.getNextMessage();

    if (!nextMessage) {
      return;
    }

    // replace current message with new message if different timestamp
    if (!currentMessage || currentMessage.created !== nextMessage.created) {
      this.setState({
        currentMessage: [{
          data: nextMessage.message,
          key: "some-key",
          opacity: spring(1, this.springOptions()),
          top: spring(0, this.springOptions()),
        }]
      });

      window.setTimeout(() => {
        this.setState({ currentMessage: [] });
      }, 2000)
    }
  }

  // n.b. return FINAL state here
  willLeave = (d) => {
    return {
      opacity: 0,
      top: 100,
    };
  }

  // n.b. return INITIAL state here, return plain object here
  willEnter = (d) =>{
    return {
      opacity: 0,
      top: 100,
    };
  }

  springOptions = () => {
    return { stiffness: 400, damping: 20 }
  }

  // n.b. pushed items need to declare FINAL style state
  onInputChange = (e) => {
    if (!e.currentTarget.value) return;

    const items = this.state.items;

    items.push({
      data: e.currentTarget.value,
      key: `${e.currentTarget.value}-${items.length - 1}`,
      opacity: spring(1, this.springOptions()),
      top: spring(0, this.springOptions()),
    });

    this.setState({ items });

    let testString = items.map(i => i.data).join('');
    let currentWord = this.Game.getCurrentWord(); // TODO - move this into state

    if (currentWord && testString.length >= currentWord.length) {
      // validate typed word
      let validation = this.Game.validateTypedWord(testString)

      if (validation) {
        this.Game.handleCorrectWord(() => {
          this.updateMessages();
        });

      } else {
        this.Game.handleIncorrectWord();
      }

      let resetItem = () => {
        items.splice(0, items.length)
        this.setState({ items });

        let gameState = this.Game.getCurrentGameState();

        // determine game screen state
        if (this.Game.getCurrentGameState() === DuckTypingGame.gameStates.END) {
          this.props.updateSummary({
            score: this.Game.getScore(),
            messages: this.Game.getAllMessages(),
          })
          this.props.updateScreen('END')
        }
      }

      // reset items and check game state
      window.setTimeout(resetItem.bind(this), 200)
    }

    // clear input value
    e.currentTarget.value = "";
  }

  getKey = (config, i) => {
    return config.key + i;
  }

  render() {
    let Game = this.Game;

    return (
      <div className="game row">
        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.currentMessage.map(item => ({
            key: item.key,
            data: item.data,
            style: {
              opacity: item.opacity,
              top: item.top,
            },
          }))}>
          {interpolatedStyles =>
            <div className="player-messages">
            {interpolatedStyles.map((config, i) => {
              return (
                <div
                  className="message"
                  key={config.key}
                  style={{
                    opacity: config.style.opacity,
                    top: config.style.top,
                  }} >
                  {config.data}
                </div>
              )
            })}
            </div>
          }
        </TransitionMotion>
        <div className="player-status">
          <div className="player-score">
            score: {Game.getScore()}
          </div>
          <div className="player-progress">
            progress: {Game.getCurrentGameState()}
          </div>
        </div>
        <div className="word-target">
          <span>
            word: {Game.getCurrentWord()}
          </span>
        </div>
        <div className="user-input">
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
      </div>
    )
  }
}

export { DuckTypeInterface }
