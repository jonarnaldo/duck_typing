class DuckTypingGame {
  constructor() {
    this.score = 0
    this.words = ['quack', 'derp', 'marshall'];
    this.gameStates = {
      START: 'START',
      PLAYING: 'PLAYING',
      END: 'END',
    }

    this.currentGameState = this.gameStates.START;
  }

  getGameStates() {
    return this.gameStates;
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
