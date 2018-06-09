import React, { Component } from 'react';
import { Table, Pagination, Button, moment, Feedback } from '@icedesign/base';
import { enquireScreen } from 'enquire-js';
import axios from 'axios/index';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import EditorInfoDialog from './EditorInfoDialog';

import { ApiHost } from '../../../../daeConfig';

@DataBinder({
  paintData: {
    url: `${ApiHost}/paintingsPerPage`,
    method: 'get',
    params: {
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
    },
    updateTableData:{
      url:`${ApiHost}/painting`,
      method:'put'
    }
  }
})

class PaintingsTable extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const userpaId = localStorage.getItem('user');
    this.state = {
      isMobile: false,
      userId:userpaId
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

  editItem = (record, e) => {
    e.preventDefault();
    EditorInfoDialog.show({
      value: record,
      onOk: (value) => {
        axios({
          url:`${ApiHost}/addTran`,
          method: 'POST',
          data: {
            initiatorUserId:this.state.userId,
            receiverUserId:record.userId,
            paintingId:record.id,
            tranAmount:record.paintingPrice,
            genTime: moment().format('YYYY-MM-DD HH:mm:ss')
          }
        }).then((response) => {
          const body = response.data;
          const bodyData = qs.parse(body);
          if (bodyData.data != null && bodyData.data.length > 0) {
            this.props.history.push('/page18');
            Feedback.toast.success('购买成功！');
          }
          EditorInfoDialog.hide();
        }).catch((error) => {
          Feedback.toast.success('购买失败！' + error.message);
          EditorInfoDialog.hide();
        });
      },
      onClose: () => {
        EditorInfoDialog.hide();
      },
      onCancel: () => {
        EditorInfoDialog.hide();
      },
    });
  };

  renderOperations = (value, index, record) => {
    return (
      <div className="operation-table-operation">
        <Button
          type="primary"
          onClick={this.editItem.bind(this, record)}
        >
          购买
        </Button >
      </div>
    );
  };

  paintImgRender = (value, index, record) => {
    return (
      <div style={styles.media}>
        {record.paintUrl ? <img alt="" src={record.paintUrl} style={styles.mediaSide} /> : null }
        <div style={styles.mediaContent}>{record.paintName}</div>
      </div>
    );
  }


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
            <Table.Column cell={this.paintImgRender} title="画作名称" dataIndex="paintName" width={200} />
            <Table.Column title="画作作者" dataIndex="author" width={85} />
            <Table.Column title="画作所有者" dataIndex="userName" width={100} />
            <Table.Column title="数字指纹" dataIndex="digFingerPrint" width={100} />
            <Table.Column title="交易号" dataIndex="transactionId" width={100} />
            <Table.Column title="作品类型" dataIndex="type" width={100} />
            <Table.Column title="作品定价" dataIndex="paintingPrice" width={100} />
            <Table.Column title="版权证书" dataIndex="depCerticateId" width={150} />
            <Table.Column title="生成时间" dataIndex="regTime" width={150} />
            <Table.Column
              title="操作"
              fixedHeader
              dataIndex="operation"
              width={100}
              cell={this.renderOperations}
            />
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
  cardContainer: {
    padding: '10px 10px 20px 10px',
  },
  titleCol: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleText: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  operBtn: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    color: '#929292',
    background: '#f2f2f2',
    textAlign: 'center',
    cursor: 'pointer',
    lineHeight: '24px',
    marginRight: '6px',
  },
  media: {
    overflow: 'hidden'
  },
  mediaSide: {
    width:'48px',
    height:'48px',
    float: 'left',
    marginRight: '10px'
  },
  mediaContent: {
    overflow:'hidden',
    verticalAlign:'top'
  }
};
export default withRouter(PaintingsTable);
