import React, { Component } from "react";
import firebase from "./firebase.js";
import moment from "moment";

class Chat extends Component {
  constructor() {
    super();

    let timestamp = moment().format("LLL");

    this.state = {
      from: "",
      message: "",
      sent: timestamp,
      chats: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("chats");
    const chat = {
      from: this.state.from,
      message: this.state.message,
      sent: this.state.sent
    };

    itemsRef.push(chat);
    this.setState({
      from: "",
      message: "",
      sent: ""
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref("chats");
    itemsRef.on("value", snapshot => {
      let chats = snapshot.val();
      let newState = [];
      for (let chat in chats) {
        newState.push({
          id: chat,
          from: chats[chat].from,
          message: chats[chat].message,
          sent: chats[chat].sent
        });
      }
      this.setState({
        chats: newState
      });
    });
  }

  removeItem(chatId) {
    const itemRef = firebase.database().ref(`/chats/${chatId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div>
        <div className="title ui-header">
          <h1>Chat</h1>
        </div>
        <form className="ui form" onSubmit={this.handleSubmit}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="from"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.from}
            />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea
              rows="2"
              name="message"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        <div className="content">
          <table className="ui celled sortable table">
            <thead>
              <th>Name</th>
              <th>Message</th>
              <th>Time Sent</th>
              <th>Remove</th>
            </thead>
            <tbody>
              {this.state.chats.map(chat => {
                return (
                  <tr key={chat.id}>
                    <td>{chat.from}</td>
                    <td>{chat.message}</td>
                    <td>{chat.sent}</td>
                    <td>
                      <button
                        className="ui button red"
                        onClick={() => this.removeItem(chat.id)}
                      >
                        Remove Chat
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <select>
            {this.state.chats.map(chat => {
              return (
                <option key={chat.id} value={chat.from}>
                  {chat.from}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Chat;
