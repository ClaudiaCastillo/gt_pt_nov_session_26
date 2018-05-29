import React from 'react';

const Header = props => (
  <header className="row split y-center">
    <div className="row y-center">
      <h4><i className="fa fa-folder-open"></i> GiphyBook</h4>
      <div className="input-wrap">
        <input type="text" 
          className="search" 
          placeholder="Search"
          name="search" 
          onKeyUp={props.getSearchResults}
          onChange={props.handleChange}
          value={props.search} />
        <i className="fa fa-search"></i>
      </div>
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