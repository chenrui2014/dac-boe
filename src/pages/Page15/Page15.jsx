import React, { Component } from 'react';
import PieDoughnutChart from './components/PieDoughnutChart';
import RealTimeStatistics from './components/RealTimeStatistics';
import UserInfoCard from './components/UserInfoCard/UserInfoCard';
import UserPaintTable from './components/UserPaintTable/UserPaintTable';
import UserTransactionTable from './components/UserTransactionTable/UserTransactionTable';

export default class Page15 extends Component {
  static displayName = 'Page15';

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="page15-page">
        <RealTimeStatistics />
        <PieDoughnutChart />
        <UserPaintTable />
        <UserTransactionTable />
      </div>
    );
  }
}
