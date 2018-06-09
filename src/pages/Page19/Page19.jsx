import React, { Component } from 'react';
import IncomeTable from './components/IncomeTable/IncomeTable';

export default class Page19 extends Component {
  static displayName = 'Page19';
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page19-page">
        <IncomeTable />
      </div>
    );
  }
}
