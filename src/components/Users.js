import React, { Component } from "react";
import firebase from "./firebase.js";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      phone: "",
      color: "",
      icon: "",
      friends: []
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
    const itemsRef = firebase.database().ref("friends");
    const friend = {
      name: this.state.name,
      phone: this.state.phone,
      color: this.state.color,
      icon: this.state.icon
    };
    itemsRef.push(friend);
    this.setState({
      name: "",
      phone: "",
      color: "",
      icon: ""
    });
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref("friends");
    itemsRef.on("value", snapshot => {
      let friends = snapshot.val();
      let newState = [];
      for (let friend in friends) {
        newState.push({
          id: friend,
          name: friends[friend].name,
          phone: friends[friend].phone,
          color: friends[friend].color,
          icon: friends[friend].icon
        });
      }
      this.setState({
        friends: newState
      });
    });
  }

  removeItem(friendId) {
    const itemRef = firebase.database().ref(`/friends/${friendId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div>
        <div className="title ui-header">
          <h1>Users</h1>
        </div>
        <div className="">
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input
                placeholder="Phone"
                name="phone"
                onChange={this.handleChange}
                value={this.state.phone}
              />
            </div>
            <div className="field">
              <label>Color</label>
              <input
                placeholder="Color"
                name="color"
                onChange={this.handleChange}
                value={this.state.color}
              />
            </div>
            <div className="field">
              <label>Icon</label>
              <input
                placeholder="Icon"
                name="icon"
                onChange={this.handleChange}
                value={this.state.icon}
              />
            </div>

            <button type="submit" className="ui button">
              Submit
            </button>
          </form>
        </div>
        <div className="cards">
          <section className="card">
            <div className="content">
              <table className="ui celled table">
                <thead>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Color</th>
                  <th>Icon</th>
                  <th>Remove</th>
                </thead>
                <tbody>
                  {this.state.friends.map(friend => {
                    return (
                      <tr key={friend.id}>
                        <td>{friend.name}</td>
                        <td>{friend.phone}</td>
                        <td>{friend.color}</td>
                        <td>{friend.icon}</td>
                        <td>
                          <button
                            className="ui button red"
                            onClick={() => this.removeItem(friend.id)}
                          >
                            Remove User
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Users;
