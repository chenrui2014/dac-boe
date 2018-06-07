import React, { Component } from 'react';

import IceContainer from '@icedesign/container';
import {
  Grid,
  Step,
  Button
} from '@icedesign/base';

import Img from '@icedesign/img';

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
  onClick(currentStep) {
    console.log(currentStep);

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
