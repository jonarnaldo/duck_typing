import React, { Component } from 'react';
import { DuckTypingGame } from './game.js';
import { DuckType } from './game_interface.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Game: new DuckTypingGame(),
      // gameState: undefined
    }
  }

  // componentDidMount() {
  //   this.state.gameState = this.state.Game.getGameState();
  // }

  handleStart = (e) => {
    let game = this.state.Game;
    game.setGameState(game.gameStates.START)
    this.setState({ Game: game });
  }


  getScreen() {
    const game = this.state.Game;
    const gameStates = game.getGameStates();
    const currentGameState = game.currentGameState
    const { INTRO, START, PLAYING, END} = gameStates;

    switch (currentGameState) {
      case INTRO:
        return (
          <h1 onClick={this.handleStart}>start game</h1>
        )

      case START:
        return (
          <DuckType
            game={game}
          />
        )

      case END:
        return (
          <div>Game Over</div>
        )
    }
  }

  render() {
    let screen = this.getScreen();

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
