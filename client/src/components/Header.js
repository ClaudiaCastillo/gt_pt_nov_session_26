import React from 'react';
import { connect } from 'react-redux';
import { updateSearch } from '../actions/actions';
import { getSearchResults } from '../actions/dispatches';

const Header = props => (
  <header className="row split y-center">
    <div className="row y-center">
      <h4><i className="fa fa-folder-open"></i>GiphyBook</h4>
      {props.isAuth ? (
        <div className="input-wrap">
          <input type="text" 
            name="search" 
            className="search" 
            placeholder="Search"
            onKeyUp={props.getSearchResults}
            onChange={props.updateSearch}
            value={props.search} />
          <i className="fa fa-search" onClick={props.getSearchResults}></i>
        </div>
      ) : ''}
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

const mapActionsToProps = {
  updateSearch,
  getSearchResults
}


const mapStateToProps = state => {
  return {
    search: state.search
  }
}


export default connect(mapStateToProps, mapActionsToProps)(Header);