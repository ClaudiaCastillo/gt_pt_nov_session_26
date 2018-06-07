import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Auth from './Auth';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Callback from './components/Callback';
import NotFound from './components/404';

class App extends Component {
  render() {
    const auth = new Auth(this.props.history);
    const isAuth = auth.isAuthenticated();

    return (
      <main className="column split">
        <div className="content">
          <Header
            isAuth={isAuth}
            login={auth.login}
            logout={auth.logout} />

          <Switch>
            <Route path="/dashboard" render={() => (
              isAuth ?
                <Dashboard /> : <Redirect to="/" />
            )} />

            <Route path="/" exact render={() => {
              if (!isAuth) {
                return (
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

            <Route component={NotFound} />
          </Switch>

        </div>

        <footer className="row split y-center">
          <p>&copy; {new Date().getFullYear()} GiphyBook</p>
          <p>Created By JD Tadlock | Central Support</p>
        </footer>
      </main>
    );
  }
}


export default withRouter(App);
