import React from 'react';

const Header = props => (
  <header className="row split y-center">
    <div className="row y-center">
      <h4><i className="fa fa-folder-open"></i>GiphyBook</h4>
    </div>
    {props.isAuth ? (
      <div className="row">
        <p>{localStorage.getItem('user_email')}</p>
        <span>|</span>
        <span className="auth" onClick={props.logout}>Logout</span>
      </div>
    ) : <span className="auth" onClick={props.login}>Login</span>}
  </header>
);

export default Header;