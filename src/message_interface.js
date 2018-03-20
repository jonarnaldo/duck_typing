class MessageQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    }
  }

  render () {
    return (
      <div className="message-queue">
        
      </div>
    )
  }
}

export { MessageQueue }
