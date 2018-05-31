import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './Auth';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      name: '',
      email: '',
      showModal: false,
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

  favoriteGif = (gif_id, url) => {
    let email = localStorage.getItem('user_email');

    axios.post('/api/gif', {
      gif_id: gif_id,
      url: url,
      email: email
    }).then(res => {
      console.log(res.data)
    });
  }

  getSearchResults = (e) => {
    let key = e.keyCode || e.which;
    let api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';

    if ( e.target.tagName === 'I' || key === 13 ) {
      axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.search}`)
        .then(({data:gifs}) => {
          let results = [];
          
          gifs.data.forEach(gif => {
            let image = new Image();
            let src = gif.images.downsized.url;

            image.src = src;
            image.onload = () => {
              results.push({id: gif.id, src});
              this.setState({ results: [...results] });

              image.remove();
            }
          });

          this.setState({query: this.state.search, search: ''});
        });
    } 
  }

  render() {
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated();

    return (
      <main className="column">
        <Header 
          isAuth={isAuth} 
          login={auth.login} 
          logout={auth.logout}
          getSearchResults={this.getSearchResults}
          handleChange={this.handleChange}
          search={this.state.search} />
        
        <Route path="/dashboard" render={() => (
          isAuth ? 
            <Dashboard 
              results={this.state.results} 
              search={this.state.query}
              favoriteGif={this.favoriteGif} /> : <Redirect to="/" />
        )} />

        <Route path="/" exact render={() => {
          if ( !isAuth ) {
            return(
              <div className="landing column y-center">

                <h1>Start Storing Your Favorite Giphys Now!</h1>

                <p>Tired of searching for your favorite gifs? GiphyBook gives you quick access to all your favs!</p>

                <button className="dash-login" onClick={auth.login}>Click To Login</button>

              </div>
            )
          } else return <Redirect to="/dashboard" />
        }} />

        <Route path="/callback" render={() => (
          <Callback processAuth={auth.processAuthentication} />
        )} />
      </main>
    );
  }
}

export default withRouter(App);
