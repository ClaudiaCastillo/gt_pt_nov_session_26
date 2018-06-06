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

    console.log(listing);

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

      </section>
    );
  }
}

export default Dashboard;