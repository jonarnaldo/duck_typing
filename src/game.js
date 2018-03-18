import { Messages } from './messages.js';
var randomWords = require('random-words');

class DuckTypingGame {
  constructor() {
    this.score = 0;
    this.words = randomWords(20);
    this.gameStates = {
      INTRO: 'INTRO',
      START: 'START',
      PLAYING: 'PLAYING',
      END: 'END',
    }
    this.wordStreak = 0;
    this.Messages = new Messages();

    this.currentGameState = this.gameStates.INTRO;
  }

  getNextMessage() {
    return this.Messages.getNextMessage();
  }

  getGameStates() {
    return this.gameStates;
  }

  setGameState(state) {
    if (this.gameStates[state]) {
      this.currentGameState = state
    };
  }

  getCurrentGameState() {
    return this.currentGameState;
  }

  revealWord(word) {
    return word
  }

  removeWord() {
    this.words.shift();
  }

  getCurrentWord() {
    return this.words[0];
  }

  validateTypedWord(word) {
    return (this.getCurrentWord() === word);
  }

  handleCorrectWord() {
    this.removeWord();
    this.score++;
    this.wordStreak++;

    if (this.wordStreak % 5 === 0) {
      this.score += 10;
      this.Messages.addNewMessage("Word Streak Bonus!", this.Messages.messageTypes.SCORE);
    }

    // determine game state
    // check if there are still words in list
    if (this.words.length) {
      this.getCurrentWord();

      // set game state to PLAYING if not already
      if (this.currentGameState !== this.gameStates.PLAYING) {
        this.currentGameState = this.gameStates.PLAYING;
      }
    } else {
      // set game state to END if there are no more words
      this.currentGameState = this.gameStates.END;
    }
  }

  handleIncorrectWord() {
    this.removeWord();

    if (this.words.length) {
      this.getCurrentWord();

      if (this.currentGameState !== this.gameStates.PLAYING) {
        this.currentGameState = this.gameStates.PLAYING;
      }
    } else {
      this.currentGameState = this.gameStates.END;
    }
  }

  getScore() {
    return this.score;
  }

}

export { DuckTypingGame }
