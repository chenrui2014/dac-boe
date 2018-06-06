import React, { Component } from 'react';
import { Upload, Button, Select, Input, Grid, moment, Timeline } from '@icedesign/base';
import Img from '@icedesign/img';
import axios from 'axios';

const { Core } = Upload;
const { Row, Col } = Grid;
const { Item: TimelineItem } = Timeline;
const imageRootPath = 'http://localhost:8080/images/';

export default class UploadCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      postSuccess: false,
      responseData: [],
      uploadSatus: false,
      paintingSelectData: [],
      userId:2,
      paintName:'',
      paintDes:'',
      denPainting:null,
      type:null,
      paintUrl:'',
      author:'',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDenPainting = this.handleDenPainting.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8080/paintings')
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
      url:'http://localhost:8080/addPainting',
      method: 'POST',
      data: {
        user:this.state.userId,
        paintName:this.state.paintName,
        paintDes:this.state.paintDes,
        denPainting:this.state.denPainting,
        type:this.state.type,
        paintUrl:this.state.paintUrl,
        author:this.state.author,
        regTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    }).then((response) => {
      $this.setState({
        postSuccess: true,
        responseData:response.data
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
      uploadSatus:true,
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

  render() {
    const { uploadSatus, postSuccess } = this.state;
    return (
      postSuccess ?
        <div>
          <Timeline>
            <TimelineItem />
          </Timeline>
        </div> :
        <div>
          <Row justify="center">
            <Col span="6" offset="3">
              <Core
                style={{
                  display: 'block',
                  textAlign: 'center',
                  width: 300,
                  height: 250,
                  lineHeight:'200px',
                  border: '1px dashed #aaa',
                  borderRadius: '5px',
                  fontSize: '12px',
                }}
                action="http://localhost:8080/api/single/upload"
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
                {uploadSatus ? <Img width={300} height={250} type="contain" src={this.state.paintUrl} /> : '支持点击或者拖拽上传'}
              </Core>
            </Col>
            <Col>
              <Row>
                <Col className={styles.colStyle}>
                  <Input
                    name="paintName"
                    placeholder="请输入作品名称"
                    style={{ width: 200, marginBottom:5 }}
                    value={this.state.paintName}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.colStyle}>
                  <Input
                    name="author"
                    placeholder="请输入作品作者"
                    style={{ width: 200, marginBottom:5 }}
                    value={this.state.author}
                    onChange={this.handleInputChange}
                  />
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
                    style={{ width: 200, marginBottom:5 }}
                    value={this.state.paintDes}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.colStyle}>
                  <Select
                    name="denPainting"
                    placeholder="请选择依赖的作品"
                    style={{ width: 200, marginBottom:5 }}
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
                    style={{ width: 200, marginBottom:5 }}
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
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: 16 }}>
            <Col offset="7">
              <Button type="primary" onClick={this.handleClick}>
              上传作品
              </Button>
            </Col>
          </Row>
        </div>
    );
  }
}

const styles = {
  colStyle: {
    paddingTop: 10
  },
};
