import React, { Component } from 'react';
import logo from '../../theme/assets/logo.svg';
import './App.css';
import { getDefaultData } from '../actions';


class App extends Component {

    componentWillMount () {
        console.log('componentWillMount',getDefaultData());

    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        );
    }
}

export default App;
