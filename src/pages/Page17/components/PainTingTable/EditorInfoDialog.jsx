/* eslint no-unused-expressions: 0 */
import React, { Component } from 'react';
import { Dialog, Input, Select, Grid } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import DialogDecorator from './DialogDecorator';

const { Col, Row } = Grid;

class FormDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      value: props.value,
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  onOkHandler = () => {
    this.props.onOk && this.props.onOk(this.state.value);
  };

  render() {
    return (
      <Dialog
        title="画作详情"
        onClose={this.props.onClose}
        onCancel={this.props.onCancel}
        onOk={this.onOkHandler}
        visible={this.state.visible}
        style={{ width: 400 }}
      >
        <IceFormBinderWrapper
          value={this.state.value}
          onChange={this.onFormChange}
        >
          <div>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作名称</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="paintName" disabled />
                </IceFormBinder>
                <IceFormError name="paintName" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作作者</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="author" disabled />
                </IceFormBinder>
                <IceFormError name="author" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作所有者</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="userId" disabled />
                </IceFormBinder>
                <IceFormError name="userId" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作哈希</span>
              </Col>
              <Col span={18}>
                <IceFormBinder >
                  <Input style={styles.formField} name="paintHash" disabled />
                </IceFormBinder>
                <IceFormError name="paintHash" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作类型</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="type" disabled />
                </IceFormBinder>
                <IceFormError name="type" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>画作存证</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="depCerticateId" disabled />
                </IceFormBinder>
                <IceFormError name="depCerticateId" />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <span style={styles.label}>生成时间</span>
              </Col>
              <Col span={18}>
                <IceFormBinder>
                  <Input style={styles.formField} name="regTime" disabled />
                </IceFormBinder>
                <IceFormError name="regTime" />
              </Col>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </Dialog>
    );
  }
}

const styles = {
  row: {
    marginTop: '10px',
  },
  label: {
    lineHeight: '30px',
  },
  formField: {
    width: '100%',
  },
};

export default DialogDecorator(FormDialog);
