import React, { Component } from 'react';
import { DuckTypingGame } from './game.js';
import { DuckType } from './game_interface.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Game: undefined,
      screen: DuckTypingGame.gameStates.INTRO,
    }
  }

  createNewGame = () => {
    let game = new DuckTypingGame();
    game.setGameState(DuckTypingGame.gameStates.START)
    this.setState({ Game: game });
    this.setState({ screen: DuckTypingGame.gameStates.START })
  }

  updateScreen = (currentGameState) => {
    console.log("updating screen");
    this.setState({ screen: currentGameState });
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
              <img src="/ducky_icon.png" />
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
        // this.createNewGame()
        let game = this.state.Game;

        if (game) {
          return (
            <div className="game-screen">
              <div className="game-screen-header row">
                <img src="/ducky_icon.png" />
                <div className="App-intro">
                  DUCK TYPING
                </div>
              </div>
              <DuckType
                game={game}
                updateScreen={this.updateScreen}
              />
            </div>
          )
        }
      }

      case END: {
        let game = this.state.Game;

        return (
          <div className="outro-screen">
            <img src="/ducky_icon.png" />
            <div className="outro-title">DUCK TYPING</div>
            <div className="outro-subtitle">
              <span>Game Over</span>
              <div className="final-score">final score: {game.getScore()}</div>
            </div>
            <div className="restart-game-button" onClick={this.createNewGame}>restart game?</div>
          </div>
        )
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
