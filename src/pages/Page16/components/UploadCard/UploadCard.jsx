import React, { Component } from 'react';
import { Upload, Notice, Button, Select, Input, Form, Field, Grid } from '@icedesign/base';
import Img from '@icedesign/img';
import axios from 'axios';

const { Core } = Upload;
const { Row, Col } = Grid;
const FormItem = Form.Item;
const imageRootPath = 'http://localhost:8080/images/';

export default class UploadCard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uploadSatus:false,
      imgUrl:''
    };
  }
  field = new Field(this);
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.field.getValues());
    this.field.validate();
    axios.post({
      url:'http://localhost:8080/api/upload',
      data:{
        paintingName:this.field.paintingName,
        paintingDes:this.field.paintingDes,
        paintingHash:this.field.paintingHash,
        paintingType:this.field.paintingType,
        author:this.field.author
      }
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
      imgUrl: imageRootPath + res
    });
    console.log('onSuccess callback : ', res, file);
  }

  onError(err, res, file) {
    console.log('onError callback : ', err, res, file);
  }

  onAbort(e, file) {
    console.log('onAbort callback : ', e, file);
  }

  getValueFromFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const init = this.field.init;
    const { uploadSatus } = this.state;
    const formItemLayout = {
      labelCol: { fixedSpan: 0 },
      wrapperCol: { span: 20 }
    };

    const insetLayout = {
      labelCol: { fixedSpan: 0 },
      wrapperCol:{ span:20 }
    };

    return (
      <Form style={{ width:'600px', marginLeft:'auto', marginRight:'auto' }} direction="hoz" field={this.field}>
        <FormItem>
          <Core
            style={{
              display: 'block',
              textAlign: 'center',
              width: 230,
              height: 200,
              lineHeight: '150px',
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
            {...init('paintingHash', {
              valueName: 'fileList',
              getValueFromEvent: this.getValueFromFile
            })}
          >
            {uploadSatus ? <Img width={230} height={200} type="cover" src={this.state.imgUrl} /> : '支持点击或者拖拽上传'}
          </Core>
        </FormItem>
        <FormItem {...formItemLayout} >
          <Row>
            <Col>
              <FormItem labelAlign="inset" {...insetLayout} >
                <Input
                  placeholder="请输入作品名称"
                  style={{ width: 200 }}
                  {...init('paintingName', {
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
                  placeholder="请输入作品作者"
                  style={{ width: 200 }}
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
                  multiple
                  maxLength={100}
                  hasLimitHint
                  placeholder="请输入作品描述"
                  style={{ width: 200 }}
                  {...init('paintingDes')}
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem labelAlign="inset" {...insetLayout} >
                <Select
                  defaultValue="1"
                  placeholder="请选择作品类型"
                  style={{ width: 200 }}
                  {...init('paintingType')}
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

        <Row style={{ marginTop: 16 }}>
          <Col offset="6">
            <Button type="primary" onClick={this.handleSubmit.bind(this)}>
              上传作品
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
