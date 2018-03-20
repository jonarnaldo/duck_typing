import { Messages } from './messages.js';
var randomWords = require('random-words');

class DuckTypingGame {
  static gameStates = {
    INTRO: 'INTRO',
    START: 'START',
    PLAYING: 'PLAYING',
    END: 'END',
  }

  constructor() {
    this.score = 0;
    this.words = randomWords(12);
    this.wordStreak = 0;
    this.Messages = new Messages();
    this.currentGameState = DuckTypingGame.gameStates.INTRO;
  }

  getNextMessage() {
    return this.Messages.getNextMessage();
  }

  getAllMessages() {
    return this.Messages.messages;
  }

  getGameStates() {
    return DuckTypingGame.gameStates;
  }

  setGameState(state) {
    if (DuckTypingGame.gameStates[state]) {
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

  handleCorrectWord(cb) {
    this.removeWord();
    this.score++;
    this.wordStreak++;

    const { PLAYING, END } = DuckTypingGame.gameStates;

    if (this.wordStreak % 3 === 0) {
      this.score += 10;
      this.Messages.addNewMessage("Word Streak Bonus!", this.Messages.messageTypes.SCORE);
      cb();
    }

    // determine game state
    // check if there are still words in list
    if (this.words.length) {
      this.getCurrentWord();

      // set game state to PLAYING if not already
      if (this.currentGameState !== PLAYING) {
        this.setGameState(PLAYING)
      }
    } else {
      // set game state to END if there are no more words
      this.setGameState(END)
    }
  }

  handleIncorrectWord() {
    this.removeWord();

    const { PLAYING, END } = DuckTypingGame.gameStates;

    if (this.words.length) {
      this.getCurrentWord();

      if (this.currentGameState !== PLAYING) {
        this.setGameState(PLAYING)
      }
    } else {
      this.setGameState(END)
    }
  }

  getScore() {
    return this.score;
  }

}

export { DuckTypingGame }
