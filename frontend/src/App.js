import React, { Component } from 'react';
import MainInterfaceContainer from './containers/MainInterfaceContainer';
import './App.css';

class App extends Component {
  getCurrentYear = () => {
    return new Date().getFullYear();
  }

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
        <MainInterfaceContainer />
        <footer className='App-footer'>
          <div>Max Brereton &nbsp;&middot;&nbsp; {this.getCurrentYear()}</div>
        </footer>
      </div>
    );
  }
}

export default App;
