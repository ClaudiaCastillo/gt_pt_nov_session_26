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
    return(
      <section className="dashboard">
        
        <div className="tabs row">
          <span className="active">Results</span>
          <span>Favorites</span>
        </div>

        {!this.props.results.length ? <h3>Type a search phrase into the input above.</h3> : ''}

        {this.props.results.length ? <p className="query">Results for "{this.props.query}"</p> : ''}

        <div className="listing">

          {this.props.results.map(gif => (
            <div 
              className="giphy column bottom"
              key={gif.id}
              style={{backgroundImage: `url(${gif.src})`}}>
              <div className="giphy-controls row split">
                <i className="fa fa-heart"></i>
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