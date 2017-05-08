import React, { Component } from 'react';
import logo from '../../theme/assets/logo.svg';
import './App.css';
import { getDefaultData } from '../actions';
import MetricList from './MetricList';

class App extends Component {

    componentWillMount () {
        console.log('componentWillMount',getDefaultData());

    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <h2>The Daily X</h2>
            </div>
            <MetricList/>
          </div>
        );
    }
}

export default App;
