import React, { Component } from "react";
import UserContext from "../../Context/UserContext";

class Conversation extends Component {
  static contextType = UserContext;
  state = {
    messages: [],
    conversation_id: 0,
    user: null,
    partner: null,
    message: "",
  };

  componentDidMount() {
    const { socket, user } = this.context;
    const { convoPartner } = this.props.match.params;
    console.log(socket, user, convoPartner);

    if (socket) {
      socket.emit("newUser", user.id);
      socket.emit("chatOpen", {
        userId: user.id,
        receiverId: convoPartner,
      });
    }
    this.handleSocketListeners();
    this.setState({ user: user.id, partner: convoPartner });
  }

  handleSocketListeners = () => {
    const { socket } = this.context;
    if (socket) {
      socket
        .on("conversationId", (conversation_id) => {
          this.setState({ conversation_id });
        })
        .on("priorMessages", (messages) => {
          this.setState({ messages });
        })
        .on("incomingMessage", (message) => {
          if (message.conversation_id === this.state.conversation_id) {
            let { messages } = this.state;
            messages.push(message);
            this.setState({ messages });
          }
        });
    }
  };

  handleSubmitMessage = (event) => {
    event.preventDefault();
    const { socket, user } = this.context;
    const { convoPartner } = this.props.match.params;
    const { message } = this.state;
    socket.emit("message", {
      text: message,
      sender_id: user.id,
      receiver_id: convoPartner,
    });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  render() {
    const { messages, message } = this.state;
    return (
      <section>
        <p>messages</p>
        <ul>
          {messages.length > 0 &&
            messages.map((message) => (
              <li key={message.id}>
                <span>{message.message}</span>
              </li>
            ))}
        </ul>
        <form onSubmit={this.handleSubmitMessage}>
          <textarea onChange={this.handleMessageChange} value={message} />
          <button onSubmit={this.handleSubmitMessage} alt="send">
            {" "}
            send{" "}
          </button>
        </form>
      </section>
    );
  }
}

export default Conversation;
