import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import IceImg from '@icedesign/img';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  userPaintData: {
    url: 'http://localhost:8080/painting/search/findByUserIdOrderByRegTimeDesc',
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
          list: res._embedded.painting,
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
            <Table.Column title="画作名称" dataIndex="paintName" width={300} />
            <Table.Column title="画作作者" dataIndex="author" width={85} />
            <Table.Column title="画作所有者" dataIndex="userId" width={85} />
            <Table.Column title="所属区块" dataIndex="paintHash" width={150} />
            <Table.Column title="作品类型" dataIndex="type" width={150} />
            <Table.Column title="存证" dataIndex="depCerticateId" width={150} />
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
