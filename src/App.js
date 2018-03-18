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
          <h1 onClick={this.createNewGame}>start game</h1>
        )

      case START: {
        // this.createNewGame()
        let game = this.state.Game;

        if (game) {
          return (
            <DuckType
            game={game}
            updateScreen={this.updateScreen}
            />
          )
        }
      }

      case END: {
        let game = this.state.Game;

        return (
          <div>
          <span>Game Over</span>
          <h1>{game.getScore()}</h1>
          <h1 onClick={this.createNewGame}>restart game?</h1>
          </div>
        )
      }
    }
  }

  render() {
    let screen = this.getScreen(this.state.screen);

    return (
      <div className="App">
        <p className="App-intro">
          Duck Typing
        </p>
        {screen}
      </div>
    );
  }
};

export default App;
