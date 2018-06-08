import React, { Component } from 'react';

import { withRouter, Route, Redirect, Switch } from 'react-router-dom';

import Auth from './Auth';

import Header from './components/Header';
import Callback from './components/Callback';
import Dashboard from './components/Dashboard';

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
            <Route path="/callback" render={() => (
              <Callback processAuth={auth.processAuthentication} />
            )} />

            <Route path="/dashboard" render={() => (
              isAuth ?
                <Dashboard />
                : <Redirect to="/" />
            )} />

            <Route>
              <div className="not-found">
                <h1>Oops, this page cannot be found.</h1>
              </div>
            </Route>
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
