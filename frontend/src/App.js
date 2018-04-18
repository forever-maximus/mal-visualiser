import React, { Component } from 'react';
import MainInterface from './components/MainInterface';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MAL Ratings Visualiser</h1>
        </header>
        <p className="App-intro">
          Enter usernames from My Anime List to see a visualisation of user ratings. Add multiple names
          to easily compare with friends.
        </p>
        <MainInterface />
      </div>
    );
  }
}

export default App;
