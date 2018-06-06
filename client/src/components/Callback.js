import React, { Component } from 'react';

class Callback extends Component {
  componentDidMount = () => {
    this.props.processAuth();
  }
  
  render() {
    return(
      <div className="callback column y-center x-center">
        <i className="fa fa-spinner fa-spin"></i>
        <p>Loading</p>
      </div>
    );
  }
}

export default Callback;