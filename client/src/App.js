import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Auth from './Auth';

import Header from './components/Header';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      url: '',
      name: '',
      email: '',
      showModal: false,
      search: ''
    }
  }

  componentDidMount = () => {
    // if ( this.props.isAuthenticated() ) {
    //   this.setState({
    //     name: 
    //   })
    // }
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

  getSearchResults = (e) => {
    let key = e.keyCode || e.which;
    if ( key === 13 ) {
      console.log('yep');
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
          <div>
            {isAuth ? <Dashboard /> : <Redirect to="/" />}

            {this.state.showModal ? <Form url={this.state.url} change={this.handleChange} /> : ''}
          </div>
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
