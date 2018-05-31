import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  userTransactionData: {
    url: 'http://localhost:8080/tran/search/findByInitiatorOrReceiverOrderByGenTimeDesc',
    method: 'get',
    params: {
      initiator: '124hwdwdwehjas12h12j2ass',
      receiver: '124hwdwdwehjas12h12j2ass',
      page: 0,
      size: 2
    },
    responseFormatter:(responseHandler, res, originResponse) => {
      const newRes = {
        status: 'SUCCESS',
        message:'SUCCESS',
        data:{
          list: res._embedded.transactions,
          total: res.page.totalElements,
          size: res.page.size,
          page: res.page.number,
          totalPage:res.page.totalPages
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

export default class UserTransactionTable extends Component {
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
    this.props.updateBindingData('userTransactionData', {
      params: {
        page,
      },
    });
  };

  changePage = (currentPage) => {
    this.fetchData({
      page: currentPage,
    });
  };

  render() {
    const userTransactionData = this.props.bindingData.userTransactionData;

    return (
      <div className="simple-table">
        <IceContainer>
          <Table
            dataSource={userTransactionData.list}
            isLoading={userTransactionData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="交易哈希" dataIndex="tranHash" width={300} />
            <Table.Column title="交易发起方" dataIndex="initiator" width={85} />
            <Table.Column title="交易接收方" dataIndex="receiver" width={85} />
            <Table.Column title="所属区块" dataIndex="regBlock" width={150} />
            <Table.Column title="交易标的" dataIndex="paintHash" width={150} />
            <Table.Column title="生成时间" dataIndex="genTime" width={150} />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={userTransactionData.page}
              pageSize={userTransactionData.size}
              total={userTransactionData.total}
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
