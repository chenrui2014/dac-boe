import React, { Component } from 'react';
import { Upload, Button, Select, Input,Form, Field, Grid, moment } from '@icedesign/base';
import Img from '@icedesign/img';
import IceContainer from '@icedesign/container';
import axios from 'axios';
import qs from 'qs';

import PaintingChain from '../PaintingChain';

const { Core } = Upload;
const { Row, Col } = Grid;
const FormItem = Form.Item;
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
    this.handleBack = this.handleBack.bind(this);
  }

  field = new Field(this);

  componentDidMount() {
    axios.get('http://localhost:8080/userPaintingsNoPage?userId=2')
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

  handleClick = (e) => {
    const $this = this;
    e.preventDefault();
    console.log('收到表单值：', this.field.getValues());
    this.field.validate((errors,values) => {
      axios.post({
        url:'http://localhost:8080/api/upload',
        data:{
          userId:this.state.userId,
          paintName:this.field.paintName,
          paintDes:this.field.paintDes,
          denPaintId:this.field.denPainting,
          type:this.field.type,
          paintUrl:this.field.paintUrl,
          author:this.field.author,
          regTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
      });
    });
    axios({
      url:'http://localhost:8080/addPainting',
      method: 'POST',
      data: {
        userId:this.state.userId,
        paintName:this.state.paintName,
        paintDes:this.state.paintDes,
        denPaintId:this.state.denPainting,
        type:this.state.type,
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

  handleBack() {
    this.setState({
      postSuccess:false
    });
  }

  render() {
    const init = this.field.init;
    const { uploadSatus, postSuccess, responseData } = this.state;
    const formItemLayout = {
      labelCol: { fixedSpan: 0 },
      wrapperCol: { span: 20 }
    };

    const insetLayout = {
      labelCol: { fixedSpan: 0 },
      wrapperCol:{ span:20 }
    };
    return (
      postSuccess ?
        <PaintingChain dataSource={responseData} back={this.handleBack} /> :
        <div>
          <IceContainer title="上传画作">
            <Form style={{ width:'600px', marginLeft:'auto', marginRight:'auto' }} direction="hoz" field={this.field}>
              <FormItem>
                <Core
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    width: 300,
                    height: 250,
                    lineHeight: '200px',
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
                  {...init('paintUrl', {
                    valueName: 'fileList',
                    getValueFromEvent: this.getValueFromFile
                  })}
                >
                  {uploadSatus ?
                    <Img width={300} height={250} type="contain" src={this.state.paintUrl} /> : '支持点击或者拖拽上传'}
                </Core>
              </FormItem>
              <FormItem {...formItemLayout} >
                <Row>
                  <Col>
                    <FormItem labelAlign="inset" {...insetLayout} >
                    <Input
                      name="paintName"
                      placeholder="请输入作品名称"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.paintName}
                      onChange={this.handleInputChange}
                      {...init('paintName', {
                        rules: [{ required: true, trigger: 'onBlur' }]
                      })}
                    />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem labelAlign="inset" {...insetLayout} >
                    <Input
                      name="author"
                      placeholder="请输入作品作者"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.author}
                      onChange={this.handleInputChange}
                      {...init('author', {
                        rules: [{ required: true, trigger: 'onBlur' }]
                      })}
                    />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem labelAlign="inset" {...insetLayout} >
                    <Input
                      name="paintDes"
                      multiple
                      maxLength={100}
                      hasLimitHint
                      placeholder="请输入作品描述"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.paintDes}
                      onChange={this.handleInputChange}
                      {...init('paintDes')}
                    />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem labelAlign="inset" {...insetLayout} >
                    <Select
                      name="denPainting"
                      placeholder="请选择依赖的作品"
                      style={{ width: 200, marginBottom: 5 }}
                      dataSource={this.state.paintingSelectData}
                      value={this.state.denPainting}
                      onChange={this.handleDenPainting}
                      {...init('denPainting')}
                    />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormItem labelAlign="inset" {...insetLayout} >
                    <Select
                      name="type"
                      defaultValue="1"
                      placeholder="请选择作品类型"
                      style={{ width: 200, marginBottom: 5 }}
                      value={this.state.type}
                      onChange={this.handleType}
                      {...init('type')}
                    >
                      <li value="1">印象画</li>
                      <li value="2">山水画</li>
                      <li value="3">抽象画</li>
                      <li value="4">威尼斯画</li>
                      <li value="5">中国黄派画</li>
                    </Select>
                    </FormItem>
                  </Col>
                </Row>
              </FormItem>
            <Row justify="center" style={{ marginTop: 16 }}>
              <Col offset="7">
                <Button type="primary" onClick={this.handleClick}>
                  上传作品
                </Button>
              </Col>
            </Row>
            </Form>
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
