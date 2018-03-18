class Messages {
  constructor() {
    this.messages = [];
    this.messageTypes = {
      SCORE: 'SCORE',
    }
  }

  getNextMessage() {
    console.log(this.messages)
    if (!this.messages.length) {
      return;
    }

    let message = this.messages[0];
    this.removeMessage();

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
    return { message, type }
  }

  addNewMessage(message, type) {
    this.messages.push(this.createNewMessage(message, type))
  }
}

export { Messages }
