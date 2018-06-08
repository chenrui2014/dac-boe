import React, { Component } from 'react';
import { Upload, Button, Select, Input, Grid, moment } from '@icedesign/base';
import Img from '@icedesign/img';
import IceContainer from '@icedesign/container';
import IceLabel from '@icedesign/label';
import axios from 'axios';
import qs from 'qs';

import { ApiHost } from '../../../../daeConfig';
import PaintingChain from '../PaintingChain';

const { Core } = Upload;
const { Row, Col } = Grid;
const imageRootPath = `${ApiHost}/images/`;
const userPaintingUrl = `${ApiHost}/userPaintingsNoPage?userId=`;

export default class UploadCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      postSuccess: false,
      responseData: [],
      uploadStatus: false,
      paintingSelectData: [],
      userId:2,
      paintName:'',
      paintDes:'',
      paintingPrice:'',
      denPainting:null,
      type:null,
      paintUrl:'',
      author:'',
      nameValiFlag:false,
      authorValiFlag:false,
      priceValiFlag:false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDenPainting = this.handleDenPainting.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    axios.get(userPaintingUrl + this.state.userId)
      .then((response) => {
        const data = response.data.map((item) => {
          return { label:item.paintName, value:item.id };
        });
        this.setState({ paintingSelectData:data });
      });
  }

  handleInputChange(key, event) {
    const target = event.target;

    if (target) {
      const value = target.value;
      const name = target.name;

      if (name === 'paintName') {
        if (value === null || value.length === 0) {
          this.setState({
            nameValiFlag:true
          });
        } else {
          this.setState({
            nameValiFlag:false
          });
        }
      }
      if (name === 'author') {
        if (value === null || value.length === 0) {
          this.setState({
            authorValiFlag:true
          });
        } else {
          this.setState({
            authorValiFlag:false
          });
        }
      }
      if (name === 'paintingPrice') {
        if (/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
          this.setState({
            priceValiFlag:false
          });
        } else {
          this.setState({
            priceValiFlag:true
          });
        }
      }
      this.setState({
        [name]:value
      });
    }
  }

  handleDenPainting(key, event) {
    this.setState({ denPainting:event.value });
  }

  handleType(key, event) {
    this.setState({ type:event.value });
  }

  handleClick = () => {
    const $this = this;
    axios({
      url:`${ApiHost}/addPainting`,
      method: 'POST',
      data: {
        userId:this.state.userId,
        paintName:this.state.paintName,
        paintDes:this.state.paintDes,
        denPaintId:this.state.denPainting,
        type:this.state.type,
        paintingPrice:this.state.paintingPrice,
        paintUrl:this.state.paintUrl,
        author:this.state.author,
        regTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    }).then((response) => {
      const body = response.data;
      const paintings = qs.parse(body);
      $this.setState({
        postSuccess: true,
        responseData:paintings.data
      });
    }).catch((error) => {
      $this.setState({
        postSuccess: false
      });
      console.log(error);
    });
  }

  beforeUpload(file) {
    console.log('beforeUpload callback : ', file);
  }

  onStart(files) {
    console.log('onStart callback : ', files);
  }

  onProgress(e, file) {
    console.log('onProgress callback : ', e, file);
  }

  onSuccess = (res, file) => {
    this.setState({
      uploadStatus:true,
      paintUrl:imageRootPath + res
    });
    console.log('onSuccess callback : ', res, file);
  }

  onError(err, res, file) {
    console.log('onError callback : ', err, res, file);
  }

  onAbort(e, file) {
    console.log('onAbort callback : ', e, file);
  }

  handleBack() {
    this.setState({
      postSuccess:false,
      uploadStatus:false,
      nameValiFlag:false,
      authorValiFlag:false,
      priceValiFlag:false,
      paintName:'',
      paintDes:'',
      paintingPrice:'',
      denPainting:null,
      type:null,
      paintUrl:'',
      author:'',
    });
  }

  render() {
    const { uploadStatus, postSuccess, responseData } = this.state;
    return (
      postSuccess ?
        <PaintingChain dataSource={responseData} back={this.handleBack} /> :
        <div>
          <IceContainer title="上传画作">
            <Row justify="center">
              <Col span="6" offset="3">
                <Core
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    width: 300,
                    height: 285,
                    lineHeight: '200px',
                    border: '1px dashed #aaa',
                    borderRadius: '5px',
                    fontSize: '12px',
                  }}
                  action={`${ApiHost}/api/single/upload`}
                  accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                  multiple
                  dragable
                  multipart={{ _token: 'sdj23da' }}
                  headers={{ Authorization: 'user_1' }}
                  listType="text"
                  beforeUpload={this.beforeUpload}
                  onStart={this.onStart}
                  onProgress={this.onProgress}
                  onSuccess={this.onSuccess}
                  onError={this.onError}
                  onAbort={this.onAbort}
                >
                  {uploadStatus ?
                    <Img width={300} height={285} type="contain" src={this.state.paintUrl} /> : '支持点击或者拖拽上传'}
                </Core>
              </Col>
              <Col>
                <Row>
                  <Col className={styles.colStyle} span="7">
                    <Input
                      name="paintName"
                      placeholder="请输入作品名称"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.paintName}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  {
                    this.state.nameValiFlag ? <Col className={styles.colStyle}><IceLabel status="danger">作品名称不能为空</IceLabel></Col> : null
                  }
                </Row>
                <Row>
                  <Col className={styles.colStyle} span="7">
                    <Input
                      name="author"
                      placeholder="请输入作品作者"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.author}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  {
                    this.state.authorValiFlag ? <Col className={styles.colStyle}><IceLabel status="danger">作品作者不能为空</IceLabel></Col> : null
                  }
                </Row>
                <Row>
                  <Col className={styles.colStyle} span="7">
                    <Input
                      name="paintingPrice"
                      placeholder="请输入作品价格"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.paintingPrice}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  {
                    this.state.priceValiFlag ? <Col className={styles.colStyle}><IceLabel status="danger">请输入数字</IceLabel></Col> : null
                  }

                </Row>
                <Row>
                  <Col className={styles.colStyle}>
                    <Select
                      name="denPainting"
                      placeholder="请选择依赖的作品"
                      style={{ width: 200, marginBottom: 5 }}
                      dataSource={this.state.paintingSelectData}
                      value={this.state.denPainting}
                      onChange={this.handleDenPainting}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.colStyle}>
                    <Select
                      name="type"
                      defaultValue="1"
                      placeholder="请选择作品类型"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.type}
                      onChange={this.handleType}
                    >
                      <li value="1">印象画</li>
                      <li value="2">山水画</li>
                      <li value="3">抽象画</li>
                      <li value="4">威尼斯画</li>
                      <li value="5">中国黄派画</li>
                    </Select>
                  </Col>
                </Row>
                <Row>
                  <Col className={styles.colStyle}>
                    <Input
                      name="paintDes"
                      multiple
                      maxLength={100}
                      hasLimitHint
                      placeholder="请输入作品描述"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.paintDes}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 16 }}>
              <Col offset="7">
                <Button type="primary" onClick={this.handleClick}>
                  上传作品
                </Button>
              </Col>
            </Row>
          </IceContainer>
        </div>
    );
  }
}

const styles = {
  colStyle: {
    paddingTop: 10
  },
};
