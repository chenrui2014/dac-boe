import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  userPaintData: {
    url: 'http://localhost:8080/userPaintingsPerPage',
    method: 'get',
    params: {
      userId: 1,
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

export default class UserPaintTable extends Component {
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
    this.props.updateBindingData('userPaintData', {
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
    const userPaintData = this.props.bindingData.userPaintData;

    return (
      <div className="simple-table">
        <IceContainer title="用户作品">
          <Table
            dataSource={userPaintData.list}
            isLoading={userPaintData.__loading} // eslint-disable-line
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column title="画作名称" dataIndex="paintName" width={200} />
            <Table.Column title="画作作者" dataIndex="author" width={85} />
            <Table.Column title="画作所有者" dataIndex="userName" width={100} />
            <Table.Column title="交易号" dataIndex="transactionId" width={150} />
            <Table.Column title="作品类型" dataIndex="type" width={100} />
            <Table.Column title="作品定价" dataIndex="paintingPrice" width={100} />
            <Table.Column title="版权证书" dataIndex="depCerticateId" width={150} />
            <Table.Column title="生成时间" dataIndex="regTime" width={150} />
          </Table>
          <div style={styles.paginationWrapper}>
            <Pagination
              current={userPaintData.page + 1}
              pageSize={userPaintData.size}
              total={userPaintData.total}
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
