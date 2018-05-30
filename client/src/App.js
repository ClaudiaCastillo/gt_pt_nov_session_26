import React, { Component } from 'react';

import axios from 'axios';
import { withRouter, Route } from 'react-router-dom';

import Auth from './Auth';

import Header from './components/Header';
import Callback from './components/Callback';

class App extends Component {
  constructor() {
    super();

    this.state = {
      url: ''
    }
  }

  // componentDidMount = () => {
  //   axios.get('/api/test')
  //     .then(res => console.log(res.data));
  // }
  
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
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated();

    return (
      <main>
        <Header 
          isAuth={isAuth}
          login={auth.login}
          logout={auth.logout} />

        <Route path="/callback" render={() => (
          <Callback processAuth={auth.processAuthentication} />
        )} />
      </main>
    );
  }
}

export default withRouter(App);
