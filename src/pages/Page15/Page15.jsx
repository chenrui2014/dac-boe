import React, { Component } from 'react';
import PieDoughnutChart from './components/PieDoughnutChart';
import RealTimeStatistics from './components/RealTimeStatistics';
import BlockChainTable from './components/BlockChainTable';
import TransactionsTable from './components/TransactionsTable';
import UserInfoCard from "./components/UserInfoCard/UserInfoCard";

export default class Page15 extends Component {
  static displayName = 'Page15';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }
  render() {
    return (
      <div className="page15-page">
        <RealTimeStatistics />
        <PieDoughnutChart />
        <BlockChainTable />
        <TransactionsTable />
        <UserInfoCard/>
      </div>
    );
  }
}
