/* eslint no-restricted-globals:0 */
import auth0 from 'auth0-js';

export default class Auth {
  constructor(history) {
    this.auth = new auth0.WebAuth({
      domain: 'jdtadlock.auth0.com',
      clientID: 'rFeXlFxvDp80HnA5eslnNRc3S0lgPBMU',
      redirectUri: 'http://localhost:3000/callback',
      audience: 'https://jdtadlock.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.history = history;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.processAuthentication = this.processAuthentication.bind(this);
  }

  login() {
    this.auth.authorize();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.history.push('/');
  }

  processAuthentication() {
    this.auth.parseHash((err, authResults) => {
      if (err) return this.history.push('/');

      if (authResults && authResults.accessToken && authResults.idToken) {
        console.log(authResults);
        let expires_at = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());

        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('user_email', authResults.idTokenPayload.email);
        
        this.history.push('/dashboard');
      }
    });
  }

  isAuthenticated() {
    let expires_at = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expires_at;
  }
}