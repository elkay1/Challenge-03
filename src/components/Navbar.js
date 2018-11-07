import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            as={Link}
            name="home"
            to="/"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            name="users"
            to="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            name="chat"
            to="chat"
            active={activeItem === "chat"}
            onClick={this.handleItemClick}
          />
        </Menu>
      </div>
    );
  }
}

export default Navbar;
