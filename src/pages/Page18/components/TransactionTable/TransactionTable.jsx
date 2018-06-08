import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { ApiHost } from '../../../../daeConfig';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  transactionData: {
    url: `${ApiHost}/transPerPage`,
    method: 'get',
    params: {
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

export default class TransactionTable extends Component {
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
        <IceContainer title="链上交易">
          <Table
            dataSource={transactionData.list}
            isLoading={transactionData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="交易哈希" dataIndex="tranHash" width={300} />
            <Table.Column title="交易发起方" dataIndex="initiatorUserName" width={85} />
            <Table.Column title="交易接收方" dataIndex="receiverUserName" width={85} />
            <Table.Column title="所属区块" dataIndex="regBlock" width={150} />
            <Table.Column title="交易标的" dataIndex="paintingName" width={150} />
            <Table.Column title="交易价格" dataIndex="tranAmount" width={150} />
            <Table.Column title="生成时间" dataIndex="genTime" width={150} />
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
