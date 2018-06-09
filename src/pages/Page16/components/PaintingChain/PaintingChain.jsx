import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import {
  Grid,
  Step,
  Button
} from '@icedesign/base';

import Img from '@icedesign/img';

import cpImg from '../../../../../public/images/webwxgetmsgimg.jpg';

const { Row, Col } = Grid;

export default class PaintingChain extends Component {
  static displayName = 'StepForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };

    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    const { dataSource } = this.props;
    const canvas = this.refs.canvas;
    const cc = canvas.getContext('2d');

    const img = new Image();
    img.src = cpImg;
    img.onload = async function () {
      await cc.drawImage(img, 0, 0);
      cc.fillStyle = "black";
      cc.font = " 10px '微软雅黑'";
      cc.fillText(dataSource[0].depCerticateId, 238, 245);
      cc.fillStyle = "red";
      cc.fillText(dataSource[0].transactionId, 238, 290);
      cc.font = "bold 24px '宋体','微软雅黑'";
      cc.fillText(dataSource[0].paintName, 320, 338);
      cc.fillText(dataSource[0].author, 320, 383);
      cc.fillText(dataSource[0].regTime, 320, 427);
      cc.fillText("京东方博艺区块链网络", 320, 468);
    };
  }
  onClick(currentStep) {
    console.log(currentStep);
    const { dataSource } = this.props;
    const canvas = this.refs.canvas;
    const cc = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    cc.clearRect(0, 0, rect.width, rect.height);
    const img = new Image();
    img.src = cpImg;
    img.onload = async function () {
      await cc.drawImage(img, 0, 0);
      cc.fillStyle = "black";
      cc.font = " 10px '微软雅黑'";
      cc.fillText(dataSource[0].depCerticateId, 238, 245);
      cc.fillStyle = "red";
      cc.fillText(dataSource[0].transactionId, 238, 290);
      cc.fillText(dataSource[currentStep].paintName, 320, 338);
      cc.fillText(dataSource[currentStep].author, 320, 383);
      cc.fillText(dataSource[currentStep].regTime, 320, 427);
      cc.fillText("京东方博艺区块链网络", 320, 468);
    };
    this.setState({
      step: currentStep
    });
  }

  handleClick() {
    this.props.back();
  }
  renderStep = (step) => {
    const { dataSource } = this.props;
    return (
      <div>
        <h3 style={styles.formTitle}>{dataSource[step].paintName}</h3>
        <canvas ref="canvas" width="930" height="650" />
        <Img src={dataSource[step].paintUrl} />
      </div>
    );
  };


  render() {
    const { dataSource } = this.props;

    return (
      <div>
        <IceContainer title="版权树">
          <Row wrap>
            <Col xxs="24" s="5" l="5" style={styles.formLabel}>
              <Step
                current={this.state.step}
                direction="vertical"
                type="dot"
                animation={false}
                style={styles.step}
              >
                {
                  dataSource.map((item, index) => {
                    if (index === 1) {
                      return <Step.Item title="依赖作品" content={item.paintName} onClick={this.onClick} />;
                    } else if (index === 2) {
                      return <Step.Item title="原创" content={item.paintName} onClick={this.onClick} />;
                    }
                    return <Step.Item title="当前作品" content={item.paintName} onClick={this.onClick} />;
                  })
                }
              </Step>
            </Col>
            <Col xxs="24" s="18" l="18">
              {this.renderStep(this.state.step)}
            </Col>
          </Row>
          <Row justify="center">
            <Col offset="12" span="5"><Button type="primary" onClick={this.handleClick}>继续上传画作</Button></Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  step: {
    marginBottom: '20px',
  },
  content: {
    height: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    color: '#1DC11D',
    marginRight: '10px',
  },
  formTitle: {
    margin: '0 0 20px',
    paddingBottom: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '30px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    marginTop: '25px',
    marginBottom: '25px',
  },
};
