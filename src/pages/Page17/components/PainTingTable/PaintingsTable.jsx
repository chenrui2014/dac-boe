import React, { Component } from 'react';
import { Table, Pagination, Button } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import { enquireScreen } from 'enquire-js';

@DataBinder({
  paintData: {
    url: 'http://localhost:8080/painting',
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

export default class PaintingsTable extends Component {
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
    this.props.updateBindingData('paintData', {
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
    const paintData = this.props.bindingData.paintData;

    return (
      <div className="simple-table">
        <IceContainer title="链上作品">
          <Table
            dataSource={paintData.list}
            isLoading={paintData.__loading} // eslint-disable-line
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
              current={paintData.page + 1}
              pageSize={paintData.size}
              total={paintData.total}
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
