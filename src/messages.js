class Messages {
  constructor() {
    this.messages = [];
    this.messageTypes = {
      SCORE: 'SCORE',
    }
    this.messageIndex = 0
  }

  getNextMessage() {
    if (!this.messages.length) {
      return;
    }

    let message = this.messages[this.messageIndex];
    // this.removeMessage();
    this.messageIndex = ++this.messageIndex;
    return message;
  }

  removeMessage() {
    this.messages.pop();
  }

  createNewMessage(message, type) {
    if (!this.messageTypes[type]) {
      console.log("message type does not exist!");
      return;
    }
    return { message, type, created: new Date() }
  }

  addNewMessage(message, type) {
    this.messages.push(this.createNewMessage(message, type))
  }
}

export { Messages }
