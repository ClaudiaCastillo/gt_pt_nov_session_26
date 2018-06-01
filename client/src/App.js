import React, { Component } from 'react';

import axios from 'axios';
import { withRouter, Route, Redirect } from 'react-router-dom';

import Auth from './Auth';

import Header from './components/Header';
import Callback from './components/Callback';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      query: '',
      results: []
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getSearchResults = (e) => {
    let key = e.keyCode || e.which;
    let api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';

    if ( e.target.tagName === 'I' || key === 13 ) {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.search}`)
        .then(res => {
          let results = [];

          res.data.data.forEach(gif => {
            // console.log(gif);
            let image = new Image();
            let src = gif.images.downsized.url;

            image.src = src;
            image.onload = () => {
              results.push({id: gif.id, src});
              this.setState({results: [...results]});

              image.remove();
            }
          });

          this.setState({
            query: this.state.search,
            search: ''
          });
        });
    }
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
          logout={auth.logout}
          search={this.state.search}
          getSearchResults={this.getSearchResults}
          handleChange={this.handleChange} />

        <Route path="/callback" render={() => (
          <Callback processAuth={auth.processAuthentication} />
        )} />

        <Route path="/dashboard" render={() => (
          isAuth ?
            <Dashboard 
              results={this.state.results}
              query={this.state.query} />
          : <Redirect to="/" />
        )} />
      </main>
    );
  }
}

export default withRouter(App);
