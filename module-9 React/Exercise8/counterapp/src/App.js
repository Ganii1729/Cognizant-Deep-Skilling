import React, { Component } from 'react';
import CountPeople from './components/CountPeople';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CountPeople />
      </div>
    );
  }
}

export default App;
