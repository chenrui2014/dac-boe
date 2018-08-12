import React, { Component } from 'react';
import PaintingsTable from './components/PainTingTable/PaintingsTable';

export default class Page17 extends Component {
  static displayName = 'Page17';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page17-page">
        <PaintingsTable />
      </div>
    );
  }
}
