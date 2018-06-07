import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateSearch } from '../actions/main_actions';
import { getSearchResults } from '../actions/main_dispatches';

const Header = props => (
  <header className="row split y-center">
    <div className="row y-center">
      <Link to="/dashboard">
        <h4><i className="fa fa-folder-open"></i> GiphyBook</h4>
      </Link>

      {props.isAuth ? (
        <div className="input-wrap">
          <input type="text"
            className="search"
            placeholder="Search"
            onKeyUp={(e) => props.getSearchResults(e, props.history)}
            onChange={props.updateSearch}
            value={props.search} />
          <i className="fa fa-search" onClick={(e) => props.getSearchResults(e, props.history)}></i>
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

const mapActionToProps = {
  updateSearch,
  getSearchResults
}

const mapStateToProps = (state, props) => ({
  search: state.search
});


export default withRouter(connect(mapStateToProps, mapActionToProps)(Header));