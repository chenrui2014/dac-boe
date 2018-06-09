import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { ApiHost } from '../../../../daeConfig';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  transactionData: {
    url: `${ApiHost}/userIncomesPerPage`,
    method: 'get',
    params: {
      userId:localStorage.getItem('user'),
      page: 0,
      size: 2
    },
    responseFormatter:(responseHandler, res, originResponse) => {
      const newRes = {
        status: 'SUCCESS',
        message:'SUCCESS',
        data:{
          list: res.data,
          total: res.totalElements,
          size: res.size,
          page: res.number,
          totalPage:res.totalPages
        },
      };
      responseHandler(newRes, originResponse);
    },
    defaultBindingData: {
      list:[],
      total: 100,
      totalPage:10,
      size: 10,
      page: 0,
    }
  },
})

export default class IncomeTable extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }

  componentDidMount() {
    this.enquireScreenRegister();
    this.fetchData({
      page: 0,
    });
  }

  enquireScreenRegister = () => {
    const mediaCondition = 'only screen and (max-width: 720px)';

    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    }, mediaCondition);
  };

  fetchData = ({ page }) => {
    this.props.updateBindingData('transactionData', {
      params: {
        page,
      },
    });
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: (currentPage - 1),
    });
  };

  render() {
    const transactionData = this.props.bindingData.transactionData;

    return (
      <div className="simple-table">
        <IceContainer title="收益明细">
          <Table
            dataSource={transactionData.list}
            isLoading={transactionData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="用户名" dataIndex="userName" width={300} />
            <Table.Column title="交易画作" dataIndex="paintingName" width={85} />
            <Table.Column title="交易ID" dataIndex="transactionHash" width={85} />
            <Table.Column title="交易金额" dataIndex="tranAmount" width={150} />
            <Table.Column title="分成比例" dataIndex="rate" width={150} />
            <Table.Column title="分成金额" dataIndex="income" width={150} />
            <Table.Column title="交易时间" dataIndex="tranTime" width={150} />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={transactionData.page + 1}
              pageSize={transactionData.size}
              total={transactionData.total}
              onChange={this.changePage}
              type={this.state.isMobile ? 'simple' : 'normal'}
            />
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  operation: {
    marginRight: '12px',
    textDecoration: 'none',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
