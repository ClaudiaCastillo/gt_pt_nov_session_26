import React from 'react';

const Dashboard = props => (
  <section className="dashboard">
    <div className="tabs row">
      <span className="active">Favorites</span>
      <span>Results</span>
    </div>

    <div className="listing">
      <div className="giphy column bottom" style={{ backgroundImage: 'url(https://media2.giphy.com/media/3ohs4zGDw3w3Goq2QM/giphy.gif)' }}>
        <div className="giphy-controls row split">
          <i className="fa fa-heart"></i>
          <button>Copy Link</button>
        </div>
      </div>

      <div className="giphy column bottom" style={{ backgroundImage: 'url(https://media2.giphy.com/media/3ohs4zGDw3w3Goq2QM/giphy.gif)' }}>
        <div className="giphy-controls row split">
          <i className="fa fa-heart"></i>
          <button>Copy Link</button>
        </div>
      </div>

      <div className="giphy column bottom" style={{ backgroundImage: 'url(https://media2.giphy.com/media/3ohs4zGDw3w3Goq2QM/giphy.gif)' }}>
        <div className="giphy-controls row split">
          <i className="fa fa-heart"></i>
          <button>Copy Link</button>
        </div>
      </div>

      <div className="giphy column bottom" style={{ backgroundImage: 'url(https://media2.giphy.com/media/3ohs4zGDw3w3Goq2QM/giphy.gif)' }}>
        <div className="giphy-controls row split">
          <i className="fa fa-heart"></i>
          <button>Copy Link</button>
        </div>
      </div>

      <div className="giphy column bottom" style={{ backgroundImage: 'url(https://media2.giphy.com/media/3ohs4zGDw3w3Goq2QM/giphy.gif)' }}>
        <div className="giphy-controls row split">
          <i className="fa fa-heart"></i>
          <button>Copy Link</button>
        </div>
      </div>
    </div>
  </section>
);

export default Dashboard;