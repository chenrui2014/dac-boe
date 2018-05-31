import React, { Component } from 'react';
import RightContentDisplay from './components/RightContentDisplay';

export default class Page16 extends Component {
  static displayName = 'Page16';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page16-page">
        <RightContentDisplay />
      </div>
    );
  }
}
