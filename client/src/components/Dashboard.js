import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchTab, setFavorite, changePage } from '../actions/dispatches';

class Dashboard extends Component {
  copyLink = link => {
    let input = document.createElement('input');

    input.value = link;
    input.style.position = 'absolute';
    input.style.left = '-9999px';

    document.body.appendChild(input);
    input.select();

    document.execCommand('copy');
    input.remove();
  }

  render() {
    let listing = this.props.show_favorites ? this.props.favorites : this.props.results;

    // console.log(listing);

    return(
      <section className="dashboard">
        
        <div className="tabs row">
          <span 
            className={`${!this.props.show_favorites ? 'active' : ''}`}
            onClick={() => this.props.switchTab(false)}>Results</span>
          <span 
            className={`${this.props.show_favorites ? 'active' : ''}`}
            onClick={() => this.props.switchTab(true)}>Favorites</span>
        </div>

        {!this.props.results.length ? <h3>Type a search phrase into the input above.</h3> : ''}

        {this.props.results.length ? <p className="query">Results for "{this.props.query}"</p> : ''}

        <div className="listing">

          {listing.map((gif, index) => (
            <div 
              className="giphy column bottom"
              key={gif.id ? gif.id : gif.gif_id}
              style={{backgroundImage: `url(${gif.url})`}}>
              
              <div className="giphy-controls row split">
                {!this.props.show_favorites ? 
                  <i className={`${gif.favorite ? 'fa' : 'far'} fa-heart ${gif.favorite ? 'added' : ''}`} onClick={() => this.props.setFavorite(gif, index)}></i> : 

                  <button onClick={() => this.props.setFavorite(gif, index, true)}>Delete Favorite</button>
                }
                
                <button onClick={() => this.copyLink(gif.src)}>Copy Link</button>
              </div>             
            </div>
          ))}

        </div>

        {this.props.results.length && !this.props.show_favorites ? (
          <div className="pagination row x-center y-center">
            <span onClick={() => this.props.changePage(false)}>Prev</span>
            <span className="page">{this.props.current_page}</span>
            <span onClick={() => this.props.changePage(true)}>Next</span>
          </div>
        ) : ''}

      </section>
    );
  }
}

const mapActionsToProps = {
  switchTab,
  setFavorite,
  changePage
}

const mapStateToProps = state => {
  return {
    results: state.results,
    favorites: state.favorites,
    query: state.query,
    show_favorites: state.show_favorites,
    current_page: state.current_page,
    offset: state.offset
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);



















