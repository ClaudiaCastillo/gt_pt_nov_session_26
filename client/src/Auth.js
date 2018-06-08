import auth0 from 'auth0-js';


export default class Auth {
  constructor(history) {
    this.auth0 = new auth0.WebAuth({
      domain: 'jdtadlock.auth0.com',
      clientID: 'I2ULWQ0fuYCDcG6xs7QlsTRMfOtyiDW6',
      
      // redirectUri: 'https://murmuring-forest-60880.herokuapp.com/callback',
      redirectUri: 'http://localhost:5000/callback',
      audience: 'https://jdtadlock.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.history = history;

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.processAuthentication = this.processAuthentication.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');

    this.history.push('/');
  }

  processAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if ( err ) return this.history.push('/');

      if (authResult && authResult.accessToken && authResult.idToken) {
        let expires_at = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());

        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('user_email', authResult.idTokenPayload.email);

        this.history.push('/dashboard');
      } 
    });
  }

  isAuthenticated() {
    let expires_at = JSON.parse(localStorage.getItem('expires_at'));

    return new Date().getTime() < expires_at;
  }
}