import React, { Component } from 'react';

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

    return(
      <section className="dashboard" >
        <div className="tabs row">
          <span className={`${!this.props.show_favorites ? 'active' : ''}`} onClick={() => this.props.switchTab(false)}>Results</span>
          <span className={`${this.props.show_favorites ? 'active' : ''}`} onClick={() => this.props.switchTab(true)}>Favorites</span>
        </div>

        {!this.props.results.length && !this.props.show_favorites ? <h3>Type a search phrase into the input above.</h3> : ''}

        {this.props.results.length ? <p className="query">Results for "{this.props.search}"</p> : ''}

        {this.props.show_favorites && !listing.length ? <h3>You haven't added any favorites yet.</h3> : ''}

        <div className="listing">
          {listing.map((gif, index) => (
            
            <div
              key={gif.id ? gif.id : gif.gif_id}
              className="giphy column bottom"
              style={{ backgroundImage: `url(${gif.url})` }}>
              <div className="giphy-controls row split">
                {this.props.show_favorites ? 
                  <button onClick={(e) => this.props.setFavorite(gif, index, true)}>Delete Favorite</button>
                  : <i
                      className={`${gif.favorite ? 'fa' : 'far'} fa-heart ${gif.favorite ? 'added' : ''}`}
                      onClick={(e) => this.props.setFavorite(gif, index)}></i>}

                <button onClick={() => this.copyLink(gif.url)}>Copy Link</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default Dashboard;