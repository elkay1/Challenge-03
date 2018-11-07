import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import Chat from "./components/Chat";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
