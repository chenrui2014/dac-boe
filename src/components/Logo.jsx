import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link to="/main" className="logo-text">
          博艺区块链
        </Link>
      </div>
    );
  }
}
