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
      results: [],
      favorites: [],
      show_favorites: false
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  switchTab = show_favorites => {
    if ( show_favorites ) {
      this.getUserFavorites()
        .then(() => {
          this.setState({show_favorites: true});
        });
    } else this.setState({ show_favorites: false });
  }

  deleteFavorite = gif_id => {
    return axios.delete(`/api/gif/?gif_id=${gif_id}&email=${localStorage.getItem('user_email')}`);
  }

  setFavorite = (gif, index, favorite_listing) => {
    let email = localStorage.getItem('user_email');
    let results = [...this.state.results];

    if ( !gif.favorite && !favorite_listing ) {
      axios.post('/api/gif', {
        gif_id: gif.id,
        url: gif.url,
        email: email
      }).then(res => {
        results[index].favorite = true;
        this.setState({ results });
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
            this.setState({ results });
          }
          
        });
    }
  }

  getUserFavorites = () => {
    return axios.get(`/api/favorites?email=${localStorage.getItem('user_email')}`)
      .then(res => {
        this.setState({favorites: res.data ? res.data : []});

        return true;
      });
  }

  getSearchResults = (e) => {
    let key = e.keyCode || e.which;
    let api_key = '3K2ZmyEMrXGGyR7EGBGnbti1HZNk2TZL';

    if ( e.target.tagName === 'I' || key === 13 ) {
      this.getUserFavorites()
        .then(() => {
          axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${this.state.search}&offset=25`)
            .then(({ data: gifs }) => {
              let results = [];
              console.log(gifs);
              gifs.data.forEach(gif => {
                let image = new Image();
                let src = gif.images.downsized.url;

                image.src = src;
                image.onload = () => {
                  results.push({ 
                    id: gif.id, 
                    url: src, 
                    favorite: this.state.favorites.find(fav => fav.gif_id === gif.id) ? true : false 
                  });

                  this.setState({ results: [...results] });

                  image.remove();
                }
              });

              this.setState({ query: this.state.search, search: '', show_favorites: false });
            });
        })
      
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
              setFavorite={this.setFavorite}
              favorites={this.state.favorites}
              show_favorites={this.state.show_favorites}
              switchTab={this.switchTab} /> : <Redirect to="/" />
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
