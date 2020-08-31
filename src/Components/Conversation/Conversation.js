import React, { Component } from "react";
import UserContext from "../../Context/UserContext";
import Messages from "../Messages/Messages";
import "../../Styles/Conversation.css";

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

    if (socket) {
      socket.emit("newUser", user.id);
      socket.emit("chatOpen", {
        userId: user.id,
        receiverId: convoPartner,
      });
      this.handleSocketListeners();
    }
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
    this.setState({ message: "" });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  componentWillUnmount() {
    this.setState({
      messages: [],
      conversation_id: 0,
      user: null,
      partner: null,
      message: "",
    });
  }

  render() {
    const { messages, message, conversation_id } = this.state;
    const { user } = this.context;
    const { convoPartner } = this.props.match.params;

    console.log(messages, message, conversation_id);
    return (
      <section className="conversationContainer">
        <h2>messages</h2>
        <ul className="messagesContainer">
          {messages.length > 0 &&
            messages.map((message) => (
              <Messages
                id={message.id}
                key={message.id}
                message={message.message}
                user={user.id}
                partner={convoPartner}
                sender_id={message.sender_id}
              />
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