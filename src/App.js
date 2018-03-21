import React, { Component } from 'react';
import { DuckTypingGame } from './game.js';
import { DuckTypeInterface } from './game_interface.js';
import './App.css';

/*
  things to add:
   - add summary statistics
   - increase word count
   - prettify end screen
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: null,
      screen: DuckTypingGame.gameStates.INTRO,
      summary: null,
    }
  }

  createNewGame = () => {
    const start = DuckTypingGame.gameStates.START;
    this.setState({ gameState: start });
    this.setState({ screen: start })
  }

  updateScreen = (currentGameState) => {
    console.log("updating screen");
    this.setState({ screen: currentGameState });
  }

  updateSummary = (summary) => {
    this.setState({ summary: summary })
  }

  getSummary = () => {
    return (this.state.summary && this.state.summary.messages && this.state.summary.messages.length) || 0;
  }

  getScreen(currentGameState) {
    const { INTRO, START, PLAYING, END} = DuckTypingGame.gameStates;

    if (!DuckTypingGame.gameStates[currentGameState]) {
      console.log('game state unrecoginzed', currentGameState)
      return;
    }

    switch (currentGameState) {
      case INTRO:
        return (
          <div className="intro-screen">
            <div className="logo">
              <img src="/ducky_icon.png" alt="ducky_icon"/>
              <div className="speech-bubble">quack</div>
            </div>
            <div className="app-intro">
              <div className="game-title">DUCK TYPING</div>
              <span>test your typing skills?</span>
            </div>
            <div className="start-button" onClick={this.createNewGame}>start game</div>
          </div>
        )

      case START: {
        return (
          <div className="game-screen">
            <div className="game-screen-header row">
              <img src="/ducky_icon.png" alt="ducky_icon"/>
              <div className="App-intro">
                DUCK TYPING
              </div>
            </div>
            <DuckTypeInterface
              updateScreen={this.updateScreen}
              updateSummary={this.updateSummary}
              gameState={this.gameState}
            />
          </div>
        )
      }

      case END: {
        return (
          <div className="outro-screen">
            <img src="/ducky_icon.png" alt="ducky_icon"/>
            <div className="outro-title">DUCK TYPING</div>
            <div className="outro-subtitle">
              <span>Game Over</span>
              <div className="final-stats">
                <span>stats:</span>
                <div className="final-summary">word streaks: {this.getSummary()}</div>
                <div className="final-score">final score: {this.state.summary.score}</div>
              </div>
            </div>
            <div className="restart-game-button" onClick={this.createNewGame}>restart game?</div>
          </div>
        )
      }

      default: {
        return;
      }
    }
  }

  render() {
    let screen = this.getScreen(this.state.screen);

    return (
      <div className="App">
        {screen}
      </div>
    );
  }
};

export default App;
