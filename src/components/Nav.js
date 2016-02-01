import React from 'react';
import { Link } from 'react-router';

import '../styles/Nav.scss';

export default class Nav extends React.Component {
  render() {
    return (
      <div className="nav">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/create">Create</Link>
      </div>
    );
  }
};
