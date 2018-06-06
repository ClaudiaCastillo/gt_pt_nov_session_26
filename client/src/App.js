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
      show_favorites: false,
      results: [],
      favorites: []
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
      this.getUserFavorites()
        .then(() => {
          axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.search}`)
            .then(res => {
              let results = [];

              res.data.data.forEach(gif => {
                // console.log(gif);
                let image = new Image();
                let src = gif.images.downsized.url;

                image.src = src;
                image.onload = () => {
                  results.push({ id: gif.id, url: src, favorite: this.state.favorites.find(fav => fav.gif_id === gif.id) ? true : false});
                  this.setState({ results: [...results] });

                  image.remove();
                }
              });

              this.setState({
                query: this.state.search,
                search: ''
              });
            });
        })
    }
  }

  getUserFavorites = () => {
    return axios.get(`/api/favorites?email=${localStorage.getItem('user_email')}`)
      .then(res => {
        console.log('res', res.data);
        this.setState({favorites: res.data ? [...res.data] : []});

        return true;
      })
  }

  switchTab = show_favorites => {
    if ( show_favorites ) {
      this.getUserFavorites()
        .then(() => {
          this.setState({show_favorites: true});
        });
    } else this.setState({show_favorites: false});
  }

  deleteFavorite = gif_id => {
    console.log(gif_id);
    return axios.delete(`/api/gif?gif_id=${gif_id}&email=${localStorage.getItem('user_email')}`);
  }

  setFavorite = (gif, index, favorite_listing) => {
    let email = localStorage.getItem('user_email');
    let results = [...this.state.results];
    
    if ( !gif.favorite && !favorite_listing ) {
      axios.post('/api/giphy', {
        gif_id: gif.id,
        url: gif.url,
        email: email
      }).then(res => {
        results[index].favorite = true;
        this.setState({results: results});
      });
    } else {
      this.deleteFavorite(favorite_listing ? gif.gif_id : gif.id)
        .then(() => {
          if ( favorite_listing ) {
            let favorites = [...this.state.favorites];

            favorites.splice(index, 1);
            this.setState({favorites: favorites});
          } else {
            results[index].favorite = false;
            this.setState({ results: results });
          }
        });
    }

    
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
              favorites={this.state.favorites}
              query={this.state.query}
              setFavorite={this.setFavorite}
              switchTab={this.switchTab}
              show_favorites={this.state.show_favorites} />
          : <Redirect to="/" />
        )} />
      </main>
    );
  }
}

export default withRouter(App);
