import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      url: ''
    }
  }

  componentDidMount = () => {
    axios.get('/api/test')
      .then(res => console.log(res.data));
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  createGiphy = (e) => {
    e.preventDefault();

    axios.post('/api/giphy', {url: this.state.url})
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="App">
        <h1>Change</h1>
        
        <form>
          <input type="text" name="url" onChange={this.handleChange}/>
          <button onClick={this.createGiphy}>Add Giphy</button>
        </form>
      </div>
    );
  }
}

export default App;
