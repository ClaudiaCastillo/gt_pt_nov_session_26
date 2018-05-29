import React from 'react';

const Form = props => (
  <form>
    <input type="text" name="url" value={props.url} onChange={props.handleChange} />
    <button onClick={props.createGiphy}>Add Giphy</button>
  </form>
);

export default Form;