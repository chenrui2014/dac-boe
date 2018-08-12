import React, { Component } from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';

export default class Page18 extends Component {
  static displayName = 'Page18';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page18-page">
        <TransactionTable />
      </div>
    );
  }
}
