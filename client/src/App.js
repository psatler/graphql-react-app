import React, { Component } from "react";
// import logo from './logo.svg';
// import './App.css';

//components
import BookList from "./components/BookList";

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>The Graphql's Library</h1>
        <BookList />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
