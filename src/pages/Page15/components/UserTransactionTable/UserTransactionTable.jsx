import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  userTransactionData: {
    url: 'http://localhost:8080/userTransPerPage',
    method: 'get',
    params: {
      userId: 2,
      page: 0,
      size: 10
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
      page: (currentPage - 1),
    });
  };

  render() {
    const userTransactionData = this.props.bindingData.userTransactionData;

    return (
      <div className="simple-table">
        <IceContainer title="用户交易">
          <Table
            dataSource={userTransactionData.list}
            isLoading={userTransactionData.__loading} // eslint-disable-line
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
              current={userTransactionData.page + 1}
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
